
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Shield,
  Target,
  Briefcase,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3
} from "lucide-react";
import { useAdvancedAIDecisionEngine } from "./hooks/useAdvancedAIDecisionEngine";
import { useWorkflowData } from "./hooks/useWorkflowData";

const ExecutiveCommandCenter = () => {
  const { decisions, decisionAccuracy, totalDecisions } = useAdvancedAIDecisionEngine();
  const { workflows } = useWorkflowData();

  // Strategic KPIs
  const strategicKPIs = [
    {
      name: "Operational Efficiency",
      current: 89,
      target: 95,
      trend: "+5.2%",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-green-500"
    },
    {
      name: "Cost Optimization",
      current: 78,
      target: 85,
      trend: "+12.8%",
      icon: <DollarSign className="h-5 w-5" />,
      color: "text-blue-500"
    },
    {
      name: "Resource Utilization",
      current: 92,
      target: 90,
      trend: "+3.1%",
      icon: <Users className="h-5 w-5" />,
      color: "text-purple-500"
    },
    {
      name: "Risk Mitigation",
      current: 96,
      target: 98,
      trend: "+1.5%",
      icon: <Shield className="h-5 w-5" />,
      color: "text-cyan-500"
    }
  ];

  // Business Impact Metrics
  const businessImpacts = [
    {
      metric: "Processing Speed",
      improvement: "340% faster",
      impact: "$2.4M annual savings",
      timeframe: "Q4 2024"
    },
    {
      metric: "Error Reduction",
      improvement: "87% fewer errors",
      impact: "99.7% accuracy achieved",
      timeframe: "Last 30 days"
    },
    {
      metric: "Automation Rate",
      improvement: "94% automated",
      impact: "450 hours saved/week",
      timeframe: "Current"
    }
  ];

  // Strategic Recommendations
  const strategicRecommendations = [
    {
      priority: "Critical",
      area: "Infrastructure Scaling",
      recommendation: "Deploy multi-region infrastructure to handle 300% growth projection",
      impact: "High",
      timeline: "Q1 2025",
      roi: "385%"
    },
    {
      priority: "High",
      area: "AI Model Enhancement",
      recommendation: "Implement federated learning across healthcare networks",
      impact: "Medium",
      timeline: "Q2 2025",
      roi: "240%"
    },
    {
      priority: "Medium",
      area: "Security Protocols",
      recommendation: "Enhance zero-trust architecture for global compliance",
      impact: "High",
      timeline: "Q3 2025",
      roi: "180%"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'High': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Executive Overview */}
      <Card className="bg-gradient-to-r from-gold-500/10 to-purple-500/10 border-gold-500/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Crown className="h-6 w-6 text-gold-400" />
            Executive Command Center
            <Badge className="bg-gold-500/10 text-gold-600 border-gold-500/20">Strategic View</Badge>
          </CardTitle>
          <CardDescription>
            Strategic insights and executive decision support powered by comprehensive AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-400">{workflows.length}</div>
              <div className="text-xs text-muted-foreground">Active Workflows</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{decisionAccuracy}%</div>
              <div className="text-xs text-muted-foreground">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">$8.7M</div>
              <div className="text-xs text-muted-foreground">Annual Impact</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">97.8%</div>
              <div className="text-xs text-muted-foreground">System Reliability</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="kpis" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="kpis">Strategic KPIs</TabsTrigger>
          <TabsTrigger value="impact">Business Impact</TabsTrigger>
          <TabsTrigger value="recommendations">Strategic Plans</TabsTrigger>
          <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
        </TabsList>

        <TabsContent value="kpis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategicKPIs.map((kpi, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={kpi.color}>{kpi.icon}</div>
                      <span className="text-base">{kpi.name}</span>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                      {kpi.trend}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Current: {kpi.current}%</span>
                      <span>Target: {kpi.target}%</span>
                    </div>
                    <Progress value={kpi.current} className="h-3" />
                    <div className="text-xs text-muted-foreground">
                      {kpi.current >= kpi.target ? 'Target exceeded' : `${kpi.target - kpi.current}% to target`}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-400" />
                Business Impact Analysis
              </CardTitle>
              <CardDescription>
                Quantified business outcomes from AI-driven automation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {businessImpacts.map((impact, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm font-medium text-foreground">{impact.metric}</div>
                        <div className="text-xs text-muted-foreground">Performance Area</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-500">{impact.improvement}</div>
                        <div className="text-xs text-muted-foreground">Improvement</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-500">{impact.impact}</div>
                        <div className="text-xs text-muted-foreground">Business Impact</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{impact.timeframe}</div>
                        <div className="text-xs text-muted-foreground">Timeframe</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-purple-400" />
                Strategic Recommendations
              </CardTitle>
              <CardDescription>
                AI-generated strategic plans for business growth and optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategicRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                          {rec.priority}
                        </Badge>
                        <span className="font-medium text-foreground">{rec.area}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-500">ROI: {rec.roi}</div>
                        <div className="text-xs text-muted-foreground">{rec.timeline}</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-foreground mb-2">
                      {rec.recommendation}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`
                        ${rec.impact === 'High' ? 'bg-red-500/10 text-red-600 border-red-500/20' : 
                          rec.impact === 'Medium' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' : 
                          'bg-green-500/10 text-green-600 border-green-500/20'}`}>
                        {rec.impact} Impact
                      </Badge>
                      <Button variant="outline" size="sm">
                        Review Plan
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  Growth Projections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Data Processing Volume</span>
                      <span className="text-lg font-bold text-blue-500">+340%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Expected by Q2 2025</div>
                  </div>
                  
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Automation Coverage</span>
                      <span className="text-lg font-bold text-green-500">98.5%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Target by Q3 2025</div>
                  </div>
                  
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">AI Decision Accuracy</span>
                      <span className="text-lg font-bold text-purple-500">99.2%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Projected by Q4 2025</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-gold-400" />
                  Strategic Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="text-sm font-medium">Phase 1: Foundation</div>
                      <div className="text-xs text-muted-foreground">Completed Dec 2024</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium">Phase 2: Intelligence</div>
                      <div className="text-xs text-muted-foreground">In Progress</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="text-sm font-medium">Phase 3: Autonomy</div>
                      <div className="text-xs text-muted-foreground">Planned Q2 2025</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="text-sm font-medium">Phase 4: Global Scale</div>
                      <div className="text-xs text-muted-foreground">Planned Q4 2025</div>
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

export default ExecutiveCommandCenter;
