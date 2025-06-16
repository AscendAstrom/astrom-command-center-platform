
import { useEffect, useState } from 'react';
import { alertMonitoringService, TriggeredAlert, AlertRule } from '@/services/alerts/alertMonitoringService';
import { analyticsService } from '@/services/analytics';
import { AnalyticsData } from '@/services/analytics/types';

export const useAlertMonitoring = () => {
  const [recentAlerts, setRecentAlerts] = useState<TriggeredAlert[]>([]);
  const [alertRules, setAlertRules] = useState<AlertRule[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);

  useEffect(() => {
    // Generate mock alert rules
    const mockRules: AlertRule[] = [
      {
        id: 'rule-1',
        condition: 'greater_than',
        threshold: 45,
        severity: 'HIGH',
        isActive: true,
        triggerCount: 12,
        createdAt: new Date('2024-01-15'),
        cooldownMinutes: 30,
        metric: 'avgWaitTime',
        message: 'Emergency Department wait time has exceeded threshold',
        priority: 'HIGH',
        enabled: true
      },
      {
        id: 'rule-2',
        condition: 'greater_than',
        threshold: 90,
        severity: 'CRITICAL',
        isActive: true,
        triggerCount: 8,
        createdAt: new Date('2024-01-20'),
        cooldownMinutes: 60,
        metric: 'bedUtilization',
        message: 'ICU bed utilization exceeds safe capacity levels',
        priority: 'CRITICAL',
        enabled: true
      },
      {
        id: 'rule-3',
        condition: 'less_than',
        threshold: 25,
        severity: 'MEDIUM',
        isActive: true,
        triggerCount: 15,
        createdAt: new Date('2024-02-01'),
        cooldownMinutes: 120,
        metric: 'staffOnDuty',
        message: 'Staffing levels below recommended ratios',
        priority: 'MEDIUM',
        enabled: true
      },
      {
        id: 'rule-4',
        condition: 'greater_than',
        threshold: 5,
        severity: 'HIGH',
        isActive: false,
        triggerCount: 3,
        createdAt: new Date('2024-02-10'),
        cooldownMinutes: 15,
        metric: 'equipmentDown',
        message: 'Multiple equipment failures detected',
        priority: 'HIGH',
        enabled: false
      }
    ];

    setAlertRules(mockRules);

    // Generate mock recent alerts
    const mockAlerts: TriggeredAlert[] = [
      {
        ruleId: 'rule-1',
        message: 'Emergency Department wait time has exceeded 45 minutes (current: 52 minutes)',
        severity: 'HIGH',
        triggeredAt: new Date(Date.now() - 1800000), // 30 minutes ago
        acknowledgedAt: new Date(Date.now() - 900000), // 15 minutes ago
        resolvedAt: null,
        metadata: { currentWaitTime: 52, threshold: 45, department: 'Emergency' },
        metric: 'avgWaitTime',
        currentValue: 52,
        threshold: 45,
        timestamp: new Date(Date.now() - 1800000),
        priority: 'HIGH'
      },
      {
        ruleId: 'rule-2',
        message: 'ICU bed utilization at 94% - approaching critical capacity',
        severity: 'CRITICAL',
        triggeredAt: new Date(Date.now() - 3600000), // 1 hour ago
        acknowledgedAt: new Date(Date.now() - 2700000), // 45 minutes ago
        resolvedAt: new Date(Date.now() - 1200000), // 20 minutes ago
        metadata: { currentUtilization: 94, threshold: 90, department: 'ICU' },
        metric: 'bedUtilization',
        currentValue: 94,
        threshold: 90,
        timestamp: new Date(Date.now() - 3600000),
        priority: 'CRITICAL'
      },
      {
        ruleId: 'rule-3',
        message: 'Nursing staff count below recommended levels (22 active, 25 required)',
        severity: 'MEDIUM',
        triggeredAt: new Date(Date.now() - 7200000), // 2 hours ago
        acknowledgedAt: null,
        resolvedAt: null,
        metadata: { currentStaff: 22, threshold: 25, shift: 'Day' },
        metric: 'staffOnDuty',
        currentValue: 22,
        threshold: 25,
        timestamp: new Date(Date.now() - 7200000),
        priority: 'MEDIUM'
      }
    ];

    setRecentAlerts(mockAlerts);
    setIsMonitoring(true);
  }, []);

  const toggleMonitoring = () => {
    setIsMonitoring(prev => !prev);
  };

  const updateAlertRule = (ruleId: string, updates: Partial<AlertRule>) => {
    setAlertRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, ...updates } : rule
    ));
    return true;
  };

  const addAlertRule = (rule: AlertRule) => {
    setAlertRules(prev => [...prev, rule]);
  };

  const removeAlertRule = (ruleId: string) => {
    setAlertRules(prev => prev.filter(rule => rule.id !== ruleId));
    return true;
  };

  const clearRecentAlerts = () => {
    setRecentAlerts([]);
  };

  const clearRuleCooldown = (ruleId: string) => {
    updateAlertRule(ruleId, {});
  };

  const getCooldownStatus = () => {
    const cooldownMap = new Map();
    alertRules.forEach(rule => {
      if (rule.cooldownMinutes) {
        cooldownMap.set(rule.id, {
          isInCooldown: false,
          remainingMinutes: 0,
          nextAllowed: new Date()
        });
      }
    });
    return cooldownMap;
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
