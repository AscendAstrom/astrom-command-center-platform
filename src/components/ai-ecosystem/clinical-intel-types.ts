
export interface ProtocolAdherenceMetric {
  id: string;
  protocol_name: string;
  adherence_value: number;
  updated_at: string;
}

export interface MedicationSafetyAlert {
  id: string;
  patient_name: string;
  alert_details: string;
  status: string;
  created_at: string;
}

export interface PredictiveDiagnosticSuggestion {
  id: string;
  patient_name: string;
  suggestion: string;
  confidence: number;
  evidence: string | null;
  created_at: string;
}

export interface CarePathwayAnalytic {
  id: string;
  pathway_name: string;
  avg_los_days: string;
  compliance_percent: number;
  outcome_summary: string;
  updated_at: string;
}

export interface ClinicalIntelligenceData {
  protocolAdherence: Record<string, number>;
  medicationAlerts: { id: string; patient: string; alert: string; action: string }[];
  diagnosticSuggestions: { id: string; patient: string; condition: string; confidence: number; evidence: string | null }[];
  carePathways: { id: string; name: string; avgLOS: string; compliance: number; outcome: string }[];
}
