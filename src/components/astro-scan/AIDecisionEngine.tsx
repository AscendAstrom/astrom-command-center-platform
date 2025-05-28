
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Zap, 
  Target, 
  AlertTriangle,
  TrendingUp,
  Settings,
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";

const AIDecisionEngine = () => {
  const [activeModels] = useState([
    { 
      name: 'Resource Allocation Optimizer', 
      accuracy: 97.3, 
      status: 'active', 
      decisions: 1247,
      savings: '$284K'
    },
    { 
      name: 'Anomaly Detection Engine', 
      accuracy: 94.8, 
      status: 'active', 
      decisions: 892,
      savings: '$156K'
    },
    { 
      name: 'Policy Enforcement AI', 
      accuracy: 99.1, 
      status: 'active', 
      decisions: 2156,
      savings: '$392K'
    },
    { 
      name: 'Predictive Risk Assessor', 
      accuracy: 96.2, 
      status: 'training', 
      decisions: 634,
      savings: '$127K'
    }
  ]);

  const [recentDecisions] = useState([
    {
      id: 1,
      type: 'resource_allocation',
      description: 'Reallocated 3 nurses from Med-Surg to ED based on predicted surge',
      confidence: 98.7,
      impact: 'High',
      status: 'implemented',
      timestamp: '2 minutes ago'
    },
    {
      id: 2,
      type: 'anomaly_detection',
      description: 'Detected unusual lab processing delay pattern - escalated to lab manager',
      confidence: 94.3,
      impact: 'Medium',
      status: 'escalated',
      timestamp: '8 minutes ago'
    },
    {
      id: 3,
      type: 'policy_enforcement',
      description: 'Auto-blocked non-compliant data access request from external system',
      confidence: 99.9,
      impact: 'Critical',
      status: 'blocked',
      timestamp: '15 minutes ago'
    },
    {
      id: 4,
      type: 'predictive_analysis',
      description: 'Predicted equipment failure for CT scanner #3 - maintenance scheduled',
      confidence: 92.1,
      impact: 'High',
      status: 'scheduled',
      timestamp: '23 minutes ago'
    }
  ]);

  const [automationMetrics] = useState({
    totalDecisions: 5847,
    automationRate: 87.4,
    avgResponseTime: 1.3,
    costSavings: 1.2
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'training': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'inactive': return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      default: return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    }
  };

  const getDecisionIcon = (type: string) => {
    switch (type) {
      case 'resource_allocation': return <Target className="h-4 w-4 text-blue-400" />;
      case 'anomaly_detection': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'policy_enforcement': return <Settings className="h-4 w-4 text-red-400" />;
      case 'predictive_analysis': return <TrendingUp className="h-4 w-4 text-purple-400" />;
      default: return <Brain className="h-4 w-4 text-gray-400" />;
    }
  };

  const getDecisionStatusIcon = (status: string) => {
    switch (status) {
      case 'implemented': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'escalated': return <ArrowRight className="h-4 w-4 text-orange-400" />;
      case 'blocked': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'scheduled': return <Clock className="h-4 w-4 text-blue-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Models Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-5 w-5 text-blue-400" />
            <span className="font-medium text-sm">Total Decisions</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">{automationMetrics.totalDecisions.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Last 24 hours</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-green-400" />
            <span className="font-medium text-sm">Automation Rate</span>
          </div>
          <div className="text-2xl font-bold text-green-400">{automationMetrics.automationRate}%</div>
          <div className="text-xs text-muted-foreground">Human intervention not required</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-purple-400" />
            <span className="font-medium text-sm">Response Time</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">{automationMetrics.avgResponseTime}s</div>
          <div className="text-xs text-muted-foreground">Average decision time</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-orange-400" />
            <span className="font-medium text-sm">Cost Savings</span>
          </div>
          <div className="text-2xl font-bold text-orange-400">${automationMetrics.costSavings}M</div>
          <div className="text-xs text-muted-foreground">Monthly operational savings</div>
        </Card>
      </div>

      {/* Active AI Models */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-indigo-400" />
            Active AI Models
          </CardTitle>
          <CardDescription>
            Machine learning models currently making autonomous decisions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeModels.map((model, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-indigo-400" />
                    <span className="font-medium">{model.name}</span>
                    <Badge variant="outline" className={getStatusColor(model.status)}>
                      {model.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">Decisions: {model.decisions}</span>
                    <span className="text-green-400">Saved: {model.savings}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Model Accuracy</span>
                    <span className="font-medium">{model.accuracy}%</span>
                  </div>
                  <Progress value={model.accuracy} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent AI Decisions */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Recent AI Decisions
          </CardTitle>
          <CardDescription>
            Real-time feed of autonomous decisions made by the AI system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentDecisions.map((decision) => (
              <div key={decision.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start gap-3">
                  {getDecisionIcon(decision.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{decision.description}</span>
                      <div className="flex items-center gap-2">
                        {getDecisionStatusIcon(decision.status)}
                        <Badge variant="outline" className="text-xs">
                          {decision.impact} Impact
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Confidence: {decision.confidence}%</span>
                        <span>{decision.timestamp}</span>
                      </div>
                      <Badge variant="outline" className={
                        decision.status === 'implemented' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                        decision.status === 'escalated' ? 'bg-orange-500/10 text-orange-600 border-orange-500/20' :
                        decision.status === 'blocked' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
                        'bg-blue-500/10 text-blue-600 border-blue-500/20'
                      }>
                        {decision.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              View Decision Log
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Configure Models
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Training Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIDecisionEngine;
