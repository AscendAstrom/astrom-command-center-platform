
import { supabase } from "@/integrations/supabase/client";

export interface AnalyticsData {
  business: {
    revenue: number;
    revenueGrowth: number;
    patientSatisfaction: number;
    operationalEfficiency: number;
    costPerPatient: number;
  };
  clinicalOperations: {
    activeStaff: number;
    scheduledProcedures: number;
    resourceUtilization: number;
    avgProcedureTime: number;
    equipmentStatus: string;
  };
  dataPipeline: {
    activeSources: number;
    processingSpeed: number;
    errorRate: number;
    dataQuality: number;
    syncStatus: string;
  };
  systemHealth: {
    cpuUsage: number;
    memoryUsage: number;
    networkLatency: number;
    uptime: number;
    securityScore: number;
  };
  aiMetrics: {
    modelAccuracy: number;
    automationSuccess: number;
    decisionsSupported: number;
    mlModelsActive: number;
    predictionConfidence: number;
  };
  emergencyDepartment: {
    totalPatients: number;
    avgWaitTime: number;
    bedUtilization: number;
    staffOnDuty: number;
    criticalAlerts: number;
  };
  chartData: {
    revenue: any[];
    staffAllocation: any[];
    processingThroughput: any[];
    dataQuality: any[];
    systemHealth: any[];
    modelPerformance: any[];
    waitTimes: any[];
    patientFlow: any[];
    bedUtilization: any[];
  };
}

class AnalyticsService {
  private updateCallbacks: ((data: AnalyticsData) => void)[] = [];
  private currentData: AnalyticsData;

  constructor() {
    this.currentData = this.getEmptyData();
  }

  private getEmptyData(): AnalyticsData {
    return {
      business: {
        revenue: 0,
        revenueGrowth: 0,
        patientSatisfaction: 0,
        operationalEfficiency: 0,
        costPerPatient: 0
      },
      clinicalOperations: {
        activeStaff: 0,
        scheduledProcedures: 0,
        resourceUtilization: 0,
        avgProcedureTime: 0,
        equipmentStatus: 'unknown'
      },
      dataPipeline: {
        activeSources: 0,
        processingSpeed: 0,
        errorRate: 0,
        dataQuality: 0,
        syncStatus: 'unknown'
      },
      systemHealth: {
        cpuUsage: 0,
        memoryUsage: 0,
        networkLatency: 0,
        uptime: 0,
        securityScore: 0
      },
      aiMetrics: {
        modelAccuracy: 0,
        automationSuccess: 0,
        decisionsSupported: 0,
        mlModelsActive: 0,
        predictionConfidence: 0
      },
      emergencyDepartment: {
        totalPatients: 0,
        avgWaitTime: 0,
        bedUtilization: 0,
        staffOnDuty: 0,
        criticalAlerts: 0
      },
      chartData: {
        revenue: [],
        staffAllocation: [],
        processingThroughput: [],
        dataQuality: [],
        systemHealth: [],
        modelPerformance: [],
        waitTimes: [],
        patientFlow: [],
        bedUtilization: []
      }
    };
  }

  async fetchRealData(): Promise<AnalyticsData> {
    try {
      const [
        { data: staff },
        { data: patients },
        { data: beds },
        { data: dataSources },
        { data: waitTimes }
      ] = await Promise.all([
        supabase.from('staff').select('id').eq('is_active', true),
        supabase.from('patients').select('id').eq('status', 'ACTIVE'),
        supabase.from('beds').select('status'),
        supabase.from('data_sources').select('id, status'),
        supabase.from('wait_times').select('total_wait_minutes').is('discharge_time', null)
      ]);

      const totalBeds = beds?.length || 0;
      const occupiedBeds = beds?.filter(b => b.status === 'OCCUPIED').length || 0;
      const bedUtilization = totalBeds > 0 ? (occupiedBeds / totalBeds) * 100 : 0;

      const avgWaitTime = waitTimes && waitTimes.length > 0 
        ? waitTimes.reduce((sum, w) => sum + (w.total_wait_minutes || 0), 0) / waitTimes.length
        : 0;

      const connectedSources = dataSources?.filter(ds => ds.status === 'CONNECTED').length || 0;

      this.currentData = {
        ...this.getEmptyData(),
        clinicalOperations: {
          activeStaff: staff?.length || 0,
          scheduledProcedures: 0,
          resourceUtilization: bedUtilization,
          avgProcedureTime: 0,
          equipmentStatus: 'unknown'
        },
        dataPipeline: {
          activeSources: connectedSources,
          processingSpeed: 0,
          errorRate: 0,
          dataQuality: connectedSources > 0 ? 95 : 0,
          syncStatus: connectedSources > 0 ? 'healthy' : 'offline'
        },
        emergencyDepartment: {
          totalPatients: patients?.length || 0,
          avgWaitTime: Math.round(avgWaitTime),
          bedUtilization: Math.round(bedUtilization),
          staffOnDuty: staff?.length || 0,
          criticalAlerts: 0
        }
      };

      this.notifySubscribers();
      return this.currentData;
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      return this.getEmptyData();
    }
  }

  subscribe(callback: (data: AnalyticsData) => void): () => void {
    this.updateCallbacks.push(callback);
    return () => {
      this.updateCallbacks = this.updateCallbacks.filter(cb => cb !== callback);
    };
  }

  private notifySubscribers(): void {
    this.updateCallbacks.forEach(callback => callback(this.currentData));
  }

  getCurrentData(): AnalyticsData {
    return this.currentData;
  }

  startRealTimeUpdates(intervalMs: number = 30000): () => void {
    this.fetchRealData();
    
    const interval = setInterval(() => {
      this.fetchRealData();
    }, intervalMs);

    return () => clearInterval(interval);
  }
}

export const analyticsService = new AnalyticsService();
