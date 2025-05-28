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
import { Plus, Trash2, Save, Play, Pause, Copy } from 'lucide-react';

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
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Automation Rules</CardTitle>
              {canEdit && (
                <Button onClick={handleCreateRule} size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedRule?.id === rule.id
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => setSelectedRule(rule)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white">{rule.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(rule.priority)}>
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
                <p className="text-xs text-slate-400 mb-2">{rule.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{rule.triggerType.replace('_', ' ')}</span>
                  <span>{rule.executionCount} runs</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Rule Editor */}
      <div className="lg:col-span-2">
        {selectedRule ? (
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">
                  {isCreating ? 'Create Rule' : 'Edit Rule'}
                </CardTitle>
                {canEdit && (
                  <div className="flex items-center gap-2">
                    <Button onClick={handleSaveRule} size="sm" className="bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Rule Name</Label>
                  <Input
                    value={selectedRule.name}
                    onChange={(e) => setSelectedRule({ ...selectedRule, name: e.target.value })}
                    className="bg-slate-800 border-slate-700"
                    disabled={!canEdit}
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Priority</Label>
                  <Select
                    value={selectedRule.priority}
                    onValueChange={(value: any) => setSelectedRule({ ...selectedRule, priority: value })}
                    disabled={!canEdit}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Description</Label>
                <Textarea
                  value={selectedRule.description}
                  onChange={(e) => setSelectedRule({ ...selectedRule, description: e.target.value })}
                  className="bg-slate-800 border-slate-700"
                  disabled={!canEdit}
                />
              </div>

              <div>
                <Label className="text-slate-300">Trigger Type</Label>
                <Select
                  value={selectedRule.triggerType}
                  onValueChange={(value: TriggerType) => setSelectedRule({ ...selectedRule, triggerType: value })}
                  disabled={!canEdit}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-700">
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

              {/* Conditions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-slate-300">Conditions</Label>
                  {canEdit && (
                    <Button onClick={addCondition} size="sm" variant="outline" className="border-slate-600">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Condition
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {selectedRule.conditions.map((condition, index) => (
                    <div key={condition.id} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-3">
                        <Input
                          placeholder="Field name"
                          value={condition.field}
                          onChange={(e) => {
                            const updatedConditions = [...selectedRule.conditions];
                            updatedConditions[index].field = e.target.value;
                            setSelectedRule({ ...selectedRule, conditions: updatedConditions });
                          }}
                          className="bg-slate-800 border-slate-700"
                          disabled={!canEdit}
                        />
                      </div>
                      <div className="col-span-3">
                        <Select
                          value={condition.operator}
                          onValueChange={(value: ConditionOperator) => {
                            const updatedConditions = [...selectedRule.conditions];
                            updatedConditions[index].operator = value;
                            setSelectedRule({ ...selectedRule, conditions: updatedConditions });
                          }}
                          disabled={!canEdit}
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            {operators.map((op) => (
                              <SelectItem key={op.value} value={op.value}>
                                {op.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-5">
                        <Input
                          placeholder="Value"
                          value={condition.value.toString()}
                          onChange={(e) => {
                            const updatedConditions = [...selectedRule.conditions];
                            updatedConditions[index].value = e.target.value;
                            setSelectedRule({ ...selectedRule, conditions: updatedConditions });
                          }}
                          className="bg-slate-800 border-slate-700"
                          disabled={!canEdit}
                        />
                      </div>
                      {canEdit && (
                        <div className="col-span-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updatedConditions = selectedRule.conditions.filter(c => c.id !== condition.id);
                              setSelectedRule({ ...selectedRule, conditions: updatedConditions });
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* Actions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-slate-300">Actions</Label>
                  {canEdit && (
                    <Button onClick={addAction} size="sm" variant="outline" className="border-slate-600">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Action
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  {selectedRule.actions.map((action, index) => (
                    <div key={action.id} className="p-4 border border-slate-700 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <Select
                          value={action.type}
                          onValueChange={(value: ActionType) => {
                            const updatedActions = [...selectedRule.actions];
                            updatedActions[index].type = value;
                            setSelectedRule({ ...selectedRule, actions: updatedActions });
                          }}
                          disabled={!canEdit}
                        >
                          <SelectTrigger className="w-48 bg-slate-800 border-slate-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            {actionTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {canEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updatedActions = selectedRule.actions.filter(a => a.id !== action.id);
                              setSelectedRule({ ...selectedRule, actions: updatedActions });
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(action.type === 'email_alert' || action.type === 'sms_alert') && (
                          <div>
                            <Label className="text-slate-400 text-xs">Recipients (comma-separated)</Label>
                            <Input
                              value={action.config.recipients?.join(', ') || ''}
                              onChange={(e) => {
                                const updatedActions = [...selectedRule.actions];
                                updatedActions[index].config.recipients = e.target.value.split(',').map(r => r.trim());
                                setSelectedRule({ ...selectedRule, actions: updatedActions });
                              }}
                              className="bg-slate-800 border-slate-700"
                              disabled={!canEdit}
                            />
                          </div>
                        )}
                        {action.type === 'slack_notification' && (
                          <div>
                            <Label className="text-slate-400 text-xs">Channel</Label>
                            <Input
                              value={action.config.channel || ''}
                              onChange={(e) => {
                                const updatedActions = [...selectedRule.actions];
                                updatedActions[index].config.channel = e.target.value;
                                setSelectedRule({ ...selectedRule, actions: updatedActions });
                              }}
                              className="bg-slate-800 border-slate-700"
                              disabled={!canEdit}
                            />
                          </div>
                        )}
                        {(action.type === 'api_call' || action.type === 'webhook') && (
                          <div>
                            <Label className="text-slate-400 text-xs">URL</Label>
                            <Input
                              value={action.config.url || ''}
                              onChange={(e) => {
                                const updatedActions = [...selectedRule.actions];
                                updatedActions[index].config.url = e.target.value;
                                setSelectedRule({ ...selectedRule, actions: updatedActions });
                              }}
                              className="bg-slate-800 border-slate-700"
                              disabled={!canEdit}
                            />
                          </div>
                        )}
                        <div className="md:col-span-2">
                          <Label className="text-slate-400 text-xs">Message Template</Label>
                          <Textarea
                            value={action.config.message || ''}
                            onChange={(e) => {
                              const updatedActions = [...selectedRule.actions];
                              updatedActions[index].config.message = e.target.value;
                              setSelectedRule({ ...selectedRule, actions: updatedActions });
                            }}
                            className="bg-slate-800 border-slate-700"
                            disabled={!canEdit}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="flex items-center justify-center h-96">
              <div className="text-center">
                <p className="text-slate-400 mb-4">Select a rule to edit or create a new one</p>
                {canEdit && (
                  <Button onClick={handleCreateRule} className="bg-cyan-600 hover:bg-cyan-700">
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
