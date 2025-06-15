
-- Alter ml_models table to add new fields for the ML Platform
ALTER TABLE public.ml_models
ADD COLUMN IF NOT EXISTS version TEXT NOT NULL DEFAULT '1.0.0',
ADD COLUMN IF NOT EXISTS data_points BIGINT,
ADD COLUMN IF NOT EXISTS parameters JSONB,
ADD COLUMN IF NOT EXISTS created_by UUID,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;

-- Update existing rows to have a valid updated_at
UPDATE public.ml_models SET updated_at = created_at WHERE updated_at IS NULL;
UPDATE public.ml_models SET updated_at = now() WHERE updated_at IS NULL;
ALTER TABLE public.ml_models ALTER COLUMN updated_at SET NOT NULL;
ALTER TABLE public.ml_models ALTER COLUMN updated_at SET DEFAULT now();

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE TRIGGER on_ml_models_update
BEFORE UPDATE ON public.ml_models
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create ml_training_jobs table
CREATE TABLE public.ml_training_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID REFERENCES public.ml_models(id) ON DELETE CASCADE,
    model_name TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('queued', 'running', 'completed', 'failed', 'updating', 'testing', 'deployed')),
    progress INTEGER CHECK (progress >= 0 AND progress <= 100),
    gpu_utilization NUMERIC,
    estimated_time_remaining_mins INTEGER,
    logs JSONB,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create a trigger for ml_training_jobs updated_at
CREATE OR REPLACE TRIGGER on_ml_training_jobs_update
BEFORE UPDATE ON public.ml_training_jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create ml_federated_sites table
CREATE TABLE public.ml_federated_sites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT,
    status TEXT NOT NULL CHECK (status IN ('connected', 'syncing', 'offline')),
    data_contribution_records BIGINT,
    last_sync TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create a trigger for ml_federated_sites updated_at
CREATE OR REPLACE TRIGGER on_ml_federated_sites_update
BEFORE UPDATE ON public.ml_federated_sites
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add RLS policies for the new tables and ml_models
ALTER TABLE public.ml_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ml_training_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ml_federated_sites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ml_models_all_access_for_auth_users" ON public.ml_models FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "ml_training_jobs_all_access_for_auth_users" ON public.ml_training_jobs FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "ml_federated_sites_all_access_for_auth_users" ON public.ml_federated_sites FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Seed data for ml_models
INSERT INTO public.ml_models (name, type, status, accuracy, version, data_points, target, last_trained)
VALUES 
('Patient Readmission Predictor', 'prediction', 'deployed', 92.5, '2.1.0', 1500000, 'Readmission', now() - interval '2 days'),
('Sepsis Onset Classifier', 'classification', 'training', 88.0, '1.5.0', 750000, 'Sepsis', now() - interval '1 hour'),
('Appointment No-Show Predictor', 'prediction', 'testing', 85.3, '1.0.0', 500000, 'No-Show', now() - interval '5 days'),
('ED Wait Time Optimizer', 'optimization', 'updating', 95.1, '3.0.0', 2000000, 'Wait Time', now() - interval '1 day');

-- Seed data for ml_training_jobs
INSERT INTO public.ml_training_jobs (model_id, model_name, status, progress, gpu_utilization, estimated_time_remaining_mins)
SELECT id, name, 'running', 75, 82, 45 FROM public.ml_models WHERE name = 'Sepsis Onset Classifier';

INSERT INTO public.ml_training_jobs (model_id, model_name, status, progress, gpu_utilization, estimated_time_remaining_mins, completed_at, started_at)
VALUES
((SELECT id FROM public.ml_models WHERE name = 'Appointment No-Show Predictor'), 'Appointment No-Show Predictor', 'completed', 100, 0, 0, now() - interval '2 hours', now() - interval '4 hours'),
((SELECT id FROM public.ml_models WHERE name = 'ED Wait Time Optimizer'), 'ED Wait Time Optimizer', 'queued', 0, 0, 120, null, null);

-- Seed data for ml_federated_sites
INSERT INTO public.ml_federated_sites (name, location, status, data_contribution_records, last_sync)
VALUES
('City General Hospital', 'New York, USA', 'connected', 5400000, now() - interval '2 hours'),
('St. Jude Research', 'London, UK', 'syncing', 3200000, now() - interval '15 minutes'),
('Global Health Initiative', 'Geneva, CH', 'offline', 1800000, now() - interval '1 day');
