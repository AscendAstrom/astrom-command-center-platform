
export type FlowUserRole = 'ADMIN' | 'OPS_MANAGER' | 'EXEC' | 'VIEWER';

export type TriggerType = 'sla_breach' | 'surge_prediction' | 'data_anomaly' | 'threshold_exceeded' | 'time_based';

export type ActionType = 'email_alert' | 'slack_notification' | 'dashboard_banner' | 'api_call' | 'sms_alert' | 'webhook';

export type ConditionOperator = 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'greater_equal' | 'less_equal' | 'contains' | 'not_contains';

export interface RuleCondition {
  id: string;
  field: string;
  operator: ConditionOperator;
  value: string | number;
  logicalOperator?: 'AND' | 'OR';
}

export interface RuleAction {
  id: string;
  type: ActionType;
  config: {
    recipients?: string[];
    message?: string;
    url?: string;
    channel?: string;
    severity?: 'low' | 'medium' | 'high' | 'critical';
    template?: string;
  };
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  triggerType: TriggerType;
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  cooldownMinutes?: number;
  executionCount: number;
  lastExecuted?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface RuleExecution {
  id: string;
  ruleId: string;
  ruleName: string;
  timestamp: string;
  status: 'success' | 'failed' | 'pending';
  triggerData: Record<string, any>;
  actionsExecuted: string[];
  errorMessage?: string;
}

export interface AlertSubscription {
  id: string;
  userId: string;
  userRole: FlowUserRole;
  ruleIds: string[];
  channels: ActionType[];
  frequency: 'immediate' | 'hourly' | 'daily';
  isActive: boolean;
}

export interface DailySummary {
  id: string;
  date: string;
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  topTriggeredRules: Array<{
    ruleId: string;
    ruleName: string;
    executionCount: number;
  }>;
  insights: string[];
  recommendations: string[];
  createdAt: string;
}

export interface SurgeModelPrediction {
  id: string;
  timestamp: string;
  predictedCapacity: number;
  currentCapacity: number;
  confidenceScore: number;
  timeFrame: '1h' | '2h' | '4h' | '6h' | '12h';
  factors: string[];
  recommendations: string[];
}
