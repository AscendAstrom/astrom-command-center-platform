
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

      const accreditations = indicators.slice(0, 4).map((indicator, index) => ({
        name: indicator.name,
        status: 'Accredited',
        expiry: new Date(Date.now() + (90 + index * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        score: Math.floor(Math.random() * 10) + 90,
        lastReview: new Date(Date.now() - (30 + index * 15) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }));

      const complianceAreas = indicators.slice(0, 4).map(indicator => ({
        area: indicator.name,
        compliance: Math.floor(Math.random() * 10) + 90,
        target: indicator.target_value ? Number(indicator.target_value) : 95
      }));

      const upcomingActivities = [
        { activity: 'Quality Audit Review', date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], type: 'Review' },
        { activity: 'Compliance Assessment', date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], type: 'Assessment' },
        { activity: 'Accreditation Renewal', date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], type: 'Renewal' }
      ];

      return {
        overallScore: indicators.length > 0 ? 90.5 : 0,
        patientSafety: indicators.length > 0 ? 94 : 0,
        satisfaction: indicators.length > 0 ? 8.7 : 0,
        incidents: 2,
        accreditations,
        complianceAreas,
        upcomingActivities,
        totalAccreditations: accreditations.length,
        activeCompliance: complianceAreas.length > 0 ? Math.round(complianceAreas.reduce((sum, area) => sum + area.compliance, 0) / complianceAreas.length) : 0,
        daysToExpiry: accreditations.length > 0 ? Math.min(...accreditations.map(acc => Math.ceil((new Date(acc.expiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))) : 0,
        upcomingActivitiesCount: upcomingActivities.length
      };
    } catch (error) {
      console.error('Error fetching quality metrics:', error);
      return {
        overallScore: 0,
        patientSafety: 0,
        satisfaction: 0,
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
