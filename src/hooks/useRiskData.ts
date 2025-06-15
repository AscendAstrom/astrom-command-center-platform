
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface RiskData {
  openRisks: number;
  highOrCritical: number;
  risks: { risk_description: string; risk_level: string; status: string }[];
}

const getRiskData = async (): Promise<RiskData> => {
  const { data, error } = await supabase
    .from("risk_assessments")
    .select("risk_description, risk_level, status");

  if (error) throw new Error(error.message);

  const risks = data || [];
  const openRisks = risks.filter(r => r.status === 'OPEN').length;
  const highOrCritical = risks.filter(r => r.risk_level === 'HIGH' || r.risk_level === 'CRITICAL').length;
  
  return { openRisks, highOrCritical, risks };
};

export const useRiskData = () => {
  return useQuery({
    queryKey: ["risk_data"],
    queryFn: getRiskData,
    refetchInterval: 60000,
  });
};
