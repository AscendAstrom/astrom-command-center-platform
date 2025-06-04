
import { supabase } from '@/integrations/supabase/client';
import { QualityData } from './types';

export class QualityMetricsService {
  async fetchQualityMetrics(): Promise<QualityData> {
    try {
      const [indicatorsData, measurementsData] = await Promise.all([
        supabase.from('quality_indicators').select('*').eq('is_active', true),
        supabase.from('quality_measurements').select('*').order('measurement_date', { ascending: false }).limit(10)
      ]);

      const indicators = indicatorsData.data || [];
      const measurements = measurementsData.data || [];

      // Calculate actual quality scores from real data
      const overallScore = measurements.length > 0 
        ? measurements.reduce((sum, m) => sum + Number(m.value), 0) / measurements.length 
        : 0;

      const patientSafetyScore = measurements
        .filter(m => m.indicator_id && indicators.find(i => i.id === m.indicator_id && i.category === 'patient_safety'))
        .reduce((sum, m, _, arr) => sum + Number(m.value) / (arr.length || 1), 0);

      const satisfactionScore = measurements
        .filter(m => m.indicator_id && indicators.find(i => i.id === m.indicator_id && i.category === 'satisfaction'))
        .reduce((sum, m, _, arr) => sum + Number(m.value) / (arr.length || 1), 0);

      const safetyScore = measurements
        .filter(m => m.indicator_id && indicators.find(i => i.id === m.indicator_id && i.category === 'safety'))
        .reduce((sum, m, _, arr) => sum + Number(m.value) / (arr.length || 1), 0);

      return {
        overallScore,
        patientSafety: patientSafetyScore,
        satisfaction: satisfactionScore,
        safety: safetyScore,
        incidents: 0, // This would come from incidents table if available
        accreditations: [],
        complianceAreas: [],
        upcomingActivities: [],
        totalAccreditations: 0,
        activeCompliance: 0,
        daysToExpiry: 0,
        upcomingActivitiesCount: 0
      };
    } catch (error) {
      console.error('Error fetching quality metrics:', error);
      return {
        overallScore: 0,
        patientSafety: 0,
        satisfaction: 0,
        safety: 0,
        incidents: 0,
        accreditations: [],
        complianceAreas: [],
        upcomingActivities: [],
        totalAccreditations: 0,
        activeCompliance: 0,
        daysToExpiry: 0,
        upcomingActivitiesCount: 0
      };
    }
  }
}

export const qualityMetricsService = new QualityMetricsService();
