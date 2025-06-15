
-- Add a column to store uploaded file content for CSV data sources.
-- This simplifies the ingestion process by avoiding file storage management for this first step.
ALTER TABLE public.data_sources ADD COLUMN IF NOT EXISTS file_content TEXT;
