
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  Zap, 
  Eye, 
  Target,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
  Lightbulb
} from "lucide-react";

interface AIInsight {
  id: string;
  type: 'prediction' | 'optimization' | 'anomaly' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  actionable: boolean;
  timestamp: Date;
  source: string;
}

interface AIMetrics {
  totalInsights: number;
  activeModels: number;
  predictionAccuracy: number;
  automationRate: number;
  decisionsPerHour: number;
  learningProgress: number;
}

const AIIntelligenceDashboard = () => {
  const [insights, setInsights] = useState<AIInsight[]>([
    {
      id: '1',
      type: 'prediction',
      title: 'ED Surge Predicted',
      description: 'Emergency Department volume expected to increase by 35% in the next 4 hours based on historical patterns and current indicators.',
      confidence: 87,
      impact: 'high',
      actionable: true,
      timestamp: new Date(Date.now() - 300000),
      source: 'Surge Prediction Model v2.1'
    },
    {
      id: '2',
      type: 'optimization',
      title: 'Resource Allocation Optimized',
      description: 'AI recommends redistributing 3 ICU beds to step-down units for 18% efficiency improvement.',
      confidence: 92,
      impact: 'medium',
      actionable: true,
      timestamp: new Date(Date.now() - 600000),
      source: 'Resource Optimization Engine'
    },
    {
      id: '3',
      type: 'anomaly',
      title: 'Data Quality Alert',
      description: 'Unusual pattern detected in lab result timestamps - potential system clock drift in Laboratory Unit B.',
      confidence: 76,
      impact: 'medium',
      actionable: true,
      timestamp: new Date(Date.now() - 900000),
      source: 'Quality Monitoring AI'
    },
    {
      id: '4',
      type: 'recommendation',
      title: 'Workflow Enhancement',
      description: 'Implementing automated triage scoring could reduce patient wait times by an estimated 23%.',
      confidence: 84,
      impact: 'high',
      actionable: true,
      timestamp: new Date(Date.now() - 1200000),
      source: 'Process Intelligence Engine'
    }
  ]);

  const [metrics, setMetrics] = useState<AIMetrics>({
    totalInsights: 156,
    activeModels: 12,
    predictionAccuracy: 94.2,
    automationRate: 87.5,
    decisionsPerHour: 324,
    learningProgress: 78
  });

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'prediction': return <TrendingUp className="h-4 w-4 text-blue-400" />;
      case 'optimization': return <Target className="h-4 w-4 text-green-400" />;
      case 'anomaly': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'recommendation': return <Lightbulb className="h-4 w-4 text-purple-400" />;
      default: return <Brain className="h-4 w-4 text-gray-400" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        decisionsPerHour: prev.decisionsPerHour + Math.floor(Math.random() * 5),
        learningProgress: Math.min(100, prev.learningProgress + Math.random() * 0.5)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* AI Metrics Overview */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-400" />
            AI Intelligence Dashboard
            <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Live</Badge>
          </CardTitle>
          <CardDescription>
            Real-time AI insights, predictions, and automated decision making
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{metrics.totalInsights}</div>
              <div className="text-xs text-muted-foreground">Total Insights</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{metrics.activeModels}</div>
              <div className="text-xs text-muted-foreground">Active Models</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{metrics.predictionAccuracy}%</div>
              <div className="text-xs text-muted-foreground">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{metrics.automationRate}%</div>
              <div className="text-xs text-muted-foreground">Automation Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{metrics.decisionsPerHour}</div>
              <div className="text-xs text-muted-foreground">Decisions/Hour</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{metrics.learningProgress}%</div>
              <div className="text-xs text-muted-foreground">Learning Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time AI Insights */}
        <Card className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-400" />
              Real-time AI Insights
            </CardTitle>
            <CardDescription>Latest intelligence from AI models</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.map((insight) => (
              <div key={insight.id} className="p-3 bg-muted/30 rounded-lg border border-border/50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getInsightIcon(insight.type)}
                    <span className="font-medium text-sm text-foreground">{insight.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${getImpactColor(insight.impact)}`}>
                      {insight.impact}
                    </Badge>
                    {insight.actionable && (
                      <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 border-blue-500/20">
                        Actionable
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Confidence: {insight.confidence}%</span>
                  <span className="text-muted-foreground">{formatTimeAgo(insight.timestamp)}</span>
                </div>
                
                <div className="mt-2">
                  <Progress value={insight.confidence} className="h-1" />
                </div>
                
                <p className="text-xs text-muted-foreground mt-1">Source: {insight.source}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Performance Analytics */}
        <Card className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-400" />
              AI Performance Analytics
            </CardTitle>
            <CardDescription>Model performance and learning metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Prediction Accuracy</span>
                <span className="text-sm font-medium text-foreground">{metrics.predictionAccuracy}%</span>
              </div>
              <Progress value={metrics.predictionAccuracy} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Automation Coverage</span>
                <span className="text-sm font-medium text-foreground">{metrics.automationRate}%</span>
              </div>
              <Progress value={metrics.automationRate} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Learning Progress</span>
                <span className="text-sm font-medium text-foreground">{metrics.learningProgress}%</span>
              </div>
              <Progress value={metrics.learningProgress} className="h-2" />
            </div>

            <div className="pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-500/10 rounded-lg">
                  <div className="text-lg font-bold text-green-400">{metrics.activeModels}</div>
                  <div className="text-xs text-muted-foreground">Active Models</div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                  <div className="text-lg font-bold text-blue-400">{metrics.decisionsPerHour}</div>
                  <div className="text-xs text-muted-foreground">Decisions/Hour</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Model Status */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-400" />
            AI Model Status
          </CardTitle>
          <CardDescription>Status and performance of active AI models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Surge Prediction Model', status: 'active', accuracy: 94.2, type: 'prediction' },
              { name: 'Resource Optimization Engine', status: 'active', accuracy: 91.8, type: 'optimization' },
              { name: 'Quality Monitoring AI', status: 'active', accuracy: 88.7, type: 'monitoring' },
              { name: 'Patient Flow Predictor', status: 'training', accuracy: 87.3, type: 'prediction' },
              { name: 'Capacity Planning AI', status: 'active', accuracy: 92.1, type: 'planning' },
              { name: 'Clinical Decision Support', status: 'active', accuracy: 95.4, type: 'clinical' }
            ].map((model, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{model.name}</h4>
                  <Badge variant="outline" className={
                    model.status === 'active' 
                      ? 'bg-green-500/10 text-green-600 border-green-500/20'
                      : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                  }>
                    {model.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-medium text-foreground">{model.accuracy}%</span>
                  </div>
                  <Progress value={model.accuracy} className="h-1" />
                  <p className="text-xs text-muted-foreground capitalize">Type: {model.type}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIIntelligenceDashboard;
