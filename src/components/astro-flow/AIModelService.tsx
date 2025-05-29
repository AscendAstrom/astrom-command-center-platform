
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Activity, AlertTriangle, TrendingUp, Clock } from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  type: 'SLA_BREACH' | 'ETTB' | 'SURGE_PREDICTOR' | 'ANOMALY_DETECTOR' | 'ROUTING_RECOMMENDER';
  status: 'ONLINE' | 'OFFLINE' | 'TRAINING' | 'ERROR';
  accuracy: number;
  lastTrained: string;
  confidence: number;
  predictions: number;
}

interface AIPrediction {
  id: string;
  modelId: string;
  type: string;
  confidence: number;
  prediction: any;
  timestamp: string;
  explanation: string;
}

interface AIModelServiceProps {
  userRole: string;
}

const AIModelService = ({ userRole }: AIModelServiceProps) => {
  const [models, setModels] = useState<AIModel[]>([
    {
      id: 'sla-breach-risk',
      name: 'SLA Breach Risk Predictor',
      type: 'SLA_BREACH',
      status: 'ONLINE',
      accuracy: 91.3,
      lastTrained: '2024-01-20T10:30:00Z',
      confidence: 87,
      predictions: 247
    },
    {
      id: 'ettb-predictor',
      name: 'Estimated Time to Bay',
      type: 'ETTB',
      status: 'ONLINE',
      accuracy: 89.7,
      lastTrained: '2024-01-20T08:15:00Z',
      confidence: 92,
      predictions: 156
    },
    {
      id: 'surge-forecaster',
      name: 'Patient Surge Predictor',
      type: 'SURGE_PREDICTOR',
      status: 'TRAINING',
      accuracy: 94.1,
      lastTrained: '2024-01-19T22:00:00Z',
      confidence: 85,
      predictions: 89
    }
  ]);

  const [predictions, setPredictions] = useState<AIPrediction[]>([
    {
      id: '1',
      modelId: 'sla-breach-risk',
      type: 'HIGH_RISK_ALERT',
      confidence: 89,
      prediction: { risk: 'HIGH', patients: ['P-001', 'P-003'], eta: 8 },
      timestamp: '2024-01-20T15:30:00Z',
      explanation: 'High wait time + low zone capacity in Zone C'
    },
    {
      id: '2',
      modelId: 'surge-forecaster',
      type: 'SURGE_INCOMING',
      confidence: 94,
      prediction: { surge: true, timeframe: '2h', capacity: 94, zone: 'Zone B' },
      timestamp: '2024-01-20T15:25:00Z',
      explanation: 'Historical patterns + current trends indicate surge'
    }
  ]);

  const getModelStatusColor = (status: string) => {
    switch (status) {
      case 'ONLINE': return 'bg-green-600';
      case 'TRAINING': return 'bg-blue-600';
      case 'ERROR': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getModelIcon = (type: string) => {
    switch (type) {
      case 'SLA_BREACH': return AlertTriangle;
      case 'ETTB': return Clock;
      case 'SURGE_PREDICTOR': return TrendingUp;
      case 'ANOMALY_DETECTOR': return Activity;
      default: return Brain;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-green-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* AI Models Status */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            AI Models Status
          </CardTitle>
          <CardDescription>Real-time AI model performance and predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {models.map((model) => {
              const IconComponent = getModelIcon(model.type);
              return (
                <div key={model.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-purple-400" />
                      <span className="font-medium text-foreground">{model.name}</span>
                    </div>
                    <Badge className={getModelStatusColor(model.status)}>
                      {model.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Accuracy</span>
                      <span className="text-foreground font-medium">{model.accuracy}%</span>
                    </div>
                    <Progress value={model.accuracy} className="h-1" />
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className={`font-medium ${getConfidenceColor(model.confidence)}`}>
                        {model.confidence}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Predictions Today</span>
                      <span className="text-foreground">{model.predictions}</span>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Last trained: {new Date(model.lastTrained).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent AI Predictions */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-cyan-500" />
            Recent AI Predictions
          </CardTitle>
          <CardDescription>Latest predictions and AI-driven insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map((prediction) => (
              <div key={prediction.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{prediction.type.replace('_', ' ')}</h4>
                    <p className="text-sm text-muted-foreground">{prediction.explanation}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getConfidenceColor(prediction.confidence)}>
                      {prediction.confidence}% confidence
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(prediction.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-muted/50 rounded border">
                  <pre className="text-xs text-muted-foreground overflow-auto">
                    {JSON.stringify(prediction.prediction, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIModelService;
