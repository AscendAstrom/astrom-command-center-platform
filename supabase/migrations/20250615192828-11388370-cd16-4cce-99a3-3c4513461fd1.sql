
-- Enable pg_net extension for HTTP requests within the database
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Re-schedule the ai-ingestion-scheduler to ensure it uses pg_net.
-- This is idempotent and will update the existing job if it exists.
SELECT cron.schedule(
    'ai-ingestion-scheduler',
    '*/5 * * * *', -- Every 5 minutes
    $$
    SELECT
        net.http_post(
            url:='https://emlsdrnbnyfhenniqxuk.supabase.co/functions/v1/ai-ingestion-scheduler',
            headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtbHNkcm5ibnlmaGVubmlxeHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzU1MzksImV4cCI6MjA2NDAxMTUzOX0.X7cYZvtx2d5zM3AUmddtIxkbEkZOhLHEbxsE_oX4pvM"}'::jsonb,
            body:='{}'::jsonb
        ) AS request_id;
    $$
);

-- Re-schedule the clinical data generator to ensure it uses pg_net.
-- This is idempotent and will update the existing job if it exists.
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

-- Re-schedule the operational data generator to ensure it uses pg_net.
-- This is idempotent and will update the existing job if it exists.
SELECT cron.schedule(
    'generate-operational-data-job',
    '* * * * *', -- every minute
    $$
    SELECT
        net.http_post(
            url:='https://emlsdrnbnyfhenniqxuk.supabase.co/functions/v1/generate-operational-data',
            headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtbHNkcm5ibnlmaGVubmlxeHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzU1MzksImV4cCI6MjA2NDAxMTUzOX0.X7cYZvtx2d5zM3AUmddtIxkbEkZOhLHEbxsE_oX4pvM"}'::jsonb,
            body:='{}'::jsonb
        ) AS request_id;
    $$
);
