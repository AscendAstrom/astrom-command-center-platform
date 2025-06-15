
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { subDays } from "date-fns";

export interface DenialData {
  totalDenials: number;
  topDenialReason: string;
  denialsByReason: { name: string; value: number }[];
}

const getClaimDenialData = async (days: number): Promise<DenialData> => {
  const startDate = subDays(new Date(), days);
  const { data, error, count } = await supabase
    .from("claim_denials")
    .select("denial_reason", { count: "exact" })
    .gte("denial_date", startDate.toISOString());

  if (error) throw new Error(error.message);

  const totalDenials = count || 0;

  const reasonCounts: { [key: string]: number } = {};
  (data || []).forEach(d => {
    const reason = d.denial_reason as string;
    reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
  });

  const denialsByReason = Object.entries(reasonCounts)
    .map(([name, value]) => ({ name: name.replace(/_/g, ' '), value }))
    .sort((a,b) => b.value - a.value);

  const topDenialReason = denialsByReason.length > 0 ? denialsByReason[0].name : "N/A";

  return {
    totalDenials,
    topDenialReason,
    denialsByReason,
  };
};

export const useClaimDenialData = (days: number = 30) => {
  return useQuery({
    queryKey: ["claim_denial_data", days],
    queryFn: () => getClaimDenialData(days),
    refetchInterval: 60000,
  });
};
