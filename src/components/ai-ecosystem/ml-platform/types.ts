
export interface MLModel {
  id: string;
  name: string;
  type: 'prediction' | 'classification' | 'optimization' | 'nlp' | 'vision';
  status: 'training' | 'deployed' | 'testing' | 'updating';
  accuracy: number | null;
  version: string;
  lastTrained: string;
  dataPoints: number | null;
}

export interface TrainingJob {
  id: string;
  modelName: string;
  progress: number | null;
  estimatedTime: string;
  status: 'running' | 'queued' | 'completed' | 'failed' | 'updating' | 'testing' | 'deployed';
  gpuUtilization: number | null;
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
