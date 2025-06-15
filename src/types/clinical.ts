
export interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  created_at: string;
  updated_at: string;
}

export interface Encounter {
  id: string;
  start_date: string;
  stop_date?: string;
  patient_id: string;
  encounter_class?: string;
  description?: string;
  total_claim_cost?: number;
  payer_coverage?: number;
  reason_description?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
}

export interface Allergy {
  id: string;
  start_date: string;
  patient_id: string;
  encounter_id: string;
  description?: string;
  code?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  encounter?: Encounter;
}

export interface CarePlan {
  id: string;
  start_date: string;
  stop_date?: string;
  patient_id: string;
  encounter_id: string;
  description?: string;
  reason_description?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  encounter?: Encounter;
}

export interface Condition {
  id: string;
  start_date: string;
  stop_date?: string;
  patient_id: string;
  encounter_id: string;
  description?: string;
  code?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  encounter?: Encounter;
}

export interface Device {
  id: string;
  start_date: string;
  patient_id: string;
  encounter_id: string;
  description?: string;
  code?: string;
  udi?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  encounter?: Encounter;
}

export type ClinicalDataType = 'allergies' | 'careplans' | 'conditions' | 'devices' | 'encounters';
