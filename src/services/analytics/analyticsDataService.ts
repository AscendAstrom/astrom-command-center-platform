
import { AnalyticsData } from './types';
import { ChartDataService } from './chartDataService';
import { RealtimeDataService } from './realtimeDataService';
import { DataTransformerService } from './dataTransformerService';
import { SubscriptionService } from './subscriptionService';
import { IntervalManagerService } from './intervalManagerService';

class AnalyticsDataService {
  private chartDataService = new ChartDataService();
  private realtimeDataService = new RealtimeDataService();
  private dataTransformerService = new DataTransformerService();
  private subscriptionService = new SubscriptionService();
  private intervalManagerService = new IntervalManagerService();

  subscribe(callback: (data: AnalyticsData) => void) {
    return this.subscriptionService.subscribe(callback);
  }

  start() {
    if (this.intervalManagerService.isRunning()) return;
    
    this.chartDataService.initializeChartHistory();
    
    const updateCallback = async () => {
      const realtimeData = await this.realtimeDataService.getRealtimeData();
      const analyticsData = this.dataTransformerService.transformRealtimeToAnalytics(realtimeData);
      this.subscriptionService.notifySubscribers(analyticsData);
    };

    this.intervalManagerService.start(updateCallback);

    // Initial data load
    this.realtimeDataService.getRealtimeData().then(realtimeData => {
      const analyticsData = this.dataTransformerService.transformRealtimeToAnalytics(realtimeData);
      this.subscriptionService.notifySubscribers(analyticsData);
    });
  }

  stop() {
    this.intervalManagerService.stop();
  }

  setRefreshInterval(interval: number) {
    this.intervalManagerService.setRefreshInterval(interval);
    this.restart();
  }

  restart() {
    this.stop();
    this.start();
  }

  getSubscriberCount(): number {
    return this.subscriptionService.getSubscriberCount();
  }

  isRunning(): boolean {
    return this.intervalManagerService.isRunning();
  }
}

export const analyticsDataService = new AnalyticsDataService();
