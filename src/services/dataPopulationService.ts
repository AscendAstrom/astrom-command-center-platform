
import { supabase } from '@/integrations/supabase/client';

class DataPopulationService {
  async populateInitialData() {
    try {
      console.log('Populating initial hospital data...');
      
      const { data, error } = await supabase.functions.invoke('generate-operational-data', {
        body: { action: 'populate_all' }
      });

      if (error) {
        console.error('Error populating data:', error);
        throw error;
      }

      console.log('Initial data populated successfully:', data);
      return data;
    } catch (error) {
      console.error('Failed to populate initial data:', error);
      throw error;
    }
  }

  async checkDataStatus() {
    try {
      const [
        { count: patientsCount },
        { count: bedsCount },
        { count: staffCount },
        { count: departmentsCount }
      ] = await Promise.all([
        supabase.from('patients').select('*', { count: 'exact', head: true }),
        supabase.from('beds').select('*', { count: 'exact', head: true }),
        supabase.from('staff').select('*', { count: 'exact', head: true }),
        supabase.from('departments').select('*', { count: 'exact', head: true })
      ]);

      return {
        patients: patientsCount || 0,
        beds: bedsCount || 0,
        staff: staffCount || 0,
        departments: departmentsCount || 0,
        isPopulated: (patientsCount || 0) > 0 && (bedsCount || 0) > 0
      };
    } catch (error) {
      console.error('Error checking data status:', error);
      return {
        patients: 0,
        beds: 0,
        staff: 0,
        departments: 0,
        isPopulated: false
      };
    }
  }

  async ensureDataExists() {
    const status = await this.checkDataStatus();
    
    if (!status.isPopulated) {
      console.log('No data found, populating initial data...');
      await this.populateInitialData();
      return true;
    }
    
    console.log('Data already exists:', status);
    return false;
  }
}

export const dataPopulationService = new DataPopulationService();
