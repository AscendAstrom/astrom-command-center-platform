
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

export interface ChartDataPoint {
  time: string;
  [key: string]: any;
}

export interface AnalyticsData {
  emergencyDepartment: EmergencyDepartmentMetrics;
  clinicalOperations: ClinicalOperationsMetrics;
  dataPipeline: DataPipelineMetrics;
  business: BusinessMetrics;
  systemHealth: SystemHealthMetrics;
  aiMetrics: AIMetrics;
  chartData: {
    waitTimes: ChartDataPoint[];
    patientFlow: ChartDataPoint[];
    staffAllocation: any[];
    bedUtilization: any[];
    processingThroughput: ChartDataPoint[];
    dataQuality: ChartDataPoint[];
    revenue: ChartDataPoint[];
    systemHealth: ChartDataPoint[];
    modelPerformance: ChartDataPoint[];
  };
}

class AnalyticsDataService {
  private subscribers: ((data: AnalyticsData) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private refreshInterval = 2000;
  private chartHistory: any = {};

  private initializeChartHistory() {
    const now = new Date();
    const points = 20;
    
    // Initialize wait times history
    this.chartHistory.waitTimes = Array.from({ length: points }, (_, i) => ({
      time: new Date(now.getTime() - (points - i) * 60000).toISOString(),
      waitTime: 25 + Math.random() * 10 - 5,
      targetTime: 30
    }));

    // Initialize patient flow history
    this.chartHistory.patientFlow = Array.from({ length: points }, (_, i) => ({
      time: new Date(now.getTime() - (points - i) * 60000).toISOString(),
      admissions: 5 + Math.floor(Math.random() * 5),
      discharges: 4 + Math.floor(Math.random() * 4)
    }));

    // Initialize processing throughput
    this.chartHistory.processingThroughput = Array.from({ length: points }, (_, i) => ({
      time: new Date(now.getTime() - (points - i) * 60000).toISOString(),
      throughput: 1100 + Math.random() * 200 - 100,
      target: 1200
    }));

    // Initialize data quality
    this.chartHistory.dataQuality = Array.from({ length: points }, (_, i) => ({
      time: new Date(now.getTime() - (points - i) * 60000).toISOString(),
      quality: 98 + Math.random() * 2 - 1,
      completeness: 97 + Math.random() * 3 - 1.5
    }));

    // Initialize revenue
    this.chartHistory.revenue = Array.from({ length: points }, (_, i) => ({
      time: new Date(now.getTime() - (points - i) * 3600000).toISOString(),
      revenue: 12000 + Math.random() * 2000 - 1000,
      target: 13000
    }));

    // Initialize system health
    this.chartHistory.systemHealth = Array.from({ length: points }, (_, i) => ({
      time: new Date(now.getTime() - (points - i) * 60000).toISOString(),
      cpu: 45 + Math.random() * 20 - 10,
      memory: 67 + Math.random() * 15 - 7,
      network: 15 + Math.random() * 10 - 5
    }));

    // Initialize model performance
    this.chartHistory.modelPerformance = Array.from({ length: points }, (_, i) => ({
      time: new Date(now.getTime() - (points - i) * 3600000).toISOString(),
      accuracy: 94 + Math.random() * 4 - 2,
      confidence: 87 + Math.random() * 10 - 5
    }));
  }

  private updateChartHistory(newData: AnalyticsData) {
    const now = new Date().toISOString();
    const maxPoints = 20;

    // Update wait times
    this.chartHistory.waitTimes.push({
      time: now,
      waitTime: newData.emergencyDepartment.avgWaitTime,
      targetTime: 30
    });
    if (this.chartHistory.waitTimes.length > maxPoints) {
      this.chartHistory.waitTimes.shift();
    }

    // Update patient flow
    this.chartHistory.patientFlow.push({
      time: now,
      admissions: 5 + Math.floor(Math.random() * 5),
      discharges: 4 + Math.floor(Math.random() * 4)
    });
    if (this.chartHistory.patientFlow.length > maxPoints) {
      this.chartHistory.patientFlow.shift();
    }

    // Update processing throughput
    this.chartHistory.processingThroughput.push({
      time: now,
      throughput: newData.dataPipeline.processingSpeed,
      target: 1200
    });
    if (this.chartHistory.processingThroughput.length > maxPoints) {
      this.chartHistory.processingThroughput.shift();
    }

    // Update data quality
    this.chartHistory.dataQuality.push({
      time: now,
      quality: newData.dataPipeline.dataQuality,
      completeness: 97 + Math.random() * 3 - 1.5
    });
    if (this.chartHistory.dataQuality.length > maxPoints) {
      this.chartHistory.dataQuality.shift();
    }

    // Update revenue (hourly)
    if (this.chartHistory.revenue.length === 0 || 
        new Date().getHours() !== new Date(this.chartHistory.revenue[this.chartHistory.revenue.length - 1].time).getHours()) {
      this.chartHistory.revenue.push({
        time: now,
        revenue: newData.business.revenue,
        target: 13000
      });
      if (this.chartHistory.revenue.length > maxPoints) {
        this.chartHistory.revenue.shift();
      }
    }

    // Update system health
    this.chartHistory.systemHealth.push({
      time: now,
      cpu: newData.systemHealth.cpuUsage,
      memory: newData.systemHealth.memoryUsage,
      network: newData.systemHealth.networkLatency
    });
    if (this.chartHistory.systemHealth.length > maxPoints) {
      this.chartHistory.systemHealth.shift();
    }

    // Update model performance (hourly)
    if (this.chartHistory.modelPerformance.length === 0 || 
        new Date().getHours() !== new Date(this.chartHistory.modelPerformance[this.chartHistory.modelPerformance.length - 1].time).getHours()) {
      this.chartHistory.modelPerformance.push({
        time: now,
        accuracy: newData.aiMetrics.modelAccuracy,
        confidence: newData.aiMetrics.predictionConfidence
      });
      if (this.chartHistory.modelPerformance.length > maxPoints) {
        this.chartHistory.modelPerformance.shift();
      }
    }
  }

  private generateMockData(): AnalyticsData {
    const now = new Date();
    
    const baseData = {
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

    this.updateChartHistory(baseData as AnalyticsData);

    return {
      ...baseData,
      chartData: {
        waitTimes: this.chartHistory.waitTimes || [],
        patientFlow: this.chartHistory.patientFlow || [],
        staffAllocation: [
          { category: 'Nurses', value: Math.floor(baseData.clinicalOperations.activeStaff * 0.4) },
          { category: 'Doctors', value: Math.floor(baseData.clinicalOperations.activeStaff * 0.3) },
          { category: 'Support', value: Math.floor(baseData.clinicalOperations.activeStaff * 0.2) },
          { category: 'Admin', value: Math.floor(baseData.clinicalOperations.activeStaff * 0.1) }
        ],
        bedUtilization: [
          { name: 'Occupied', value: baseData.emergencyDepartment.bedUtilization },
          { name: 'Available', value: 100 - baseData.emergencyDepartment.bedUtilization }
        ],
        processingThroughput: this.chartHistory.processingThroughput || [],
        dataQuality: this.chartHistory.dataQuality || [],
        revenue: this.chartHistory.revenue || [],
        systemHealth: this.chartHistory.systemHealth || [],
        modelPerformance: this.chartHistory.modelPerformance || []
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
    
    // Initialize chart history
    this.initializeChartHistory();
    
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
