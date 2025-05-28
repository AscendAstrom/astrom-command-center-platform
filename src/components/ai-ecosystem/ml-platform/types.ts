
export interface MLModel {
  id: string;
  name: string;
  type: 'prediction' | 'classification' | 'optimization' | 'nlp' | 'vision';
  status: 'training' | 'deployed' | 'testing' | 'updating';
  accuracy: number;
  version: string;
  lastTrained: string;
  dataPoints: number;
  computeHours: number;
}

export interface TrainingJob {
  id: string;
  modelName: string;
  progress: number;
  estimatedTime: string;
  status: 'running' | 'queued' | 'completed' | 'failed';
  gpuUtilization: number;
}

export interface FederatedSite {
  id: string;
  name: string;
  location: string;
  status: 'connected' | 'syncing' | 'offline';
  dataContribution: number;
  latestSync: string;
}

export interface PlatformMetrics {
  totalModels: number;
  activeTraining: number;
  deployedModels: number;
  avgAccuracy: number;
  computeUtilization: number;
  dataVolume: number;
}
