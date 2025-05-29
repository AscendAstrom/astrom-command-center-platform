
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Save, Settings, Brain, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface AITrigger {
  id: string;
  name: string;
  condition: string;
  action: string;
  threshold: number;
  enabled: boolean;
}

interface WorkflowRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  response: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
}

interface AIModelSpec {
  id: string;
  name: string;
  type: 'gpt-4' | 'gpt-3.5-turbo' | 'claude' | 'custom';
  endpoint: string;
  maxTokens: number;
  temperature: number;
  enabled: boolean;
}

const AIConfigurationManager = () => {
  const [aiTriggers, setAiTriggers] = useState<AITrigger[]>([
    {
      id: '1',
      name: 'High Wait Time Alert',
      condition: 'wait_time > threshold',
      action: 'send_notification',
      threshold: 45,
      enabled: true
    }
  ]);

  const [workflowRules, setWorkflowRules] = useState<WorkflowRule[]>([
    {
      id: '1',
      name: 'Emergency Response',
      description: 'Automated response for emergency cases',
      trigger: 'emergency_detected',
      response: 'escalate_to_supervisor',
      priority: 'critical',
      enabled: true
    }
  ]);

  const [aiModelSpecs, setAiModelSpecs] = useState<AIModelSpec[]>([
    {
      id: '1',
      name: 'Primary AI Model',
      type: 'gpt-4',
      endpoint: 'https://api.openai.com/v1/chat/completions',
      maxTokens: 2048,
      temperature: 0.7,
      enabled: true
    }
  ]);

  const [selectedTrigger, setSelectedTrigger] = useState<AITrigger | null>(null);
  const [selectedRule, setSelectedRule] = useState<WorkflowRule | null>(null);
  const [selectedModel, setSelectedModel] = useState<AIModelSpec | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveConfiguration = async () => {
    setIsSaving(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const configuration = {
        aiTriggers,
        workflowRules,
        aiModelSpecs,
        lastUpdated: new Date().toISOString()
      };
      
      // Save to localStorage (in a real app, this would be an API call)
      localStorage.setItem('ai-configuration', JSON.stringify(configuration));
      
      toast.success('AI Configuration saved successfully!');
    } catch (error) {
      toast.error('Failed to save configuration. Please try again.');
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTrigger = () => {
    const newTrigger: AITrigger = {
      id: Date.now().toString(),
      name: 'New Trigger',
      condition: '',
      action: '',
      threshold: 0,
      enabled: false
    };
    setAiTriggers([...aiTriggers, newTrigger]);
    setSelectedTrigger(newTrigger);
  };

  const handleAddRule = () => {
    const newRule: WorkflowRule = {
      id: Date.now().toString(),
      name: 'New Rule',
      description: '',
      trigger: '',
      response: '',
      priority: 'medium',
      enabled: false
    };
    setWorkflowRules([...workflowRules, newRule]);
    setSelectedRule(newRule);
  };

  const handleAddModel = () => {
    const newModel: AIModelSpec = {
      id: Date.now().toString(),
      name: 'New Model',
      type: 'gpt-3.5-turbo',
      endpoint: '',
      maxTokens: 1024,
      temperature: 0.7,
      enabled: false
    };
    setAiModelSpecs([...aiModelSpecs, newModel]);
    setSelectedModel(newModel);
  };

  const updateTrigger = (updatedTrigger: AITrigger) => {
    setAiTriggers(aiTriggers.map(t => t.id === updatedTrigger.id ? updatedTrigger : t));
    setSelectedTrigger(updatedTrigger);
  };

  const updateRule = (updatedRule: WorkflowRule) => {
    setWorkflowRules(workflowRules.map(r => r.id === updatedRule.id ? updatedRule : r));
    setSelectedRule(updatedRule);
  };

  const updateModel = (updatedModel: AIModelSpec) => {
    setAiModelSpecs(aiModelSpecs.map(m => m.id === updatedModel.id ? updatedModel : m));
    setSelectedModel(updatedModel);
  };

  return (
    <div className="space-y-6">
      {/* Header with Save Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">AI Configuration</h2>
        <Button 
          onClick={handleSaveConfiguration}
          disabled={isSaving}
          className="bg-green-600 hover:bg-green-700"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Configuration'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Triggers Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              AI Triggers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleAddTrigger} size="sm" className="w-full">
              Add Trigger
            </Button>
            
            <div className="space-y-2">
              {aiTriggers.map((trigger) => (
                <div
                  key={trigger.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedTrigger?.id === trigger.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setSelectedTrigger(trigger)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{trigger.name}</span>
                    <Switch
                      checked={trigger.enabled}
                      onCheckedChange={(enabled) => updateTrigger({ ...trigger, enabled })}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Threshold: {trigger.threshold}
                  </p>
                </div>
              ))}
            </div>

            {selectedTrigger && (
              <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                <h4 className="font-medium mb-3">Edit Trigger</h4>
                <div className="space-y-3">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={selectedTrigger.name}
                      onChange={(e) => updateTrigger({ ...selectedTrigger, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Condition</Label>
                    <Input
                      value={selectedTrigger.condition}
                      onChange={(e) => updateTrigger({ ...selectedTrigger, condition: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Action</Label>
                    <Input
                      value={selectedTrigger.action}
                      onChange={(e) => updateTrigger({ ...selectedTrigger, action: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Threshold</Label>
                    <Input
                      type="number"
                      value={selectedTrigger.threshold}
                      onChange={(e) => updateTrigger({ ...selectedTrigger, threshold: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Workflow Rules Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-500" />
              Workflow Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleAddRule} size="sm" className="w-full">
              Add Rule
            </Button>
            
            <div className="space-y-2">
              {workflowRules.map((rule) => (
                <div
                  key={rule.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedRule?.id === rule.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setSelectedRule(rule)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{rule.name}</span>
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={(enabled) => updateRule({ ...rule, enabled })}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Priority: {rule.priority}
                  </p>
                </div>
              ))}
            </div>

            {selectedRule && (
              <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                <h4 className="font-medium mb-3">Edit Rule</h4>
                <div className="space-y-3">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={selectedRule.name}
                      onChange={(e) => updateRule({ ...selectedRule, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={selectedRule.description}
                      onChange={(e) => updateRule({ ...selectedRule, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Trigger</Label>
                    <Input
                      value={selectedRule.trigger}
                      onChange={(e) => updateRule({ ...selectedRule, trigger: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Response</Label>
                    <Input
                      value={selectedRule.response}
                      onChange={(e) => updateRule({ ...selectedRule, response: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Select
                      value={selectedRule.priority}
                      onValueChange={(value: any) => updateRule({ ...selectedRule, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Model Specs Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-green-500" />
              AI Model Specs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleAddModel} size="sm" className="w-full">
              Add Model
            </Button>
            
            <div className="space-y-2">
              {aiModelSpecs.map((model) => (
                <div
                  key={model.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedModel?.id === model.id
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-border hover:bg-muted'
                  }`}
                  onClick={() => setSelectedModel(model)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{model.name}</span>
                    <Switch
                      checked={model.enabled}
                      onCheckedChange={(enabled) => updateModel({ ...model, enabled })}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Type: {model.type}
                  </p>
                </div>
              ))}
            </div>

            {selectedModel && (
              <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                <h4 className="font-medium mb-3">Edit Model</h4>
                <div className="space-y-3">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={selectedModel.name}
                      onChange={(e) => updateModel({ ...selectedModel, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select
                      value={selectedModel.type}
                      onValueChange={(value: any) => updateModel({ ...selectedModel, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="claude">Claude</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Endpoint</Label>
                    <Input
                      value={selectedModel.endpoint}
                      onChange={(e) => updateModel({ ...selectedModel, endpoint: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Max Tokens</Label>
                    <Input
                      type="number"
                      value={selectedModel.maxTokens}
                      onChange={(e) => updateModel({ ...selectedModel, maxTokens: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Temperature</Label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="2"
                      value={selectedModel.temperature}
                      onChange={(e) => updateModel({ ...selectedModel, temperature: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIConfigurationManager;
