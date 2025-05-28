
import { useState, useEffect } from 'react';
import PlatformOverview from './ml-platform/PlatformOverview';
import MLModelsRegistry from './ml-platform/MLModelsRegistry';
import TrainingJobsPanel from './ml-platform/TrainingJobsPanel';
import FederatedLearningNetwork from './ml-platform/FederatedLearningNetwork';
import { MLModel, TrainingJob, FederatedSite, PlatformMetrics } from './ml-platform/types';

const AdvancedMLPlatform = () => {
  const [models, setModels] = useState<MLModel[]>([
    {
      id: 'bed-predictor',
      name: 'Advanced Bed Demand Predictor',
      type: 'prediction',
      status: 'deployed',
      accuracy: 94.7,
      version: 'v3.2.1',
      lastTrained: '2 hours ago',
      dataPoints: 2847563,
      computeHours: 142.3
    },
    {
      id: 'flow-optimizer',
      name: 'Patient Flow Optimizer',
      type: 'optimization',
      status: 'training',
      accuracy: 91.2,
      version: 'v2.8.4',
      lastTrained: '6 hours ago',
      dataPoints: 1923847,
      computeHours: 89.7
    },
    {
      id: 'quality-classifier',
      name: 'Data Quality Classifier',
      type: 'classification',
      status: 'deployed',
      accuracy: 96.8,
      version: 'v4.1.0',
      lastTrained: '1 day ago',
      dataPoints: 5647291,
      computeHours: 203.5
    },
    {
      id: 'clinical-nlp',
      name: 'Clinical NLP Processor',
      type: 'nlp',
      status: 'testing',
      accuracy: 88.4,
      version: 'v1.5.2',
      lastTrained: '4 hours ago',
      dataPoints: 892347,
      computeHours: 67.2
    }
  ]);

  const [trainingJobs, setTrainingJobs] = useState<TrainingJob[]>([
    {
      id: 'job-1',
      modelName: 'Advanced Bed Demand Predictor',
      progress: 73,
      estimatedTime: '2h 15m',
      status: 'running',
      gpuUtilization: 89
    },
    {
      id: 'job-2',
      modelName: 'Surge Prediction Ensemble',
      progress: 100,
      estimatedTime: '0m',
      status: 'completed',
      gpuUtilization: 0
    }
  ]);

  const [federatedSites, setFederatedSites] = useState<FederatedSite[]>([
    {
      id: 'site-1',
      name: 'King Faisal Hospital',
      location: 'Riyadh',
      status: 'connected',
      dataContribution: 342857,
      latestSync: '5 min ago'
    },
    {
      id: 'site-2',
      name: 'KFSH&RC',
      location: 'Jeddah',
      status: 'syncing',
      dataContribution: 289463,
      latestSync: '12 min ago'
    },
    {
      id: 'site-3',
      name: 'NGHA Hospital',
      location: 'Dammam',
      status: 'connected',
      dataContribution: 194728,
      latestSync: '3 min ago'
    }
  ]);

  const [platformMetrics, setPlatformMetrics] = useState<PlatformMetrics>({
    totalModels: 12,
    activeTraining: 3,
    deployedModels: 8,
    avgAccuracy: 92.8,
    computeUtilization: 67,
    dataVolume: 15.7
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTrainingJobs(prev => prev.map(job => 
        job.status === 'running' ? {
          ...job,
          progress: Math.min(100, job.progress + Math.random() * 2),
          gpuUtilization: Math.max(70, Math.min(95, job.gpuUtilization + (Math.random() - 0.5) * 10))
        } : job
      ));

      setPlatformMetrics(prev => ({
        ...prev,
        computeUtilization: Math.max(50, Math.min(85, prev.computeUtilization + (Math.random() - 0.5) * 5)),
        avgAccuracy: Math.max(90, Math.min(96, prev.avgAccuracy + (Math.random() - 0.5) * 1))
      }));
    }, 3000);

    return () => clearInterval(interval);
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
