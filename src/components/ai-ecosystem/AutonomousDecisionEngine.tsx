
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Network, 
  Zap, 
  Target, 
  Activity,
  Settings,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

interface DecisionNode {
  id: string;
  name: string;
  type: 'condition' | 'action' | 'escalation';
  status: 'active' | 'learning' | 'optimizing' | 'complete';
  confidence: number;
  successRate: number;
  lastExecution: string;
  decisions: number;
}

interface AutonomousWorkflow {
  id: string;
  name: string;
  category: 'bed-management' | 'patient-flow' | 'resource-allocation' | 'quality-assurance';
  nodes: DecisionNode[];
  autonomyLevel: number;
  interventions: number;
  accuracy: number;
  status: 'running' | 'paused' | 'learning';
}

const AutonomousDecisionEngine = () => {
  const [workflows, setWorkflows] = useState<AutonomousWorkflow[]>([
    {
      id: 'bed-opt',
      name: 'Intelligent Bed Optimization',
      category: 'bed-management',
      autonomyLevel: 87,
      interventions: 142,
      accuracy: 94.2,
      status: 'running',
      nodes: [
        {
          id: 'predict-demand',
          name: 'Demand Prediction',
          type: 'condition',
          status: 'active',
          confidence: 92,
          successRate: 89,
          lastExecution: '2 min ago',
          decisions: 1247
        },
        {
          id: 'allocate-beds',
          name: 'Dynamic Allocation',
          type: 'action',
          status: 'optimizing',
          confidence: 85,
          successRate: 91,
          lastExecution: '1 min ago',
          decisions: 894
        }
      ]
    },
    {
      id: 'flow-management',
      name: 'Patient Flow Intelligence',
      category: 'patient-flow',
      autonomyLevel: 92,
      interventions: 267,
      accuracy: 96.8,
      status: 'running',
      nodes: [
        {
          id: 'route-optimization',
          name: 'Route Optimization',
          type: 'action',
          status: 'active',
          confidence: 96,
          successRate: 94,
          lastExecution: '30 sec ago',
          decisions: 2156
        },
        {
          id: 'bottleneck-detection',
          name: 'Bottleneck Prevention',
          type: 'condition',
          status: 'learning',
          confidence: 78,
          successRate: 82,
          lastExecution: '3 min ago',
          decisions: 567
        }
      ]
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    totalDecisions: 15247,
    autonomousResolutions: 12896,
    learningModels: 8,
    activeWorkflows: 4,
    avgConfidence: 89.3,
    systemLoad: 23
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'learning': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'optimizing': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'complete': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bed-management': return <Target className="h-4 w-4" />;
      case 'patient-flow': return <Activity className="h-4 w-4" />;
      case 'resource-allocation': return <Network className="h-4 w-4" />;
      case 'quality-assurance': return <CheckCircle className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        totalDecisions: prev.totalDecisions + Math.floor(Math.random() * 5),
        autonomousResolutions: prev.autonomousResolutions + Math.floor(Math.random() * 3),
        avgConfidence: Math.max(85, Math.min(95, prev.avgConfidence + (Math.random() - 0.5) * 2)),
        systemLoad: Math.max(15, Math.min(40, prev.systemLoad + (Math.random() - 0.5) * 5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-400" />
            Autonomous Decision Engine
            <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">Phase 3A</Badge>
          </CardTitle>
          <CardDescription>
            Self-learning AI system with autonomous decision-making and multi-agent coordination
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{systemMetrics.totalDecisions.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Decisions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{systemMetrics.autonomousResolutions.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Auto Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{systemMetrics.learningModels}</div>
              <div className="text-xs text-muted-foreground">Learning Models</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{systemMetrics.activeWorkflows}</div>
              <div className="text-xs text-muted-foreground">Active Workflows</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{systemMetrics.avgConfidence.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Avg Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{systemMetrics.systemLoad}%</div>
              <div className="text-xs text-muted-foreground">System Load</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Autonomous Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(workflow.category)}
                  <CardTitle className="text-base">{workflow.name}</CardTitle>
                </div>
                <Badge variant="outline" className={getStatusColor(workflow.status)}>
                  {workflow.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-lg font-bold text-purple-400">{workflow.autonomyLevel}%</div>
                  <div className="text-xs text-muted-foreground">Autonomy</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-400">{workflow.interventions}</div>
                  <div className="text-xs text-muted-foreground">Interventions</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-400">{workflow.accuracy}%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">Decision Nodes</div>
                {workflow.nodes.map((node) => (
                  <div key={node.id} className="p-2 bg-muted/50 rounded border border-border/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{node.name}</span>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(node.status)}`}>
                        {node.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <div>Confidence: {node.confidence}%</div>
                      <div>Success: {node.successRate}%</div>
                      <div>Decisions: {node.decisions}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="h-3 w-3 mr-1" />
                  Configure
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning & Optimization Status */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-cyan-400" />
            Self-Learning & Optimization Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Active Learning Models</h4>
              <div className="space-y-3">
                {[
                  { name: 'Bed Demand Predictor', progress: 89, status: 'Training' },
                  { name: 'Flow Optimization Engine', progress: 94, status: 'Active' },
                  { name: 'Resource Allocation AI', progress: 76, status: 'Learning' },
                  { name: 'Quality Assurance Bot', progress: 82, status: 'Optimizing' }
                ].map((model, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{model.name}</span>
                      <Badge variant="outline" className={getStatusColor(model.status.toLowerCase())}>
                        {model.status}
                      </Badge>
                    </div>
                    <Progress value={model.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">System Intelligence Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <div className="text-lg font-bold text-green-400">84.7%</div>
                  <div className="text-xs text-muted-foreground">Zero-Touch Resolution</div>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <div className="text-lg font-bold text-blue-400">2.3s</div>
                  <div className="text-xs text-muted-foreground">Avg Decision Time</div>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <div className="text-lg font-bold text-purple-400">97.2%</div>
                  <div className="text-xs text-muted-foreground">Model Accuracy</div>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <div className="text-lg font-bold text-orange-400">15.6%</div>
                  <div className="text-xs text-muted-foreground">Performance Gain</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutonomousDecisionEngine;
