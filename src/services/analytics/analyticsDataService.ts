
import { AnalyticsData } from './types';
import { ChartDataService } from './chartDataService';
import { MockDataGenerator } from './mockDataGenerator';

class AnalyticsDataService {
  private subscribers: ((data: AnalyticsData) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private refreshInterval = 2000;
  private chartDataService = new ChartDataService();
  private mockDataGenerator = new MockDataGenerator();

  private generateEmptyData(): AnalyticsData {
    const baseData = this.mockDataGenerator.generateBaseData();
    
    this.chartDataService.updateChartHistory(baseData as AnalyticsData);
    
    const chartHistory = this.chartDataService.getChartData();
    const chartData = this.mockDataGenerator.generateChartData(baseData, chartHistory);

    return {
      chartData,
      emergencyDepartment: {
        totalPatients: 0,
        avgWaitTime: 0,
        bedUtilization: 0,
        staffOnDuty: 0,
        criticalAlerts: 0,
        lastUpdated: new Date()
      },
      clinicalOperations: {
        activeStaff: 0,
        scheduledProcedures: 0,
        resourceUtilization: 0,
        avgProcedureTime: 0,
        equipmentStatus: 'optimal' as const,
        lastUpdated: new Date()
      },
      dataPipeline: {
        activeSources: 0,
        processingSpeed: 0,
        errorRate: 0,
        dataQuality: 0,
        syncStatus: 'healthy' as const,
        lastUpdated: new Date()
      },
      business: {
        revenue: 0,
        revenueGrowth: 0,
        patientSatisfaction: 0,
        operationalEfficiency: 0,
        costPerPatient: 0,
        lastUpdated: new Date()
      },
      aiMetrics: {
        modelAccuracy: 0,
        automationSuccess: 0,
        decisionsSupported: 0,
        mlModelsActive: 0,
        predictionConfidence: 0,
        lastUpdated: new Date()
      },
      systemHealth: {
        cpuUsage: 0,
        memoryUsage: 0,
        networkLatency: 0,
        uptime: 0,
        securityScore: 0,
        lastUpdated: new Date()
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
    this.chartDataService.initializeChartHistory();
    
    this.intervalId = setInterval(() => {
      const data = this.generateEmptyData();
      this.subscribers.forEach(callback => callback(data));
    }, this.refreshInterval);

    // Initial fetch
    const initialData = this.generateEmptyData();
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
