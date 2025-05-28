import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AutomationRule, RuleCondition, RuleAction, TriggerType, ActionType, ConditionOperator, FlowUserRole } from './types';
import { Plus, Trash2, Save, Play, Pause, Copy, Zap, AlertTriangle } from 'lucide-react';
import ConditionBlock from './ConditionBlock';
import ActionBlock from './ActionBlock';

interface RuleBuilderProps {
  userRole: FlowUserRole;
}

const RuleBuilder = ({ userRole }: RuleBuilderProps) => {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'SLA Breach Alert',
      description: 'Alert when patient wait time exceeds SLA threshold',
      triggerType: 'sla_breach',
      conditions: [
        {
          id: '1',
          field: 'wait_time_minutes',
          operator: 'greater_than',
          value: 45
        }
      ],
      actions: [
        {
          id: '1',
          type: 'email_alert',
          config: {
            recipients: ['ed-manager@hospital.com'],
            message: 'SLA breach detected: Patient wait time exceeded threshold',
            severity: 'high'
          }
        }
      ],
      isActive: true,
      priority: 'high',
      cooldownMinutes: 15,
      executionCount: 47,
      lastExecuted: '2024-01-20T14:30:00Z',
      createdBy: 'admin',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-20T14:30:00Z'
    }
  ]);

  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const canEdit = userRole === 'ADMIN';

  const triggerTypes: Array<{ value: TriggerType; label: string }> = [
    { value: 'sla_breach', label: 'SLA Breach' },
    { value: 'surge_prediction', label: 'Surge Prediction' },
    { value: 'data_anomaly', label: 'Data Anomaly' },
    { value: 'threshold_exceeded', label: 'Threshold Exceeded' },
    { value: 'time_based', label: 'Time-based' }
  ];

  const actionTypes: Array<{ value: ActionType; label: string }> = [
    { value: 'email_alert', label: 'Email Alert' },
    { value: 'slack_notification', label: 'Slack Notification' },
    { value: 'dashboard_banner', label: 'Dashboard Banner' },
    { value: 'api_call', label: 'API Call' },
    { value: 'sms_alert', label: 'SMS Alert' },
    { value: 'webhook', label: 'Webhook' }
  ];

  const operators: Array<{ value: ConditionOperator; label: string }> = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'greater_equal', label: 'Greater or Equal' },
    { value: 'less_equal', label: 'Less or Equal' },
    { value: 'contains', label: 'Contains' },
    { value: 'not_contains', label: 'Does Not Contain' }
  ];

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

  const addCondition = () => {
    if (selectedRule) {
      const newCondition: RuleCondition = {
        id: Math.random().toString(),
        field: '',
        operator: 'equals',
        value: ''
      };
      setSelectedRule({
        ...selectedRule,
        conditions: [...selectedRule.conditions, newCondition]
      });
    }
  };

  const addAction = () => {
    if (selectedRule) {
      const newAction: RuleAction = {
        id: Math.random().toString(),
        type: 'email_alert',
        config: {}
      };
      setSelectedRule({
        ...selectedRule,
        actions: [...selectedRule.actions, newAction]
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Rules List */}
      <div className="lg:col-span-1">
        <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-cyan-400" />
                <CardTitle className="text-white">Automation Rules</CardTitle>
              </div>
              {canEdit && (
                <Button onClick={handleCreateRule} size="sm" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg">
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
            <CardDescription>Click to configure automation rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  selectedRule?.id === rule.id
                    ? 'border-cyan-500 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 shadow-lg'
                    : 'border-slate-700 hover:border-slate-600 hover:bg-slate-800/50'
                }`}
                onClick={() => setSelectedRule(rule)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${rule.isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
                    <h3 className="font-medium text-white">{rule.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(rule.priority)} variant="secondary">
                      {rule.priority}
                    </Badge>
                    {canEdit && (
                      <Switch
                        checked={rule.isActive}
                        onCheckedChange={() => handleToggleRule(rule.id)}
                      />
                    )}
                  </div>
                </div>
                <p className="text-xs text-slate-400 mb-3 line-clamp-2">{rule.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 capitalize">{rule.triggerType.replace('_', ' ')}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400">{rule.conditions.length} conditions</span>
                    <span className="text-purple-400">{rule.actions.length} actions</span>
                    <span className="text-green-400">{rule.executionCount} runs</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Rule Editor */}
      <div className="lg:col-span-2">
        {selectedRule ? (
          <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <CardTitle className="text-white">
                    {isCreating ? 'Create Automation Rule' : 'Edit Rule Configuration'}
                  </CardTitle>
                </div>
                {canEdit && (
                  <div className="flex items-center gap-2">
                    <Button onClick={handleSaveRule} size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg">
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
                  <Label className="text-slate-300 text-sm font-medium">Rule Name</Label>
                  <Input
                    value={selectedRule.name}
                    onChange={(e) => setSelectedRule({ ...selectedRule, name: e.target.value })}
                    className="bg-slate-800/50 border-slate-700 text-white mt-1"
                    disabled={!canEdit}
                    placeholder="Descriptive rule name"
                  />
                </div>
                <div>
                  <Label className="text-slate-300 text-sm font-medium">Priority Level</Label>
                  <Select
                    value={selectedRule.priority}
                    onValueChange={(value: any) => setSelectedRule({ ...selectedRule, priority: value })}
                    disabled={!canEdit}
                  >
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="critical">Critical Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-slate-300 text-sm font-medium">Description</Label>
                <Textarea
                  value={selectedRule.description}
                  onChange={(e) => setSelectedRule({ ...selectedRule, description: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white mt-1"
                  disabled={!canEdit}
                  placeholder="Describe what this rule monitors and when it triggers"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-slate-300 text-sm font-medium">Trigger Type</Label>
                <Select
                  value={selectedRule.triggerType}
                  onValueChange={(value: TriggerType) => setSelectedRule({ ...selectedRule, triggerType: value })}
                  disabled={!canEdit}
                >
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {triggerTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-slate-700" />

              {/* IF Conditions Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-cyan-400 border-cyan-400 bg-cyan-400/10">
                      IF
                    </Badge>
                    <Label className="text-slate-300 text-sm font-medium">Conditions (All must be true)</Label>
                  </div>
                  {canEdit && (
                    <Button onClick={addCondition} size="sm" variant="outline" className="border-slate-600 text-cyan-400 hover:bg-cyan-400/10">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Condition
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {selectedRule.conditions.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-700 rounded-lg">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No conditions defined</p>
                      <p className="text-xs">Add conditions to trigger this rule</p>
                    </div>
                  ) : (
                    selectedRule.conditions.map((condition, index) => (
                      <div key={condition.id} className="flex items-center gap-3">
                        {index > 0 && (
                          <Badge variant="outline" className="text-slate-400 border-slate-600 bg-slate-800/50">
                            AND
                          </Badge>
                        )}
                        <div className="flex-1">
                          <ConditionBlock
                            condition={condition}
                            onUpdate={(updatedCondition) => {
                              const updatedConditions = [...selectedRule.conditions];
                              updatedConditions[index] = updatedCondition;
                              setSelectedRule({ ...selectedRule, conditions: updatedConditions });
                            }}
                            onDelete={() => {
                              const updatedConditions = selectedRule.conditions.filter(c => c.id !== condition.id);
                              setSelectedRule({ ...selectedRule, conditions: updatedConditions });
                            }}
                            canEdit={canEdit}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* THEN Actions Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-purple-400 border-purple-400 bg-purple-400/10">
                      THEN
                    </Badge>
                    <Label className="text-slate-300 text-sm font-medium">Actions (All will execute)</Label>
                  </div>
                  {canEdit && (
                    <Button onClick={addAction} size="sm" variant="outline" className="border-slate-600 text-purple-400 hover:bg-purple-400/10">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Action
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  {selectedRule.actions.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-700 rounded-lg">
                      <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No actions defined</p>
                      <p className="text-xs">Add actions to execute when conditions are met</p>
                    </div>
                  ) : (
                    selectedRule.actions.map((action, index) => (
                      <ActionBlock
                        key={action.id}
                        action={action}
                        onUpdate={(updatedAction) => {
                          const updatedActions = [...selectedRule.actions];
                          updatedActions[index] = updatedAction;
                          setSelectedRule({ ...selectedRule, actions: updatedActions });
                        }}
                        onDelete={() => {
                          const updatedActions = selectedRule.actions.filter(a => a.id !== action.id);
                          setSelectedRule({ ...selectedRule, actions: updatedActions });
                        }}
                        canEdit={canEdit}
                      />
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm">
            <CardContent className="flex items-center justify-center h-96">
              <div className="text-center">
                <Zap className="h-16 w-16 mx-auto mb-4 text-slate-600" />
                <p className="text-slate-400 mb-4 text-lg">Select a rule to configure automation</p>
                <p className="text-slate-500 mb-6 text-sm">Create intelligent if/then workflows to automate your operations</p>
                {canEdit && (
                  <Button onClick={handleCreateRule} className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Rule
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RuleBuilder;
