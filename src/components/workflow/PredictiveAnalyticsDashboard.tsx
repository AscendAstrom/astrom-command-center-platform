
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  TrendingUp, 
  Zap, 
  Target,
  Cpu,
  HardDrive,
  Activity,
  BarChart3,
  Settings,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { usePredictiveWorkflowOptimization } from "./hooks/usePredictiveWorkflowOptimization";

const PredictiveAnalyticsDashboard = () => {
  const {
    predictions,
    resourceAllocations,
    automationMetrics,
    isAnalyzing,
    learningProgress,
    runPredictiveAnalysis,
    applyOptimization,
    autoScaleResources
  } = usePredictiveWorkflowOptimization();

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getResourceIcon = (resourceType: string) => {
    switch (resourceType.toLowerCase()) {
      case 'cpu cores': return <Cpu className="h-4 w-4" />;
      case 'memory': return <HardDrive className="h-4 w-4" />;
      case 'storage i/o': return <Activity className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Predictive Analytics Overview */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-400" />
            Predictive Workflow Analytics
            <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">
              AI-Powered
            </Badge>
          </CardTitle>
          <CardDescription>
            Advanced machine learning for workflow optimization and intelligent resource allocation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{automationMetrics.totalPredictions}</div>
              <div className="text-xs text-muted-foreground">Total Predictions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{automationMetrics.accuracyRate}%</div>
              <div className="text-xs text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{automationMetrics.optimizationImpact}%</div>
              <div className="text-xs text-muted-foreground">Performance Gain</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{automationMetrics.resourceSavings}%</div>
              <div className="text-xs text-muted-foreground">Resource Savings</div>
            </div>
          </div>

          {isAnalyzing && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Running predictive analysis...</span>
                <span>{learningProgress}%</span>
              </div>
              <Progress value={learningProgress} className="h-2" />
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {automationMetrics.automaticAdjustments} automatic optimizations applied
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => runPredictiveAnalysis(['workflow_new_1', 'workflow_new_2'])}
              disabled={isAnalyzing}
              className="gap-2"
            >
              <Brain className={`h-4 w-4 ${isAnalyzing ? 'animate-pulse' : ''}`} />
              {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="predictions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions">Workflow Predictions</TabsTrigger>
          <TabsTrigger value="optimization">Smart Optimization</TabsTrigger>
          <TabsTrigger value="resources">Resource Intelligence</TabsTrigger>
          <TabsTrigger value="forecasting">Performance Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-400" />
                Workflow Performance Predictions
              </CardTitle>
              <CardDescription>
                AI-generated predictions for workflow duration, bottlenecks, and resource requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.map((prediction, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-card rounded-lg">
                          <Clock className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Workflow {prediction.workflowId}</h4>
                          <p className="text-sm text-muted-foreground">
                            Predicted duration: {prediction.predictedDuration}s
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                          {prediction.confidenceScore}% confidence
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm font-medium text-foreground mb-2">Resource Requirements</div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>CPU:</span>
                            <span>{prediction.resourceRequirements.cpu}%</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Memory:</span>
                            <span>{prediction.resourceRequirements.memory}%</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Storage:</span>
                            <span>{prediction.resourceRequirements.storage}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-foreground mb-2">Bottleneck Predictions</div>
                        <div className="space-y-1">
                          {prediction.bottleneckPredictions.map((bottleneck, bIndex) => (
                            <div key={bIndex} className="flex items-center gap-2">
                              <Badge variant="outline" className={getImpactColor(bottleneck.impact)}>
                                {bottleneck.impact}
                              </Badge>
                              <span className="text-xs">{(bottleneck.likelihood * 100).toFixed(0)}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-foreground mb-2">Quick Actions</div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => applyOptimization(prediction.workflowId, prediction.optimizationSuggestions[0])}
                          >
                            Optimize
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="font-medium text-foreground mb-1">AI Optimization Suggestions:</div>
                      <ul className="text-muted-foreground space-y-1">
                        {prediction.optimizationSuggestions.map((suggestion, sIndex) => (
                          <li key={sIndex} className="flex items-start gap-2">
                            <Lightbulb className="h-3 w-3 mt-0.5 text-yellow-400" />
                            <span className="text-xs">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Intelligent Optimization Engine
              </CardTitle>
              <CardDescription>
                Automated optimization recommendations and performance improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-green-600">Auto-Optimization Applied</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Workflow parallelization reduced average execution time by 23%
                  </p>
                  <div className="text-xs text-green-600">
                    ✓ Impact: +23% performance • Resource savings: 15% • Confidence: 96%
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-blue-500" />
                    <span className="font-medium text-blue-600">ML-Driven Resource Allocation</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Smart scaling prevented 3 potential bottlenecks in high-traffic periods
                  </p>
                  <div className="text-xs text-blue-600">
                    ✓ Prevented: 3 bottlenecks • Cost savings: $2,400/month • Reliability: +12%
                  </div>
                </div>

                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    <span className="font-medium text-purple-600">Predictive Cache Management</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    AI-predicted data access patterns improved cache hit rate to 94%
                  </p>
                  <div className="text-xs text-purple-600">
                    ✓ Cache efficiency: +27% • Response time: -45ms • Accuracy: 94%
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium text-yellow-600">Proactive Issue Detection</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Early warning system detected potential memory leak 2 hours before impact
                  </p>
                  <div className="text-xs text-yellow-600">
                    ✓ Early detection: 2h lead time • Prevented downtime • Auto-resolution: 98%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-cyan-400" />
                Intelligent Resource Management
              </CardTitle>
              <CardDescription>
                AI-driven resource allocation and optimization recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resourceAllocations.map((resource, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-card rounded-lg">
                          {getResourceIcon(resource.resourceType)}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{resource.resourceType}</h4>
                          <p className="text-sm text-muted-foreground">
                            Allocation Score: {resource.allocationScore}/100
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => autoScaleResources(resource.resourceType)}
                      >
                        Auto-Scale
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm font-medium text-foreground mb-2">Current Utilization</div>
                        <div className="flex items-center gap-2">
                          <Progress value={resource.currentUtilization} className="flex-1 h-2" />
                          <span className="text-sm text-muted-foreground">{resource.currentUtilization}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground mb-2">Predicted Utilization</div>
                        <div className="flex items-center gap-2">
                          <Progress value={resource.predictedUtilization} className="flex-1 h-2" />
                          <span className="text-sm text-muted-foreground">{resource.predictedUtilization}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="font-medium text-foreground mb-1">AI Recommendations:</div>
                      <ul className="text-muted-foreground space-y-1">
                        {resource.recommendations.map((rec, rIndex) => (
                          <li key={rIndex} className="flex items-start gap-2">
                            <Target className="h-3 w-3 mt-0.5 text-cyan-400" />
                            <span className="text-xs">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-orange-400" />
                  Performance Forecasting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-orange-500/10 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Workflow Throughput</span>
                      <span className="text-lg font-bold text-orange-500">+34%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Expected increase next week</div>
                  </div>
                  
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Error Rate Reduction</span>
                      <span className="text-lg font-bold text-green-500">-67%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Projected with AI optimizations</div>
                  </div>
                  
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Resource Efficiency</span>
                      <span className="text-lg font-bold text-blue-500">92%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Target efficiency score</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Future Optimizations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="text-sm font-medium">Auto-scaling Implementation</div>
                      <div className="text-xs text-muted-foreground">Completed this week</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium">ML Model Retraining</div>
                      <div className="text-xs text-muted-foreground">In progress</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="text-sm font-medium">Predictive Caching</div>
                      <div className="text-xs text-muted-foreground">Planned next month</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="text-sm font-medium">Advanced Analytics</div>
                      <div className="text-xs text-muted-foreground">Q2 2025 roadmap</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveAnalyticsDashboard;
