
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
      chartData
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
