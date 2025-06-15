import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AutomationRule, RuleCondition, RuleAction, TriggerType, ActionType, ConditionOperator, FlowUserRole } from './types';
import { Plus, Save, AlertTriangle, Zap } from 'lucide-react';
import ConditionBlock from './ConditionBlock';
import ActionBlock from './ActionBlock';

interface RuleEditorProps {
  selectedRule: AutomationRule;
  onUpdateRule: (rule: AutomationRule) => void;
  onSaveRule: () => void;
  isCreating: boolean;
  userRole: FlowUserRole;
}

const RuleEditor = ({ selectedRule, onUpdateRule, onSaveRule, isCreating, userRole }: RuleEditorProps) => {
  const canEdit = userRole === 'ADMIN';

  const triggerTypes: Array<{ value: TriggerType; label: string }> = [
    { value: 'sla_breach', label: 'SLA Breach' },
    { value: 'surge_prediction', label: 'Surge Prediction' },
    { value: 'data_anomaly', label: 'Data Anomaly' },
    { value: 'threshold_exceeded', label: 'Threshold Exceeded' },
    { value: 'time_based', label: 'Time-based' }
  ];

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

  const updateCondition = (index: number, updatedCondition: RuleCondition) => {
    const updatedConditions = [...selectedRule.conditions];
    updatedConditions[index] = updatedCondition;
    onUpdateRule({ ...selectedRule, conditions: updatedConditions });
  };

  const deleteCondition = (conditionId: string) => {
    const updatedConditions = selectedRule.conditions.filter(c => c.id !== conditionId);
    onUpdateRule({ ...selectedRule, conditions: updatedConditions });
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
    <Card className="bg-card border-border backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-400" />
            <CardTitle className="text-foreground">
              {isCreating ? 'Create Automation Rule' : 'Edit Rule Configuration'}
            </CardTitle>
          </div>
          {canEdit && (
            <div className="flex items-center gap-2">
              <Button onClick={onSaveRule} size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg">
                <Save className="h-4 w-4 mr-1" />
                Save Rule
              </Button>
            </div>
          )}
        </div>
        <CardDescription>Configure conditions and actions for automated responses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-foreground text-sm font-medium">Rule Name</Label>
            <Input
              value={selectedRule.name}
              onChange={(e) => onUpdateRule({ ...selectedRule, name: e.target.value })}
              className="bg-background border-border text-foreground mt-1"
              disabled={!canEdit}
              placeholder="Descriptive rule name"
            />
          </div>
          <div>
            <Label className="text-foreground text-sm font-medium">Priority Level</Label>
            <Select
              value={selectedRule.priority}
              onValueChange={(value: any) => onUpdateRule({ ...selectedRule, priority: value })}
              disabled={!canEdit}
            >
              <SelectTrigger className="bg-background border-border text-foreground mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="critical">Critical Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-foreground text-sm font-medium">Description</Label>
          <Textarea
            value={selectedRule.description}
            onChange={(e) => onUpdateRule({ ...selectedRule, description: e.target.value })}
            className="bg-background border-border text-foreground mt-1"
            disabled={!canEdit}
            placeholder="Describe what this rule monitors and when it triggers"
            rows={3}
          />
        </div>

        <div>
          <Label className="text-foreground text-sm font-medium">Trigger Type</Label>
          <Select
            value={selectedRule.triggerType}
            onValueChange={(value: TriggerType) => onUpdateRule({ ...selectedRule, triggerType: value })}
            disabled={!canEdit}
          >
            <SelectTrigger className="bg-background border-border text-foreground mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {triggerTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className="bg-border" />

        {/* IF Conditions Section */}
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

        <Separator className="bg-border" />

        {/* THEN Actions Section */}
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
      </CardContent>
    </Card>
  );
};

export default RuleEditor;
