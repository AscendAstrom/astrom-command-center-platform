
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Play, 
  Pause,
  Settings,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  Activity,
  FileText
} from 'lucide-react';

interface WorkflowRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  isActive: boolean;
  executionCount: number;
  lastExecuted?: string;
  success_rate: number;
}

interface WorkflowExecution {
  id: string;
  rule_name: string;
  trigger_event: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  executed_at: string;
  duration_ms: number;
  patient_id?: string;
}

const WorkflowAutomation = () => {
  const [workflows, setWorkflows] = useState<WorkflowRule[]>([]);
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWorkflows();
    loadExecutions();
  }, []);

  const loadWorkflows = async () => {
    // Simulate loading workflow rules
    const mockWorkflows: WorkflowRule[] = [
      {
        id: '1',
        name: 'High-Risk Patient Alert',
        description: 'Automatically alert care team when patient risk score exceeds threshold',
        trigger: 'Risk Score > 0.7',
        actions: ['Send alert to care team', 'Schedule review', 'Update care plan'],
        isActive: true,
        executionCount: 142,
        lastExecuted: '2024-06-15T10:30:00Z',
        success_rate: 0.95
      },
      {
        id: '2',
        name: 'Medication Reminder',
        description: 'Send medication reminders to patients with adherence issues',
        trigger: 'Missed Dose > 2',
        actions: ['Send SMS reminder', 'Notify care team', 'Log adherence event'],
        isActive: true,
        executionCount: 89,
        lastExecuted: '2024-06-15T09:15:00Z',
        success_rate: 0.87
      },
      {
        id: '3',
        name: 'Discharge Planning',
        description: 'Automatically initiate discharge planning process',
        trigger: 'Length of Stay > Expected',
        actions: ['Create discharge checklist', 'Notify social worker', 'Schedule follow-up'],
        isActive: false,
        executionCount: 23,
        lastExecuted: '2024-06-14T16:45:00Z',
        success_rate: 0.91
      },
      {
        id: '4',
        name: 'Lab Result Review',
        description: 'Flag critical lab results for immediate physician review',
        trigger: 'Critical Lab Value',
        actions: ['Page physician', 'Create urgent task', 'Document in chart'],
        isActive: true,
        executionCount: 67,
        lastExecuted: '2024-06-15T11:20:00Z',
        success_rate: 0.98
      }
    ];

    setWorkflows(mockWorkflows);
  };

  const loadExecutions = async () => {
    // Simulate loading recent executions
    const mockExecutions: WorkflowExecution[] = [
      {
        id: '1',
        rule_name: 'High-Risk Patient Alert',
        trigger_event: 'Patient risk score: 0.82',
        status: 'SUCCESS',
        executed_at: '2024-06-15T10:30:00Z',
        duration_ms: 1250,
        patient_id: 'pat-001'
      },
      {
        id: '2',
        rule_name: 'Lab Result Review',
        trigger_event: 'Critical glucose level: 450 mg/dL',
        status: 'SUCCESS',
        executed_at: '2024-06-15T11:20:00Z',
        duration_ms: 890,
        patient_id: 'pat-002'
      },
      {
        id: '3',
        rule_name: 'Medication Reminder',
        trigger_event: 'Missed dose count: 3',
        status: 'FAILED',
        executed_at: '2024-06-15T09:15:00Z',
        duration_ms: 2100,
        patient_id: 'pat-003'
      }
    ];

    setExecutions(mockExecutions);
    setIsLoading(false);
  };

  const toggleWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.map(workflow => 
      workflow.id === workflowId 
        ? { ...workflow, isActive: !workflow.isActive }
        : workflow
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'text-green-500';
      case 'FAILED':
        return 'text-red-500';
      case 'PENDING':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'FAILED':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'PENDING':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Workflow Automation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Workflow Automation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="rules" className="space-y-4">
            <TabsList>
              <TabsTrigger value="rules">Automation Rules</TabsTrigger>
              <TabsTrigger value="executions">Recent Executions</TabsTrigger>
              <TabsTrigger value="analytics">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="rules" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Active Workflows</h3>
                <Button size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Rules
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {workflows.map((workflow) => (
                  <Card key={workflow.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{workflow.name}</h4>
                          <Switch
                            checked={workflow.isActive}
                            onCheckedChange={() => toggleWorkflow(workflow.id)}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {workflow.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            {workflow.trigger}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Actions:</div>
                      <div className="flex flex-wrap gap-1">
                        {workflow.actions.map((action, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{workflow.executionCount}</div>
                        <div className="text-xs text-muted-foreground">Executions</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-500">
                          {(workflow.success_rate * 100).toFixed(0)}%
                        </div>
                        <div className="text-xs text-muted-foreground">Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">
                          {workflow.lastExecuted ? 
                            new Date(workflow.lastExecuted).toLocaleTimeString() : 
                            'Never'
                          }
                        </div>
                        <div className="text-xs text-muted-foreground">Last Run</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="executions" className="space-y-4">
              <h3 className="text-lg font-semibold">Recent Executions</h3>
              
              <div className="space-y-3">
                {executions.map((execution) => (
                  <Card key={execution.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getStatusIcon(execution.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{execution.rule_name}</h4>
                            <Badge 
                              variant={execution.status === 'SUCCESS' ? 'default' : 'destructive'}
                              className="text-xs"
                            >
                              {execution.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {execution.trigger_event}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>
                              Executed: {new Date(execution.executed_at).toLocaleString()}
                            </span>
                            <span>
                              Duration: {execution.duration_ms}ms
                            </span>
                            {execution.patient_id && (
                              <span>
                                Patient: {execution.patient_id}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <h3 className="text-lg font-semibold">Performance Analytics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-500">4</div>
                  <div className="text-sm text-muted-foreground">Active Rules</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">321</div>
                  <div className="text-sm text-muted-foreground">Total Executions</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">94%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-500">1.2s</div>
                  <div className="text-sm text-muted-foreground">Avg Duration</div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowAutomation;
