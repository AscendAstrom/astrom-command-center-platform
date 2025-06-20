import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Brain, AlertTriangle, Target, Zap, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

interface PredictionModel {
  id: string;
  name: string;
  type: 'lstm' | 'prophet' | 'arima' | 'ensemble';
  target: string;
  accuracy: number | null;
  confidence: number | null;
  lastTrained: string;
  status: 'active' | 'training' | 'pending' | null;
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
  const [models, setModels] = useState<PredictionModel[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: modelsData, error: modelsError } = await supabase.from('ml_models').select('*');
      if (modelsData) {
        const formattedModels = modelsData.map(m => ({
          id: m.id,
          name: m.name,
          type: m.type as PredictionModel['type'],
          target: m.target,
          accuracy: m.accuracy,
          confidence: m.confidence,
          lastTrained: m.last_trained ? new Date(m.last_trained).toLocaleDateString() : 'N/A',
          status: m.status as PredictionModel['status'],
        }));
        setModels(formattedModels);
      } else {
        if (modelsError) console.error("Error fetching ml_models:", modelsError);
        setModels([]);
      }

      // Fetch predictions from 'capacity_forecasts'
      const { data: forecastsData, error: forecastsError } = await supabase
        .from('capacity_forecasts')
        .select('*')
        .order('forecast_date', { ascending: false })
        .limit(3);

      if (forecastsData) {
        const formattedPredictions = await Promise.all(
          forecastsData.map(async (p) => {
            const { data: latestMetric } = await supabase
              .from('metrics_snapshots')
              .select('metric_value')
              .eq('metric_name', p.forecast_type)
              .order('timestamp', { ascending: false })
              .limit(1)
              .maybeSingle();

            const currentValue = latestMetric?.metric_value ?? 0;
            const predictedValue = p.predicted_value;
            const confidence = p.confidence_interval ? (100 - p.confidence_interval) : 85;

            let riskLevel: 'low' | 'medium' | 'high' = 'medium';
            if (confidence < 80) riskLevel = 'high';
            else if (confidence > 95) riskLevel = 'low';

            let recommendation: string;
            const change = predictedValue - currentValue;
            const percentageChange = currentValue !== 0 ? (change / currentValue) * 100 : 0;

            if (riskLevel === 'high') {
              recommendation = `High forecast uncertainty for ${p.forecast_type}. Use caution with this prediction.`;
            } else if (Math.abs(percentageChange) > 15) {
              recommendation = `Significant change of ${percentageChange.toFixed(1)}% predicted for ${p.forecast_type}. Review contributing factors.`;
            } else if (change > 0) {
              recommendation = `Upward trend predicted for ${p.forecast_type}. Plan for increased volume/activity.`;
            } else {
              recommendation = `Stable or downward trend predicted for ${p.forecast_type}. Current operations seem adequate.`;
            }
            
            return {
              id: p.id,
              modelId: p.model_version || `model-${p.id}`,
              target: p.forecast_type,
              currentValue: currentValue,
              predictedValue: predictedValue,
              confidence: confidence,
              timeHorizon: '24 hours',
              riskLevel: riskLevel,
              recommendation: recommendation,
            } as Prediction;
          })
        );
        setPredictions(formattedPredictions);
      }
      
      // Fetch trend data from 'metrics_snapshots'
      const { data: trendData, error: trendError } = await supabase
        .from('metrics_snapshots')
        .select('timestamp, metric_value')
        .order('timestamp', { ascending: true })
        .limit(20);

      if (trendData) {
         const formattedTrendData = trendData.map(d => ({
            time: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actual: d.metric_value,
            predicted: null // No predicted value in this table
        }));
        setTrendData(formattedTrendData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

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
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)
            ) : models.length > 0 ? (
              models.map((model) => (
                <div key={model.id} className="p-4 bg-muted/50 rounded-lg border border-border/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(model.status || '')}`} />
                      <div className="font-medium text-foreground">{model.name}</div>
                    </div>
                    <Badge className={getModelTypeColor(model.type)}>
                      {model.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Accuracy:</span>
                      <span className="text-foreground font-medium ml-1">{model.accuracy ? `${model.accuracy}%` : 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Confidence:</span>
                      <span className="text-foreground font-medium ml-1">{model.confidence ? `${model.confidence}%` : 'N/A'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Last trained:</span>
                      <span className="text-foreground font-medium ml-1">{model.lastTrained}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-10">
                No active ML models found.
              </div>
            )}
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
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-36 w-full" />)
            ) : predictions.length > 0 ? (
              predictions.map((prediction) => (
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
                      <span className="text-foreground font-medium">{prediction.currentValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Predicted ({prediction.timeHorizon}):</span>
                      <span className="text-foreground font-medium">{prediction.predictedValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Confidence:</span>
                      <span className="text-foreground font-medium">{prediction.confidence.toFixed(1)}%</span>
                    </div>
                    <div className="mt-3 p-2 bg-blue-500/10 rounded border border-blue-500/20">
                      <div className="text-xs text-blue-600 font-medium mb-1">AI Recommendation:</div>
                      <div className="text-xs text-foreground">{prediction.recommendation}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
                <div className="text-center text-muted-foreground py-10">
                  No active predictions available.
                </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Trend Visualization */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            Historical Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-80 w-full" />
          ) : trendData.length > 0 ? (
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
                    dataKey="actual"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    name="Actual"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
             <div className="h-80 flex items-center justify-center text-muted-foreground">
                No trend data available.
              </div>
          )}
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Actual Values</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalyticsEngine;
