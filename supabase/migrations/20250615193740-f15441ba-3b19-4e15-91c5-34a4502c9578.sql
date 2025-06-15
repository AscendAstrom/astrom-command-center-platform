
DO $$
BEGIN
  -- Attempt to add values to the department_type enum, ignoring if they already exist.
  BEGIN
    ALTER TYPE public.department_type ADD VALUE 'EMERGENCY';
  EXCEPTION
    WHEN duplicate_object THEN RAISE NOTICE 'Value "EMERGENCY" already exists in enum "department_type", skipping.';
  END;
  BEGIN
    ALTER TYPE public.department_type ADD VALUE 'CARDIOLOGY';
  EXCEPTION
    WHEN duplicate_object THEN RAISE NOTICE 'Value "CARDIOLOGY" already exists in enum "department_type", skipping.';
  END;
  BEGIN
    ALTER TYPE public.department_type ADD VALUE 'NEUROLOGY';
  EXCEPTION
    WHEN duplicate_object THEN RAISE NOTICE 'Value "NEUROLOGY" already exists in enum "department_type", skipping.';
  END;
  BEGIN
    ALTER TYPE public.department_type ADD VALUE 'ORTHOPEDICS';
  EXCEPTION
    WHEN duplicate_object THEN RAISE NOTICE 'Value "ORTHOPEDICS" already exists in enum "department_type", skipping.';
  END;
  BEGIN
    ALTER TYPE public.department_type ADD VALUE 'RADIOLOGY';
  EXCEPTION
    WHEN duplicate_object THEN RAISE NOTICE 'Value "RADIOLOGY" already exists in enum "department_type", skipping.';
  END;
  BEGIN
    ALTER TYPE public.department_type ADD VALUE 'SURGERY';
  EXCEPTION
    WHEN duplicate_object THEN RAISE NOTICE 'Value "SURGERY" already exists in enum "department_type", skipping.';
  END;
END;
$$;
