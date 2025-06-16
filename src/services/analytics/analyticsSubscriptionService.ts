
import { AnalyticsData } from './types';

export class AnalyticsSubscriptionService {
  private subscribers: ((data: AnalyticsData | null) => void)[] = [];

  subscribe(callback: (data: AnalyticsData | null) => void): () => void {
    this.subscribers.push(callback);
    
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  notifySubscribers(data: AnalyticsData | null): void {
    this.subscribers.forEach(callback => callback(data));
  }

  getSubscriberCount(): number {
    return this.subscribers.length;
  }

  clearSubscribers(): void {
    this.subscribers = [];
  }
}

export const analyticsSubscriptionService = new AnalyticsSubscriptionService();
