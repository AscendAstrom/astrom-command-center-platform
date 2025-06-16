
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, Users, Bed, Activity, Zap, Globe, Database } from "lucide-react";
import { mlPredictionService, PredictionModel, Prediction, FederatedSite } from '@/services/predictiveAnalytics/mlPredictionService';
import { toast } from 'sonner';

const PredictiveAnalyticsDashboard = () => {
  const [models, setModels] = useState<PredictionModel[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [federatedSites, setFederatedSites] = useState<FederatedSite[]>([]);
  const [capacityForecasts, setCapacityForecasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPredictiveData();
  }, []);

  const loadPredictiveData = async () => {
    try {
      setLoading(true);
      const [modelsData, sitesData, forecastsData] = await Promise.all([
        mlPredictionService.getDeployedModels(),
        mlPredictionService.getFederatedSites(),
        mlPredictionService.getCapacityForecasts()
      ]);

      setModels(modelsData);
      setFederatedSites(sitesData);
      setCapacityForecasts(forecastsData);

      // Generate predictions for each deployed model
      const predictionPromises = modelsData.map(model => 
        mlPredictionService.generatePrediction(model.id, 24)
      );
      const predictionsData = await Promise.all(predictionPromises);
      setPredictions(predictionsData.filter(p => p !== null) as Prediction[]);

    } catch (error) {
      console.error('Error loading predictive data:', error);
      toast.error('Failed to load predictive analytics data');
    } finally {
      setLoading(false);
    }
  };

  const generateNewPrediction = async (modelId: string) => {
    try {
      const prediction = await mlPredictionService.generatePrediction(modelId, 24);
      if (prediction) {
        setPredictions(prev => [prediction, ...prev.filter(p => p.modelId !== modelId)]);
        toast.success('New prediction generated successfully');
      }
    } catch (error) {
      toast.error('Failed to generate prediction');
    }
  };

  const getModelIcon = (type: string) => {
    switch (type) {
      case 'lstm': return <Brain className="h-5 w-5" />;
      case 'prophet': return <TrendingUp className="h-5 w-5" />;
      case 'ensemble': return <Database className="h-5 w-5" />;
      case 'arima': return <Activity className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  const getTargetIcon = (target: string) => {
    switch (target) {
      case 'bed_occupancy': return <Bed className="h-4 w-4" />;
      case 'patient_admissions': return <Users className="h-4 w-4" />;
      case 'staff_allocation': return <Users className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-purple-500" />
          <div>
            <h1 className="text-3xl font-bold">Predictive Analytics</h1>
            <p className="text-muted-foreground">Loading ML models and predictions...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-purple-500" />
          <div>
            <h1 className="text-3xl font-bold">Predictive Analytics</h1>
            <p className="text-muted-foreground">Advanced ML models for patient flow and resource optimization</p>
          </div>
        </div>
        <Button onClick={loadPredictiveData} variant="outline">
          <Zap className="h-4 w-4 mr-2" />
          Refresh Predictions
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">Active Models</span>
            </div>
            <div className="text-2xl font-bold">{models.length}</div>
            <p className="text-xs text-muted-foreground">Deployed and running</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Avg Accuracy</span>
            </div>
            <div className="text-2xl font-bold">
              {models.length > 0 ? Math.round(models.reduce((sum, m) => sum + m.accuracy, 0) / models.length) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Across all models</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">Federated Sites</span>
            </div>
            <div className="text-2xl font-bold">{federatedSites.length}</div>
            <p className="text-xs text-muted-foreground">Contributing data</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-medium">Data Points</span>
            </div>
            <div className="text-2xl font-bold">
              {models.reduce((sum, m) => sum + m.dataPoints, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Total training data</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="predictions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions">Current Predictions</TabsTrigger>
          <TabsTrigger value="models">ML Models</TabsTrigger>
          <TabsTrigger value="federated">Federated Learning</TabsTrigger>
          <TabsTrigger value="forecasts">Capacity Forecasts</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {predictions.map((prediction) => {
              const model = models.find(m => m.id === prediction.modelId);
              return (
                <Card key={prediction.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTargetIcon(prediction.target)}
                        <CardTitle className="text-lg">{prediction.target.replace('_', ' ').toUpperCase()}</CardTitle>
                      </div>
                      <Badge variant="outline">
                        {Math.round(prediction.confidence)}% confidence
                      </Badge>
                    </div>
                    <CardDescription>
                      Generated by {model?.name} - Next 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">
                      {Math.round(prediction.value * 10) / 10}
                      {prediction.target.includes('rate') || prediction.target.includes('occupancy') ? '%' : ''}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Model: {model?.type.toUpperCase()}</span>
                      <span>{new Date(prediction.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-4"
                      onClick={() => generateNewPrediction(prediction.modelId)}
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Regenerate
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((model) => (
              <Card key={model.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getModelIcon(model.type)}
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                    </div>
                    <Badge variant={model.status === 'deployed' ? 'default' : 'secondary'}>
                      {model.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    Target: {model.target.replace('_', ' ')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Accuracy:</span>
                      <span className="font-medium">{model.accuracy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Confidence:</span>
                      <span className="font-medium">{model.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Version:</span>
                      <span className="font-medium">{model.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Data Points:</span>
                      <span className="font-medium">{model.dataPoints.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4"
                    onClick={() => generateNewPrediction(model.id)}
                  >
                    Generate Prediction
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="federated" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {federatedSites.map((site) => (
              <Card key={site.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{site.name}</CardTitle>
                    <Badge variant={site.status === 'active' ? 'default' : 'secondary'}>
                      {site.status}
                    </Badge>
                  </div>
                  <CardDescription>{site.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Data Contribution:</span>
                      <span className="font-medium">{site.dataContribution.toLocaleString()} records</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Sync:</span>
                      <span className="font-medium">{site.lastSync.toLocaleDateString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (site.dataContribution / 150000) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forecasts" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {capacityForecasts.map((forecast, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{forecast.forecast_type.replace('_', ' ').toUpperCase()}</CardTitle>
                    <Badge variant="outline">
                      Model {forecast.model_version}
                    </Badge>
                  </div>
                  <CardDescription>
                    Forecast for {new Date(forecast.forecast_date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        {Math.round(forecast.predicted_value * 10) / 10}
                        {forecast.forecast_type.includes('rate') || forecast.forecast_type.includes('occupancy') ? '%' : ''}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ±{forecast.confidence_interval}% confidence interval
                      </div>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveAnalyticsDashboard;
