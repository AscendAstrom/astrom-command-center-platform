
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ComplianceData {
  totalAreas: number;
  atRisk: number;
  compliant: number;
  areas: { name: string; status: string; regulation: string; }[];
}

const getComplianceData = async (): Promise<ComplianceData> => {
  const { data, error, count } = await supabase
    .from("compliance_areas")
    .select("name, status, regulation", { count: 'exact' });

  if (error) throw new Error(error.message);
  
  const areas = data || [];
  const totalAreas = count || 0;
  const atRisk = areas.filter(a => a.status === 'AT_RISK').length;
  const compliant = areas.filter(a => a.status === 'COMPLIANT').length;

  return { totalAreas, atRisk, compliant, areas };
};

export const useComplianceData = () => {
  return useQuery({
    queryKey: ["compliance_data"],
    queryFn: getComplianceData,
    refetchInterval: 60000,
  });
};
