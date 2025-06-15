
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { MLModel, TrainingJob } from '@/components/ai-ecosystem/ml-platform/types';
import { useEffect } from 'react';
import { toast } from "sonner";

export interface DecisionNode {
  id: string;
  name: string;
  type: 'condition' | 'action' | 'escalation';
  status: 'active' | 'learning' | 'optimizing' | 'complete';
  confidence: number;
  successRate: number;
  lastExecution: string;
  decisions: number;
  progress: number;
}

export interface AutonomousWorkflow {
  id: string;
  name: string;
  category: 'bed-management' | 'patient-flow' | 'resource-allocation' | 'quality-assurance';
  nodes: DecisionNode[];
  autonomyLevel: number;
  interventions: number;
  accuracy: number;
  status: 'running' | 'paused' | 'learning';
}

export interface SystemMetrics {
    totalDecisions: number;
    autonomousResolutions: number;
    learningModels: number;
    activeWorkflows: number;
    avgConfidence: number;
    systemLoad: number;
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

    const totalJobsForModel = modelJobs.length > 0 ? modelJobs.length : 1;

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
        lastExecution: formatDistanceToNow(new Date(job.updated_at || model.last_trained || new Date()), { addSuffix: true }),
        decisions: Math.floor((model.dataPoints || 0) / totalJobsForModel),
        progress: job.progress || 0,
      })),
    };
  });

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

export const useAutonomousWorkflows = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery<{workflows: AutonomousWorkflow[], systemMetrics: SystemMetrics}>({
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
  
  return {
    workflows: data?.workflows ?? [],
    systemMetrics: data?.systemMetrics,
    isLoading,
    error,
    retrainMutation,
  };
};
