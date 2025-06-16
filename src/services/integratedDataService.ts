
import { supabase } from '@/integrations/supabase/client';

export class IntegratedDataService {
  async fetchAllData() {
    try {
      console.log('Fetching all integrated data...');
      
      const [
        { data: beds },
        { data: staff },
        { data: departments },
        { data: equipment },
        { data: waitTimes }
      ] = await Promise.all([
        supabase.from('beds').select('*').is('deleted_at', null),
        supabase.from('staff').select('*').eq('is_active', true),
        supabase.from('departments').select('*').eq('is_active', true),
        supabase.from('equipment').select('*'),
        supabase.from('wait_times').select('*').gte('arrival_time', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      ]);

      return {
        beds: beds || [],
        staff: staff || [],
        departments: departments || [],
        equipment: equipment || [],
        waitTimes: waitTimes || [],
        summary: {
          totalBeds: beds?.length || 0,
          occupiedBeds: beds?.filter(b => b.status === 'OCCUPIED').length || 0,
          activeStaff: staff?.length || 0,
          avgWaitTime: waitTimes?.reduce((sum, wt) => sum + (wt.total_wait_minutes || 0), 0) / (waitTimes?.length || 1) || 0
        }
      };
    } catch (error) {
      console.error('Error fetching integrated data:', error);
      return {
        beds: [],
        staff: [],
        departments: [],
        equipment: [],
        waitTimes: [],
        summary: {
          totalBeds: 0,
          occupiedBeds: 0,
          activeStaff: 0,
          avgWaitTime: 0
        }
      };
    }
  }

  async getPatientVisitData() {
    try {
      // Use wait_times instead of patient_visits table
      const { data: visits } = await supabase
        .from('wait_times')
        .select('*')
        .order('arrival_time', { ascending: false })
        .limit(100);

      return visits || [];
    } catch (error) {
      console.error('Error getting patient visit data:', error);
      return [];
    }
  }

  async getRealtimeUpdates() {
    try {
      const data = await this.fetchAllData();
      return data;
    } catch (error) {
      console.error('Error getting realtime updates:', error);
      throw error;
    }
  }
}

export const integratedDataService = new IntegratedDataService();
