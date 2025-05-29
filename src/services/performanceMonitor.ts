
import { errorTracker } from './errorTracking';

interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private activeMetrics: Map<string, PerformanceMetric> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTiming(metricName: string, metadata?: Record<string, any>): string {
    const id = `${metricName}_${Date.now()}_${Math.random()}`;
    
    this.activeMetrics.set(id, {
      name: metricName,
      startTime: performance.now(),
      metadata
    });

    return id;
  }

  endTiming(id: string): void {
    const metric = this.activeMetrics.get(id);
    if (!metric) return;

    const endTime = performance.now();
    const duration = endTime - metric.startTime;

    // Track performance in monitoring system
    errorTracker.trackPerformance({
      name: metric.name,
      value: duration,
      unit: 'milliseconds',
      component: metric.metadata?.component
    });

    // Alert on slow operations
    if (duration > 5000) { // 5 seconds
      errorTracker.reportError({
        message: `Slow operation detected: ${metric.name}`,
        component: metric.metadata?.component,
        timestamp: new Date(),
        severity: 'medium',
        metadata: {
          duration,
          metric: metric.name
        }
      });
    }

    this.activeMetrics.delete(id);
  }

  measurePageLoad(): void {
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        const domReady = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        
        errorTracker.trackPerformance({
          name: 'page_load_time',
          value: loadTime,
          unit: 'milliseconds'
        });

        errorTracker.trackPerformance({
          name: 'dom_ready_time',
          value: domReady,
          unit: 'milliseconds'
        });
      }
    }
  }

  measureAPICall<T>(promise: Promise<T>, apiName: string): Promise<T> {
    const timingId = this.startTiming(`api_call_${apiName}`, { api: apiName });
    
    return promise
      .then((result) => {
        this.endTiming(timingId);
        return result;
      })
      .catch((error) => {
        this.endTiming(timingId);
        
        errorTracker.reportError({
          message: `API call failed: ${apiName}`,
          component: 'api',
          timestamp: new Date(),
          severity: 'high',
          metadata: {
            api: apiName,
            error: error.message
          }
        });
        
        throw error;
      });
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

// React hook for performance monitoring
export const usePerformanceTracking = (componentName: string) => {
  const trackOperation = (operationName: string, operation: () => Promise<any>) => {
    const timingId = performanceMonitor.startTiming(`${componentName}_${operationName}`, {
      component: componentName
    });
    
    return operation().finally(() => {
      performanceMonitor.endTiming(timingId);
    });
  };

  return { trackOperation };
};
