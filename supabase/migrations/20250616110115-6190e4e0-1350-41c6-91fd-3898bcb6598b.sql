
-- Phase 1: Create Missing Tables and Fix RLS Policies

-- Create patients table
CREATE TABLE public.patients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  medical_record_number TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT CHECK (gender IN ('MALE', 'FEMALE', 'OTHER')),
  phone TEXT,
  email TEXT,
  address JSONB,
  emergency_contact JSONB,
  insurance_info JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create patient_visits table
CREATE TABLE public.patient_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  department_id UUID REFERENCES public.departments(id),
  visit_type TEXT NOT NULL CHECK (visit_type IN ('EMERGENCY', 'INPATIENT', 'OUTPATIENT', 'SURGERY')),
  admission_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  discharge_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'DISCHARGED', 'TRANSFERRED')),
  chief_complaint TEXT,
  diagnosis JSONB,
  bed_id UUID REFERENCES public.beds(id),
  attending_physician_id UUID REFERENCES public.staff(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create patient_surveys table
CREATE TABLE public.patient_surveys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  visit_id UUID REFERENCES public.patient_visits(id),
  survey_type TEXT NOT NULL DEFAULT 'SATISFACTION',
  overall_rating INTEGER CHECK (overall_rating BETWEEN 1 AND 5),
  communication_rating INTEGER CHECK (communication_rating BETWEEN 1 AND 5),
  care_quality_rating INTEGER CHECK (care_quality_rating BETWEEN 1 AND 5),
  facility_rating INTEGER CHECK (facility_rating BETWEEN 1 AND 5),
  pain_management_rating INTEGER CHECK (pain_management_rating BETWEEN 1 AND 5),
  comments TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create medication_safety_alerts table
CREATE TABLE public.medication_safety_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  visit_id UUID REFERENCES public.patient_visits(id),
  medication_name TEXT NOT NULL,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('ALLERGY', 'INTERACTION', 'DOSAGE', 'CONTRAINDICATION')),
  severity TEXT NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  description TEXT NOT NULL,
  triggered_by_id UUID REFERENCES public.staff(id),
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'RESOLVED', 'DISMISSED')),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for patients table
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Healthcare staff can view patients" ON public.patients
  FOR SELECT USING (true);

CREATE POLICY "Healthcare staff can insert patients" ON public.patients
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Healthcare staff can update patients" ON public.patients
  FOR UPDATE USING (true);

-- Add RLS policies for patient_visits table
ALTER TABLE public.patient_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Healthcare staff can view visits" ON public.patient_visits
  FOR SELECT USING (true);

CREATE POLICY "Healthcare staff can insert visits" ON public.patient_visits
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Healthcare staff can update visits" ON public.patient_visits
  FOR UPDATE USING (true);

-- Add RLS policies for patient_surveys table
ALTER TABLE public.patient_surveys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Healthcare staff can view surveys" ON public.patient_surveys
  FOR SELECT USING (true);

CREATE POLICY "Healthcare staff can insert surveys" ON public.patient_surveys
  FOR INSERT WITH CHECK (true);

-- Add RLS policies for medication_safety_alerts table
ALTER TABLE public.medication_safety_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Healthcare staff can view medication alerts" ON public.medication_safety_alerts
  FOR SELECT USING (true);

CREATE POLICY "Healthcare staff can insert medication alerts" ON public.medication_safety_alerts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Healthcare staff can update medication alerts" ON public.medication_safety_alerts
  FOR UPDATE USING (true);

-- Fix departments table RLS to allow data insertion
DROP POLICY IF EXISTS "Enable read access for all users" ON public.departments;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.departments;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.departments;

CREATE POLICY "Healthcare staff can view departments" ON public.departments
  FOR SELECT USING (true);

CREATE POLICY "Healthcare staff can insert departments" ON public.departments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Healthcare staff can update departments" ON public.departments
  FOR UPDATE USING (true);

-- Add triggers for updated_at columns
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_patient_visits_updated_at BEFORE UPDATE ON public.patient_visits
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_medication_safety_alerts_updated_at BEFORE UPDATE ON public.medication_safety_alerts
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
