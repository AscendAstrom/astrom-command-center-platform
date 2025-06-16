
import { supabase } from '@/integrations/supabase/client';

export interface CrossModuleData {
  workflows: any[];
  analytics: any[];
  qualityMetrics: any[];
  predictions: any[];
  astroScan?: any[];
  astroBricks?: any[];
  astroMetrics?: any[];
  astroFlow?: any[];
}

class CrossModuleIntegrationService {
  async integrateWorkflowData() {
    try {
      const { data: workflows } = await supabase
        .from('workflows')
        .select('*')
        .eq('status', 'ACTIVE');

      return workflows || [];
    } catch (error) {
      console.error('Error integrating workflow data:', error);
      return [];
    }
  }

  async integrateAnalyticsData() {
    try {
      const { data: metrics } = await supabase
        .from('metrics_snapshots')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);

      return metrics || [];
    } catch (error) {
      console.error('Error integrating analytics data:', error);
      return [];
    }
  }

  async integrateQualityMetrics() {
    try {
      const { data: quality } = await supabase
        .from('quality_measurements')
        .select('*')
        .order('measurement_date', { ascending: false })
        .limit(50);

      return quality || [];
    } catch (error) {
      console.error('Error integrating quality metrics:', error);
      return [];
    }
  }

  async integratePredictiveData() {
    try {
      const { data: predictions } = await supabase
        .from('surge_predictions')
        .select('*')
        .order('prediction_datetime', { ascending: false })
        .limit(50);

      return predictions || [];
    } catch (error) {
      console.error('Error integrating predictive data:', error);
      return [];
    }
  }

  async initializeIntegratedSystem() {
    try {
      console.log('Initializing integrated system...');
      const data = await this.getCrossModuleData();
      return data;
    } catch (error) {
      console.error('Error initializing integrated system:', error);
      throw error;
    }
  }

  async validateCrossModuleConnections() {
    try {
      console.log('Validating cross-module connections...');
      // Mock validation for now
      return {
        astroScan: { status: 'connected', health: 95 },
        astroBricks: { status: 'connected', health: 92 },
        astroMetrics: { status: 'connected', health: 98 },
        astroFlow: { status: 'connected', health: 89 }
      };
    } catch (error) {
      console.error('Error validating connections:', error);
      return {
        astroScan: { status: 'error', health: 0 },
        astroBricks: { status: 'error', health: 0 },
        astroMetrics: { status: 'error', health: 0 },
        astroFlow: { status: 'error', health: 0 }
      };
    }
  }

  async getCrossModuleData(): Promise<CrossModuleData> {
    try {
      const [workflows, analytics, qualityMetrics, predictions] = await Promise.all([
        this.integrateWorkflowData(),
        this.integrateAnalyticsData(),
        this.integrateQualityMetrics(),
        this.integratePredictiveData()
      ]);

      return {
        workflows,
        analytics,
        qualityMetrics,
        predictions,
        astroScan: [], // Mock data for astro modules
        astroBricks: [],
        astroMetrics: [],
        astroFlow: []
      };
    } catch (error) {
      console.error('Error getting cross-module data:', error);
      return {
        workflows: [],
        analytics: [],
        qualityMetrics: [],
        predictions: [],
        astroScan: [],
        astroBricks: [],
        astroMetrics: [],
        astroFlow: []
      };
    }
  }

  async syncAcrossModules() {
    try {
      const data = await this.getCrossModuleData();
      console.log('Cross-module sync completed:', data);
      return data;
    } catch (error) {
      console.error('Error syncing across modules:', error);
      throw error;
    }
  }

  // Legacy method for compatibility - remove references to non-existent tables
  async getPatientVisitMetrics() {
    try {
      // Use wait_times instead of patient_visits
      const { data: waitTimes } = await supabase
        .from('wait_times')
        .select('*')
        .order('arrival_time', { ascending: false })
        .limit(100);

      return waitTimes || [];
    } catch (error) {
      console.error('Error getting patient visit metrics:', error);
      return [];
    }
  }
}

export const crossModuleIntegrationService = new CrossModuleIntegrationService();
