
-- ENUMS for financial data
CREATE TYPE public.billing_status AS ENUM ('DRAFT', 'BILLED', 'PAID', 'PARTIALLY_PAID', 'VOID', 'WRITEOFF');
CREATE TYPE public.claim_status AS ENUM ('SUBMITTED', 'PENDING', 'APPROVED', 'DENIED', 'APPEALED', 'PAID');
CREATE TYPE public.transaction_type AS ENUM ('CHARGE', 'PAYMENT', 'ADJUSTMENT', 'REFUND');
CREATE TYPE public.denial_reason_code AS ENUM ('CODING_ERROR', 'PRIOR_AUTH', 'NOT_COVERED', 'DUPLICATE_CLAIM', 'MEDICAL_NECESSITY', 'PATIENT_INELIGIBLE', 'OTHER');
CREATE TYPE public.appeal_status AS ENUM ('NONE', 'IN_PROGRESS', 'SUCCESSFUL', 'UNSUCCESSFUL');

-- Table for billing transactions
CREATE TABLE public.billing_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visit_id UUID REFERENCES public.patient_visits(id) ON DELETE SET NULL,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    transaction_type transaction_type NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    status billing_status NOT NULL DEFAULT 'DRAFT',
    transaction_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp_billing_transactions
BEFORE UPDATE ON public.billing_transactions
FOR EACH ROW
EXECUTE PROCEDURE public.update_updated_at_column();

-- Table for insurance claims
CREATE TABLE public.insurance_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visit_id UUID NOT NULL REFERENCES public.patient_visits(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    insurer_name TEXT NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    paid_amount NUMERIC(10, 2) DEFAULT 0.00,
    status claim_status NOT NULL DEFAULT 'SUBMITTED',
    submission_date TIMESTAMPTZ DEFAULT now(),
    resolution_date TIMESTAMPTZ,
    processing_time_days INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_timestamp_insurance_claims
BEFORE UPDATE ON public.insurance_claims
FOR EACH ROW
EXECUTE PROCEDURE public.update_updated_at_column();

-- Table for claim denials
CREATE TABLE public.claim_denials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    claim_id UUID NOT NULL REFERENCES public.insurance_claims(id) ON DELETE CASCADE,
    denial_reason denial_reason_code NOT NULL,
    denial_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    appeal_status appeal_status DEFAULT 'NONE',
    details TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Row Level Security
ALTER TABLE public.billing_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to manage billing" ON public.billing_transactions FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE public.insurance_claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to manage claims" ON public.insurance_claims FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE public.claim_denials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated users to manage denials" ON public.claim_denials FOR ALL USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX ON public.billing_transactions (visit_id);
CREATE INDEX ON public.billing_transactions (patient_id);
CREATE INDEX ON public.billing_transactions (status);
CREATE INDEX ON public.insurance_claims (visit_id);
CREATE INDEX ON public.insurance_claims (patient_id);
CREATE INDEX ON public.insurance_claims (status);
CREATE INDEX ON public.claim_denials (claim_id);
