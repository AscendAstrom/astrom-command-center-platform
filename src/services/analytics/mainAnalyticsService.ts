
import { AnalyticsData } from './types';
import { dataFetchingService } from './dataFetchingService';
import { analyticsSubscriptionService } from './analyticsSubscriptionService';
import { realtimeUpdatesService } from './realtimeUpdatesService';

class MainAnalyticsService {
  async fetchAnalyticsData(): Promise<AnalyticsData> {
    return dataFetchingService.fetchAnalyticsData();
  }

  async refreshData(): Promise<void> {
    return realtimeUpdatesService.refreshData();
  }

  subscribe(callback: (data: AnalyticsData | null) => void): () => void {
    const unsubscribe = analyticsSubscriptionService.subscribe(callback);
    
    if (realtimeUpdatesService.getCurrentData()) {
      callback(realtimeUpdatesService.getCurrentData());
    } else {
      this.refreshData();
    }

    return unsubscribe;
  }

  startRealTimeUpdates(): () => void {
    return realtimeUpdatesService.startRealTimeUpdates();
  }

  getCurrentData(): AnalyticsData | null {
    return realtimeUpdatesService.getCurrentData();
  }
}

export const analyticsService = new MainAnalyticsService();
