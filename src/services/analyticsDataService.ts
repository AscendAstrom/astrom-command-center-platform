
import { BedData } from "@/types/bedManagement";

export interface EmergencyDepartmentMetrics {
  totalPatients: number;
  avgWaitTime: number;
  bedUtilization: number;
  staffOnDuty: number;
  criticalAlerts: number;
  lastUpdated: Date;
}

export interface ClinicalOperationsMetrics {
  activeStaff: number;
  scheduledProcedures: number;
  resourceUtilization: number;
  avgProcedureTime: number;
  equipmentStatus: 'optimal' | 'warning' | 'critical';
  lastUpdated: Date;
}

export interface DataPipelineMetrics {
  activeSources: number;
  processingSpeed: number;
  errorRate: number;
  dataQuality: number;
  syncStatus: 'healthy' | 'warning' | 'error';
  lastUpdated: Date;
}

export interface BusinessMetrics {
  revenue: number;
  revenueGrowth: number;
  patientSatisfaction: number;
  operationalEfficiency: number;
  costPerPatient: number;
  lastUpdated: Date;
}

export interface SystemHealthMetrics {
  cpuUsage: number;
  memoryUsage: number;
  networkLatency: number;
  uptime: number;
  securityScore: number;
  lastUpdated: Date;
}

export interface AIMetrics {
  modelAccuracy: number;
  automationSuccess: number;
  decisionsSupported: number;
  mlModelsActive: number;
  predictionConfidence: number;
  lastUpdated: Date;
}

export interface AnalyticsData {
  emergencyDepartment: EmergencyDepartmentMetrics;
  clinicalOperations: ClinicalOperationsMetrics;
  dataPipeline: DataPipelineMetrics;
  business: BusinessMetrics;
  systemHealth: SystemHealthMetrics;
  aiMetrics: AIMetrics;
}

class AnalyticsDataService {
  private subscribers: ((data: AnalyticsData) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private refreshInterval = 2000; // 2 seconds for demo purposes

  private generateMockData(): AnalyticsData {
    const now = new Date();
    
    return {
      emergencyDepartment: {
        totalPatients: 142 + Math.floor(Math.random() * 20 - 10),
        avgWaitTime: 23 + Math.floor(Math.random() * 10 - 5),
        bedUtilization: 78 + Math.floor(Math.random() * 10 - 5),
        staffOnDuty: 28 + Math.floor(Math.random() * 4 - 2),
        criticalAlerts: Math.floor(Math.random() * 5),
        lastUpdated: now
      },
      clinicalOperations: {
        activeStaff: 156 + Math.floor(Math.random() * 20 - 10),
        scheduledProcedures: 34 + Math.floor(Math.random() * 8 - 4),
        resourceUtilization: 85 + Math.floor(Math.random() * 10 - 5),
        avgProcedureTime: 45 + Math.floor(Math.random() * 10 - 5),
        equipmentStatus: Math.random() > 0.8 ? 'warning' : 'optimal',
        lastUpdated: now
      },
      dataPipeline: {
        activeSources: 24 + Math.floor(Math.random() * 4 - 2),
        processingSpeed: 1200 + Math.floor(Math.random() * 200 - 100),
        errorRate: Math.max(0, 2.5 + Math.random() * 2 - 1),
        dataQuality: 98.7 + Math.random() * 2 - 1,
        syncStatus: Math.random() > 0.9 ? 'warning' : 'healthy',
        lastUpdated: now
      },
      business: {
        revenue: 12400 + Math.floor(Math.random() * 1000 - 500),
        revenueGrowth: 8.5 + Math.random() * 4 - 2,
        patientSatisfaction: 4.8 + Math.random() * 0.4 - 0.2,
        operationalEfficiency: 92 + Math.floor(Math.random() * 6 - 3),
        costPerPatient: 284 + Math.floor(Math.random() * 40 - 20),
        lastUpdated: now
      },
      systemHealth: {
        cpuUsage: 45 + Math.floor(Math.random() * 20 - 10),
        memoryUsage: 67 + Math.floor(Math.random() * 15 - 7),
        networkLatency: 15 + Math.floor(Math.random() * 10 - 5),
        uptime: 99.8 + Math.random() * 0.4 - 0.2,
        securityScore: 96 + Math.floor(Math.random() * 6 - 3),
        lastUpdated: now
      },
      aiMetrics: {
        modelAccuracy: 94.2 + Math.random() * 4 - 2,
        automationSuccess: 89 + Math.floor(Math.random() * 8 - 4),
        decisionsSupported: 156 + Math.floor(Math.random() * 30 - 15),
        mlModelsActive: 12 + Math.floor(Math.random() * 4 - 2),
        predictionConfidence: 87 + Math.floor(Math.random() * 10 - 5),
        lastUpdated: now
      }
    };
  }

  subscribe(callback: (data: AnalyticsData) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  start() {
    if (this.intervalId) return;
    
    this.intervalId = setInterval(() => {
      const data = this.generateMockData();
      this.subscribers.forEach(callback => callback(data));
    }, this.refreshInterval);

    // Initial fetch
    const initialData = this.generateMockData();
    this.subscribers.forEach(callback => callback(initialData));
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
