
-- ENUMS for Quality & Safety
CREATE TYPE public.accreditation_status AS ENUM ('ACCREDITED', 'PENDING', 'EXPIRED', 'REVOKED');
CREATE TYPE public.compliance_status AS ENUM ('COMPLIANT', 'NON_COMPLIANT', 'IN_PROGRESS', 'AT_RISK');
CREATE TYPE public.risk_level AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE TYPE public.risk_status AS ENUM ('OPEN', 'MITIGATED', 'CLOSED', 'ACCEPTED');
CREATE TYPE public.initiative_status AS ENUM ('PLANNING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD');

-- Table for Accreditations
CREATE TABLE public.accreditations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    accrediting_body TEXT NOT NULL,
    status accreditation_status NOT NULL DEFAULT 'PENDING',
    issue_date DATE,
    expiry_date DATE,
    next_review_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER set_timestamp_accreditations BEFORE UPDATE ON public.accreditations FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Table for Compliance Areas
CREATE TABLE public.compliance_areas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    regulation TEXT NOT NULL,
    status compliance_status NOT NULL DEFAULT 'IN_PROGRESS',
    last_assessed_date DATE,
    owner_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER set_timestamp_compliance_areas BEFORE UPDATE ON public.compliance_areas FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Table for Risk Assessments
CREATE TABLE public.risk_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    risk_description TEXT NOT NULL,
    department_id UUID REFERENCES public.departments(id),
    risk_level risk_level NOT NULL,
    status risk_status NOT NULL DEFAULT 'OPEN',
    mitigation_plan TEXT,
    identified_date DATE NOT NULL DEFAULT CURRENT_DATE,
    review_date DATE,
    owner_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER set_timestamp_risk_assessments BEFORE UPDATE ON public.risk_assessments FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Table for Quality Improvement Initiatives
CREATE TABLE public.quality_improvement_initiatives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    department_id UUID REFERENCES public.departments(id),
    status initiative_status NOT NULL DEFAULT 'PLANNING',
    start_date DATE,
    end_date DATE,
    owner_name TEXT,
    metrics_impacted JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER set_timestamp_quality_improvement_initiatives BEFORE UPDATE ON public.quality_improvement_initiatives FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Table for Patient Satisfaction Surveys
CREATE TABLE public.patient_surveys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visit_id UUID REFERENCES public.patient_visits(id),
    survey_date DATE NOT NULL,
    overall_satisfaction INT CHECK (overall_satisfaction BETWEEN 1 AND 5),
    communication_rating INT CHECK (communication_rating BETWEEN 1 AND 5),
    cleanliness_rating INT CHECK (cleanliness_rating BETWEEN 1 AND 5),
    wait_time_rating INT CHECK (wait_time_rating BETWEEN 1 AND 5),
    comments TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table for Patient Education Materials
CREATE TABLE public.education_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    topic TEXT NOT NULL,
    format TEXT NOT NULL, -- e.g., 'PDF', 'Video', 'Webpage'
    url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER set_timestamp_education_materials BEFORE UPDATE ON public.education_materials FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Table for Patient Education Log
CREATE TABLE public.patient_education_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES public.patients(id),
    visit_id UUID REFERENCES public.patient_visits(id),
    material_id UUID NOT NULL REFERENCES public.education_materials(id),
    delivered_by_staff_name TEXT,
    delivery_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    completion_status TEXT, -- e.g., 'Delivered', 'Viewed', 'Completed'
    patient_feedback_score INT CHECK (patient_feedback_score BETWEEN 1 AND 5),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Row Level Security
ALTER TABLE public.accreditations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to view accreditations" ON public.accreditations FOR SELECT USING (auth.role() = 'authenticated');

ALTER TABLE public.compliance_areas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to view compliance areas" ON public.compliance_areas FOR SELECT USING (auth.role() = 'authenticated');

ALTER TABLE public.risk_assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to view risk assessments" ON public.risk_assessments FOR SELECT USING (auth.role() = 'authenticated');

ALTER TABLE public.quality_improvement_initiatives ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to view quality initiatives" ON public.quality_improvement_initiatives FOR SELECT USING (auth.role() = 'authenticated');

ALTER TABLE public.patient_surveys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to view patient surveys" ON public.patient_surveys FOR SELECT USING (auth.role() = 'authenticated');

ALTER TABLE public.education_materials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to view education materials" ON public.education_materials FOR SELECT USING (auth.role() = 'authenticated');

ALTER TABLE public.patient_education_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to view patient education log" ON public.patient_education_log FOR SELECT USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX ON public.accreditations (status);
CREATE INDEX ON public.compliance_areas (status);
CREATE INDEX ON public.risk_assessments (status);
CREATE INDEX ON public.quality_improvement_initiatives (status);
CREATE INDEX ON public.patient_surveys (survey_date);
CREATE INDEX ON public.education_materials (topic);
CREATE INDEX ON public.patient_education_log (patient_id);
CREATE INDEX ON public.patient_education_log (material_id);
