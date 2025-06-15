
import { Database } from '@/integrations/supabase/types';

export type AutomationRuleDAO = Database['public']['Tables']['automation_rules']['Row'];

export interface RuleCondition {
  fact: string;
  operator: string;
  value: any;
}

export type ActionType = 
  | 'email_alert'
  | 'slack_notification'
  | 'dashboard_banner'
  | 'api_call'
  | 'sms_alert'
  | 'webhook';

export interface RuleAction {
  type: ActionType;
  config: Record<string, any>;
}

export type AutomationRule = Omit<AutomationRuleDAO, 'trigger_conditions' | 'actions' | 'status' | 'id'> & {
  id: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
  executionCount: number;
  createdBy: string;
  priority: 'low' | 'medium' | 'high';
  triggerType: string;
};

export type FlowUserRole = 'admin' | 'editor' | 'viewer';
