
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Crown, 
  TrendingUp, 
  Target, 
  Shield, 
  Zap,
  DollarSign,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Brain
} from "lucide-react";

interface ExecutiveKPI {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'excellent' | 'good' | 'warning' | 'critical';
  aiPrediction?: {
    nextValue: number;
    confidence: number;
    timeframe: string;
  };
}

interface StrategicInsight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  urgency: 'immediate' | 'short_term' | 'long_term';
  recommendation: string;
  roi?: string;
  confidence: number;
}

const ExecutiveCommandCenter = () => {
  const [kpis, setKpis] = useState<ExecutiveKPI[]>([
    {
      id: '1',
      name: 'Patient Satisfaction',
      value: 4.7,
      target: 4.5,
      unit: '/5.0',
      trend: 'up',
      status: 'excellent',
      aiPrediction: {
        nextValue: 4.8,
        confidence: 87,
        timeframe: 'next month'
      }
    },
    {
      id: '2',
      name: 'Bed Utilization',
      value: 87.5,
      target: 85.0,
      unit: '%',
      trend: 'stable',
      status: 'good',
      aiPrediction: {
        nextValue: 89.2,
        confidence: 92,
        timeframe: 'next week'
      }
    },
    {
      id: '3',
      name: 'Revenue per Patient',
      value: 8750,
      target: 8500,
      unit: 'SAR',
      trend: 'up',
      status: 'excellent',
      aiPrediction: {
        nextValue: 9100,
        confidence: 78,
        timeframe: 'next quarter'
      }
    },
    {
      id: '4',
      name: 'Staff Efficiency',
      value: 78.3,
      target: 80.0,
      unit: '%',
      trend: 'down',
      status: 'warning',
      aiPrediction: {
        nextValue: 82.1,
        confidence: 85,
        timeframe: 'next month'
      }
    },
    {
      id: '5',
      name: 'Quality Score',
      value: 94.2,
      target: 95.0,
      unit: '%',
      trend: 'up',
      status: 'good',
      aiPrediction: {
        nextValue: 95.8,
        confidence: 91,
        timeframe: 'next month'
      }
    },
    {
      id: '6',
      name: 'Cost per Case',
      value: 12750,
      target: 13000,
      unit: 'SAR',
      trend: 'down',
      status: 'excellent',
      aiPrediction: {
        nextValue: 12200,
        confidence: 83,
        timeframe: 'next quarter'
      }
    }
  ]);

  const [insights, setInsights] = useState<StrategicInsight[]>([
    {
      id: '1',
      title: 'Capacity Optimization Opportunity',
      description: 'AI analysis indicates optimal bed allocation could increase revenue by 12% while maintaining quality standards.',
      impact: 'high',
      urgency: 'short_term',
      recommendation: 'Implement dynamic bed allocation system with AI-driven optimization',
      roi: '+15.2M SAR annually',
      confidence: 94
    },
    {
      id: '2',
      title: 'Staff Productivity Enhancement',
      description: 'Predictive analytics suggest implementing AI-assisted scheduling could improve staff efficiency by 18%.',
      impact: 'high',
      urgency: 'immediate',
      recommendation: 'Deploy intelligent staff scheduling and workload balancing system',
      roi: '+8.7M SAR annually',
      confidence: 89
    },
    {
      id: '3',
      title: 'Preventive Care Initiative',
      description: 'Early intervention programs could reduce readmission rates by 25% based on patient risk scoring models.',
      impact: 'medium',
      urgency: 'long_term',
      recommendation: 'Launch AI-powered preventive care and patient monitoring program',
      roi: '+12.3M SAR over 3 years',
      confidence: 76
    }
  ]);

  const getKPIStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-400 transform rotate-180" />;
      default: return <Target className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'short_term': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'long_term': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Executive Overview */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-gold-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Crown className="h-6 w-6 text-gold-400" />
            Executive Command Center
            <Badge className="bg-gold-500/10 text-gold-600 border-gold-500/20">Strategic</Badge>
          </CardTitle>
          <CardDescription>
            AI-powered strategic insights and executive decision support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-500/10 rounded-lg">
              <div className="text-2xl font-bold text-green-400">94.2%</div>
              <div className="text-xs text-muted-foreground">Overall Performance</div>
            </div>
            <div className="text-center p-3 bg-blue-500/10 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">+15.2M</div>
              <div className="text-xs text-muted-foreground">AI-Identified Savings</div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">89%</div>
              <div className="text-xs text-muted-foreground">AI Confidence</div>
            </div>
            <div className="text-center p-3 bg-orange-500/10 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">3</div>
              <div className="text-xs text-muted-foreground">High-Impact Opportunities</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategic KPIs */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            Strategic KPIs with AI Predictions
          </CardTitle>
          <CardDescription>Key performance indicators with AI-powered forecasting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpis.map((kpi) => (
              <div key={kpi.id} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">{kpi.name}</h4>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(kpi.trend)}
                    <Badge variant="outline" className={`text-xs ${getKPIStatusColor(kpi.status)}`}>
                      {kpi.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-2xl font-bold text-foreground">
                        {kpi.value.toLocaleString()}{kpi.unit}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Target: {kpi.target.toLocaleString()}{kpi.unit}
                      </span>
                    </div>
                    <Progress value={(kpi.value / kpi.target) * 100} className="h-2" />
                  </div>

                  {kpi.aiPrediction && (
                    <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="h-3 w-3 text-blue-400" />
                        <span className="text-xs font-medium text-blue-600">AI Prediction</span>
                      </div>
                      <div className="text-sm text-foreground">
                        <span className="font-medium">
                          {kpi.aiPrediction.nextValue.toLocaleString()}{kpi.unit}
                        </span>
                        <span className="text-muted-foreground"> {kpi.aiPrediction.timeframe}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Confidence: {kpi.aiPrediction.confidence}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategic Insights */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            AI-Generated Strategic Insights
          </CardTitle>
          <CardDescription>High-impact recommendations for strategic decision making</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-foreground">{insight.title}</h4>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs ${getImpactColor(insight.impact)}`}>
                    {insight.impact} impact
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${getUrgencyColor(insight.urgency)}`}>
                    {insight.urgency.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
              
              <div className="space-y-2">
                <div className="p-2 bg-green-500/10 rounded border border-green-500/20">
                  <p className="text-sm font-medium text-green-600 mb-1">Recommendation:</p>
                  <p className="text-sm text-foreground">{insight.recommendation}</p>
                </div>
                
                {insight.roi && (
                  <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20">
                    <p className="text-sm font-medium text-blue-600 mb-1">Expected ROI:</p>
                    <p className="text-sm font-bold text-foreground">{insight.roi}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">AI Confidence: {insight.confidence}%</span>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                    Review Action Plan
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Target className="h-5 w-5 text-green-400" />
            Executive Quick Actions
          </CardTitle>
          <CardDescription>Immediate actions based on AI recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 bg-blue-600 hover:bg-blue-700 text-white flex flex-col gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Optimize Staffing</span>
            </Button>
            <Button className="h-20 bg-green-600 hover:bg-green-700 text-white flex flex-col gap-2">
              <DollarSign className="h-5 w-5" />
              <span className="text-sm">Review Budget</span>
            </Button>
            <Button className="h-20 bg-purple-600 hover:bg-purple-700 text-white flex flex-col gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Quality Initiatives</span>
            </Button>
            <Button className="h-20 bg-orange-600 hover:bg-orange-700 text-white flex flex-col gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm">Schedule Review</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveCommandCenter;
