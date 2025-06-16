
import { supabase } from '@/integrations/supabase/client';
import { ClinicalRecord, PatientData, ClinicalMetrics } from '@/types/clinical';

export class ClinicalDataService {
  async getClinicalRecords(): Promise<ClinicalRecord[]> {
    try {
      // Use medical_records table instead of non-existent clinical tables
      const { data: records } = await supabase
        .from('medical_records')
        .select('*')
        .limit(100);

      return records?.map(record => ({
        id: record.id,
        patientId: record.patient_id,
        type: record.record_type,
        data: record.content,
        createdAt: record.created_at
      })) || [];
    } catch (error) {
      console.error('Error fetching clinical records:', error);
      return [];
    }
  }

  async getPatientData(): Promise<PatientData[]> {
    try {
      // Use beds table to get patient info instead of non-existent patients table
      const { data: beds } = await supabase
        .from('beds')
        .select('*')
        .not('patient_id', 'is', null);

      return beds?.map(bed => ({
        id: bed.patient_id || '',
        name: `Patient ${bed.bed_number}`,
        status: bed.status || 'UNKNOWN',
        admissionDate: bed.updated_at
      })) || [];
    } catch (error) {
      console.error('Error fetching patient data:', error);
      return [];
    }
  }

  async getClinicalMetrics(): Promise<ClinicalMetrics> {
    try {
      const [records, patients] = await Promise.all([
        this.getClinicalRecords(),
        this.getPatientData()
      ]);

      return {
        totalRecords: records.length,
        activePatients: patients.length,
        recentActivity: records.filter(r => 
          new Date(r.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)
        ).length
      };
    } catch (error) {
      console.error('Error fetching clinical metrics:', error);
      return {
        totalRecords: 0,
        activePatients: 0,
        recentActivity: 0
      };
    }
  }
}

export const clinicalDataService = new ClinicalDataService();
