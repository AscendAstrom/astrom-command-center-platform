
import { supabase } from '@/integrations/supabase/client';

export class ClinicalMetricsService {
  async fetchClinicalMetrics() {
    try {
      // Since clinical tables were removed, return mock data
      console.log('Clinical tables not available - returning mock data');
      
      return {
        surgeries: {
          total: 0,
          scheduled: 0,
          completed: 0,
          avgDuration: 0
        },
        vitals: {
          monitored: 0,
          critical: 0,
          abnormal: 0
        },
        medications: {
          adherence: 0,
          criticalMeds: 0,
          missedDoses: 0
        },
        labs: {
          totalTests: 0,
          avgTurnaround: 0,
          criticalAlerts: 0
        }
      };
    } catch (error) {
      console.error('Error fetching clinical metrics:', error);
      return {
        surgeries: {
          total: 0,
          scheduled: 0,
          completed: 0,
          avgDuration: 0
        },
        vitals: {
          monitored: 0,
          critical: 0,
          abnormal: 0
        },
        medications: {
          adherence: 0,
          criticalMeds: 0,
          missedDoses: 0
        },
        labs: {
          totalTests: 0,
          avgTurnaround: 0,
          criticalAlerts: 0
        }
      };
    }
  }
}

export const clinicalMetricsService = new ClinicalMetricsService();
