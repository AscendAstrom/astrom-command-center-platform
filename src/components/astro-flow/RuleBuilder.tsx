
import { useState } from 'react';
import { AutomationRule } from './types';
import RulesList from './RulesList';
import RuleEditor from './RuleEditor';
import EmptyState from './EmptyState';
import { useAutomationRules } from './hooks/useAutomationRules';
import { toast } from "sonner";

interface RuleBuilderProps {
  userRole: FlowUserRole;
}

const RuleBuilder = ({ userRole }: RuleBuilderProps) => {
  const { rules, createRule, updateRule, isLoading } = useAutomationRules();
  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRule = () => {
    const newRule: AutomationRule = {
      id: '', // Will be set by db
      name: 'New Rule',
      description: '',
      triggerType: 'threshold_exceeded',
      conditions: [],
      actions: [],
      isActive: false,
      priority: 'medium',
      executionCount: 0,
      createdBy: 'current_user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSelectedRule(newRule);
    setIsCreating(true);
  };

  const handleSaveRule = async () => {
    if (selectedRule) {
      try {
        if (isCreating) {
          const { id, createdAt, updatedAt, createdBy, executionCount, ...newRuleData } = selectedRule;
          await createRule(newRuleData);
          toast.success("Rule created successfully.");
        } else {
          await updateRule(selectedRule);
          toast.success("Rule updated successfully.");
        }
        setIsCreating(false);
        setSelectedRule(null); // Deselect after saving
      } catch (error) {
        toast.error("Failed to save the rule.");
        console.error(error);
      }
    }
  };

  const handleToggleRule = async (ruleId: string) => {
    const rule = rules.find(r => r.id === ruleId);
    if (rule) {
      try {
        await updateRule({ ...rule, isActive: !rule.isActive });
        toast.success(`Rule ${rule.isActive ? 'deactivated' : 'activated'}.`);
      } catch (error) {
        toast.error("Failed to toggle rule status.");
        console.error(error);
      }
    }
  };

  const handleUpdateRule = (updatedRule: AutomationRule) => {
    setSelectedRule(updatedRule);
  };
  
  if (isLoading) {
    return <div>Loading rules...</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Rules List */}
      <div className="lg:col-span-1">
        <RulesList
          rules={rules}
          selectedRule={selectedRule}
          onSelectRule={(rule) => { setSelectedRule(rule); setIsCreating(false); }}
          onCreateRule={handleCreateRule}
          onToggleRule={handleToggleRule}
          userRole={userRole}
        />
      </div>

      {/* Rule Editor */}
      <div className="lg:col-span-2">
        {selectedRule ? (
          <RuleEditor
            key={selectedRule.id || 'new-rule'}
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
