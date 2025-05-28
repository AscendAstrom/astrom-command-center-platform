
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Database, 
  Cpu, 
  Network,
  TrendingUp,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Monitor,
  Zap,
  GitBranch
} from 'lucide-react';

interface MLModel {
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

interface TrainingJob {
  id: string;
  modelName: string;
  progress: number;
  estimatedTime: string;
  status: 'running' | 'queued' | 'completed' | 'failed';
  gpuUtilization: number;
}

interface FederatedSite {
  id: string;
  name: string;
  location: string;
  status: 'connected' | 'syncing' | 'offline';
  dataContribution: number;
  latestSync: string;
}

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

  const [platformMetrics, setPlatformMetrics] = useState({
    totalModels: 12,
    activeTraining: 3,
    deployedModels: 8,
    avgAccuracy: 92.8,
    computeUtilization: 67,
    dataVolume: 15.7 // TB
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': case 'connected': case 'completed': 
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'training': case 'syncing': case 'running': 
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'testing': case 'queued': 
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'updating': case 'offline': case 'failed': 
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prediction': return <TrendingUp className="h-4 w-4" />;
      case 'classification': return <GitBranch className="h-4 w-4" />;
      case 'optimization': return <Zap className="h-4 w-4" />;
      case 'nlp': return <Brain className="h-4 w-4" />;
      case 'vision': return <Monitor className="h-4 w-4" />;
      default: return <Cpu className="h-4 w-4" />;
    }
  };

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
      {/* Platform Overview */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Cpu className="h-6 w-6 text-blue-400" />
            Advanced ML Platform
            <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Phase 3A</Badge>
          </CardTitle>
          <CardDescription>
            Real-time model training, federated learning, and automated deployment pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{platformMetrics.totalModels}</div>
              <div className="text-xs text-muted-foreground">Total Models</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{platformMetrics.deployedModels}</div>
              <div className="text-xs text-muted-foreground">Deployed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{platformMetrics.activeTraining}</div>
              <div className="text-xs text-muted-foreground">Training</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{platformMetrics.avgAccuracy.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Avg Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{platformMetrics.computeUtilization}%</div>
              <div className="text-xs text-muted-foreground">GPU Usage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{platformMetrics.dataVolume}TB</div>
              <div className="text-xs text-muted-foreground">Data Volume</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ML Models */}
        <Card className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              ML Model Registry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {models.map((model) => (
              <div key={model.id} className="p-3 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(model.type)}
                    <span className="font-medium text-sm text-foreground">{model.name}</span>
                  </div>
                  <Badge variant="outline" className={`text-xs ${getStatusColor(model.status)}`}>
                    {model.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                  <div>Accuracy: {model.accuracy}%</div>
                  <div>Version: {model.version}</div>
                  <div>Data: {(model.dataPoints / 1000000).toFixed(1)}M</div>
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <Play className="h-3 w-3 mr-1" />
                    Deploy
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Retrain
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Training Jobs */}
        <Card className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Database className="h-5 w-5 text-green-400" />
              Real-time Training Jobs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trainingJobs.map((job) => (
              <div key={job.id} className="p-3 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-foreground">{job.modelName}</span>
                  <Badge variant="outline" className={`text-xs ${getStatusColor(job.status)}`}>
                    {job.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{job.progress}%</span>
                  </div>
                  <Progress value={job.progress} className="h-2" />
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>ETA: {job.estimatedTime}</div>
                    <div>GPU: {job.gpuUtilization}%</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Federated Learning Network */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Network className="h-5 w-5 text-cyan-400" />
            Federated Learning Network
          </CardTitle>
          <CardDescription>
            Multi-site collaborative learning while preserving data privacy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {federatedSites.map((site) => (
              <div key={site.id} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">{site.name}</h4>
                  <Badge variant="outline" className={`text-xs ${getStatusColor(site.status)}`}>
                    {site.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Location: {site.location}</div>
                  <div>Contribution: {site.dataContribution.toLocaleString()} records</div>
                  <div>Last Sync: {site.latestSync}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedMLPlatform;
