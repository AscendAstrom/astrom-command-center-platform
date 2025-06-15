import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AutomationRule } from '../types';
import { Database } from '@/integrations/supabase/types';

type AutomationRuleDAO = Database['public']['Tables']['automation_rules']['Row'];

const fromAutomationRuleDAO = (dao: AutomationRuleDAO): AutomationRule => ({
  ...dao,
  id: dao.id,
  description: dao.description || '',
  conditions: (dao.trigger_conditions as any)?.conditions || [],
  actions: (dao.actions as any)?.actions || [],
  isActive: dao.status === 'ACTIVE',
  executionCount: dao.execution_count || 0,
  createdBy: dao.created_by || 'system',
  last_executed: dao.last_executed,
  priority: (dao.trigger_conditions as any)?.priority || 'medium',
  triggerType: (dao.trigger_conditions as any)?.triggerType || 'threshold_exceeded',
  conditionLogic: (dao.trigger_conditions as any)?.logic || 'AND',
} as AutomationRule);

const toAutomationRuleDAO = (rule: Partial<AutomationRule>) => {
    const status: 'ACTIVE' | 'DRAFT' = rule.isActive ? 'ACTIVE' : 'DRAFT';
    return {
        name: rule.name,
        description: rule.description,
        trigger_conditions: {
            conditions: rule.conditions,
            priority: rule.priority,
            triggerType: rule.triggerType,
            logic: rule.conditionLogic,
        } as any,
        actions: { actions: rule.actions } as any,
        status: status,
    }
};


export const useAutomationRules = () => {
  const queryClient = useQueryClient();

  const { data: rules = [], isLoading, error, refetch } = useQuery<AutomationRule[]>({
    queryKey: ['automation_rules'],
    queryFn: async () => {
      const { data, error } = await supabase.from('automation_rules').select('*');
      if (error) throw error;
      return data.map(fromAutomationRuleDAO);
    },
  });

  const createRuleMutation = useMutation({
    mutationFn: async (newRule: Omit<AutomationRule, 'id' | 'created_at' | 'updated_at' | 'executionCount' | 'createdBy' | 'last_executed'>) => {
      const dao = toAutomationRuleDAO(newRule);
      const { data, error } = await supabase.from('automation_rules').insert(dao).select().single();
      if (error) throw error;
      return fromAutomationRuleDAO(data as AutomationRuleDAO);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automation_rules'] });
    },
  });

  const updateRuleMutation = useMutation({
    mutationFn: async (rule: AutomationRule) => {
      const dao = toAutomationRuleDAO(rule);
      const { data, error } = await supabase.from('automation_rules').update(dao).eq('id', rule.id).select().single();
      if (error) throw error;
      return fromAutomationRuleDAO(data as AutomationRuleDAO);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automation_rules'] });
    },
  });

  const deleteRuleMutation = useMutation({
    mutationFn: async (ruleId: string) => {
      const { error } = await supabase.from('automation_rules').delete().eq('id', ruleId);
      if (error) throw error;
      return ruleId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automation_rules'] });
    },
  });

  return {
    rules,
    isLoading,
    error,
    createRule: createRuleMutation.mutateAsync,
    updateRule: updateRuleMutation.mutateAsync,
    deleteRule: deleteRuleMutation.mutateAsync,
    refetchRules: refetch,
  };
};
