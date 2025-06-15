
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AutomationRule } from '../types';
import { definitions } from '@/integrations/supabase/types';

type AutomationRuleDAO = definitions['automation_rules'];

const fromAutomationRuleDAO = (dao: AutomationRuleDAO): AutomationRule => ({
  ...dao,
  id: dao.id,
  description: dao.description || '',
  conditions: (dao.trigger_conditions as any)?.conditions || [],
  actions: (dao.actions as any) || [],
  isActive: dao.status === 'ACTIVE',
  executionCount: dao.execution_count || 0,
  createdBy: dao.created_by || 'system',
  createdAt: dao.created_at,
  updatedAt: dao.updated_at,
  priority: 'medium', // Not in DB, but in UI type.
  triggerType: 'threshold_exceeded', // Not in DB
});

const toAutomationRuleDAO = (rule: Partial<AutomationRule>): Partial<AutomationRuleDAO> => ({
    name: rule.name,
    description: rule.description,
    trigger_conditions: { conditions: rule.conditions } as any,
    actions: rule.actions as any,
    status: rule.isActive ? 'ACTIVE' : 'DRAFT',
});


export const useAutomationRules = () => {
  const queryClient = useQueryClient();

  const { data: rules = [], isLoading, error } = useQuery<AutomationRule[]>({
    queryKey: ['automation_rules'],
    queryFn: async () => {
      const { data, error } = await supabase.from('automation_rules').select('*');
      if (error) throw error;
      return data.map(fromAutomationRuleDAO);
    },
  });

  const createRuleMutation = useMutation({
    mutationFn: async (newRule: Omit<AutomationRule, 'id' | 'createdAt' | 'updatedAt' | 'executionCount' | 'createdBy'>) => {
      const dao = toAutomationRuleDAO(newRule);
      const { data, error } = await supabase.from('automation_rules').insert(dao).single();
      if (error) throw error;
      return fromAutomationRuleDAO(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automation_rules'] });
    },
  });

  const updateRuleMutation = useMutation({
    mutationFn: async (rule: AutomationRule) => {
      const dao = toAutomationRuleDAO(rule);
      const { data, error } = await supabase.from('automation_rules').update(dao).eq('id', rule.id).single();
      if (error) throw error;
      return fromAutomationRuleDAO(data);
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
  };
};
