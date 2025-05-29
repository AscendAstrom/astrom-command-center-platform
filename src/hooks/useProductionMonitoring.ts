
import { useEffect } from 'react';
import { performanceMonitor } from '@/services/performanceMonitor';
import { setupGlobalErrorHandler } from '@/services/errorTracking';

export const useProductionMonitoring = () => {
  useEffect(() => {
    // Set up global error handling
    setupGlobalErrorHandler();
    
    // Measure initial page load
    performanceMonitor.measurePageLoad();
    
    // Set up performance observers
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            performanceMonitor.startTiming('lcp');
            setTimeout(() => {
              const timingId = performanceMonitor.startTiming('lcp');
              performanceMonitor.endTiming(timingId);
            }, entry.startTime);
          }
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    // Memory usage monitoring
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
          console.warn('High memory usage detected:', {
            used: memory.usedJSHeapSize,
            limit: memory.jsHeapSizeLimit
          });
        }
      }
    };

    const memoryInterval = setInterval(monitorMemory, 60000); // Check every minute

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);
};
