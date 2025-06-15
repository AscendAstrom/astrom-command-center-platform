
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle } from 'lucide-react';
import ConditionBlock from '../ConditionBlock';
import { AutomationRule, RuleCondition } from '../types';

interface RuleEditorConditionsProps {
  selectedRule: AutomationRule;
  onUpdateRule: (rule: AutomationRule) => void;
  canEdit: boolean;
}

export const RuleEditorConditions = ({ selectedRule, onUpdateRule, canEdit }: RuleEditorConditionsProps) => {
  const addCondition = () => {
    const newCondition: RuleCondition = {
      id: Math.random().toString(),
      field: '',
      operator: 'equals',
      value: ''
    };
    onUpdateRule({
      ...selectedRule,
      conditions: [...selectedRule.conditions, newCondition]
    });
  };

  const updateCondition = (index: number, updatedCondition: RuleCondition) => {
    const updatedConditions = [...selectedRule.conditions];
    updatedConditions[index] = updatedCondition;
    onUpdateRule({ ...selectedRule, conditions: updatedConditions });
  };

  const deleteCondition = (conditionId: string) => {
    const updatedConditions = selectedRule.conditions.filter(c => c.id !== conditionId);
    onUpdateRule({ ...selectedRule, conditions: updatedConditions });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-cyan-400 border-cyan-400 bg-cyan-400/10">
            IF
          </Badge>
          <Label className="text-foreground text-sm font-medium">Conditions (All must be true)</Label>
        </div>
        {canEdit && (
          <Button onClick={addCondition} size="sm" variant="outline" className="border-border text-cyan-400 hover:bg-cyan-400/10">
            <Plus className="h-4 w-4 mr-1" />
            Add Condition
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {selectedRule.conditions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-border rounded-lg">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No conditions defined</p>
            <p className="text-xs">Add conditions to trigger this rule</p>
          </div>
        ) : (
          selectedRule.conditions.map((condition, index) => (
            <div key={condition.id} className="flex items-center gap-3">
              {index > 0 && (
                <Badge variant="outline" className="text-muted-foreground border-border bg-background">
                  AND
                </Badge>
              )}
              <div className="flex-1">
                <ConditionBlock
                  condition={condition}
                  onUpdate={(updatedCondition) => updateCondition(index, updatedCondition)}
                  onDelete={() => deleteCondition(condition.id)}
                  canEdit={canEdit}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
