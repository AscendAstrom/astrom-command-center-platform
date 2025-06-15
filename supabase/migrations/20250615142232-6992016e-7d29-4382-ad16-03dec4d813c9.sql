
-- Add version column to data_pipelines
ALTER TABLE public.data_pipelines
ADD COLUMN version integer NOT NULL DEFAULT 1;

-- Rename last_execution to last_executed in automation_rules
ALTER TABLE public.automation_rules
RENAME COLUMN last_execution TO last_executed;

-- Create alert_subscriptions table
CREATE TABLE public.alert_subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rule_id uuid NOT NULL REFERENCES public.automation_rules(id) ON DELETE CASCADE,
  channels text[] NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  frequency text NOT NULL DEFAULT 'immediate', -- e.g., immediate, hourly, daily
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.alert_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own subscriptions"
ON public.alert_subscriptions
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER handle_alert_subscriptions_updated_at
BEFORE UPDATE ON public.alert_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create rule_executions table
CREATE TABLE public.rule_executions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_id uuid NOT NULL REFERENCES public.automation_rules(id) ON DELETE CASCADE,
  executed_at timestamptz NOT NULL DEFAULT now(),
  status TEXT NOT NULL, -- 'SUCCESS' or 'FAILURE'
  details jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.rule_executions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access"
ON public.rule_executions
FOR ALL
USING (true)
WITH CHECK (true);

-- Create surge_predictions table
CREATE TABLE public.surge_predictions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    department_id uuid REFERENCES public.departments(id),
    prediction_datetime timestamptz NOT NULL,
    predicted_admissions integer NOT NULL,
    confidence_score numeric(5, 4),
    model_version text,
    created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.surge_predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read access to all authenticated users"
ON public.surge_predictions
FOR SELECT
USING (auth.role() = 'authenticated');

-- Create daily_summaries table
CREATE TABLE public.daily_summaries (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    summary_date date NOT NULL UNIQUE,
    content jsonb NOT NULL,
    generated_by text,
    created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.daily_summaries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read access to all authenticated users"
ON public.daily_summaries
FOR SELECT
USING (auth.role() = 'authenticated');
