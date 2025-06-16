
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
      
      // Clear all operational data
      const tables = [
        'workflow_executions', 'automation_rules', 'ml_models', 'ml_training_jobs',
        'surge_predictions', 'data_sources', 'data_pipelines', 'data_quality_scores',
        'vision_tasks', 'alerts', 'beds', 'departments', 'equipment', 'staff_schedules',
        'budget_allocations', 'billing_transactions', 'insurance_claims', 'wait_times',
        'slas', 'kpis', 'metrics_snapshots', 'quality_indicators', 'audit_logs'
      ];

      for (const table of tables) {
        const { error } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
        if (error) {
          console.error(`Error clearing ${table}:`, error);
        }
      }

      console.log('All data cleared successfully');
      return { success: true };
    } catch (error) {
      console.error('Failed to clear data:', error);
      throw error;
    }
  }

  async checkDataStatus() {
    try {
      const [
        { count: bedsCount },
        { count: staffCount },
        { count: departmentsCount },
        { count: equipmentCount }
      ] = await Promise.all([
        supabase.from('beds').select('*', { count: 'exact', head: true }),
        supabase.from('staff_schedules').select('*', { count: 'exact', head: true }),
        supabase.from('departments').select('*', { count: 'exact', head: true }),
        supabase.from('equipment').select('*', { count: 'exact', head: true })
      ]);

      return {
        beds: bedsCount || 0,
        staff: staffCount || 0,
        departments: departmentsCount || 0,
        equipment: equipmentCount || 0,
        isPopulated: (bedsCount || 0) > 0 && (departmentsCount || 0) > 0,
        isEmpty: (bedsCount || 0) === 0 && (departmentsCount || 0) === 0
      };
    } catch (error) {
      console.error('Error checking data status:', error);
      return {
        beds: 0,
        staff: 0,
        departments: 0,
        equipment: 0,
        isPopulated: false,
        isEmpty: true
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
        equipment: status.equipment
      }
    };
  }
}

export const dataPopulationService = new DataPopulationService();
