
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Workflow, 
  Zap, 
  AlertTriangle, 
  Target,
  CheckCircle,
  Clock,
  Users,
  Settings,
  TrendingUp,
  Activity
} from "lucide-react";

interface WorkflowExecution {
  id: string;
  name: string;
  type: 'patient_flow' | 'resource_allocation' | 'emergency_response' | 'discharge_planning';
  status: 'running' | 'completed' | 'failed' | 'paused';
  progress: number;
  duration: string;
  stepsCompleted: number;
  totalSteps: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface EscalationRule {
  id: string;
  trigger: string;
  condition: string;
  escalatesTo: string;
  timeThreshold: string;
  status: 'active' | 'triggered' | 'resolved';
}

interface PreventiveIntervention {
  id: string;
  riskType: string;
  probability: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recommendedAction: string;
  timeToAct: string;
  status: 'monitoring' | 'intervention_needed' | 'resolved';
}

const AdvancedWorkflowAutomation = () => {
  const [workflows, setWorkflows] = useState<WorkflowExecution[]>([
    {
      id: 'wf-1',
      name: 'Emergency Department Triage',
      type: 'emergency_response',
      status: 'running',
      progress: 67,
      duration: '12m 34s',
      stepsCompleted: 4,
      totalSteps: 6,
      priority: 'critical'
    },
    {
      id: 'wf-2',
      name: 'ICU Bed Allocation',
      type: 'resource_allocation',
      status: 'completed',
      progress: 100,
      duration: '8m 45s',
      stepsCompleted: 5,
      totalSteps: 5,
      priority: 'high'
    },
    {
      id: 'wf-3',
      name: 'Patient Discharge Planning',
      type: 'discharge_planning',
      status: 'running',
      progress: 34,
      duration: '5m 12s',
      stepsCompleted: 2,
      totalSteps: 7,
      priority: 'medium'
    }
  ]);

  const [escalationRules, setEscalationRules] = useState<EscalationRule[]>([
    {
      id: 'esc-1',
      trigger: 'Bed Occupancy > 95%',
      condition: 'Duration > 30 minutes',
      escalatesTo: 'Department Head',
      timeThreshold: '30m',
      status: 'active'
    },
    {
      id: 'esc-2',
      trigger: 'Patient Wait Time > 4h',
      condition: 'Emergency Priority',
      escalatesTo: 'Chief Medical Officer',
      timeThreshold: '15m',
      status: 'triggered'
    },
    {
      id: 'esc-3',
      trigger: 'Equipment Failure',
      condition: 'Critical Care Equipment',
      escalatesTo: 'Biomedical Engineering',
      timeThreshold: '5m',
      status: 'resolved'
    }
  ]);

  const [interventions, setInterventions] = useState<PreventiveIntervention[]>([
    {
      id: 'int-1',
      riskType: 'Capacity Overflow',
      probability: 87,
      severity: 'high',
      recommendedAction: 'Prepare additional ICU beds in Wing B',
      timeToAct: '45 minutes',
      status: 'intervention_needed'
    },
    {
      id: 'int-2',
      riskType: 'Staff Shortage',
      probability: 74,
      severity: 'medium',
      recommendedAction: 'Schedule additional nursing staff for night shift',
      timeToAct: '2 hours',
      status: 'monitoring'
    },
    {
      id: 'int-3',
      riskType: 'Equipment Maintenance',
      probability: 92,
      severity: 'critical',
      recommendedAction: 'Schedule preventive maintenance for MRI Unit 2',
      timeToAct: '24 hours',
      status: 'resolved'
    }
  ]);

  const [automationMetrics, setAutomationMetrics] = useState({
    activeWorkflows: 247,
    completedToday: 1542,
    automationRate: 94.2,
    avgResolutionTime: 12.7,
    preventedIncidents: 89,
    resourceUtilization: 87.3
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': case 'resolved': case 'active': 
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'running': case 'monitoring': case 'triggered': 
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'intervention_needed': case 'paused': 
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'failed': 
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getWorkflowIcon = (type: string) => {
    switch (type) {
      case 'patient_flow': return <Users className="h-4 w-4" />;
      case 'resource_allocation': return <Target className="h-4 w-4" />;
      case 'emergency_response': return <AlertTriangle className="h-4 w-4" />;
      case 'discharge_planning': return <CheckCircle className="h-4 w-4" />;
      default: return <Workflow className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWorkflows(prev => prev.map(workflow => 
        workflow.status === 'running' ? {
          ...workflow,
          progress: Math.min(100, workflow.progress + Math.random() * 3),
          stepsCompleted: Math.min(workflow.totalSteps, workflow.stepsCompleted + (Math.random() > 0.7 ? 1 : 0))
        } : workflow
      ));

      setAutomationMetrics(prev => ({
        ...prev,
        activeWorkflows: prev.activeWorkflows + Math.floor((Math.random() - 0.5) * 10),
        completedToday: prev.completedToday + Math.floor(Math.random() * 5),
        automationRate: Math.max(90, Math.min(98, prev.automationRate + (Math.random() - 0.5) * 2))
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Platform Overview */}
      <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Zap className="h-6 w-6 text-orange-400" />
            Advanced Workflow Automation
            <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">Phase 3B</Badge>
          </CardTitle>
          <CardDescription>
            Intelligent orchestration, proactive interventions, and autonomous problem resolution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{automationMetrics.activeWorkflows}</div>
              <div className="text-xs text-muted-foreground">Active Workflows</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{automationMetrics.completedToday}</div>
              <div className="text-xs text-muted-foreground">Completed Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{automationMetrics.automationRate.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Automation Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{automationMetrics.avgResolutionTime}m</div>
              <div className="text-xs text-muted-foreground">Avg Resolution</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{automationMetrics.preventedIncidents}</div>
              <div className="text-xs text-muted-foreground">Prevented Issues</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{automationMetrics.resourceUtilization}%</div>
              <div className="text-xs text-muted-foreground">Resource Usage</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workflow Orchestration */}
        <Card className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Workflow className="h-5 w-5 text-blue-400" />
              Workflow Orchestration Engine
            </CardTitle>
            <CardDescription>Complex multi-step automated workflows</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="p-3 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getWorkflowIcon(workflow.type)}
                    <span className="font-medium text-sm text-foreground">{workflow.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(workflow.priority)}`}>
                      {workflow.priority}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(workflow.status)}`}>
                      {workflow.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                  <div>Steps: {workflow.stepsCompleted}/{workflow.totalSteps}</div>
                  <div>Duration: {workflow.duration}</div>
                  <div>Progress: {workflow.progress.toFixed(0)}%</div>
                </div>
                <Progress value={workflow.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Escalation Matrix */}
        <Card className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              Intelligent Escalation Matrix
            </CardTitle>
            <CardDescription>Context-aware escalation with stakeholder mapping</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {escalationRules.map((rule) => (
              <div key={rule.id} className="p-3 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-foreground">{rule.trigger}</span>
                  <Badge variant="outline" className={`text-xs ${getStatusColor(rule.status)}`}>
                    {rule.status}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Condition: {rule.condition}</div>
                  <div>Escalates to: {rule.escalatesTo}</div>
                  <div>Threshold: {rule.timeThreshold}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Proactive Intervention System */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Target className="h-5 w-5 text-green-400" />
            Proactive Intervention System
          </CardTitle>
          <CardDescription>Predict and prevent issues before they occur</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interventions.map((intervention) => (
              <div key={intervention.id} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">{intervention.riskType}</h4>
                  <Badge variant="outline" className={`text-xs ${getSeverityColor(intervention.severity)}`}>
                    {intervention.severity}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Probability:</span>
                    <span className="font-medium text-foreground">{intervention.probability}%</span>
                  </div>
                  <Progress value={intervention.probability} className="h-1" />
                  <div className="text-xs text-muted-foreground mt-2">
                    <div className="mb-1">Action: {intervention.recommendedAction}</div>
                    <div className="flex items-center justify-between">
                      <span>Time to act: {intervention.timeToAct}</span>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(intervention.status)}`}>
                        {intervention.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Resource Pre-positioning */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-400" />
            Smart Resource Pre-positioning
          </CardTitle>
          <CardDescription>Predictive resource allocation across healthcare network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-blue-400" />
                <h4 className="font-medium text-foreground">Staff Allocation</h4>
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-1">94%</div>
              <div className="text-xs text-muted-foreground">Optimal Distribution</div>
            </div>
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-green-400" />
                <h4 className="font-medium text-foreground">Equipment Ready</h4>
              </div>
              <div className="text-2xl font-bold text-green-400 mb-1">97%</div>
              <div className="text-xs text-muted-foreground">Availability Rate</div>
            </div>
            <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-orange-400" />
                <h4 className="font-medium text-foreground">Response Time</h4>
              </div>
              <div className="text-2xl font-bold text-orange-400 mb-1">3.2m</div>
              <div className="text-xs text-muted-foreground">Average Response</div>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-purple-400" />
                <h4 className="font-medium text-foreground">Efficiency Gain</h4>
              </div>
              <div className="text-2xl font-bold text-purple-400 mb-1">+23%</div>
              <div className="text-xs text-muted-foreground">vs Manual Process</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedWorkflowAutomation;
