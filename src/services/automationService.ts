
import { supabase } from '@/integrations/supabase/client';
import { auditService } from './auditService';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type AutomationRule = Tables<'automation_rules'>;
type AutomationRuleInsert = TablesInsert<'automation_rules'>;
type AutomationRuleUpdate = TablesUpdate<'automation_rules'>;

export const automationService = {
  async getAll() {
    const { data, error } = await supabase
      .from('automation_rules')
      .select('*')
      .order('created_at', { ascending: false });

    return { data, error };
  },

  async getActive() {
    const { data, error } = await supabase
      .from('automation_rules')
      .select('*')
      .eq('status', 'ACTIVE')
      .order('name');

    return { data, error };
  },

  async create(rule: Omit<AutomationRuleInsert, 'id' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('automation_rules')
      .insert({
        ...rule,
        created_by: user?.id,
        status: 'DRAFT',
        execution_count: 0
      })
      .select()
      .single();

    if (!error && data) {
      await auditService.log({
        action: 'CREATE',
        resource_type: 'automation_rule',
        resource_id: data.id,
        details: { name: rule.name },
      });
    }

    return { data, error };
  },

  async update(id: string, updates: AutomationRuleUpdate) {
    const { data, error } = await supabase
      .from('automation_rules')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      await auditService.log({
        action: 'UPDATE',
        resource_type: 'automation_rule',
        resource_id: id,
        details: updates,
      });
    }

    return { data, error };
  },

  async execute(id: string) {
    const { data: rule } = await supabase
      .from('automation_rules')
      .select('*')
      .eq('id', id)
      .single();

    if (rule) {
      const { data, error } = await supabase
        .from('automation_rules')
        .update({
          execution_count: (rule.execution_count || 0) + 1,
          last_execution: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (!error) {
        await auditService.log({
          action: 'EXECUTE',
          resource_type: 'automation_rule',
          resource_id: id,
          details: { execution_count: (rule.execution_count || 0) + 1 },
        });
      }

      return { data, error };
    }

    return { data: null, error: { message: 'Rule not found' } };
  },

  async toggleStatus(id: string) {
    const { data: currentRule } = await supabase
      .from('automation_rules')
      .select('status')
      .eq('id', id)
      .single();

    if (currentRule) {
      const newStatus = currentRule.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
      return this.update(id, { status: newStatus });
    }

    return { data: null, error: { message: 'Rule not found' } };
  }
};
