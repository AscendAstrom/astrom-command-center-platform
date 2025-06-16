
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle, AlertTriangle, TrendingUp, Database, Zap } from "lucide-react";

interface PipelineInsight {
  type: 'optimization' | 'warning' | 'success';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

interface PipelineMetrics {
  totalPipelines: number;
  activePipelines: number;
  avgPerformance: number;
  dataVolume: string;
  lastAnalysis: string;
}

export const AIPipelineGenerator = () => {
  const [generating, setGenerating] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Sample pipeline metrics
  const metrics: PipelineMetrics = {
    totalPipelines: 12,
    activePipelines: 8,
    avgPerformance: 87,
    dataVolume: "2.4 TB",
    lastAnalysis: "2 minutes ago"
  };

  // Sample AI-generated insights
  const insights: PipelineInsight[] = [
    {
      type: 'optimization',
      title: 'Data Processing Bottleneck Detected',
      description: 'Pipeline #3 shows 40% slower processing during peak hours. Consider load balancing optimization.',
      impact: 'high'
    },
    {
      type: 'success',
      title: 'Quality Score Improvement',
      description: 'FHIR data pipeline achieved 94% quality score, up from 78% after implementing new validation rules.',
      impact: 'medium'
    },
    {
      type: 'warning',
      title: 'Schema Drift Alert',
      description: 'CSV pipeline detected unexpected field changes. Automatic mapping adjustments recommended.',
      impact: 'medium'
    },
    {
      type: 'optimization',
      title: 'Resource Utilization',
      description: 'AI suggests redistributing workload across 3 pipelines to improve overall throughput by 23%.',
      impact: 'high'
    }
  ];

  const handleGenerateAnalysis = async () => {
    setGenerating(true);
    setAnalysisComplete(false);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setGenerating(false);
    setAnalysisComplete(true);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <TrendingUp className="h-4 w-4 text-blue-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />;
      default: return <Brain className="h-4 w-4 text-purple-400" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-400 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <Card className="surface-elevated border-border/50 glass-card animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              AI Pipeline Generator
            </CardTitle>
            <CardDescription>
              Intelligent pipeline analysis and automated optimization recommendations
            </CardDescription>
          </div>
          <Button
            onClick={handleGenerateAnalysis}
            disabled={generating}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Brain className={`h-4 w-4 mr-2 ${generating ? 'animate-spin' : ''}`} />
            {generating ? 'Analyzing...' : 'Generate AI Analysis'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!analysisComplete && !generating && (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950/20 dark:to-blue-950/20 flex items-center justify-center">
              <Brain className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground">Ready for AI Analysis</h3>
            <p className="text-muted-foreground/70 max-w-md mx-auto">
              Click "Generate AI Analysis" to get intelligent insights about your data pipelines and optimization recommendations.
            </p>
          </div>
        )}

        {generating && (
          <div className="text-center py-12 space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
              <Brain className="h-8 w-8 text-purple-400 animate-spin" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">AI Analysis in Progress</h3>
              <p className="text-muted-foreground">Analyzing pipeline performance and generating insights...</p>
              <div className="max-w-xs mx-auto">
                <Progress value={65} className="h-2" />
              </div>
            </div>
          </div>
        )}

        {analysisComplete && !generating && (
          <div className="space-y-6">
            {/* Metrics Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Database className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{metrics.totalPipelines}</div>
                <div className="text-sm text-muted-foreground">Total Pipelines</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-600">{metrics.activePipelines}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{metrics.avgPerformance}%</div>
                <div className="text-sm text-muted-foreground">Avg Performance</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{metrics.dataVolume}</div>
                <div className="text-sm text-muted-foreground">Data Volume</div>
              </div>
            </div>

            {/* AI Insights */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-foreground">AI-Generated Insights</h4>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                  {insights.length} Recommendations
                </Badge>
              </div>
              
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border bg-card/50">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getInsightIcon(insight.type)}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-foreground">{insight.title}</h5>
                          <Badge variant="outline" className={getImpactColor(insight.impact)}>
                            {insight.impact.toUpperCase()} IMPACT
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis Summary */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="text-sm text-muted-foreground">
                <strong>Analysis Complete:</strong> Generated {insights.length} optimization recommendations • 
                Last updated: {metrics.lastAnalysis} • 
                Next analysis recommended in 24 hours
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
