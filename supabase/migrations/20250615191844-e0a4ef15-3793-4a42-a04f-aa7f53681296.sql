
-- This script finalizes the database setup, accounting for partially completed previous migrations.

-- Ensure Row Level Security policies are correctly applied to the wait_times table.
-- Using DROP POLICY IF EXISTS makes this safe to re-run.
ALTER TABLE public.wait_times ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read access to authenticated users" ON public.wait_times;
CREATE POLICY "Allow read access to authenticated users" ON public.wait_times FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Allow all for service_role" ON public.wait_times;
CREATE POLICY "Allow all for service_role" ON public.wait_times FOR ALL USING (auth.role() = 'service_role');

-- Ensure all necessary tables are enabled for realtime updates.
-- These commands will now include a check to prevent errors if already enabled.
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'beds') THEN
        ALTER TABLE public.beds REPLICA IDENTITY FULL;
        ALTER PUBLICATION supabase_realtime ADD TABLE public.beds;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'patient_visits') THEN
        ALTER TABLE public.patient_visits REPLICA IDENTITY FULL;
        ALTER PUBLICATION supabase_realtime ADD TABLE public.patient_visits;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'staff_schedules') THEN
        ALTER TABLE public.staff_schedules REPLICA IDENTITY FULL;
        ALTER PUBLICATION supabase_realtime ADD TABLE public.staff_schedules;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'wait_times') THEN
        ALTER TABLE public.wait_times REPLICA IDENTITY FULL;
        ALTER PUBLICATION supabase_realtime ADD TABLE public.wait_times;
    END IF;
END $$;

-- Schedule the data generator to run every minute.
-- cron.schedule will update the job if it already exists, making it safe to re-run.
SELECT cron.schedule(
    'generate-clinical-data-job',
    '* * * * *', -- every minute
    $$
    SELECT
        net.http_post(
            url:='https://emlsdrnbnyfhenniqxuk.supabase.co/functions/v1/generate-clinical-data',
            headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtbHNkcm5ibnlmaGVubmlxeHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzU1MzksImV4cCI6MjA2NDAxMTUzOX0.X7cYZvtx2d5zM3AUmddtIxkbEkZOhLHEbxsE_oX4pvM"}'::jsonb,
            body:='{}'::jsonb
        ) AS request_id;
    $$
);
