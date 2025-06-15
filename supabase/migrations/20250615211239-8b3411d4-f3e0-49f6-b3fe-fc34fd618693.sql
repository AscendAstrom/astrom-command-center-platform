
-- Enable Row Level Security for ML platform tables
ALTER TABLE public.ml_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ml_training_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ml_federated_sites ENABLE ROW LEVEL SECURITY;

-- Grant SELECT access to authenticated users for ml_models
CREATE POLICY "Allow authenticated users to read ml_models"
ON public.ml_models
FOR SELECT
TO authenticated
USING (true);

-- Grant SELECT access to authenticated users for ml_training_jobs
CREATE POLICY "Allow authenticated users to read ml_training_jobs"
ON public.ml_training_jobs
FOR SELECT
TO authenticated
USING (true);

-- Grant SELECT access to authenticated users for ml_federated_sites
CREATE POLICY "Allow authenticated users to read ml_federated_sites"
ON public.ml_federated_sites
FOR SELECT
TO authenticated
USING (true);
