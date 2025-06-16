
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

  async clearAllData() {
    try {
      console.log('Clearing all hospital data...');
      
      // Clear specific tables individually to avoid TypeScript errors
      await Promise.all([
        supabase.from('beds').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('departments').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('equipment').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('staff_schedules').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('alerts').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('budget_allocations').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('billing_transactions').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('insurance_claims').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('wait_times').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('slas').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('kpis').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('quality_indicators').delete().neq('id', '00000000-0000-0000-0000-000000000000'),
        supabase.from('audit_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000')
      ]);

      console.log('All data cleared successfully');
      return { success: true };
    } catch (error) {
      console.error('Failed to clear data:', error);
      throw error;
    }
  }

  async checkDataStatus() {
    try {
      // Check multiple key tables to determine if system has data
      const [
        { count: bedsCount },
        { count: staffCount },
        { count: departmentsCount },
        { count: equipmentCount },
        { count: patientsCount },
        { count: alertsCount }
      ] = await Promise.all([
        supabase.from('beds').select('*', { count: 'exact', head: true }),
        supabase.from('staff_schedules').select('*', { count: 'exact', head: true }),
        supabase.from('departments').select('*', { count: 'exact', head: true }),
        supabase.from('equipment').select('*', { count: 'exact', head: true }),
        supabase.from('patients').select('*', { count: 'exact', head: true }),
        supabase.from('alerts').select('*', { count: 'exact', head: true })
      ]);

      const totalRecords = (bedsCount || 0) + (staffCount || 0) + (departmentsCount || 0) + 
                          (equipmentCount || 0) + (patientsCount || 0) + (alertsCount || 0);

      const isEmpty = totalRecords === 0;
      const isPopulated = totalRecords > 0;

      console.log('Data status check:', {
        beds: bedsCount || 0,
        staff: staffCount || 0,
        departments: departmentsCount || 0,
        equipment: equipmentCount || 0,
        patients: patientsCount || 0,
        alerts: alertsCount || 0,
        totalRecords,
        isEmpty,
        isPopulated
      });

      return {
        beds: bedsCount || 0,
        staff: staffCount || 0,
        departments: departmentsCount || 0,
        equipment: equipmentCount || 0,
        patients: patientsCount || 0,
        alerts: alertsCount || 0,
        totalRecords,
        isPopulated,
        isEmpty
      };
    } catch (error) {
      console.error('Error checking data status:', error);
      return {
        beds: 0,
        staff: 0,
        departments: 0,
        equipment: 0,
        patients: 0,
        alerts: 0,
        totalRecords: 0,
        isPopulated: false,
        isEmpty: true
      };
    }
  }

  async ensureDataExists() {
    const status = await this.checkDataStatus();
    
    if (status.isEmpty) {
      console.log('No data found, populating initial data...');
      await this.populateInitialData();
      return true;
    }
    
    console.log('Data already exists:', status);
    return false;
  }

  async getDataSummary() {
    const status = await this.checkDataStatus();
    
    if (status.isEmpty) {
      return {
        message: "Hospital system is in a clean state - no operational data present",
        status: "empty",
        recommendations: [
          "Initialize with sample data to begin operations",
          "Configure departments and bed allocations",
          "Set up staff schedules and equipment inventory"
        ]
      };
    }
    
    return {
      message: "Hospital system contains operational data",
      status: "populated",
      summary: {
        beds: status.beds,
        departments: status.departments,
        staff: status.staff,
        equipment: status.equipment,
        patients: status.patients,
        alerts: status.alerts,
        totalRecords: status.totalRecords
      }
    };
  }
}

export const dataPopulationService = new DataPopulationService();
