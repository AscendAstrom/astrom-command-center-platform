
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle } from 'lucide-react';
import ConditionBlock from '../ConditionBlock';
import { AutomationRule, RuleCondition } from '../types';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RuleEditorConditionsProps {
  selectedRule: AutomationRule;
  onUpdateRule: (rule: AutomationRule) => void;
  canEdit: boolean;
}

export const RuleEditorConditions = ({ selectedRule, onUpdateRule, canEdit }: RuleEditorConditionsProps) => {
  const { conditionLogic = 'AND' } = selectedRule;
  
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
  
  const handleLogicChange = (logic: 'AND' | 'OR') => {
    onUpdateRule({
      ...selectedRule,
      conditionLogic: logic,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-cyan-400 border-cyan-400 bg-cyan-400/10">
            IF
          </Badge>
          <Label className="text-foreground text-sm font-medium">Conditions ({conditionLogic === 'AND' ? 'All must be true' : 'Any must be true'})</Label>
        </div>
        <div className="flex items-center gap-2">
          {canEdit && (
            <Tabs
              value={conditionLogic}
              onValueChange={(value) => handleLogicChange(value as 'AND' | 'OR')}
              className="w-[180px]"
            >
              <TabsList className="grid w-full grid-cols-2 h-9">
                <TabsTrigger value="AND">All (AND)</TabsTrigger>
                <TabsTrigger value="OR">Any (OR)</TabsTrigger>
              </TabsList>
            </Tabs>
          )}
          {canEdit && (
            <Button onClick={addCondition} size="sm" variant="outline" className="border-border text-cyan-400 hover:bg-cyan-400/10">
              <Plus className="h-4 w-4 mr-1" />
              Add Condition
            </Button>
          )}
        </div>
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
                  {conditionLogic}
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
