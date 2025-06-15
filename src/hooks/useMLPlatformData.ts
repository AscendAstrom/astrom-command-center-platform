
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MLModel, TrainingJob, FederatedSite, PlatformMetrics } from '@/components/ai-ecosystem/ml-platform/types';

export interface MLPlatformData {
  models: MLModel[];
  trainingJobs: TrainingJob[];
  federatedSites: FederatedSite[];
  platformMetrics: PlatformMetrics;
}

const fetchMLPlatformData = async (): Promise<MLPlatformData> => {
  const [modelsRes, jobsRes, sitesRes] = await Promise.all([
      supabase.from('ml_models').select('*'),
      supabase.from('ml_training_jobs').select('*'),
      supabase.from('ml_federated_sites').select('*')
  ]);

  if (modelsRes.error) throw modelsRes.error;
  if (jobsRes.error) throw jobsRes.error;
  if (sitesRes.error) throw sitesRes.error;

  const fetchedModels: MLModel[] = modelsRes.data.map((m: any) => ({
      id: m.id,
      name: m.name,
      type: m.type,
      status: m.status,
      accuracy: m.accuracy,
      version: m.version,
      lastTrained: m.last_trained ? new Date(m.last_trained).toLocaleDateString() : 'N/A',
      dataPoints: m.data_points
  }));

  const fetchedJobs: TrainingJob[] = jobsRes.data.map((j: any) => ({
      id: j.id,
      modelName: j.model_name,
      progress: j.progress,
      estimatedTime: j.estimated_time_remaining_mins ? `${j.estimated_time_remaining_mins} min` : 'N/A',
      status: j.status,
      gpuUtilization: j.gpu_utilization
  }));

  const fetchedSites: FederatedSite[] = sitesRes.data.map((s: any) => ({
      id: s.id,
      name: s.name,
      location: s.location,
      status: s.status,
      dataContribution: s.data_contribution_records,
      latestSync: s.last_sync ? new Date(s.last_sync).toLocaleString() : 'N/A'
  }));

  const totalModels = fetchedModels.length;
  const deployedModels = fetchedModels.filter(m => m.status === 'deployed').length;
  const activeTraining = fetchedJobs.filter(j => j.status === 'running').length;
  
  const modelsWithAccuracy = fetchedModels.filter(m => m.accuracy);
  const avgAccuracy = modelsWithAccuracy.length > 0
      ? modelsWithAccuracy.reduce((acc, m) => acc + (m.accuracy || 0), 0) / modelsWithAccuracy.length
      : 0;
  
  const jobsWithGpu = fetchedJobs.filter(j => j.gpuUtilization);
  const computeUtilization = jobsWithGpu.length > 0
      ? Math.round(jobsWithGpu.reduce((acc, j) => acc + (j.gpuUtilization || 0), 0) / jobsWithGpu.length)
      : 0;

  const totalDataPoints = fetchedModels.reduce((acc, m) => acc + (m.dataPoints || 0), 0);
  const dataVolumeTB = totalDataPoints / 1e12; // Rough conversion to TB

  const platformMetrics: PlatformMetrics = {
      totalModels,
      deployedModels,
      activeTraining,
      avgAccuracy,
      computeUtilization: isNaN(computeUtilization) ? 0 : computeUtilization,
      dataVolume: parseFloat(dataVolumeTB.toFixed(2))
  };

  return {
    models: fetchedModels,
    trainingJobs: fetchedJobs,
    federatedSites: fetchedSites,
    platformMetrics
  };
};

export const useMLPlatformData = () => {
    return useQuery<MLPlatformData, Error>({
        queryKey: ['mlPlatformData'],
        queryFn: fetchMLPlatformData,
        refetchInterval: 30000,
    });
};
