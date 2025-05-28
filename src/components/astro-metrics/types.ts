
export interface KPIDefinition {
  id: string;
  name: string;
  description: string;
  category: 'operational' | 'clinical' | 'financial' | 'quality';
  unit: string;
  formula: string;
  visualLogic: MetricLogicStep[];
  thresholds: KPIThreshold[];
  status: 'draft' | 'active' | 'deprecated';
  createdBy: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
}

export interface MetricLogicStep {
  id: string;
  type: 'data_source' | 'filter' | 'aggregate' | 'calculate' | 'condition';
  config: Record<string, any>;
  order: number;
  description: string;
}

export interface KPIThreshold {
  id: string;
  name: string;
  condition: 'greater_than' | 'less_than' | 'equals' | 'between';
  value: number;
  upperValue?: number;
  severity: 'info' | 'warning' | 'critical';
  color: string;
}

export interface SLAConfiguration {
  id: string;
  name: string;
  description: string;
  zoneId?: string;
  zoneName?: string;
  metricType: 'wait_time' | 'throughput' | 'utilization' | 'response_time';
  threshold: number;
  unit: 'minutes' | 'hours' | 'percentage' | 'count';
  timeWindow: 'real_time' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  alertEnabled: boolean;
  escalationRules: EscalationRule[];
  status: 'active' | 'paused' | 'disabled';
  createdAt: string;
  updatedAt: string;
}

export interface EscalationRule {
  id: string;
  delay: number;
  delayUnit: 'minutes' | 'hours';
  recipients: AlertRecipient[];
  actions: AlertAction[];
}

export interface AlertRecipient {
  type: 'email' | 'sms' | 'webhook';
  address: string;
  name?: string;
}

export interface AlertAction {
  type: 'notification' | 'webhook' | 'api_call';
  config: Record<string, any>;
}

export interface KPIBreach {
  id: string;
  kpiId: string;
  kpiName: string;
  currentValue: number;
  thresholdValue: number;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolved: boolean;
  resolvedAt?: string;
}

export interface DataAccessRule {
  id: string;
  roleType: 'admin' | 'analyst' | 'viewer';
  permissions: {
    canCreate: boolean;
    canEdit: boolean;
    canApprove: boolean;
    canDelete: boolean;
    canViewAll: boolean;
  };
  restrictions: {
    allowedKPICategories: string[];
    allowedZones: string[];
    dataRetentionDays: number;
  };
}

export type MetricsUserRole = 'ADMIN' | 'ANALYST' | 'VIEWER' | 'DATA_ENGINEER';
