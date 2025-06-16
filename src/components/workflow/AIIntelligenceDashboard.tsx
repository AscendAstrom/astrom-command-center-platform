
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Target,
  Zap,
  BarChart3,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { useAdvancedAIDecisionEngine } from "./hooks/useAdvancedAIDecisionEngine";

const AIIntelligenceDashboard = () => {
  const {
    decisions,
    patterns,
    learningEnabled,
    setLearningEnabled,
    decisionAccuracy,
    totalDecisions,
    provideFeedback
  } = useAdvancedAIDecisionEngine();

  const getDecisionTypeIcon = (type: string) => {
    switch (type) {
      case 'workflow_progression': return <TrendingUp className="h-4 w-4" />;
      case 'resource_allocation': return <BarChart3 className="h-4 w-4" />;
      case 'error_prevention': return <AlertTriangle className="h-4 w-4" />;
      case 'optimization': return <Zap className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-500';
    if (confidence >= 75) return 'text-blue-500';
    if (confidence >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'high': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Intelligence Overview */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-400" />
            Advanced AI Decision Engine
            <Badge className={`${learningEnabled ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-gray-500/10 text-gray-600 border-gray-500/20'}`}>
              {learningEnabled ? 'Learning Active' : 'Learning Paused'}
            </Badge>
          </CardTitle>
          <CardDescription>
            Contextual AI decision making with continuous learning and pattern recognition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{decisionAccuracy}%</div>
              <div className="text-xs text-muted-foreground">Decision Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{totalDecisions}</div>
              <div className="text-xs text-muted-foreground">Total Decisions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{patterns.length}</div>
              <div className="text-xs text-muted-foreground">Learned Patterns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{decisions.length}</div>
              <div className="text-xs text-muted-foreground">Active Decisions</div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              AI Learning Status
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setLearningEnabled(!learningEnabled)}
              className="gap-2"
            >
              {learningEnabled ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
              {learningEnabled ? 'Disable Learning' : 'Enable Learning'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="decisions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="decisions">AI Decisions</TabsTrigger>
          <TabsTrigger value="patterns">Learned Patterns</TabsTrigger>
          <TabsTrigger value="insights">Intelligence Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="decisions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-400" />
                Recent AI Decisions
              </CardTitle>
              <CardDescription>
                Contextual decisions made by the AI decision engine
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {decisions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No decisions available yet. AI is analyzing workflow patterns...
                  </div>
                ) : (
                  decisions.map((decision) => (
                    <div key={decision.id} className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getDecisionTypeIcon(decision.type)}
                          <span className="font-medium text-foreground">
                            {decision.type.replace('_', ' ').toUpperCase()}
                          </span>
                          <Badge variant="outline" className={getRiskColor(decision.riskAssessment)}>
                            {decision.riskAssessment} risk
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${getConfidenceColor(decision.confidence)}`}>
                            {decision.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-foreground mb-2">
                        <strong>Recommendation:</strong> {decision.recommendedAction}
                      </p>
                      
                      <p className="text-sm text-green-600 mb-2">
                        <strong>Predicted Outcome:</strong> {decision.predictedOutcome}
                      </p>

                      {decision.reasoning.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-foreground mb-1">AI Reasoning:</p>
                          {decision.reasoning.map((reason, i) => (
                            <p key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              {reason}
                            </p>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">
                          {decision.timestamp.toLocaleTimeString()}
                        </span>
                        {!decision.learningFeedback && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => provideFeedback(decision.id, 'positive')}
                              className="gap-1 h-7"
                            >
                              <ThumbsUp className="h-3 w-3" />
                              Good
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => provideFeedback(decision.id, 'negative')}
                              className="gap-1 h-7"
                            >
                              <ThumbsDown className="h-3 w-3" />
                              Poor
                            </Button>
                          </div>
                        )}
                        {decision.learningFeedback && (
                          <Badge variant="outline" className="text-xs">
                            Feedback: {decision.learningFeedback}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                Learned Workflow Patterns
              </CardTitle>
              <CardDescription>
                AI-identified patterns in workflow execution and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patterns.map((pattern) => (
                  <div key={pattern.id} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-foreground">{pattern.pattern}</h4>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                        {pattern.frequency}% frequency
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-400">{pattern.successRate}%</div>
                        <div className="text-xs text-muted-foreground">Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-400">{pattern.avgDuration}min</div>
                        <div className="text-xs text-muted-foreground">Avg Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">{pattern.commonIssues.length}</div>
                        <div className="text-xs text-muted-foreground">Known Issues</div>
                      </div>
                    </div>

                    {pattern.optimizations.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-foreground mb-1">AI Optimizations:</p>
                        {pattern.optimizations.map((optimization, i) => (
                          <p key={i} className="text-xs text-green-600 flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            {optimization}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Decision Accuracy Trend</span>
                      <span className="font-medium">+2.3% this week</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Learning Effectiveness</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Pattern Recognition</span>
                      <span className="font-medium">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  Predictive Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <p className="text-sm font-medium text-yellow-600">Resource Optimization Needed</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      CPU utilization trending upward - consider scaling
                    </p>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <p className="text-sm font-medium text-blue-600">Performance Opportunity</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      New optimization pattern detected for FHIR workflows
                    </p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <p className="text-sm font-medium text-green-600">Learning Milestone</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Decision accuracy improved by 5% this month
                    </p>
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

export default AIIntelligenceDashboard;
