
-- Create budget_allocations table to store budget data
CREATE TABLE public.budget_allocations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  department_id UUID REFERENCES public.departments(id),
  category TEXT NOT NULL,
  budget_amount NUMERIC(15, 2) NOT NULL,
  budget_period_start DATE NOT NULL,
  budget_period_end DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_budget_period UNIQUE (department_id, category, budget_period_start, budget_period_end)
);

-- Add comments to explain the new table
COMMENT ON TABLE public.budget_allocations IS 'Stores budget allocations for different departments and categories over specific periods.';
COMMENT ON COLUMN public.budget_allocations.category IS 'The budget category (e.g., Labor, Supplies, Revenue).';

-- Enable RLS for budget_allocations
ALTER TABLE public.budget_allocations ENABLE ROW LEVEL SECURITY;

-- Allow public read access to budget allocations for dashboard visualization
CREATE POLICY "Allow public read access to budget allocations"
ON public.budget_allocations
FOR SELECT
USING (true);

-- Create financial_forecasts table to store predictive financial data
CREATE TABLE public.financial_forecasts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  forecast_date DATE NOT NULL,
  metric_name TEXT NOT NULL,
  forecasted_value NUMERIC(15, 2) NOT NULL,
  confidence_level NUMERIC(3, 2) CHECK (confidence_level >= 0 AND confidence_level <= 1),
  model_version TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add comments to explain the new table
COMMENT ON TABLE public.financial_forecasts IS 'Stores financial forecasts for key metrics like revenue and costs.';
COMMENT ON COLUMN public.financial_forecasts.metric_name IS 'The name of the metric being forecasted (e.g., "revenue", "costs").';

-- Enable RLS for financial_forecasts
ALTER TABLE public.financial_forecasts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to financial forecasts for dashboard visualization
CREATE POLICY "Allow public read access to financial forecasts"
ON public.financial_forecasts
FOR SELECT
USING (true);
