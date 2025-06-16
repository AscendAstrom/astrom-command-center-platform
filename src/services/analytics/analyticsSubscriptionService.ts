
import { AnalyticsData } from './types';

type SubscriptionCallback = (data: AnalyticsData | null) => void;

class AnalyticsSubscriptionService {
  private subscribers: Set<SubscriptionCallback> = new Set();

  subscribe(callback: SubscriptionCallback): () => void {
    this.subscribers.add(callback);
    
    return () => {
      this.subscribers.delete(callback);
    };
  }

  notifySubscribers(data: AnalyticsData | null): void {
    this.subscribers.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in analytics subscription callback:', error);
      }
    });
  }

  getSubscriberCount(): number {
    return this.subscribers.size;
  }
}

export const analyticsSubscriptionService = new AnalyticsSubscriptionService();
