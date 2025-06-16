
import { AnalyticsData } from './types';
import { dataFetchingService } from './dataFetchingService';
import { analyticsSubscriptionService } from './analyticsSubscriptionService';

export class RealtimeUpdatesService {
  private updateInterval: NodeJS.Timeout | null = null;
  private currentData: AnalyticsData | null = null;

  async refreshData(): Promise<void> {
    const data = await dataFetchingService.fetchAnalyticsData();
    this.currentData = data;
    analyticsSubscriptionService.notifySubscribers(data);
  }

  startRealTimeUpdates(): () => void {
    this.updateInterval = setInterval(() => {
      this.refreshData();
    }, 30000);

    this.refreshData();

    return () => {
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
      }
    };
  }

  getCurrentData(): AnalyticsData | null {
    return this.currentData;
  }

  setCurrentData(data: AnalyticsData | null): void {
    this.currentData = data;
  }

  isRunning(): boolean {
    return this.updateInterval !== null;
  }

  stop(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
}

export const realtimeUpdatesService = new RealtimeUpdatesService();
