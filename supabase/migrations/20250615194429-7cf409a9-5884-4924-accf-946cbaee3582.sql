
-- Enum for lab test status
CREATE TYPE public.lab_test_status AS ENUM ('ORDERED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED', 'ERROR');

-- Table for lab test types (the catalog of available tests)
CREATE TABLE public.lab_test_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    category TEXT,
    reference_range_low NUMERIC,
    reference_range_high NUMERIC,
    unit TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp_lab_test_types
BEFORE UPDATE ON public.lab_test_types
FOR EACH ROW
EXECUTE PROCEDURE public.update_updated_at_column();

-- Table for individual lab tests ordered for patients
CREATE TABLE public.lab_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    visit_id UUID REFERENCES public.patient_visits(id) ON DELETE SET NULL,
    test_type_id UUID NOT NULL REFERENCES public.lab_test_types(id),
    status lab_test_status NOT NULL DEFAULT 'ORDERED',
    result_value TEXT,
    result_unit TEXT,
    is_abnormal BOOLEAN NOT NULL DEFAULT false,
    is_critical BOOLEAN NOT NULL DEFAULT false,
    ordered_by_staff_id UUID REFERENCES public.staff(id) ON DELETE SET NULL,
    ordered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    specimen_collected_at TIMESTAMPTZ,
    result_received_at TIMESTAMPTZ,
    turnaround_time_minutes INTEGER,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp_lab_tests
BEFORE UPDATE ON public.lab_tests
FOR EACH ROW
EXECUTE PROCEDURE public.update_updated_at_column();

-- Table for critical lab value thresholds
CREATE TABLE public.critical_lab_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_type_id UUID NOT NULL REFERENCES public.lab_test_types(id) ON DELETE CASCADE,
    critical_low NUMERIC,
    critical_high NUMERIC,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp_critical_lab_values
BEFORE UPDATE ON public.critical_lab_values
FOR EACH ROW
EXECUTE PROCEDURE public.update_updated_at_column();

-- Row Level Security
ALTER TABLE public.lab_test_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to lab test types" ON public.lab_test_types FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage lab test types" ON public.lab_test_types FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE public.lab_tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to manage lab tests" ON public.lab_tests FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE public.critical_lab_values ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to critical values" ON public.critical_lab_values FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage critical values" ON public.critical_lab_values FOR ALL USING (auth.role() = 'authenticated');

-- Indexes for performance
CREATE INDEX ON public.lab_tests (patient_id);
CREATE INDEX ON public.lab_tests (visit_id);
CREATE INDEX ON public.lab_tests (status);
CREATE INDEX ON public.lab_tests (test_type_id);
