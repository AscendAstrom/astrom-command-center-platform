
import { definitions } from '@/integrations/supabase/types';

export interface RuleCondition {
  fact: string;
  operator: string;
  value: any;
}

export interface RuleAction {
  type: string;
  params: Record<string, any>;
}

export type AutomationRule = Omit<definitions['automation_rules'], 'trigger_conditions' | 'actions' | 'status' | 'id'> & {
  id: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
};

export type FlowUserRole = 'admin' | 'editor' | 'viewer';
