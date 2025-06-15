
import { useState, useEffect } from 'react';
import PlatformOverview from './ml-platform/PlatformOverview';
import MLModelsRegistry from './ml-platform/MLModelsRegistry';
import TrainingJobsPanel from './ml-platform/TrainingJobsPanel';
import FederatedLearningNetwork from './ml-platform/FederatedLearningNetwork';
import { MLModel, TrainingJob, FederatedSite, PlatformMetrics } from './ml-platform/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const AdvancedMLPlatform = () => {
  const [models, setModels] = useState<MLModel[]>([]);
  const [trainingJobs, setTrainingJobs] = useState<TrainingJob[]>([]);
  const [federatedSites, setFederatedSites] = useState<FederatedSite[]>([]);
  const [platformMetrics, setPlatformMetrics] = useState<PlatformMetrics>({
    totalModels: 0,
    activeTraining: 0,
    deployedModels: 0,
    avgAccuracy: 0,
    computeUtilization: 0,
    dataVolume: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMLPlatformData = async () => {
        setLoading(true);
        toast.info('Fetching ML Platform data...');

        try {
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
            setModels(fetchedModels);

            const fetchedJobs: TrainingJob[] = jobsRes.data.map((j: any) => ({
                id: j.id,
                modelName: j.model_name,
                progress: j.progress,
                estimatedTime: j.estimated_time_remaining_mins ? `${j.estimated_time_remaining_mins} min` : 'N/A',
                status: j.status,
                gpuUtilization: j.gpu_utilization
            }));
            setTrainingJobs(fetchedJobs);

            const fetchedSites: FederatedSite[] = sitesRes.data.map((s: any) => ({
                id: s.id,
                name: s.name,
                location: s.location,
                status: s.status,
                dataContribution: s.data_contribution_records,
                latestSync: s.last_sync ? new Date(s.last_sync).toLocaleString() : 'N/A'
            }));
            setFederatedSites(fetchedSites);

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

            setPlatformMetrics({
                totalModels,
                deployedModels,
                activeTraining,
                avgAccuracy,
                computeUtilization: isNaN(computeUtilization) ? 0 : computeUtilization,
                dataVolume: parseFloat(dataVolumeTB.toFixed(2))
            });

            toast.success('ML Platform data loaded successfully!');
        } catch (error: any) {
            console.error("Error fetching ML platform data:", error);
            toast.error(`Failed to fetch ML platform data: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }
    fetchMLPlatformData();
  }, []);

  if (loading) {
      return (
          <div className="space-y-6">
              <Skeleton className="h-40 w-full" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Skeleton className="h-80 w-full" />
                  <Skeleton className="h-80 w-full" />
              </div>
              <Skeleton className="h-60 w-full" />
          </div>
      )
  }

  return (
    <div className="space-y-6">
      <PlatformOverview metrics={platformMetrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MLModelsRegistry models={models} />
        <TrainingJobsPanel jobs={trainingJobs} />
      </div>

      <FederatedLearningNetwork sites={federatedSites} />
    </div>
  );
};

export default AdvancedMLPlatform;
