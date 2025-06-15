
-- Create a new type for expense categories
CREATE TYPE public.expense_category AS ENUM ('Labor', 'Supplies', 'Utilities', 'Equipment', 'Overhead', 'Administrative');

-- Create the hospital_expenses table
CREATE TABLE public.hospital_expenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  expense_date DATE NOT NULL,
  category public.expense_category NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  description TEXT,
  department_id UUID REFERENCES public.departments(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.hospital_expenses ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow read access for all users (as it's for the dashboard)
CREATE POLICY "Allow public read access to hospital expenses"
ON public.hospital_expenses
FOR SELECT
USING (true);
