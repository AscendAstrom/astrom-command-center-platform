
import { supabase } from '@/integrations/supabase/client';

export interface IntegratedSystemMetrics {
  connectedSources: number;
  dataQuality: number;
  activeIngestions: number;
  activePipelines: number;
  dataModels: number;
  schemaValidation: number;
  activeKPIs: number;
  slaCompliance: number;
  alertsTriggered: number;
  automationRules: number;
  workflowExecutions: number;
  aiDecisions: number;
}

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

  async fetchSystemOverview(): Promise<IntegratedSystemMetrics> {
    try {
      console.log('Fetching system overview...');
      const data = await this.fetchAllData();
      
      return {
        connectedSources: data.departments.length,
        dataQuality: 95,
        activeIngestions: data.beds.length,
        activePipelines: 3,
        dataModels: 5,
        schemaValidation: 98,
        activeKPIs: 12,
        slaCompliance: 94,
        alertsTriggered: 2,
        automationRules: 8,
        workflowExecutions: 45,
        aiDecisions: 23
      };
    } catch (error) {
      console.error('Error fetching system overview:', error);
      return {
        connectedSources: 0,
        dataQuality: 0,
        activeIngestions: 0,
        activePipelines: 0,
        dataModels: 0,
        schemaValidation: 0,
        activeKPIs: 0,
        slaCompliance: 0,
        alertsTriggered: 0,
        automationRules: 0,
        workflowExecutions: 0,
        aiDecisions: 0
      };
    }
  }

  async initializeFullSystemIntegration() {
    try {
      console.log('Initializing full system integration...');
      const data = await this.fetchAllData();
      return data;
    } catch (error) {
      console.error('Error initializing full system integration:', error);
      throw error;
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
