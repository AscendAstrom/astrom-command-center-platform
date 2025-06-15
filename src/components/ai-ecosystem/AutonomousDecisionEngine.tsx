import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from "@/components/ui/skeleton";
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
import { MLModel, TrainingJob } from './ml-platform/types';
import { useEffect } from 'react';
import { toast } from "sonner";

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

const fetchAutonomousWorkflows = async () => {
  const { data: models, error: modelsError } = await supabase.from('ml_models').select('*');
  if (modelsError) throw new Error(`Failed to fetch models: ${modelsError.message}`);

  const { data: jobs, error: jobsError } = await supabase.from('ml_training_jobs').select('*');
  if (jobsError) throw new Error(`Failed to fetch jobs: ${jobsError.message}`);

  const typedModels = models as unknown as MLModel[];
  const typedJobs = jobs as unknown as TrainingJob[];

  const workflows: AutonomousWorkflow[] = typedModels.map(model => {
    const modelJobs = typedJobs.filter(job => job.modelName === model.name && job.status !== 'failed');

    const mapModelTypeToCategory = (type: MLModel['type']): AutonomousWorkflow['category'] => {
      switch (type) {
        case 'optimization': return 'resource-allocation';
        case 'prediction': return 'patient-flow';
        case 'classification': return 'quality-assurance';
        case 'nlp':
        case 'vision':
        default:
          return 'bed-management';
      }
    };
    
    const mapModelStatus = (status: MLModel['status']): AutonomousWorkflow['status'] => {
      switch (status) {
        case 'deployed': return 'running';
        case 'training':
        case 'testing':
        case 'updating':
          return 'learning';
        default: return 'paused';
      }
    };

    const mapJobStatusToNodeStatus = (status: TrainingJob['status']): DecisionNode['status'] => {
      switch (status) {
        case 'deployed': return 'active';
        case 'running':
        case 'updating':
          return 'optimizing';
        case 'testing':
        case 'queued':
          return 'learning';
        case 'completed': return 'complete';
        default: return 'active';
      }
    }

    return {
      id: model.id,
      name: model.name,
      category: mapModelTypeToCategory(model.type),
      autonomyLevel: model.accuracy ? Math.round(model.accuracy * 100) : 0,
      interventions: model.dataPoints || 0,
      accuracy: model.accuracy ? parseFloat(model.accuracy.toFixed(2)) : 0,
      status: mapModelStatus(model.status),
      nodes: modelJobs.map(job => ({
        id: job.id,
        name: `${job.modelName} Training`,
        type: 'action',
        status: mapJobStatusToNodeStatus(job.status),
        confidence: model.accuracy ? Math.round(model.accuracy * 100) : 0,
        successRate: model.accuracy ? Math.round(model.accuracy * 100) : 0,
        lastExecution: formatDistanceToNow(new Date(job.updatedAt || model.lastTrained), { addSuffix: true }),
        decisions: job.progress || 0,
      })),
    };
  });

  // Calculate system metrics from fetched data
  const totalDecisions = workflows.reduce((acc, wf) => acc + wf.nodes.reduce((nodeAcc, node) => nodeAcc + node.decisions, 0), 0);
  const learningModels = workflows.filter(wf => wf.status === 'learning').length;
  const activeWorkflows = workflows.filter(wf => wf.status === 'running').length;
  const avgConfidence = workflows.length > 0 ? workflows.reduce((acc, wf) => acc + wf.autonomyLevel, 0) / workflows.length : 0;
  
  const runningJobs = typedJobs.filter(job => job.status === 'running');
  const systemLoad = runningJobs.length > 0 ? runningJobs.reduce((acc, job) => acc + (job.gpuUtilization || 0), 0) / runningJobs.length : 0;
  
  const systemMetrics = {
    totalDecisions: totalDecisions,
    autonomousResolutions: Math.round(totalDecisions * (avgConfidence / 100)),
    learningModels: learningModels,
    activeWorkflows: activeWorkflows,
    avgConfidence: parseFloat(avgConfidence.toFixed(1)),
    systemLoad: Math.round(systemLoad),
  };
  
  return { workflows, systemMetrics };
}

const AutonomousDecisionEngine = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ['autonomousWorkflows'],
    queryFn: fetchAutonomousWorkflows,
  });

  const retrainMutation = useMutation({
    mutationFn: async (workflow: AutonomousWorkflow) => {
      const { data, error } = await supabase.functions.invoke('retrain-model', {
        body: { modelId: workflow.id, modelName: workflow.name },
      });
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Retraining job for "${data.job.model_name}" started successfully!`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to start retraining job: ${error.message}`);
    }
  });

  const handleRetrain = (workflow: AutonomousWorkflow) => {
    retrainMutation.mutate(workflow);
  };

  useEffect(() => {
    const channel = supabase.channel('autonomous-workflows-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ml_models' }, () => {
        queryClient.invalidateQueries({ queryKey: ['autonomousWorkflows'] });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ml_training_jobs' }, () => {
        queryClient.invalidateQueries({ queryKey: ['autonomousWorkflows'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [queryClient]);
  
  const workflows = data?.workflows ?? [];
  const systemMetrics = data?.systemMetrics ?? {
    totalDecisions: 0,
    autonomousResolutions: 0,
    learningModels: 0,
    activeWorkflows: 0,
    avgConfidence: 0,
    systemLoad: 0
  };

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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Error Loading Decision Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Could not fetch autonomous workflow data. Please try again later.</p>
          <p className="text-xs text-muted-foreground mt-2">{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
        </CardContent>
      </Card>
    );
  }

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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleRetrain(workflow)}
                  disabled={retrainMutation.isPending && retrainMutation.variables?.id === workflow.id}
                >
                  <RefreshCw className={`h-3 w-3 mr-1 ${retrainMutation.isPending && retrainMutation.variables?.id === workflow.id ? 'animate-spin' : ''}`} />
                  {retrainMutation.isPending && retrainMutation.variables?.id === workflow.id ? 'Starting...' : 'Retrain'}
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
