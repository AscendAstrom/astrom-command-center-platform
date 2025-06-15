
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  ProtocolAdherenceMetric,
  MedicationSafetyAlert,
  PredictiveDiagnosticSuggestion,
  CarePathwayAnalytic,
  ClinicalIntelligenceData,
} from '@/components/ai-ecosystem/clinical-intel-types';

const fetchClinicalIntelligenceData = async (): Promise<ClinicalIntelligenceData> => {
  const [
    protocolAdherenceRes,
    medicationAlertsRes,
    diagnosticSuggestionsRes,
    carePathwaysRes,
  ] = await Promise.all([
    supabase.from('protocol_adherence_metrics').select('*'),
    supabase.from('medication_safety_alerts').select('*'),
    supabase.from('predictive_diagnostic_suggestions').select('*'),
    supabase.from('care_pathway_analytics').select('*'),
  ]);

  if (protocolAdherenceRes.error) throw new Error(protocolAdherenceRes.error.message);
  if (medicationAlertsRes.error) throw new Error(medicationAlertsRes.error.message);
  if (diagnosticSuggestionsRes.error) throw new Error(diagnosticSuggestionsRes.error.message);
  if (carePathwaysRes.error) throw new Error(carePathwaysRes.error.message);

  const protocolAdherenceMetrics = (protocolAdherenceRes.data || []) as ProtocolAdherenceMetric[];
  const medicationSafetyAlertsData = (medicationAlertsRes.data || []) as MedicationSafetyAlert[];
  const predictiveDiagnosticSuggestionsData = (diagnosticSuggestionsRes.data || []) as PredictiveDiagnosticSuggestion[];
  const carePathwayAnalyticsData = (carePathwaysRes.data || []) as CarePathwayAnalytic[];

  // Transform data to match component expectations
  const protocolAdherence = protocolAdherenceMetrics.reduce((acc, metric) => {
    const key = metric.protocol_name.toLowerCase().split(' ')[0];
    acc[key] = metric.adherence_value;
    return acc;
  }, {} as Record<string, number>);

  const medicationAlerts = medicationSafetyAlertsData.map(alert => ({
    id: alert.id,
    patient: alert.patient_name,
    alert: alert.alert_details,
    action: alert.status,
  }));

  const diagnosticSuggestions = predictiveDiagnosticSuggestionsData.map(suggestion => ({
    id: suggestion.id,
    patient: suggestion.patient_name,
    condition: suggestion.suggestion,
    confidence: suggestion.confidence,
    evidence: suggestion.evidence,
  }));

  const carePathways = carePathwayAnalyticsData.map(pathway => ({
    id: pathway.id,
    name: pathway.pathway_name,
    avgLOS: pathway.avg_los_days,
    compliance: pathway.compliance_percent,
    outcome: pathway.outcome_summary,
  }));

  return {
    protocolAdherence,
    medicationAlerts,
    diagnosticSuggestions,
    carePathways,
  };
};

export const useClinicalIntelligenceData = () => {
  return useQuery<ClinicalIntelligenceData, Error>({
    queryKey: ['clinicalIntelligenceData'],
    queryFn: fetchClinicalIntelligenceData,
    refetchInterval: 15000, // Refetch data every 15 seconds
  });
};
