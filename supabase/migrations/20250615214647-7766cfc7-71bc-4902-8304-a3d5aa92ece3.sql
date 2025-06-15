
CREATE TABLE public.sla_configurations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    zone_id UUID,
    zone_name TEXT,
    metric_type TEXT NOT NULL,
    threshold NUMERIC NOT NULL,
    unit TEXT NOT NULL,
    time_window TEXT NOT NULL,
    alert_enabled BOOLEAN NOT NULL DEFAULT true,
    escalation_rules JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.sla_configurations ENABLE ROW LEVEL SECURITY;

-- Policies for SLA Configurations
CREATE POLICY "Allow public read access to SLA configurations"
ON public.sla_configurations
FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated users to create SLA configurations"
ON public.sla_configurations
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update SLA configurations"
ON public.sla_configurations
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to delete SLA configurations"
ON public.sla_configurations
FOR DELETE
TO authenticated
USING (true);
