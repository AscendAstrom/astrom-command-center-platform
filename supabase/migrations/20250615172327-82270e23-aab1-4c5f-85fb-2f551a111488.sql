
-- Table for Clinical Protocol Adherence Metrics
CREATE TABLE public.protocol_adherence_metrics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  protocol_name text NOT NULL,
  adherence_value integer NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.protocol_adherence_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read access to authenticated users" ON public.protocol_adherence_metrics FOR SELECT USING (auth.role() = 'authenticated');

-- Table for Medication Safety Alerts
CREATE TABLE public.medication_safety_alerts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name text NOT NULL,
  alert_details text NOT NULL,
  status text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.medication_safety_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read access to authenticated users" ON public.medication_safety_alerts FOR SELECT USING (auth.role() = 'authenticated');

-- Table for Predictive Diagnostic Suggestions
CREATE TABLE public.predictive_diagnostic_suggestions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name text NOT NULL,
  suggestion text NOT NULL,
  confidence integer NOT NULL,
  evidence text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.predictive_diagnostic_suggestions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read access to authenticated users" ON public.predictive_diagnostic_suggestions FOR SELECT USING (auth.role() = 'authenticated');

-- Table for Care Pathway Analytics
CREATE TABLE public.care_pathway_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pathway_name text NOT NULL,
  avg_los_days text NOT NULL,
  compliance_percent integer NOT NULL,
  outcome_summary text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.care_pathway_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read access to authenticated users" ON public.care_pathway_analytics FOR SELECT USING (auth.role() = 'authenticated');

-- Insert sample data into the new tables

INSERT INTO public.protocol_adherence_metrics (protocol_name, adherence_value) VALUES
('Sepsis Bundle', 98),
('Stroke Protocol', 95),
('MI Pathway', 97);

INSERT INTO public.medication_safety_alerts (patient_name, alert_details, status) VALUES
('John D.', 'High Risk: Warfarin + Aspirin', 'Pharmacist review pending'),
('Jane S.', 'Allergy: Penicillin', 'Alternative prescribed');

INSERT INTO public.predictive_diagnostic_suggestions (patient_name, suggestion, confidence, evidence) VALUES
('Robert B.', 'Possible Sepsis', 85, 'High lactate, fever'),
('Emily W.', 'Early-stage Pneumonia', 78, 'Chest X-ray anomalies');

INSERT INTO public.care_pathway_analytics (pathway_name, avg_los_days, compliance_percent, outcome_summary) VALUES
('Knee Replacement', '3.2 days', 96, '99% positive'),
('COPD Management', '5.1 days', 92, '88% readmission reduction');

