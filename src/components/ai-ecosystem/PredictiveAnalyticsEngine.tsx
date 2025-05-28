
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Brain, AlertTriangle, Target, Zap, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface PredictionModel {
  id: string;
  name: string;
  type: 'lstm' | 'prophet' | 'arima' | 'ensemble';
  target: string;
  accuracy: number;
  confidence: number;
  lastTrained: string;
  status: 'active' | 'training' | 'pending';
}

interface Prediction {
  id: string;
  modelId: string;
  target: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  timeHorizon: string;
  riskLevel: 'low' | 'medium' | 'high';
  recommendation: string;
}

const PredictiveAnalyticsEngine = () => {
  const [selectedTimeHorizon, setSelectedTimeHorizon] = useState('4h');
  const [models] = useState<PredictionModel[]>([
    {
      id: 'surge-predictor',
      name: 'Patient Surge Predictor',
      type: 'lstm',
      target: 'patient_volume',
      accuracy: 94,
      confidence: 89,
      lastTrained: '2 hours ago',
      status: 'active'
    },
    {
      id: 'sla-risk-scorer',
      name: 'SLA Risk Scorer',
      type: 'ensemble',
      target: 'sla_breach_probability',
      accuracy: 92,
      confidence: 87,
      lastTrained: '1 hour ago',
      status: 'active'
    },
    {
      id: 'resource-optimizer',
      name: 'Resource Optimizer',
      type: 'prophet',
      target: 'resource_demand',
      accuracy: 88,
      confidence: 84,
      lastTrained: '30 min ago',
      status: 'training'
    },
    {
      id: 'quality-forecaster',
      name: 'Data Quality Forecaster',
      type: 'arima',
      target: 'data_quality_score',
      accuracy: 91,
      confidence: 86,
      lastTrained: '45 min ago',
      status: 'active'
    }
  ]);

  const [predictions] = useState<Prediction[]>([
    {
      id: '1',
      modelId: 'surge-predictor',
      target: 'Patient Volume',
      currentValue: 142,
      predictedValue: 167,
      confidence: 89,
      timeHorizon: '4 hours',
      riskLevel: 'medium',
      recommendation: 'Consider activating surge protocol and alerting additional staff'
    },
    {
      id: '2',
      modelId: 'sla-risk-scorer',
      target: 'SLA Breach Risk',
      currentValue: 23,
      predictedValue: 41,
      confidence: 87,
      timeHorizon: '2 hours',
      riskLevel: 'high',
      recommendation: 'Implement immediate workflow optimization to prevent SLA breaches'
    },
    {
      id: '3',
      modelId: 'resource-optimizer',
      target: 'Staff Demand',
      currentValue: 28,
      predictedValue: 34,
      confidence: 84,
      timeHorizon: '6 hours',
      riskLevel: 'low',
      recommendation: 'Schedule additional staff for evening shift'
    }
  ]);

  // Mock data for trend visualization
  const trendData = [
    { time: '00:00', actual: 120, predicted: 118, confidence: 85 },
    { time: '04:00', actual: 95, predicted: 98, confidence: 87 },
    { time: '08:00', actual: 140, predicted: 135, confidence: 89 },
    { time: '12:00', actual: 165, predicted: 162, confidence: 91 },
    { time: '16:00', actual: 180, predicted: 185, confidence: 88 },
    { time: '20:00', actual: null, predicted: 195, confidence: 85 },
    { time: '24:00', actual: null, predicted: 167, confidence: 82 }
  ];

  const getModelTypeColor = (type: string) => {
    switch (type) {
      case 'lstm': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'prophet': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'arima': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'ensemble': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400 border-green-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      case 'high': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'training': return 'bg-blue-500 animate-pulse';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            Predictive Analytics Engine
          </CardTitle>
          <CardDescription>
            Advanced ML models for forecasting and trend analysis across healthcare operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">Prediction Horizon</label>
                <Select value={selectedTimeHorizon} onValueChange={setSelectedTimeHorizon}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 Hour</SelectItem>
                    <SelectItem value="4h">4 Hours</SelectItem>
                    <SelectItem value="12h">12 Hours</SelectItem>
                    <SelectItem value="24h">24 Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Brain className="h-4 w-4 mr-2" />
                Retrain Models
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Zap className="h-4 w-4 mr-2" />
                Run Predictions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ML Models Status */}
        <Card className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              Active ML Models
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {models.map((model) => (
              <div key={model.id} className="p-4 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(model.status)}`} />
                    <div className="font-medium text-foreground">{model.name}</div>
                  </div>
                  <Badge className={getModelTypeColor(model.type)}>
                    {model.type.toUpperCase()}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Accuracy:</span>
                    <span className="text-foreground font-medium ml-1">{model.accuracy}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="text-foreground font-medium ml-1">{model.confidence}%</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Last trained:</span>
                    <span className="text-foreground font-medium ml-1">{model.lastTrained}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Current Predictions */}
        <Card className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Target className="h-5 w-5 text-green-400" />
              Active Predictions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {predictions.map((prediction) => (
              <div key={prediction.id} className="p-4 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="font-medium text-foreground">{prediction.target}</div>
                  <Badge variant="outline" className={getRiskColor(prediction.riskLevel)}>
                    {prediction.riskLevel} risk
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current:</span>
                    <span className="text-foreground font-medium">{prediction.currentValue}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Predicted ({prediction.timeHorizon}):</span>
                    <span className="text-foreground font-medium">{prediction.predictedValue}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="text-foreground font-medium">{prediction.confidence}%</span>
                  </div>
                  <div className="mt-3 p-2 bg-blue-500/10 rounded border border-blue-500/20">
                    <div className="text-xs text-blue-600 font-medium mb-1">AI Recommendation:</div>
                    <div className="text-xs text-foreground">{prediction.recommendation}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Trend Visualization */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            Prediction Trends & Model Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Actual Values</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Predicted Values</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalyticsEngine;
