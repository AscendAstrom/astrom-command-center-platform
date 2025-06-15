
-- Enable pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the ai-ingestion-scheduler function to run every 5 minutes
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
