
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Cpu, TrendingUp, BarChart3, Zap } from "lucide-react";

export const PredictiveOptimizationTab = () => {
  const optimizationMetrics = {
    performanceGain: "+34.2%",
    resourceEfficiency: 92.1,
    costReduction: "$127K",
    predictionAccuracy: 96.8
  };

  const optimizationRecommendations = [
    { area: "Database Query Optimization", impact: "High", savings: "23% faster", confidence: 94 },
    { area: "API Gateway Load Balancing", impact: "Medium", savings: "15% reduction", confidence: 87 },
    { area: "Cache Strategy Enhancement", impact: "High", savings: "41% improvement", confidence: 92 },
    { area: "Workflow Path Optimization", impact: "Medium", savings: "12% efficiency", confidence: 89 }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'Low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-purple-400" />
          Predictive Performance Optimization
        </CardTitle>
        <CardDescription>
          ML-driven performance optimization with predictive resource management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{optimizationMetrics.performanceGain}</div>
            <div className="text-xs text-muted-foreground">Performance Gain</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{optimizationMetrics.resourceEfficiency}%</div>
            <div className="text-xs text-muted-foreground">Resource Efficiency</div>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">{optimizationMetrics.costReduction}</div>
            <div className="text-xs text-muted-foreground">Cost Reduction</div>
          </div>
          <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="text-2xl font-bold text-orange-400">{optimizationMetrics.predictionAccuracy}%</div>
            <div className="text-xs text-muted-foreground">Prediction Accuracy</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Optimization Recommendations</h4>
            <Button variant="outline" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Run Analysis
            </Button>
          </div>
          
          {optimizationRecommendations.map((recommendation, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-blue-400" />
                  <span className="font-medium">{recommendation.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getImpactColor(recommendation.impact)}>
                    {recommendation.impact} Impact
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <div className="text-sm text-muted-foreground">Expected Savings</div>
                  <div className="font-medium text-green-400">{recommendation.savings}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                  <div className="font-medium">{recommendation.confidence}%</div>
                </div>
              </div>
              <Progress value={recommendation.confidence} className="h-2" />
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
          <h4 className="font-semibold text-foreground mb-2">Predictive Capabilities</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>Real-time performance forecasting</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>Intelligent resource allocation</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>Automated scaling predictions</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>Cost optimization recommendations</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
