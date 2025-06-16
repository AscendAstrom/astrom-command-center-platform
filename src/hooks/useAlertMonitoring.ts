
import { useEffect, useState } from 'react';
import { alertMonitoringService, TriggeredAlert, AlertRule } from '@/services/alerts/alertMonitoringService';
import { analyticsService } from '@/services/analytics';
import { AnalyticsData } from '@/services/analytics/types';

export const useAlertMonitoring = () => {
  const [recentAlerts, setRecentAlerts] = useState<TriggeredAlert[]>([]);
  const [alertRules, setAlertRules] = useState<AlertRule[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    // Initialize alert rules
    setAlertRules(alertMonitoringService.getAlertRules());

    // Subscribe to new alerts
    const unsubscribeAlerts = alertMonitoringService.subscribe((alert) => {
      setRecentAlerts(prev => [alert, ...prev.slice(0, 9)]); // Keep last 10 alerts
    });

    // Subscribe to analytics data and check for alerts
    const unsubscribeAnalytics = analyticsService.subscribe((data: AnalyticsData | null) => {
      if (data && isMonitoring) {
        alertMonitoringService.checkAlerts(data);
      }
    });

    setIsMonitoring(true);

    return () => {
      unsubscribeAlerts();
      unsubscribeAnalytics();
    };
  }, [isMonitoring]);

  const toggleMonitoring = () => {
    setIsMonitoring(prev => !prev);
  };

  const updateAlertRule = (ruleId: string, updates: Partial<AlertRule>) => {
    const success = alertMonitoringService.updateAlertRule(ruleId, updates);
    if (success) {
      setAlertRules(alertMonitoringService.getAlertRules());
    }
    return success;
  };

  const addAlertRule = (rule: AlertRule) => {
    alertMonitoringService.addAlertRule(rule);
    setAlertRules(alertMonitoringService.getAlertRules());
  };

  const removeAlertRule = (ruleId: string) => {
    const success = alertMonitoringService.removeAlertRule(ruleId);
    if (success) {
      setAlertRules(alertMonitoringService.getAlertRules());
    }
    return success;
  };

  const clearRecentAlerts = () => {
    setRecentAlerts([]);
  };

  const clearRuleCooldown = (ruleId: string) => {
    alertMonitoringService.clearCooldown(ruleId);
  };

  const getCooldownStatus = () => {
    return alertMonitoringService.getCooldownStatus();
  };

  return {
    recentAlerts,
    alertRules,
    isMonitoring,
    toggleMonitoring,
    updateAlertRule,
    addAlertRule,
    removeAlertRule,
    clearRecentAlerts,
    clearRuleCooldown,
    getCooldownStatus
  };
};
