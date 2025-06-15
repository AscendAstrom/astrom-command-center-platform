
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { subDays } from "date-fns";

export interface ClaimsData {
  totalClaims: number;
  approvalRate: number;
  avgProcessingTime: number;
  claimsStatusData: { name: string; value: number }[];
  topInsurers: { insurer: string; claims: number; approval: number }[];
  lastUpdated: string;
}

const getInsuranceClaimsData = async (): Promise<ClaimsData> => {
  const thirtyDaysAgo = subDays(new Date(), 30);

  const { data: claims, error } = await supabase
    .from("insurance_claims")
    .select(`
      status,
      processing_time_days,
      insurer_name
    `)
    .gte("created_at", thirtyDaysAgo.toISOString());
  
  if (error) throw error;
  if (!claims) return { totalClaims: 0, approvalRate: 0, avgProcessingTime: 0, claimsStatusData: [], topInsurers: [], lastUpdated: new Date().toLocaleTimeString() };
  
  const totalClaims = claims.length;
  const approvedClaims = claims.filter(c => c.status === 'APPROVED').length;
  const resolvedClaims = claims.filter(c => c.status === 'APPROVED' || c.status === 'DENIED');
  const approvalRate = resolvedClaims.length > 0 ? (approvedClaims / resolvedClaims.length) * 100 : 0;
  
  const processedClaims = claims.filter(c => c.processing_time_days !== null);
  const avgProcessingTime = processedClaims.length > 0
    ? Math.round(processedClaims.reduce((acc, c) => acc + (c.processing_time_days || 0), 0) / processedClaims.length)
    : 0;
    
  const claimsStatusMap: { [key: string]: number } = {};
  claims.forEach(c => {
    const status = c.status as string;
    claimsStatusMap[status] = (claimsStatusMap[status] || 0) + 1;
  });
  const claimsStatusData = Object.entries(claimsStatusMap).map(([name, value]) => ({ name, value }));

  const insurerCounts: { [key: string]: { claims: number; approved: number } } = {};
  claims.forEach(c => {
    if (!insurerCounts[c.insurer_name]) {
        insurerCounts[c.insurer_name] = { claims: 0, approved: 0 };
    }
    insurerCounts[c.insurer_name].claims++;
    if (c.status === 'APPROVED') {
        insurerCounts[c.insurer_name].approved++;
    }
  });

  const topInsurers = Object.entries(insurerCounts)
    .map(([insurer, data]) => ({
        insurer,
        claims: data.claims,
        approval: data.claims > 0 ? (data.approved / data.claims) * 100 : 0,
    }))
    .sort((a,b) => b.claims - a.claims)
    .slice(0, 3);

  return {
    totalClaims,
    approvalRate: parseFloat(approvalRate.toFixed(1)),
    avgProcessingTime,
    claimsStatusData,
    topInsurers,
    lastUpdated: new Date().toLocaleTimeString()
  };
};

export const useInsuranceClaimsData = () => {
  return useQuery({
    queryKey: ["insurance_claims_data"],
    queryFn: getInsuranceClaimsData,
    refetchInterval: 30000,
  });
};
