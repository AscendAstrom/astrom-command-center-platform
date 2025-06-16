
import { AnalyticsData } from './types';
import { ChartDataService } from './chartDataService';
import { RealtimeDataService } from './realtimeDataService';

class AnalyticsDataService {
  private subscribers: ((data: AnalyticsData) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private refreshInterval = 2000;
  private chartDataService = new ChartDataService();
  private realtimeDataService = new RealtimeDataService();

  subscribe(callback: (data: AnalyticsData) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  start() {
    if (this.intervalId) return;
    
    this.chartDataService.initializeChartHistory();
    
    this.intervalId = setInterval(async () => {
      const data = await this.realtimeDataService.getRealtimeData();
      this.subscribers.forEach(callback => callback(data));
    }, this.refreshInterval);

    this.realtimeDataService.getRealtimeData().then(data => {
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
