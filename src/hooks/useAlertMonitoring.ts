
import { useEffect, useState } from 'react';
import { alertMonitoringService, TriggeredAlert, AlertRule } from '@/services/alerts/alertMonitoringService';
import { analyticsService } from '@/services/analytics';
import { AnalyticsData } from '@/services/analytics/types';

export const useAlertMonitoring = () => {
  const [recentAlerts, setRecentAlerts] = useState<TriggeredAlert[]>([]);
  const [alertRules, setAlertRules] = useState<AlertRule[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    // Return empty alert rules
    setAlertRules([]);

    // No alerts to subscribe to
    setRecentAlerts([]);
    setIsMonitoring(false);
  }, []);

  const toggleMonitoring = () => {
    setIsMonitoring(prev => !prev);
  };

  const updateAlertRule = (ruleId: string, updates: Partial<AlertRule>) => {
    return false; // No rules to update
  };

  const addAlertRule = (rule: AlertRule) => {
    // No operation - empty state
  };

  const removeAlertRule = (ruleId: string) => {
    return false; // No rules to remove
  };

  const clearRecentAlerts = () => {
    setRecentAlerts([]);
  };

  const clearRuleCooldown = (ruleId: string) => {
    // No operation - empty state
  };

  const getCooldownStatus = () => {
    return new Map(); // Return empty Map instead of empty object
  };

  return {
    recentAlerts: [],
    alertRules: [],
    isMonitoring: false,
    toggleMonitoring,
    updateAlertRule,
    addAlertRule,
    removeAlertRule,
    clearRecentAlerts,
    clearRuleCooldown,
    getCooldownStatus
  };
};
