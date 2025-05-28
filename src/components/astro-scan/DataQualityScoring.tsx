
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, CheckCircle, AlertTriangle, Target, Zap } from "lucide-react";

interface QualityMetric {
  name: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  issues: number;
  description: string;
}

const DataQualityScoring = () => {
  const [overallScore, setOverallScore] = useState(94.2);
  const [qualityMetrics, setQualityMetrics] = useState<QualityMetric[]>([
    {
      name: 'Completeness',
      score: 97.8,
      trend: 'up',
      issues: 12,
      description: 'Missing required fields'
    },
    {
      name: 'Accuracy',
      score: 94.5,
      trend: 'stable',
      issues: 8,
      description: 'Data validation errors'
    },
    {
      name: 'Consistency',
      score: 91.3,
      trend: 'down',
      issues: 23,
      description: 'Format inconsistencies'
    },
    {
      name: 'Timeliness',
      score: 98.1,
      trend: 'up',
      issues: 3,
      description: 'Delayed updates'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQualityMetrics(prev => prev.map(metric => ({
        ...metric,
        score: Math.max(85, Math.min(99, metric.score + (Math.random() - 0.5) * 0.5))
      })));
      
      setOverallScore(prev => Math.max(90, Math.min(98, prev + (Math.random() - 0.5) * 0.3)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-400';
    if (score >= 90) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 95) return 'bg-green-500/10 text-green-600 border-green-500/20';
    if (score >= 90) return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    return 'bg-red-500/10 text-red-600 border-red-500/20';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-400" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-red-400 rotate-180" />;
      case 'stable': return <Target className="h-3 w-3 text-blue-400" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Overall Score */}
      <Card className="p-4 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <CheckCircle className="h-4 w-4 text-cyan-400" />
            </div>
            <div>
              <div className="font-medium text-foreground">Overall Quality Score</div>
              <div className="text-xs text-muted-foreground">Real-time assessment</div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore.toFixed(1)}%
            </div>
            <Badge variant="outline" className={getScoreBadgeColor(overallScore)}>
              {overallScore >= 95 ? 'Excellent' : overallScore >= 90 ? 'Good' : 'Needs Attention'}
            </Badge>
          </div>
        </div>
        <Progress value={overallScore} className="h-2" />
      </Card>

      {/* Quality Metrics */}
      <div className="grid grid-cols-1 gap-3">
        {qualityMetrics.map((metric) => (
          <Card key={metric.name} className="p-3 border border-border/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground text-sm">{metric.name}</span>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-bold text-sm ${getScoreColor(metric.score)}`}>
                  {metric.score.toFixed(1)}%
                </span>
                {metric.issues > 0 && (
                  <Badge variant="outline" className="text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {metric.issues}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Progress value={metric.score} className="h-1.5" />
              <div className="text-xs text-muted-foreground">{metric.description}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Enrichment Status */}
      <Card className="p-3 bg-muted/30">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-medium text-foreground">AI Data Enrichment</span>
          <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">Active</Badge>
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div>• Auto-correction: 24 fixes applied today</div>
          <div>• Pattern detection: 7 anomalies identified</div>
          <div>• Validation rules: 156 checks performed</div>
        </div>
      </Card>
    </div>
  );
};

export default DataQualityScoring;
