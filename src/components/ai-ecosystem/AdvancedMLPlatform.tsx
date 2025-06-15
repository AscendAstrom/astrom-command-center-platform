
import { useState, useEffect } from 'react';
import PlatformOverview from './ml-platform/PlatformOverview';
import MLModelsRegistry from './ml-platform/MLModelsRegistry';
import TrainingJobsPanel from './ml-platform/TrainingJobsPanel';
import FederatedLearningNetwork from './ml-platform/FederatedLearningNetwork';
import { MLModel, TrainingJob, FederatedSite, PlatformMetrics } from './ml-platform/types';
import { supabase } from '@/integrations/supabase/client';

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
        // TODO: Fetch ML platform data from Supabase. This will involve multiple tables
        // for models, jobs, sites etc. which do not exist yet.
        setLoading(false);
    }
    fetchMLPlatformData();
  }, []);

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
