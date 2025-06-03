
import { supabase } from '@/integrations/supabase/client';

export interface SystemMetric {
  id: string;
  metric_name: string;
  metric_value: number;
  metric_unit?: string;
  department_id?: string;
  timestamp: string;
  metadata?: any;
}

export class SystemMetricsService {
  async getLatestMetrics(): Promise<Record<string, number>> {
    try {
      const { data, error } = await supabase
        .from('system_metrics')
        .select('metric_name, metric_value')
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('Error fetching system metrics:', error);
        return {};
      }

      // Get the latest value for each metric
      const latestMetrics: Record<string, number> = {};
      const seenMetrics = new Set<string>();

      for (const metric of data || []) {
        if (!seenMetrics.has(metric.metric_name)) {
          latestMetrics[metric.metric_name] = metric.metric_value;
          seenMetrics.add(metric.metric_name);
        }
      }

      return latestMetrics;
    } catch (error) {
      console.error('Error fetching system metrics:', error);
      return {};
    }
  }

  async recordMetric(
    metricName: string, 
    value: number, 
    unit?: string, 
    departmentId?: string,
    metadata?: any
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('system_metrics')
        .insert({
          metric_name: metricName,
          metric_value: value,
          metric_unit: unit,
          department_id: departmentId,
          metadata: metadata || {},
          timestamp: new Date().toISOString()
        });

      if (error) {
        console.error('Error recording metric:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error recording metric:', error);
      return false;
    }
  }

  async getMetricHistory(metricName: string, hours = 24): Promise<SystemMetric[]> {
    try {
      const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

      const { data, error } = await supabase
        .from('system_metrics')
        .select('*')
        .eq('metric_name', metricName)
        .gte('timestamp', since)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching metric history:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching metric history:', error);
      return [];
    }
  }
}

export const systemMetricsService = new SystemMetricsService();
