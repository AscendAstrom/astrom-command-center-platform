
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface QualityMetrics {
  overallScore: number;
  patientSafetyScore: number;
  satisfactionScore: number;
  activeIncidents: number;
}

const getQualityMetricsData = async (): Promise<QualityMetrics> => {
  try {
    // Get patient satisfaction from surveys
    const { data: surveys } = await supabase
      .from('patient_surveys')
      .select('overall_rating')
      .not('overall_rating', 'is', null);

    const satisfactionScore = surveys && surveys.length > 0
      ? (surveys.reduce((sum, s) => sum + s.overall_rating, 0) / surveys.length) * 20 // Convert 1-5 to percentage
      : 0;

    // Get safety incidents from alerts
    const { data: safetyAlerts } = await supabase
      .from('medication_safety_alerts')
      .select('severity, status')
      .eq('status', 'ACTIVE');

    const activeIncidents = safetyAlerts?.length || 0;
    
    // Calculate safety score based on incidents (inverse relationship)
    const patientSafetyScore = Math.max(0, 100 - (activeIncidents * 5));

    // Calculate overall score as average
    const overallScore = (satisfactionScore + patientSafetyScore) / 2;

    return {
      overallScore: Number(overallScore.toFixed(1)),
      patientSafetyScore: Number(patientSafetyScore.toFixed(1)),
      satisfactionScore: Number(satisfactionScore.toFixed(1)),
      activeIncidents
    };
  } catch (error) {
    console.error('Error fetching quality metrics:', error);
    return {
      overallScore: 0,
      patientSafetyScore: 0,
      satisfactionScore: 0,
      activeIncidents: 0
    };
  }
};

export const useQualityMetricsData = () => {
  return useQuery({
    queryKey: ["quality_metrics_data"],
    queryFn: getQualityMetricsData,
    refetchInterval: 60000, // Refetch every minute for safety data
  });
};
