
-- This script schedules the operational data generator function to run periodically.
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
