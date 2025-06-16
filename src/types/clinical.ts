
// Clinical data types for legacy compatibility
export interface ClinicalRecord {
  id: string;
  patientId: string;
  type: string;
  data: any;
  createdAt: string;
}

export interface PatientData {
  id: string;
  name: string;
  status: string;
  admissionDate: string;
}

export interface ClinicalMetrics {
  totalRecords: number;
  activePatients: number;
  recentActivity: number;
}
