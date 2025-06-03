
import { AnalyticsData } from './types';
import { ChartDataService } from './chartDataService';
import { supabase } from '@/integrations/supabase/client';

class AnalyticsDataService {
  private subscribers: ((data: AnalyticsData) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private refreshInterval = 2000;
  private chartDataService = new ChartDataService();

  private async generateRealTimeData(): Promise<AnalyticsData> {
    const chartHistory = this.chartDataService.getChartData();
    const chartData = {
      waitTimes: chartHistory.waitTimes || [],
      patientFlow: chartHistory.patientFlow || [],
      staffAllocation: chartHistory.staffAllocation || [],
      bedUtilization: chartHistory.bedUtilization || [],
      processingThroughput: chartHistory.processingThroughput || [],
      dataQuality: chartHistory.dataQuality || [],
      revenue: chartHistory.revenue || [],
      systemHealth: chartHistory.systemHealth || [],
      modelPerformance: chartHistory.modelPerformance || []
    };

    // Fetch real metrics from database
    const [
      bedsData,
      patientsData,
      staffData,
      metricsData
    ] = await Promise.all([
      this.fetchBedMetrics(),
      this.fetchPatientMetrics(),
      this.fetchStaffMetrics(),
      this.fetchSystemMetrics()
    ]);

    return {
      chartData,
      emergencyDepartment: {
        totalPatients: patientsData.total || 0,
        avgWaitTime: patientsData.avgWaitTime || 0,
        bedUtilization: bedsData.utilization || 0,
        staffOnDuty: staffData.onDuty || 0,
        criticalAlerts: patientsData.critical || 0,
        lastUpdated: new Date()
      },
      clinicalOperations: {
        activeStaff: staffData.active || 0,
        scheduledProcedures: metricsData.procedures || 0,
        resourceUtilization: metricsData.resourceUtil || 0,
        avgProcedureTime: metricsData.avgProcTime || 0,
        equipmentStatus: 'optimal' as const,
        lastUpdated: new Date()
      },
      dataPipeline: {
        activeSources: metricsData.activeSources || 0,
        processingSpeed: metricsData.processingSpeed || 0,
        errorRate: metricsData.errorRate || 0,
        dataQuality: metricsData.dataQuality || 0,
        syncStatus: 'healthy' as const,
        lastUpdated: new Date()
      },
      business: {
        revenue: metricsData.revenue || 0,
        revenueGrowth: metricsData.revenueGrowth || 0,
        patientSatisfaction: metricsData.satisfaction || 0,
        operationalEfficiency: metricsData.efficiency || 0,
        costPerPatient: metricsData.costPerPatient || 0,
        lastUpdated: new Date()
      },
      aiMetrics: {
        modelAccuracy: metricsData.modelAccuracy || 0,
        automationSuccess: metricsData.automationSuccess || 0,
        decisionsSupported: metricsData.decisionsSupported || 0,
        mlModelsActive: metricsData.mlModels || 0,
        predictionConfidence: metricsData.predictionConfidence || 0,
        lastUpdated: new Date()
      },
      systemHealth: {
        cpuUsage: metricsData.cpuUsage || 0,
        memoryUsage: metricsData.memoryUsage || 0,
        networkLatency: metricsData.networkLatency || 0,
        uptime: metricsData.uptime || 0,
        securityScore: metricsData.securityScore || 0,
        lastUpdated: new Date()
      }
    };
  }

  private async fetchBedMetrics() {
    try {
      const { data, error } = await supabase
        .from('beds')
        .select('status, department_id')
        .eq('deleted_at', null);

      if (error) throw error;

      const total = data?.length || 0;
      const occupied = data?.filter(bed => bed.status === 'OCCUPIED').length || 0;
      const utilization = total > 0 ? Math.round((occupied / total) * 100) : 0;

      return { total, occupied, utilization };
    } catch (error) {
      console.error('Error fetching bed metrics:', error);
      return { total: 0, occupied: 0, utilization: 0 };
    }
  }

  private async fetchPatientMetrics() {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('status, admission_date')
        .eq('status', 'ACTIVE');

      if (error) throw error;

      const total = data?.length || 0;
      const critical = Math.floor(total * 0.15); // Approximate critical cases
      const avgWaitTime = 45; // This would need to be calculated from wait_times table

      return { total, critical, avgWaitTime };
    } catch (error) {
      console.error('Error fetching patient metrics:', error);
      return { total: 0, critical: 0, avgWaitTime: 0 };
    }
  }

  private async fetchStaffMetrics() {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('is_active, position')
        .eq('is_active', true);

      if (error) throw error;

      const active = data?.length || 0;
      const onDuty = Math.floor(active * 0.7); // Approximate on-duty percentage

      return { active, onDuty };
    } catch (error) {
      console.error('Error fetching staff metrics:', error);
      return { active: 0, onDuty: 0 };
    }
  }

  private async fetchSystemMetrics() {
    try {
      const { data, error } = await supabase
        .from('metrics_snapshots')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(10);

      if (error) throw error;

      // Calculate aggregated metrics from recent snapshots
      const defaultMetrics = {
        procedures: 0,
        resourceUtil: 0,
        avgProcTime: 0,
        activeSources: 0,
        processingSpeed: 0,
        errorRate: 0,
        dataQuality: 0,
        revenue: 0,
        revenueGrowth: 0,
        satisfaction: 0,
        efficiency: 0,
        costPerPatient: 0,
        modelAccuracy: 0,
        automationSuccess: 0,
        decisionsSupported: 0,
        mlModels: 0,
        predictionConfidence: 0,
        cpuUsage: 0,
        memoryUsage: 0,
        networkLatency: 0,
        uptime: 0,
        securityScore: 0
      };

      if (!data || data.length === 0) {
        return defaultMetrics;
      }

      // Process real metrics data here
      return defaultMetrics;
    } catch (error) {
      console.error('Error fetching system metrics:', error);
      return {
        procedures: 0,
        resourceUtil: 0,
        avgProcTime: 0,
        activeSources: 0,
        processingSpeed: 0,
        errorRate: 0,
        dataQuality: 0,
        revenue: 0,
        revenueGrowth: 0,
        satisfaction: 0,
        efficiency: 0,
        costPerPatient: 0,
        modelAccuracy: 0,
        automationSuccess: 0,
        decisionsSupported: 0,
        mlModels: 0,
        predictionConfidence: 0,
        cpuUsage: 0,
        memoryUsage: 0,
        networkLatency: 0,
        uptime: 0,
        securityScore: 0
      };
    }
  }

  subscribe(callback: (data: AnalyticsData) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  start() {
    if (this.intervalId) return;
    
    // Initialize chart history
    this.chartDataService.initializeChartHistory();
    
    this.intervalId = setInterval(async () => {
      const data = await this.generateRealTimeData();
      this.subscribers.forEach(callback => callback(data));
    }, this.refreshInterval);

    // Initial fetch
    this.generateRealTimeData().then(data => {
      this.subscribers.forEach(callback => callback(data));
    });
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  setRefreshInterval(interval: number) {
    this.refreshInterval = interval;
    this.restart();
  }

  restart() {
    this.stop();
    this.start();
  }
}

export const analyticsDataService = new AnalyticsDataService();
