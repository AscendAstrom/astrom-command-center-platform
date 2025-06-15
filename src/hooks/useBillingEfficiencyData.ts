
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { subDays, startOfWeek, endOfWeek, format, eachDayOfInterval, formatISO, parseISO } from "date-fns";

export interface BillingData {
  processedThisWeek: number;
  denialRate: number;
  avgCollectionTime: number;
  billingHistory: { week: string; processed: number; denied: number }[];
  lastUpdated: string;
}

const getBillingEfficiencyData = async (): Promise<BillingData> => {
  const ninetyDaysAgo = subDays(new Date(), 90);

  const { data: claims, error } = await supabase
    .from("insurance_claims")
    .select("created_at, status, processing_time_days")
    .gte("created_at", ninetyDaysAgo.toISOString());
  
  if (error) throw error;
  if (!claims) return { processedThisWeek: 0, denialRate: 0, avgCollectionTime: 0, billingHistory: [], lastUpdated: new Date().toLocaleTimeString() };

  const now = new Date();
  const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 });
  
  const processedThisWeek = claims.filter(c => {
    const createdAt = parseISO(c.created_at);
    return createdAt >= startOfThisWeek;
  }).length;
  
  const totalClaims = claims.length;
  const deniedClaims = claims.filter(c => c.status === 'DENIED').length;
  const denialRate = totalClaims > 0 ? (deniedClaims / totalClaims) * 100 : 0;
  
  const paidClaims = claims.filter(c => (c.status === 'APPROVED' || c.status === 'PAID') && c.processing_time_days !== null);
  const avgCollectionTime = paidClaims.length > 0
    ? Math.round(paidClaims.reduce((acc, c) => acc + (c.processing_time_days || 0), 0) / paidClaims.length)
    : 0;

  const weeklyHistory: { [key: string]: { processed: number, denied: number }} = {};
  const weekKeys: string[] = [];

  for (let i = 11; i >= 0; i--) {
      const weekStart = startOfWeek(subDays(now, i * 7), { weekStartsOn: 1 });
      const weekKey = format(weekStart, 'MMM d');
      if (!weeklyHistory[weekKey]) {
        weeklyHistory[weekKey] = { processed: 0, denied: 0 };
        weekKeys.push(weekKey);
      }
  }

  claims.forEach(c => {
    const weekKey = format(startOfWeek(parseISO(c.created_at), { weekStartsOn: 1 }), 'MMM d');
    if (weeklyHistory[weekKey]) {
        weeklyHistory[weekKey].processed++;
        if (c.status === 'DENIED') {
            weeklyHistory[weekKey].denied++;
        }
    }
  });
  
  const billingHistory = weekKeys.map(key => ({
    week: key,
    ...weeklyHistory[key]
  }));

  return {
    processedThisWeek,
    denialRate: parseFloat(denialRate.toFixed(1)),
    avgCollectionTime,
    billingHistory,
    lastUpdated: new Date().toLocaleTimeString(),
  };
};

export const useBillingEfficiencyData = () => {
  return useQuery({
    queryKey: ["billing_efficiency_data"],
    queryFn: getBillingEfficiencyData,
    refetchInterval: 30000,
  });
};
