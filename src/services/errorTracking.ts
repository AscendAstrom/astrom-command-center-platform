
import { supabase } from '@/integrations/supabase/client';

interface ErrorReport {
  message: string;
  stack?: string;
  component?: string;
  userId?: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  metadata?: Record<string, any>;
}

class ErrorTrackingService {
  private static instance: ErrorTrackingService;

  static getInstance(): ErrorTrackingService {
    if (!ErrorTrackingService.instance) {
      ErrorTrackingService.instance = new ErrorTrackingService();
    }
    return ErrorTrackingService.instance;
  }

  async reportError(error: ErrorReport): Promise<void> {
    try {
      // Log to audit_logs table for production tracking
      const { error: logError } = await supabase
        .from('audit_logs')
        .insert({
          action: 'ERROR_REPORTED',
          resource_type: 'application',
          resource_id: this.generateId(),
          details: {
            message: error.message,
            stack: error.stack,
            component: error.component,
            severity: error.severity,
            metadata: error.metadata
          },
          severity: error.severity.toUpperCase(),
          user_id: error.userId
        });

      if (logError) {
        console.error('Failed to log error to database:', logError);
      }

      // For critical errors, could integrate with external monitoring
      if (error.severity === 'critical') {
        this.handleCriticalError(error);
      }
    } catch (err) {
      console.error('Error tracking service failed:', err);
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private handleCriticalError(error: ErrorReport): void {
    // In production, this would integrate with services like Sentry, DataDog, etc.
    console.error('CRITICAL ERROR:', {
      message: error.message,
      timestamp: error.timestamp,
      component: error.component,
      userId: error.userId
    });

    // Could trigger alerts to DevOps team
    this.triggerAlert(error);
  }

  private triggerAlert(error: ErrorReport): void {
    // Production implementation would send to monitoring service
    console.warn('Alert triggered for critical error:', error.message);
  }

  // Performance monitoring
  async trackPerformance(metric: {
    name: string;
    value: number;
    unit: string;
    component?: string;
    userId?: string;
  }): Promise<void> {
    try {
      const { error } = await supabase
        .from('metrics_snapshots')
        .insert({
          metric_name: metric.name,
          metric_value: metric.value,
          metric_unit: metric.unit,
          metadata: {
            component: metric.component,
            userId: metric.userId
          }
        });

      if (error) {
        console.error('Failed to track performance metric:', error);
      }
    } catch (err) {
      console.error('Performance tracking failed:', err);
    }
  }
}

export const errorTracker = ErrorTrackingService.getInstance();

// Global error handler - browser safe
export const setupGlobalErrorHandler = () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
      errorTracker.reportError({
        message: event.message,
        stack: event.error?.stack,
        component: 'global',
        timestamp: new Date(),
        severity: 'high'
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      errorTracker.reportError({
        message: event.reason?.message || 'Unhandled promise rejection',
        stack: event.reason?.stack,
        component: 'promise',
        timestamp: new Date(),
        severity: 'medium'
      });
    });
  }
};
