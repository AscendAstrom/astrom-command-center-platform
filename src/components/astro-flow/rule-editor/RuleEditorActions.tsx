
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Zap } from 'lucide-react';
import ActionBlock from '../ActionBlock';
import { AutomationRule, RuleAction } from '../types';

interface RuleEditorActionsProps {
  selectedRule: AutomationRule;
  onUpdateRule: (rule: AutomationRule) => void;
  canEdit: boolean;
}

export const RuleEditorActions = ({ selectedRule, onUpdateRule, canEdit }: RuleEditorActionsProps) => {
  const addAction = () => {
    const newAction: RuleAction = {
      id: Math.random().toString(),
      type: 'email_alert',
      config: {}
    };
    onUpdateRule({
      ...selectedRule,
      actions: [...selectedRule.actions, newAction]
    });
  };

  const updateAction = (index: number, updatedAction: RuleAction) => {
    const updatedActions = [...selectedRule.actions];
    updatedActions[index] = updatedAction;
    onUpdateRule({ ...selectedRule, actions: updatedActions });
  };

  const deleteAction = (actionId: string) => {
    const updatedActions = selectedRule.actions.filter(a => a.id !== actionId);
    onUpdateRule({ ...selectedRule, actions: updatedActions });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-purple-400 border-purple-400 bg-purple-400/10">
            THEN
          </Badge>
          <Label className="text-foreground text-sm font-medium">Actions (All will execute)</Label>
        </div>
        {canEdit && (
          <Button onClick={addAction} size="sm" variant="outline" className="border-border text-purple-400 hover:bg-purple-400/10">
            <Plus className="h-4 w-4 mr-1" />
            Add Action
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {selectedRule.actions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-border rounded-lg">
            <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No actions defined</p>
            <p className="text-xs">Add actions to execute when conditions are met</p>
          </div>
        ) : (
          selectedRule.actions.map((action, index) => (
            <ActionBlock
              key={action.id}
              action={action}
              onUpdate={(updatedAction) => updateAction(index, updatedAction)}
              onDelete={() => deleteAction(action.id)}
              canEdit={canEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};
