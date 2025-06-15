
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, format } from "date-fns";

export interface SurgicalOutcomeMetrics {
  totalSurgeries: number;
  successRate: number;
  avgDuration: number;
  onTimeStartRate: number;
  surgeryTypes: { name: string, count: number }[];
}

const getSurgicalOutcomesData = async (): Promise<SurgicalOutcomeMetrics> => {
  const monthStart = startOfMonth(new Date());

  const { data, error } = await supabase
    .from('surgical_outcomes')
    .select('procedure_name, duration_minutes, outcome, on_time_start')
    .gte('surgery_date', format(monthStart, 'yyyy-MM-dd'));

  if (error) throw new Error(error.message);

  const totalSurgeries = data.length;
  if (totalSurgeries === 0) {
    return { totalSurgeries: 0, successRate: 0, avgDuration: 0, onTimeStartRate: 0, surgeryTypes: [] };
  }
  
  const successfulSurgeries = data.filter(d => d.outcome === 'Successful').length;
  const onTimeStarts = data.filter(d => d.on_time_start).length;
  const totalDuration = data.reduce((sum, d) => sum + (d.duration_minutes || 0), 0);

  const surgeryTypesCount: Record<string, number> = {};
  data.forEach(d => {
    if(d.procedure_name) {
      surgeryTypesCount[d.procedure_name] = (surgeryTypesCount[d.procedure_name] || 0) + 1;
    }
  });

  const surgeryTypes = Object.entries(surgeryTypesCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return {
    totalSurgeries,
    successRate: parseFloat(((successfulSurgeries / totalSurgeries) * 100).toFixed(1)),
    avgDuration: Math.round(totalDuration / totalSurgeries),
    onTimeStartRate: parseFloat(((onTimeStarts / totalSurgeries) * 100).toFixed(1)),
    surgeryTypes,
  };
};

export const useSurgicalOutcomesData = () => {
  return useQuery<SurgicalOutcomeMetrics>({
    queryKey: ['surgical_outcomes_data'],
    queryFn: getSurgicalOutcomesData,
  });
};
