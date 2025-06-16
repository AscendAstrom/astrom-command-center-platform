
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, AlertTriangle, Target, Activity, Clock } from 'lucide-react';
import { predictiveAnalyticsService, PredictiveInsight, MLModelPerformance } from '@/services/analytics/predictiveAnalyticsService';

const PredictiveInsightsPanel = () => {
  const [insights, setInsights] = useState<{
    surgePredictions: PredictiveInsight[];
    capacityOptimizations: PredictiveInsight[];
    mlPerformance: MLModelPerformance[];
  }>({
    surgePredictions: [],
    capacityOptimizations: [],
    mlPerformance: []
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    loadInsights();
    const interval = setInterval(loadInsights, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const loadInsights = async () => {
    try {
      setLoading(true);
      const data = await predictiveAnalyticsService.getAllPredictiveInsights();
      setInsights(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading predictive insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'CRITICAL': return 'bg-red-500';
      case 'HIGH': return 'bg-orange-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const InsightCard = ({ insight }: { insight: PredictiveInsight }) => (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-blue-500" />
            <CardTitle className="text-sm font-medium">{insight.type.replace('_', ' ')}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`${getImpactColor(insight.impact)} text-white text-xs`}>
              {insight.impact}
            </Badge>
            <span className={`text-sm font-medium ${getConfidenceColor(insight.confidence)}`}>
              {Math.round(insight.confidence * 100)}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-foreground">{insight.prediction}</p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {insight.timeframe}
          </div>
          <div className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            {insight.dataPoints} data points
          </div>
        </div>

        {insight.actionable && insight.recommendedActions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-foreground">Recommended Actions:</h4>
            <ul className="space-y-1">
              {insight.recommendedActions.map((action, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                  <Target className="h-3 w-3 mt-0.5 text-blue-500 flex-shrink-0" />
                  {action}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const MLModelCard = ({ model }: { model: MLModelPerformance }) => (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{model.modelName}</CardTitle>
          <Badge className={`${model.status === 'ACTIVE' ? 'bg-green-500' : 'bg-yellow-500'} text-white text-xs`}>
            {model.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-muted rounded">
            <div className="text-lg font-bold text-foreground">{Math.round(model.accuracy * 100)}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
          <div className="text-center p-2 bg-muted rounded">
            <div className="text-lg font-bold text-foreground">{Math.round(model.precision * 100)}%</div>
            <div className="text-xs text-muted-foreground">Precision</div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          <div>Last Training: {model.lastTraining.toLocaleDateString()}</div>
          <div>Data Points: {model.dataPoints.toLocaleString()}</div>
        </div>
        
        {model.status === 'NEEDS_RETRAINING' && (
          <Button variant="outline" size="sm" className="w-full">
            Schedule Retraining
          </Button>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            Predictive Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin h-6 w-6 border-2 border-purple-500 border-t-transparent rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              AI Predictive Intelligence
            </CardTitle>
            <CardDescription>
              Real-time predictions and optimization recommendations
            </CardDescription>
          </div>
          <div className="text-right">
            <Button variant="outline" size="sm" onClick={loadInsights}>
              Refresh
            </Button>
            <div className="text-xs text-muted-foreground mt-1">
              Updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="surge" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="surge" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Surge Predictions
            </TabsTrigger>
            <TabsTrigger value="capacity" className="text-xs">
              <Target className="h-3 w-3 mr-1" />
              Capacity Optimization
            </TabsTrigger>
            <TabsTrigger value="models" className="text-xs">
              <Brain className="h-3 w-3 mr-1" />
              Model Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="surge" className="space-y-3">
            {insights.surgePredictions.length > 0 ? (
              insights.surgePredictions.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No surge predictions at this time</p>
                <p className="text-xs">System is monitoring for patterns</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="capacity" className="space-y-3">
            {insights.capacityOptimizations.length > 0 ? (
              insights.capacityOptimizations.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Capacity levels optimal</p>
                <p className="text-xs">No immediate optimizations needed</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="models" className="space-y-3">
            {insights.mlPerformance.length > 0 ? (
              insights.mlPerformance.map((model, index) => (
                <MLModelCard key={index} model={model} />
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No ML models active</p>
                <p className="text-xs">Deploy models to see performance metrics</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PredictiveInsightsPanel;
