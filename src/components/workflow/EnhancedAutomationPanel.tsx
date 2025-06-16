
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Zap, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  GitBranch,
  Target,
  AlertTriangle,
  Lightbulb
} from "lucide-react";
import { useEnhancedWorkflowAutomation } from './hooks/useEnhancedWorkflowAutomation';

const EnhancedAutomationPanel = () => {
  const {
    decisions,
    activeBranches,
    optimizations,
    automationEnabled,
    setAutomationEnabled,
    approveDecision,
    rejectDecision
  } = useEnhancedWorkflowAutomation();

  const getDecisionIcon = (type: string) => {
    switch (type) {
      case 'progression': return <TrendingUp className="h-4 w-4 text-blue-400" />;
      case 'branching': return <GitBranch className="h-4 w-4 text-purple-400" />;
      case 'optimization': return <Target className="h-4 w-4 text-green-400" />;
      case 'error_handling': return <AlertTriangle className="h-4 w-4 text-orange-400" />;
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Automation Control */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Zap className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-foreground">Enhanced AI Automation</CardTitle>
                <CardDescription>Real-time workflow optimization and decision making</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Auto-Execution</span>
              <Switch
                checked={automationEnabled}
                onCheckedChange={setAutomationEnabled}
              />
              <Badge variant="outline" className={automationEnabled ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-gray-500/10 text-gray-600 border-gray-500/20'}>
                {automationEnabled ? 'Active' : 'Paused'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-500/10 rounded-lg">
              <div className="text-lg font-bold text-blue-400">{decisions.length}</div>
              <div className="text-xs text-muted-foreground">Pending Decisions</div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded-lg">
              <div className="text-lg font-bold text-purple-400">{activeBranches.length}</div>
              <div className="text-xs text-muted-foreground">Active Branches</div>
            </div>
            <div className="text-center p-3 bg-green-500/10 rounded-lg">
              <div className="text-lg font-bold text-green-400">{optimizations.length}</div>
              <div className="text-xs text-muted-foreground">Optimizations</div>
            </div>
            <div className="text-center p-3 bg-orange-500/10 rounded-lg">
              <div className="text-lg font-bold text-orange-400">94%</div>
              <div className="text-xs text-muted-foreground">AI Confidence</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Decisions */}
        <Card className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-400" />
              AI Decisions
            </CardTitle>
            <CardDescription>Real-time AI recommendations and decisions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {decisions.map((decision) => (
              <div key={decision.id} className="p-3 bg-muted/30 rounded-lg border border-border/50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getDecisionIcon(decision.decisionType)}
                    <span className="font-medium text-sm text-foreground capitalize">
                      {decision.decisionType.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${getImpactColor(decision.impact)}`}>
                      {decision.impact}
                    </Badge>
                    {decision.autoExecute && (
                      <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 border-blue-500/20">
                        Auto
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{decision.recommendation}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-medium text-foreground">{Math.round(decision.confidence)}%</span>
                  </div>
                  <Progress value={decision.confidence} className="h-1" />
                </div>

                <div className="mt-2">
                  <p className="text-xs font-medium text-foreground mb-1">AI Reasoning:</p>
                  {decision.reasoning.map((reason, i) => (
                    <p key={i} className="text-xs text-muted-foreground">• {reason}</p>
                  ))}
                </div>

                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={() => approveDecision(decision.id)}
                    className="gap-1"
                  >
                    <CheckCircle className="h-3 w-3" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => rejectDecision(decision.id)}
                    className="gap-1"
                  >
                    <XCircle className="h-3 w-3" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
            {decisions.length === 0 && (
              <div className="text-center py-8">
                <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No pending decisions</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Smart Branches & Optimizations */}
        <div className="space-y-6">
          {/* Active Branches */}
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-purple-400" />
                Smart Workflow Branches
              </CardTitle>
              <CardDescription>Intelligent workflow routing and branching</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeBranches.map((branch) => (
                <div key={branch.id} className="p-3 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{branch.name}</h4>
                    <Badge variant="outline" className={`text-xs ${getRiskColor(branch.riskLevel)}`}>
                      {branch.riskLevel} risk
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{branch.condition}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Confidence: </span>
                      <span className="font-medium text-foreground">{branch.confidence}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration: </span>
                      <span className="font-medium text-foreground">{branch.estimatedDuration}min</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Predictive Optimizations */}
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-green-400" />
                Predictive Optimizations
              </CardTitle>
              <CardDescription>AI-powered performance improvements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {optimizations.map((opt) => (
                <div key={opt.id} className="p-3 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground capitalize">{opt.optimizationType}</h4>
                    <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                      +{opt.improvement}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{opt.actionRequired}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Current: </span>
                      <span className="font-medium text-foreground">{opt.currentValue}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Predicted: </span>
                      <span className="font-medium text-green-400">{opt.predictedValue}%</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-muted-foreground">Implementation: {opt.implementationTime} minutes</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAutomationPanel;
