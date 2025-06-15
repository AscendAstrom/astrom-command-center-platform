
import { Database } from '@/integrations/supabase/types';

export type AutomationRuleDAO = Database['public']['Tables']['automation_rules']['Row'];
export type RuleExecutionDAO = Database['public']['Tables']['rule_executions']['Row'];
export type AlertSubscriptionDAO = Database['public']['Tables']['alert_subscriptions']['Row'];
export type DailySummaryDAO = Database['public']['Tables']['daily_summaries']['Row'];
export type SurgePredictionDAO = Database['public']['Tables']['surge_predictions']['Row'];


export interface RuleCondition {
  id: string; // For UI key purposes
  field: string; // Renamed from 'fact' to solve issue in ConditionBlock
  operator: ConditionOperator;
  value: any;
}

export type ConditionOperator =
  | 'equals'
  | 'notEquals'
  | 'greaterThan'
  | 'lessThan'
  | 'contains'
  | 'startsWith'
  | 'endsWith';

export type ActionType = 
  | 'email_alert'
  | 'slack_notification'
  | 'dashboard_banner'
  | 'api_call'
  | 'sms_alert'
  | 'webhook';

export interface RuleAction {
  id: string; // For UI key purposes
  type: ActionType;
  config: Record<string, any>;
}

export type TriggerType = 
  | 'sla_breach'
  | 'surge_prediction'
  | 'data_anomaly'
  | 'threshold_exceeded'
  | 'time_based';

export type AutomationRule = Omit<AutomationRuleDAO, 'trigger_conditions' | 'actions' | 'status' | 'id' | 'execution_count' | 'created_by'> & {
  id: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
  executionCount: number;
  createdBy: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  triggerType: TriggerType;
  last_executed: string | null;
  conditionLogic: 'AND' | 'OR';
};

export type FlowUserRole = 'ADMIN' | 'OPS_MANAGER' | 'EXEC' | 'EDITOR' | 'VIEWER' | 'ANALYST';

// New types based on schema
export interface RuleExecution extends Omit<RuleExecutionDAO, 'details'> {
  ruleName: string;
  timestamp: string;
  triggerData: Record<string, any>;
  actionsExecuted: string[];
  errorMessage?: string;
}

export type AlertSubscription = Omit<AlertSubscriptionDAO, 'user_id' | 'rule_id' | 'channels'> & {
  userId: string;
  userRole: FlowUserRole;
  ruleIds: string[];
  channels: ActionType[];
  frequency: 'immediate' | 'hourly' | 'daily';
};

export interface DailySummary {
  id: string;
  date: string;
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  topTriggeredRules: { ruleId: string; ruleName: string; executionCount: number }[];
  insights: string[];
  recommendations: string[];
  createdAt: string;
}

// This type is for the SurgePredictor component's UI and mock data.
// It should be reconciled with SurgePredictionDAO when data fetching is implemented.
export interface SurgeModelPrediction {
    id: string;
    timestamp: string;
    predictedCapacity: number;
    currentCapacity: number;
    confidenceScore: number;
    timeFrame: string;
    factors: string[];
    recommendations: string[];
}
