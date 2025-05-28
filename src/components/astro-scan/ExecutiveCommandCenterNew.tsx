
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Activity,
  Brain,
  AlertCircle,
  CheckCircle,
  Target,
  BarChart3,
  Shield,
  Globe,
  Zap
} from "lucide-react";

const ExecutiveCommandCenterNew = () => {
  const [strategicKPIs] = useState({
    marketPosition: { current: 87.3, target: 90.0, trend: 'up', change: 8.2 },
    innovationIndex: { current: 94.1, target: 95.0, trend: 'up', change: 12.7 },
    competitiveAdvantage: { current: 82.6, target: 85.0, trend: 'up', change: 5.8 },
    stakeholderValue: { current: 156.8, target: 150.0, trend: 'up', change: 15.3 }
  });

  const [riskAssessments] = useState([
    { category: 'Operational Risk', level: 'Low', score: 92, trend: 'improving' },
    { category: 'Financial Risk', level: 'Medium', score: 78, trend: 'stable' },
    { category: 'Regulatory Risk', level: 'Low', score: 89, trend: 'improving' },
    { category: 'Technology Risk', level: 'Low', score: 94, trend: 'improving' }
  ]);

  const [aiInsights] = useState([
    {
      type: 'strategic',
      priority: 'high',
      title: 'Market Expansion Opportunity',
      description: 'AI models identify 23% growth potential in emerging markets with minimal risk exposure.',
      confidence: 94,
      impact: 'High'
    },
    {
      type: 'operational',
      priority: 'medium',
      title: 'Process Optimization',
      description: 'Automated workflow analysis suggests 18% efficiency gains through strategic resource reallocation.',
      confidence: 87,
      impact: 'Medium'
    },
    {
      type: 'financial',
      priority: 'high',
      title: 'Cost Reduction Initiative',
      description: 'Predictive analytics recommend targeted cost optimization saving $2.3M annually.',
      confidence: 91,
      impact: 'High'
    }
  ]);

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <TrendingUp className="h-4 w-4 text-green-400" /> : 
           <TrendingDown className="h-4 w-4 text-red-400" />;
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'High': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Strategic KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-400" />
              <span className="font-medium text-sm">Market Position</span>
            </div>
            {getTrendIcon(strategicKPIs.marketPosition.trend)}
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-blue-400">{strategicKPIs.marketPosition.current}%</div>
            <div className="text-xs text-muted-foreground">
              Target: {strategicKPIs.marketPosition.target}% (+{strategicKPIs.marketPosition.change}%)
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              <span className="font-medium text-sm">Innovation Index</span>
            </div>
            {getTrendIcon(strategicKPIs.innovationIndex.trend)}
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-purple-400">{strategicKPIs.innovationIndex.current}</div>
            <div className="text-xs text-muted-foreground">
              Target: {strategicKPIs.innovationIndex.target} (+{strategicKPIs.innovationIndex.change}%)
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-400" />
              <span className="font-medium text-sm">Competitive Edge</span>
            </div>
            {getTrendIcon(strategicKPIs.competitiveAdvantage.trend)}
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-400">{strategicKPIs.competitiveAdvantage.current}%</div>
            <div className="text-xs text-muted-foreground">
              Target: {strategicKPIs.competitiveAdvantage.target}% (+{strategicKPIs.competitiveAdvantage.change}%)
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-orange-400" />
              <span className="font-medium text-sm">Stakeholder Value</span>
            </div>
            {getTrendIcon(strategicKPIs.stakeholderValue.trend)}
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-orange-400">${strategicKPIs.stakeholderValue.current}M</div>
            <div className="text-xs text-muted-foreground">
              Target: ${strategicKPIs.stakeholderValue.target}M (+{strategicKPIs.stakeholderValue.change}%)
            </div>
          </div>
        </Card>
      </div>

      {/* Risk Management Intelligence */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-400" />
            Enterprise Risk Intelligence
          </CardTitle>
          <CardDescription>
            AI-powered risk assessment and predictive threat analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {riskAssessments.map((risk, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{risk.category}</span>
                    <Badge variant="outline" className={getRiskColor(risk.level)}>
                      {risk.level}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-foreground">{risk.score}</span>
                    <div className="text-xs text-muted-foreground">Risk Score</div>
                  </div>
                </div>
                <Progress value={risk.score} className="h-2 mb-2" />
                <div className="text-xs text-muted-foreground">
                  Trend: {risk.trend}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Strategic Insights */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-cyan-400" />
            AI Strategic Intelligence
          </CardTitle>
          <CardDescription>
            Machine learning-driven strategic recommendations and forecasting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10">
                      <Brain className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{insight.title}</h4>
                      <Badge variant="outline" className={getPriorityColor(insight.priority)}>
                        {insight.priority} priority
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{insight.confidence}%</div>
                    <div className="text-xs text-muted-foreground">Confidence</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    Impact: {insight.impact}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Executive Actions */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Strategic Command Actions</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Brain className="h-4 w-4 mr-2" />
                Strategic Analysis
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Market Intelligence
              </Button>
              <Button variant="outline" size="sm">
                <Target className="h-4 w-4 mr-2" />
                Growth Planning
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveCommandCenterNew;
