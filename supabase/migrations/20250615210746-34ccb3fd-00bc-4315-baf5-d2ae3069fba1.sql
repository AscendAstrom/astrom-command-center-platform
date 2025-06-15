
-- Enable replica identity for realtime updates on ML platform tables
ALTER TABLE public.ml_models REPLICA IDENTITY FULL;
ALTER TABLE public.ml_training_jobs REPLICA IDENTITY FULL;
ALTER TABLE public.ml_federated_sites REPLICA IDENTITY FULL;

-- Add tables to the supabase_realtime publication
-- This might fail if they are already added, which is fine.
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.ml_models;
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE 'Table ml_models already in publication supabase_realtime.';
END;
$$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.ml_training_jobs;
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE 'Table ml_training_jobs already in publication supabase_realtime.';
END;
$$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.ml_federated_sites;
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE 'Table ml_federated_sites already in publication supabase_realtime.';
END;
$$;
