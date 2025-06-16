
import { supabase } from '@/integrations/supabase/client';

export interface IntegratedData {
  beds: any[];
  staff: any[];
  equipment: any[];
  departments: any[];
}

class DataIntegrationService {
  async fetchIntegratedData(): Promise<IntegratedData> {
    try {
      console.log('Fetching integrated hospital data...');

      const [bedsData, staffData, equipmentData, departmentsData] = await Promise.all([
        supabase.from('beds').select('*').is('deleted_at', null),
        supabase.from('staff').select('*').eq('is_active', true),
        supabase.from('equipment').select('*'),
        supabase.from('departments').select('*').eq('is_active', true)
      ]);

      return {
        beds: bedsData.data || [],
        staff: staffData.data || [],
        equipment: equipmentData.data || [],
        departments: departmentsData.data || []
      };
    } catch (error) {
      console.error('Error fetching integrated data:', error);
      return {
        beds: [],
        staff: [],
        equipment: [],
        departments: []
      };
    }
  }

  async getPatientMetrics() {
    try {
      // Use beds table to get patient metrics instead of non-existent patients table
      const { data: beds } = await supabase
        .from('beds')
        .select('*')
        .not('patient_id', 'is', null);

      const totalPatients = beds?.length || 0;
      return {
        totalPatients,
        activePatients: totalPatients,
        dischargedToday: 0
      };
    } catch (error) {
      console.error('Error getting patient metrics:', error);
      return {
        totalPatients: 0,
        activePatients: 0,
        dischargedToday: 0
      };
    }
  }

  async getVisitMetrics() {
    try {
      // Use wait_times instead of patient_visits
      const { data: waitTimes } = await supabase
        .from('wait_times')
        .select('*')
        .gte('arrival_time', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      return {
        totalVisits: waitTimes?.length || 0,
        avgWaitTime: waitTimes?.reduce((sum, wt) => sum + (wt.total_wait_minutes || 0), 0) / (waitTimes?.length || 1) || 0,
        completedVisits: waitTimes?.filter(wt => wt.discharge_time).length || 0
      };
    } catch (error) {
      console.error('Error getting visit metrics:', error);
      return {
        totalVisits: 0,
        avgWaitTime: 0,
        completedVisits: 0
      };
    }
  }

  async processRealTimeUpdates() {
    try {
      const data = await this.fetchIntegratedData();
      console.log('Real-time data processed:', data);
      return data;
    } catch (error) {
      console.error('Error processing real-time updates:', error);
      throw error;
    }
  }
}

export const dataIntegrationService = new DataIntegrationService();
