
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { subMonths, startOfMonth, format } from "date-fns";

export interface MedicationAdherenceMetrics {
  overallAdherence: number;
  criticalMedsAdherence: number;
  missedDoses: number;
  interventions: number;
  adherenceHistory: { month: string; adherence: number }[];
}

const getMedicationAdherenceData = async (): Promise<MedicationAdherenceMetrics> => {
  const { data, error } = await supabase
    .from('medication_adherence_log')
    .select('dose_time, status, is_critical')
    .gte('dose_time', format(subMonths(new Date(), 6), 'yyyy-MM-dd'));

  if (error) throw new Error(error.message);

  if (data.length === 0) {
    return { overallAdherence: 0, criticalMedsAdherence: 0, missedDoses: 0, interventions: 0, adherenceHistory: [] };
  }

  const currentMonthStart = startOfMonth(new Date());
  const recentData = data.filter(d => new Date(d.dose_time) >= currentMonthStart);

  const totalDoses = recentData.length;
  const administeredDoses = recentData.filter(d => d.status === 'Administered').length;
  
  const criticalDoses = recentData.filter(d => d.is_critical);
  const administeredCriticalDoses = criticalDoses.filter(d => d.status === 'Administered').length;
  
  const overallAdherence = totalDoses > 0 ? parseFloat(((administeredDoses / totalDoses) * 100).toFixed(1)) : 0;
  const criticalMedsAdherence = criticalDoses.length > 0 ? parseFloat(((administeredCriticalDoses / criticalDoses.length) * 100).toFixed(1)) : 0;
  const missedDoses = recentData.filter(d => d.status === 'Missed').length;
  const interventions = recentData.filter(d => d.status === 'Intervention Required').length;
  
  // Create history for chart
  const adherenceHistory: { month: string; adherence: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const monthDate = subMonths(new Date(), i);
    const monthStart = startOfMonth(monthDate);
    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
    
    const monthData = data.filter(d => {
      const doseDate = new Date(d.dose_time);
      return doseDate >= monthStart && doseDate <= monthEnd;
    });

    const totalMonthDoses = monthData.length;
    const administeredMonthDoses = monthData.filter(d => d.status === 'Administered').length;
    const monthAdherence = totalMonthDoses > 0 ? Math.round((administeredMonthDoses / totalMonthDoses) * 100) : 0;

    adherenceHistory.push({
      month: format(monthStart, 'MMM'),
      adherence: monthAdherence,
    });
  }

  return {
    overallAdherence,
    criticalMedsAdherence,
    missedDoses,
    interventions,
    adherenceHistory,
  };
};


export const useMedicationAdherenceData = () => {
  return useQuery<MedicationAdherenceMetrics>({
    queryKey: ['medication_adherence_data'],
    queryFn: getMedicationAdherenceData,
  });
};
