
import { supabase } from '@/integrations/supabase/client';

export class PatientMetricsService {
  async fetchPatientMetrics() {
    try {
      const [patientsData, visitsData, waitTimesData] = await Promise.all([
        supabase.from('patients').select('*'),
        supabase.from('patient_visits').select('*'),
        supabase.from('wait_times').select('*')
      ]);

      const patients = patientsData.data || [];
      const visits = visitsData.data || [];
      const waitTimes = waitTimesData.data || [];

      const activePatients = patients.filter(p => p.status === 'ACTIVE').length;
      const edPatients = visits.filter(v => v.status === 'ACTIVE').length;
      const criticalPatients = activePatients;

      // Calculate average wait time
      const currentWaitTimes = waitTimes.filter(wt => !wt.discharge_time);
      const avgWaitTime = currentWaitTimes.length > 0 
        ? Math.round(currentWaitTimes.reduce((sum, wt) => sum + (wt.total_wait_minutes || 0), 0) / currentWaitTimes.length)
        : 0;

      return {
        activePatients,
        edPatients,
        criticalPatients,
        avgWaitTime,
        triageQueue: currentWaitTimes.length
      };
    } catch (error) {
      console.error('Error fetching patient metrics:', error);
      return {
        activePatients: 0,
        edPatients: 0,
        criticalPatients: 0,
        avgWaitTime: 0,
        triageQueue: 0
      };
    }
  }
}

export const patientMetricsService = new PatientMetricsService();
