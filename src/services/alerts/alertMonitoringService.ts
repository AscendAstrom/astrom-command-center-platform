import { AnalyticsData } from '@/services/analytics/types';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface AlertRule {
  id: string;
  metric: string;
  condition: 'greater_than' | 'less_than' | 'equals' | 'not_equals';
  threshold: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  enabled: boolean;
  cooldownMinutes: number;
}

export interface TriggeredAlert {
  ruleId: string;
  metric: string;
  currentValue: number;
  threshold: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  timestamp: Date;
}

class AlertMonitoringService {
  private alertRules: AlertRule[] = [
    {
      id: 'bed-utilization-high',
      metric: 'beds.utilization',
      condition: 'greater_than',
      threshold: 90,
      priority: 'HIGH',
      message: 'Bed utilization critically high at {value}%',
      enabled: true,
      cooldownMinutes: 15
    },
    {
      id: 'wait-time-critical',
      metric: 'emergencyDepartment.avgWaitTime',
      condition: 'greater_than',
      threshold: 120,
      priority: 'CRITICAL',
      message: 'Emergency department wait time exceeds 2 hours: {value} minutes',
      enabled: true,
      cooldownMinutes: 10
    },
    {
      id: 'critical-patients-alert',
      metric: 'emergencyDepartment.criticalPatients',
      condition: 'greater_than',
      threshold: 5,
      priority: 'CRITICAL',
      message: 'High number of critical patients: {value}',
      enabled: true,
      cooldownMinutes: 5
    },
    {
      id: 'staff-shortage',
      metric: 'staffing.onDuty',
      condition: 'less_than',
      threshold: 10,
      priority: 'HIGH',
      message: 'Staff shortage detected: Only {value} staff on duty',
      enabled: true,
      cooldownMinutes: 30
    },
    {
      id: 'equipment-maintenance',
      metric: 'equipment.maintenance',
      condition: 'greater_than',
      threshold: 3,
      priority: 'MEDIUM',
      message: '{value} equipment units require maintenance',
      enabled: true,
      cooldownMinutes: 60
    }
  ];

  private lastAlertTimes: Map<string, Date> = new Map();
  private subscribers: ((alert: TriggeredAlert) => void)[] = [];

  checkAlerts(data: AnalyticsData): TriggeredAlert[] {
    const triggeredAlerts: TriggeredAlert[] = [];
    const now = new Date();

    for (const rule of this.alertRules) {
      if (!rule.enabled) continue;

      // Check cooldown
      const lastAlert = this.lastAlertTimes.get(rule.id);
      if (lastAlert) {
        const timeSinceLastAlert = (now.getTime() - lastAlert.getTime()) / (1000 * 60);
        if (timeSinceLastAlert < rule.cooldownMinutes) {
          continue;
        }
      }

      const currentValue = this.getMetricValue(data, rule.metric);
      if (currentValue !== null && this.evaluateCondition(currentValue, rule.condition, rule.threshold)) {
        const alert: TriggeredAlert = {
          ruleId: rule.id,
          metric: rule.metric,
          currentValue,
          threshold: rule.threshold,
          priority: rule.priority,
          message: rule.message.replace('{value}', currentValue.toString()),
          timestamp: now
        };

        triggeredAlerts.push(alert);
        this.lastAlertTimes.set(rule.id, now);
        this.notifySubscribers(alert);
        this.showToastNotification(alert);
        this.logAlert(alert);
      }
    }

    return triggeredAlerts;
  }

  private getMetricValue(data: AnalyticsData, metricPath: string): number | null {
    const path = metricPath.split('.');
    let value: any = data;
    
    for (const key of path) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return null;
      }
    }
    
    return typeof value === 'number' ? value : null;
  }

  private evaluateCondition(value: number, condition: string, threshold: number): boolean {
    switch (condition) {
      case 'greater_than': return value > threshold;
      case 'less_than': return value < threshold;
      case 'equals': return value === threshold;
      case 'not_equals': return value !== threshold;
      default: return false;
    }
  }

  private showToastNotification(alert: TriggeredAlert): void {
    const priorityConfig = {
      LOW: { duration: 3000, style: 'info' },
      MEDIUM: { duration: 5000, style: 'warning' },
      HIGH: { duration: 7000, style: 'error' },
      CRITICAL: { duration: 0, style: 'error' } // No auto-dismiss
    };

    const config = priorityConfig[alert.priority];
    
    if (config.style === 'error') {
      toast.error(alert.message, {
        description: `Priority: ${alert.priority} | Time: ${alert.timestamp.toLocaleTimeString()}`,
        duration: config.duration,
      });
    } else if (config.style === 'warning') {
      toast.warning(alert.message, {
        description: `Priority: ${alert.priority} | Time: ${alert.timestamp.toLocaleTimeString()}`,
        duration: config.duration,
      });
    } else {
      toast.info(alert.message, {
        description: `Priority: ${alert.priority} | Time: ${alert.timestamp.toLocaleTimeString()}`,
        duration: config.duration,
      });
    }
  }

  private async logAlert(alert: TriggeredAlert): Promise<void> {
    try {
      await supabase.from('alerts').insert({
        message: alert.message,
        severity: alert.priority,
        status: 'ACTIVE',
        source_type: 'metric_monitoring',
        metadata: {
          metric: alert.metric,
          currentValue: alert.currentValue,
          threshold: alert.threshold,
          ruleId: alert.ruleId
        }
      });
    } catch (error) {
      console.error('Failed to log alert to database:', error);
    }
  }

  subscribe(callback: (alert: TriggeredAlert) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers(alert: TriggeredAlert): void {
    this.subscribers.forEach(callback => callback(alert));
  }

  getAlertRules(): AlertRule[] {
    return [...this.alertRules];
  }

  updateAlertRule(ruleId: string, updates: Partial<AlertRule>): boolean {
    const ruleIndex = this.alertRules.findIndex(rule => rule.id === ruleId);
    if (ruleIndex >= 0) {
      this.alertRules[ruleIndex] = { ...this.alertRules[ruleIndex], ...updates };
      return true;
    }
    return false;
  }

  addAlertRule(rule: AlertRule): void {
    this.alertRules.push(rule);
  }

  removeAlertRule(ruleId: string): boolean {
    const initialLength = this.alertRules.length;
    this.alertRules = this.alertRules.filter(rule => rule.id !== ruleId);
    return this.alertRules.length < initialLength;
  }

  clearCooldown(ruleId: string): void {
    this.lastAlertTimes.delete(ruleId);
  }

  getCooldownStatus(): Map<string, { lastAlert: Date; nextAllowed: Date }> {
    const status = new Map();
    const now = new Date();
    
    for (const [ruleId, lastAlert] of this.lastAlertTimes.entries()) {
      const rule = this.alertRules.find(r => r.id === ruleId);
      if (rule) {
        const nextAllowed = new Date(lastAlert.getTime() + rule.cooldownMinutes * 60 * 1000);
        status.set(ruleId, { lastAlert, nextAllowed });
      }
    }
    
    return status;
  }
}

export const alertMonitoringService = new AlertMonitoringService();
