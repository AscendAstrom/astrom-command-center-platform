
-- Create surgical_outcomes table
CREATE TABLE public.surgical_outcomes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.patients(id),
  department_id UUID REFERENCES public.departments(id),
  procedure_name TEXT NOT NULL,
  surgery_date DATE NOT NULL,
  duration_minutes INTEGER,
  outcome TEXT, -- e.g., 'Successful', 'Complication', 'Cancelled'
  on_time_start BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.surgical_outcomes IS 'Stores metrics for individual surgical procedures.';

ALTER TABLE public.surgical_outcomes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to surgical outcomes"
ON public.surgical_outcomes
FOR SELECT
USING (true);


-- Create medication_adherence_log table
CREATE TABLE public.medication_adherence_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.patients(id),
  medication_name TEXT NOT NULL,
  is_critical BOOLEAN NOT NULL DEFAULT false,
  dose_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL, -- e.g., 'Administered', 'Missed', 'Intervention Required'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.medication_adherence_log IS 'Logs medication adherence events for patients.';

ALTER TABLE public.medication_adherence_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to medication adherence logs"
ON public.medication_adherence_log
FOR SELECT
USING (true);
