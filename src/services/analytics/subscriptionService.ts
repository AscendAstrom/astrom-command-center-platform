
import { AnalyticsData } from './types';

export class SubscriptionService {
  private subscribers: ((data: AnalyticsData) => void)[] = [];

  subscribe(callback: (data: AnalyticsData) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  notifySubscribers(data: AnalyticsData): void {
    this.subscribers.forEach(callback => callback(data));
  }

  getSubscriberCount(): number {
    return this.subscribers.length;
  }

  clearSubscribers(): void {
    this.subscribers = [];
  }
}

export const subscriptionService = new SubscriptionService();
