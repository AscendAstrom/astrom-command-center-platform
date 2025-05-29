
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Cpu, Database, TrendingUp, Activity, Settings } from 'lucide-react';
import { FlowUserRole } from './types';
import { toast } from 'sonner';

interface AIModel {
  id: string;
  name: string;
  type: 'predictive' | 'classification' | 'optimization' | 'nlp';
  status: 'active' | 'training' | 'inactive';
  accuracy: number;
  lastTrained: string;
  predictions: number;
  domain: string;
}

interface AIModelServiceProps {
  userRole: FlowUserRole;
}

const AIModelService = ({ userRole }: AIModelServiceProps) => {
  const [models, setModels] = useState<AIModel[]>([
    {
      id: '1',
      name: 'Patient Flow Predictor',
      type: 'predictive',
      status: 'active',
      accuracy: 94.2,
      lastTrained: '2024-01-20',
      predictions: 1247,
      domain: 'Emergency Department'
    },
    {
      id: '2',
      name: 'Capacity Optimizer',
      type: 'optimization',
      status: 'active',
      accuracy: 91.8,
      lastTrained: '2024-01-19',
      predictions: 856,
      domain: 'Resource Management'
    },
    {
      id: '3',
      name: 'Risk Assessment Model',
      type: 'classification',
      status: 'training',
      accuracy: 87.3,
      lastTrained: '2024-01-18',
      predictions: 432,
      domain: 'Patient Safety'
    },
    {
      id: '4',
      name: 'NLP Clinical Notes',
      type: 'nlp',
      status: 'active',
      accuracy: 96.1,
      lastTrained: '2024-01-21',
      predictions: 2341,
      domain: 'Clinical Documentation'
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    totalPredictions: 4876,
    averageAccuracy: 92.4,
    activeModels: 3,
    processingSpeed: 234
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'training': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'inactive': return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'predictive': return <TrendingUp className="h-4 w-4" />;
      case 'classification': return <Database className="h-4 w-4" />;
      case 'optimization': return <Settings className="h-4 w-4" />;
      case 'nlp': return <Brain className="h-4 w-4" />;
      default: return <Cpu className="h-4 w-4" />;
    }
  };

  const handleRetrainModel = (modelId: string) => {
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, status: 'training' as const }
        : model
    ));
    toast.success("Model retraining initiated");
    
    // Simulate training completion
    setTimeout(() => {
      setModels(prev => prev.map(model => 
        model.id === modelId 
          ? { 
              ...model, 
              status: 'active' as const,
              accuracy: Math.min(100, model.accuracy + Math.random() * 3),
              lastTrained: new Date().toISOString().split('T')[0]
            }
          : model
      ));
      toast.success("Model retraining completed");
    }, 5000);
  };

  const handleOptimizeAll = () => {
    toast.info("Starting AI model optimization...");
    
    setTimeout(() => {
      setModels(prev => prev.map(model => ({
        ...model,
        accuracy: Math.min(100, model.accuracy + Math.random() * 2 + 1)
      })));
      
      setSystemMetrics(prev => ({
        ...prev,
        averageAccuracy: Math.min(100, prev.averageAccuracy + 1.2),
        processingSpeed: Math.floor(prev.processingSpeed * 1.15)
      }));
      
      toast.success("AI model optimization completed");
    }, 3000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        totalPredictions: prev.totalPredictions + Math.floor(Math.random() * 10) + 1,
        processingSpeed: prev.processingSpeed + Math.floor((Math.random() - 0.5) * 20)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-400" />
            AI Model Service
            <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">Phase 3</Badge>
          </CardTitle>
          <CardDescription>
            Advanced machine learning models for healthcare workflow optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{systemMetrics.totalPredictions}</div>
              <div className="text-sm text-muted-foreground">Total Predictions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{systemMetrics.averageAccuracy.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Avg Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{systemMetrics.activeModels}</div>
              <div className="text-sm text-muted-foreground">Active Models</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{systemMetrics.processingSpeed}/s</div>
              <div className="text-sm text-muted-foreground">Processing Speed</div>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Button onClick={handleOptimizeAll} className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Brain className="h-4 w-4 mr-2" />
              Optimize All Models
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Model Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {models.map((model) => (
          <Card key={model.id} className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(model.type)}
                  <CardTitle className="text-lg text-foreground">{model.name}</CardTitle>
                </div>
                <Badge variant="outline" className={getStatusColor(model.status)}>
                  {model.status}
                </Badge>
              </div>
              <CardDescription>{model.domain}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="font-medium text-foreground">{model.accuracy.toFixed(1)}%</span>
                </div>
                <Progress value={model.accuracy} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Last Trained</div>
                  <div className="font-medium text-foreground">{model.lastTrained}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Predictions</div>
                  <div className="font-medium text-foreground">{model.predictions.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleRetrainModel(model.id)}
                  disabled={model.status === 'training' || userRole === 'VIEWER'}
                  className="flex-1"
                >
                  {model.status === 'training' ? 'Training...' : 'Retrain'}
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Model Performance Analytics */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-400" />
            Model Performance Analytics
          </CardTitle>
          <CardDescription>Real-time performance metrics and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Performance Trends</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Accuracy Improvement</span>
                  <span className="text-green-600 font-medium">+2.3%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="text-blue-600 font-medium">-15ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Resource Usage</span>
                  <span className="text-orange-600 font-medium">-8%</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Model Health</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-sm text-muted-foreground">All models operational</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-sm text-muted-foreground">Auto-scaling active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  <span className="text-sm text-muted-foreground">Continuous learning enabled</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Today's Impact</h4>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Decisions Automated:</span>
                  <span className="font-medium text-foreground ml-1">1,247</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Time Saved:</span>
                  <span className="font-medium text-foreground ml-1">18.3 hours</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Accuracy Rate:</span>
                  <span className="font-medium text-foreground ml-1">94.2%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIModelService;
