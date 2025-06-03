
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
        triageQueue: 0,
        bedOccupancy: 0,
        criticalCases: 0,
        lastUpdated: new Date()
      },
      clinicalOperations: {
        surgicalQueue: 0,
        labPending: 0,
        imagingQueue: 0,
        medicationOrders: 0,
        dischargesPending: 0,
        lastUpdated: new Date()
      },
      dataPipeline: {
        recordsIngested: 0,
        errorRate: 0,
        latency: 0,
        throughput: 0,
        systemHealth: 0,
        lastUpdated: new Date()
      },
      business: {
        revenue: 0,
        operatingCosts: 0,
        profitMargin: 0,
        patientSatisfaction: 0,
        staffUtilization: 0,
        lastUpdated: new Date()
      },
      aiMetrics: {
        modelAccuracy: 0,
        inferenceLatency: 0,
        trainingJobs: 0,
        dataQuality: 0,
        automationRate: 0,
        lastUpdated: new Date()
      },
      systemHealth: {
        uptime: 0,
        avgResponseTime: 0,
        memoryUsage: 0,
        cpuUtilization: 0,
        diskUsage: 0,
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
