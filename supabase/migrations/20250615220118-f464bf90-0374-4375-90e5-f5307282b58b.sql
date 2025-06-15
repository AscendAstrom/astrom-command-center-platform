
-- Create encounters table
CREATE TABLE public.encounters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    start_date TIMESTAMPTZ NOT NULL,
    stop_date TIMESTAMPTZ,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    encounter_class TEXT,
    description TEXT,
    total_claim_cost NUMERIC,
    payer_coverage NUMERIC,
    reason_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create allergies table
CREATE TABLE public.allergies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    start_date TIMESTAMPTZ NOT NULL,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    encounter_id UUID REFERENCES public.encounters(id) ON DELETE CASCADE,
    description TEXT,
    code TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create careplans table
CREATE TABLE public.careplans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    start_date TIMESTAMPTZ NOT NULL,
    stop_date TIMESTAMPTZ,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    encounter_id UUID REFERENCES public.encounters(id) ON DELETE CASCADE,
    description TEXT,
    reason_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create conditions table
CREATE TABLE public.conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    start_date TIMESTAMPTZ NOT NULL,
    stop_date TIMESTAMPTZ,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    encounter_id UUID REFERENCES public.encounters(id) ON DELETE CASCADE,
    description TEXT,
    code TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create devices table
CREATE TABLE public.devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    start_date TIMESTAMPTZ NOT NULL,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    encounter_id UUID REFERENCES public.encounters(id) ON DELETE CASCADE,
    description TEXT,
    code TEXT,
    udi TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.encounters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.allergies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careplans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;

-- Policies for tables
CREATE POLICY "Allow public read access" ON public.encounters FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.allergies FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.careplans FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.conditions FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.devices FOR SELECT USING (true);

-- Policies for authenticated users to manage data
CREATE POLICY "Allow authenticated users to create encounters" ON public.encounters FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update encounters" ON public.encounters FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete encounters" ON public.encounters FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to create allergies" ON public.allergies FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update allergies" ON public.allergies FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete allergies" ON public.allergies FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to create careplans" ON public.careplans FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update careplans" ON public.careplans FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete careplans" ON public.careplans FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to create conditions" ON public.conditions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update conditions" ON public.conditions FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete conditions" ON public.conditions FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to create devices" ON public.devices FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update devices" ON public.devices FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete devices" ON public.devices FOR DELETE TO authenticated USING (true);
