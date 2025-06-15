
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface QualityMetrics {
  overallScore: number;
  patientSafetyScore: number;
  satisfactionScore: number;
  activeIncidents: number;
}

const getQualityMetricsData = async (): Promise<QualityMetrics> => {
  const { data: surveys, error: surveyError } = await supabase
    .from("patient_surveys")
    .select("overall_satisfaction");

  if (surveyError) throw surveyError;

  const { count: openRisks, error: riskError } = await supabase
    .from("risk_assessments")
    .select('*', { count: 'exact', head: true })
    .eq('status', 'OPEN');

  if (riskError) throw riskError;

  const satisfactionScore = surveys && surveys.length > 0
    ? (surveys.reduce((acc, s) => acc + (s.overall_satisfaction || 0), 0) / surveys.length) * 20
    : 75; // Default score

  const patientSafetyScore = 100 - ((openRisks || 0) * 5); // Each open risk reduces score by 5
  
  const overallScore = Math.round((satisfactionScore + patientSafetyScore) / 2);

  return {
    overallScore: parseFloat(overallScore.toFixed(1)),
    patientSafetyScore: parseFloat(patientSafetyScore.toFixed(1)),
    satisfactionScore: parseFloat(satisfactionScore.toFixed(1)),
    activeIncidents: openRisks || 0,
  };
};

export const useQualityMetricsData = () => {
  return useQuery({
    queryKey: ["quality_metrics_data"],
    queryFn: getQualityMetricsData,
    refetchInterval: 60000,
  });
};
