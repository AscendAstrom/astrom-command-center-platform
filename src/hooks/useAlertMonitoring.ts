
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
        name: 'High ED Wait Time',
        condition: 'avgWaitTime > 45',
        threshold: 45,
        severity: 'HIGH',
        isActive: true,
        triggerCount: 12,
        lastTriggered: new Date(Date.now() - 3600000), // 1 hour ago
        createdAt: new Date('2024-01-15'),
        cooldownMinutes: 30
      },
      {
        id: 'rule-2',
        name: 'ICU Capacity Alert',
        condition: 'bedUtilization > 90',
        threshold: 90,
        severity: 'CRITICAL',
        isActive: true,
        triggerCount: 8,
        lastTriggered: new Date(Date.now() - 7200000), // 2 hours ago
        createdAt: new Date('2024-01-20'),
        cooldownMinutes: 60
      },
      {
        id: 'rule-3',
        name: 'Staff Shortage Warning',
        condition: 'staffOnDuty < 25',
        threshold: 25,
        severity: 'MEDIUM',
        isActive: true,
        triggerCount: 15,
        lastTriggered: new Date(Date.now() - 14400000), // 4 hours ago
        createdAt: new Date('2024-02-01'),
        cooldownMinutes: 120
      },
      {
        id: 'rule-4',
        name: 'Equipment Malfunction',
        condition: 'equipmentDown > 5',
        threshold: 5,
        severity: 'HIGH',
        isActive: false,
        triggerCount: 3,
        lastTriggered: new Date(Date.now() - 86400000), // 1 day ago
        createdAt: new Date('2024-02-10'),
        cooldownMinutes: 15
      }
    ];

    setAlertRules(mockRules);

    // Generate mock recent alerts
    const mockAlerts: TriggeredAlert[] = [
      {
        id: 'alert-1',
        ruleId: 'rule-1',
        ruleName: 'High ED Wait Time',
        message: 'Emergency Department wait time has exceeded 45 minutes (current: 52 minutes)',
        severity: 'HIGH',
        triggeredAt: new Date(Date.now() - 1800000), // 30 minutes ago
        acknowledgedAt: new Date(Date.now() - 900000), // 15 minutes ago
        resolvedAt: null,
        metadata: { currentWaitTime: 52, threshold: 45, department: 'Emergency' }
      },
      {
        id: 'alert-2',
        ruleId: 'rule-2',
        ruleName: 'ICU Capacity Alert',
        message: 'ICU bed utilization at 94% - approaching critical capacity',
        severity: 'CRITICAL',
        triggeredAt: new Date(Date.now() - 3600000), // 1 hour ago
        acknowledgedAt: new Date(Date.now() - 2700000), // 45 minutes ago
        resolvedAt: new Date(Date.now() - 1200000), // 20 minutes ago
        metadata: { currentUtilization: 94, threshold: 90, department: 'ICU' }
      },
      {
        id: 'alert-3',
        ruleId: 'rule-3',
        ruleName: 'Staff Shortage Warning',
        message: 'Nursing staff count below recommended levels (22 active, 25 required)',
        severity: 'MEDIUM',
        triggeredAt: new Date(Date.now() - 7200000), // 2 hours ago
        acknowledgedAt: null,
        resolvedAt: null,
        metadata: { currentStaff: 22, threshold: 25, shift: 'Day' }
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
    updateAlertRule(ruleId, { lastTriggered: undefined });
  };

  const getCooldownStatus = () => {
    const cooldownMap = new Map();
    alertRules.forEach(rule => {
      if (rule.lastTriggered && rule.cooldownMinutes) {
        const cooldownEnd = new Date(rule.lastTriggered.getTime() + rule.cooldownMinutes * 60000);
        const isInCooldown = new Date() < cooldownEnd;
        cooldownMap.set(rule.id, {
          isInCooldown,
          remainingMinutes: isInCooldown ? Math.ceil((cooldownEnd.getTime() - Date.now()) / 60000) : 0
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
