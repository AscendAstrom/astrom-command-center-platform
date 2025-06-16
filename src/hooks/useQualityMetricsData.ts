
import { useQuery } from "@tanstack/react-query";

export interface QualityMetrics {
  overallScore: number;
  patientSafetyScore: number;
  satisfactionScore: number;
  activeIncidents: number;
}

const getQualityMetricsData = async (): Promise<QualityMetrics> => {
  // Since patient_surveys table doesn't exist, return mock data
  const satisfactionScore = 82.5; // Mock satisfaction score
  const activeIncidents = 2; // Mock active incidents
  const patientSafetyScore = 95.0; // Mock safety score
  
  const overallScore = Math.round((satisfactionScore + patientSafetyScore) / 2);

  return {
    overallScore: parseFloat(overallScore.toFixed(1)),
    patientSafetyScore: parseFloat(patientSafetyScore.toFixed(1)),
    satisfactionScore: parseFloat(satisfactionScore.toFixed(1)),
    activeIncidents: activeIncidents,
  };
};

export const useQualityMetricsData = () => {
  return useQuery({
    queryKey: ["quality_metrics_data"],
    queryFn: getQualityMetricsData,
    refetchInterval: 60000,
  });
};
