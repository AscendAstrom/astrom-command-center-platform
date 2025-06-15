import { useState } from 'react';
import { AutomationRule, RuleCondition, RuleAction, FlowUserRole } from './types';
import RulesList from './RulesList';
import RuleEditor from './RuleEditor';
import EmptyState from './EmptyState';

interface RuleBuilderProps {
  userRole: FlowUserRole;
}

const RuleBuilder = ({ userRole }: RuleBuilderProps) => {
  const [rules, setRules] = useState<AutomationRule[]>([]);

  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRule = () => {
    const newRule: AutomationRule = {
      id: Math.random().toString(),
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
    setRules([...rules, newRule]);
    setSelectedRule(newRule);
    setIsCreating(true);
  };

  const handleSaveRule = () => {
    if (selectedRule) {
      setRules(rules.map(rule => 
        rule.id === selectedRule.id 
          ? { ...selectedRule, updatedAt: new Date().toISOString() }
          : rule
      ));
      setIsCreating(false);
    }
  };

  const handleToggleRule = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, isActive: !rule.isActive, updatedAt: new Date().toISOString() }
        : rule
    ));
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
