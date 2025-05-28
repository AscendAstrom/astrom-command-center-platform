
import { useState, useEffect } from 'react';
import { automationService } from '@/services/automationService';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { AutomationRule, RuleCondition, RuleAction, FlowUserRole } from './types';
import RulesList from './RulesList';
import RuleEditor from './RuleEditor';
import EmptyState from './EmptyState';
import type { Tables } from '@/integrations/supabase/types';

type DBAutomationRule = Tables<'automation_rules'>;

interface RuleBuilderProps {
  userRole: FlowUserRole;
}

const RuleBuilder = ({ userRole }: RuleBuilderProps) => {
  const { data: realtimeRules, loading } = useRealTimeData<DBAutomationRule>({
    table: 'automation_rules'
  });

  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // Transform database rules to match component interface
    const transformedRules: AutomationRule[] = realtimeRules.map(rule => ({
      id: rule.id,
      name: rule.name,
      description: rule.description || '',
      triggerType: 'sla_breach', // Default value
      conditions: (rule.trigger_conditions as any)?.conditions || [],
      actions: (rule.actions as any) || [],
      isActive: rule.status === 'ACTIVE',
      priority: 'medium', // Default value
      cooldownMinutes: 15, // Default value
      executionCount: rule.execution_count || 0,
      lastExecuted: rule.last_execution || undefined,
      createdBy: rule.created_by || '',
      createdAt: rule.created_at,
      updatedAt: rule.updated_at
    }));
    
    setRules(transformedRules);
  }, [realtimeRules]);

  const handleCreateRule = async () => {
    try {
      const { data, error } = await automationService.create({
        name: 'New Rule',
        description: '',
        trigger_conditions: { conditions: [] },
        actions: []
      });

      if (error) throw error;
      if (data) {
        const newRule: AutomationRule = {
          id: data.id,
          name: data.name,
          description: data.description || '',
          triggerType: 'threshold_exceeded',
          conditions: [],
          actions: [],
          isActive: false,
          priority: 'medium',
          executionCount: 0,
          createdBy: 'current_user',
          createdAt: data.created_at,
          updatedAt: data.updated_at
        };
        setSelectedRule(newRule);
        setIsCreating(true);
      }
    } catch (error) {
      console.error('Error creating rule:', error);
    }
  };

  const handleSaveRule = async () => {
    if (selectedRule) {
      try {
        const { error } = await automationService.update(selectedRule.id, {
          name: selectedRule.name,
          description: selectedRule.description,
          trigger_conditions: { conditions: selectedRule.conditions },
          actions: selectedRule.actions,
          status: selectedRule.isActive ? 'ACTIVE' : 'DRAFT'
        });

        if (error) throw error;
        setIsCreating(false);
      } catch (error) {
        console.error('Error saving rule:', error);
      }
    }
  };

  const handleToggleRule = async (ruleId: string) => {
    try {
      const { error } = await automationService.toggleStatus(ruleId);
      if (error) throw error;
    } catch (error) {
      console.error('Error toggling rule:', error);
    }
  };

  const handleUpdateRule = (updatedRule: AutomationRule) => {
    setSelectedRule(updatedRule);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Rules List */}
      <div className="lg:col-span-1">
        <RulesList
          rules={rules}
          selectedRule={selectedRule}
          onSelectRule={setSelectedRule}
          onCreateRule={handleCreateRule}
          onToggleRule={handleToggleRule}
          userRole={userRole}
          loading={loading}
        />
      </div>

      {/* Rule Editor */}
      <div className="lg:col-span-2">
        {selectedRule ? (
          <RuleEditor
            selectedRule={selectedRule}
            onUpdateRule={handleUpdateRule}
            onSaveRule={handleSaveRule}
            isCreating={isCreating}
            userRole={userRole}
          />
        ) : (
          <EmptyState
            onCreateRule={handleCreateRule}
            userRole={userRole}
          />
        )}
      </div>
    </div>
  );
};

export default RuleBuilder;
