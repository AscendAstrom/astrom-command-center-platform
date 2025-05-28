
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, AlertTriangle, Target, Zap, Settings } from "lucide-react";

interface PredictionData {
  metric: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  timeframe: string;
  trend: 'up' | 'down' | 'stable';
  risk: 'low' | 'medium' | 'high';
}

const PredictiveAnalyticsDashboard = () => {
  const [predictions, setPredictions] = useState<PredictionData[]>([
    {
      metric: "Bed Occupancy",
      currentValue: 78,
      predictedValue: 94,
      confidence: 87,
      timeframe: "2 hours",
      trend: 'up',
      risk: 'high'
    },
    {
      metric: "Patient Admissions",
      currentValue: 142,
      predictedValue: 165,
      confidence: 82,
      timeframe: "4 hours",
      trend: 'up',
      risk: 'medium'
    },
    {
      metric: "Discharge Rate",
      currentValue: 28,
      predictedValue: 35,
      confidence: 91,
      timeframe: "6 hours",
      trend: 'up',
      risk: 'low'
    },
    {
      metric: "Emergency Arrivals",
      currentValue: 45,
      predictedValue: 52,
      confidence: 75,
      timeframe: "1 hour",
      trend: 'up',
      risk: 'medium'
    }
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPredictions(prev => prev.map(p => ({
        ...p,
        confidence: Math.max(70, Math.min(95, p.confidence + (Math.random() - 0.5) * 3))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-400" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-green-400 rotate-180" />;
      case 'stable': return <Target className="h-4 w-4 text-blue-400" />;
      default: return <Target className="h-4 w-4 text-gray-400" />;
    }
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setPredictions(prev => prev.map(p => ({
        ...p,
        confidence: Math.max(85, Math.min(98, p.confidence + Math.random() * 5))
      })));
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="surface-elevated border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-500/10">
                <Brain className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-foreground">Predictive Analytics Engine</CardTitle>
                <CardDescription>AI-powered forecasting and capacity planning</CardDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">
                ML Models Active
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={runAnalysis}
                disabled={isAnalyzing}
                className="flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Run Analysis
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {predictions.map((prediction, index) => (
          <Card key={prediction.metric} className="surface-elevated border-border/50 hover-lift">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-foreground">
                  {prediction.metric}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {getTrendIcon(prediction.trend)}
                  <Badge variant="outline" className={getRiskColor(prediction.risk)}>
                    {prediction.risk} risk
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Current</div>
                  <div className="text-2xl font-bold text-foreground">{prediction.currentValue}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Predicted ({prediction.timeframe})</div>
                  <div className="text-2xl font-bold text-foreground">{prediction.predictedValue}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-medium text-foreground">{prediction.confidence}%</span>
                </div>
                <Progress value={prediction.confidence} className="h-2" />
              </div>

              {prediction.risk === 'high' && (
                <div className="flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span className="text-sm text-red-400">
                    Alert threshold may be exceeded
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ML Model Status */}
      <Card className="surface-elevated border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            Machine Learning Models
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Occupancy Forecaster</span>
                <Badge className="bg-green-500/10 text-green-600">Active</Badge>
              </div>
              <div className="text-xs text-muted-foreground">Accuracy: 94.2%</div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Admission Predictor</span>
                <Badge className="bg-green-500/10 text-green-600">Active</Badge>
              </div>
              <div className="text-xs text-muted-foreground">Accuracy: 89.7%</div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Anomaly Detector</span>
                <Badge className="bg-blue-500/10 text-blue-600">Learning</Badge>
              </div>
              <div className="text-xs text-muted-foreground">Training: 76%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalyticsDashboard;
