
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Workflow, 
  Brain, 
  Zap, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Target,
  TrendingUp,
  Activity,
  Database,
  Settings
} from "lucide-react";

interface WorkflowStep {
  id: string;
  name: string;
  phase: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'optimizing';
  progress: number;
  aiInsights: string[];
  recommendations: string[];
  duration?: string;
  autoTrigger: boolean;
}

interface AIWorkflowState {
  sourceId: string;
  sourceName: string;
  currentPhase: number;
  overallProgress: number;
  steps: WorkflowStep[];
  aiDecisions: number;
  automatedActions: number;
  confidenceScore: number;
}

const WorkflowOrchestrator = () => {
  const [workflows, setWorkflows] = useState<AIWorkflowState[]>([
    {
      sourceId: '1',
      sourceName: 'Saudi MOH FHIR Gateway',
      currentPhase: 4,
      overallProgress: 67,
      aiDecisions: 23,
      automatedActions: 15,
      confidenceScore: 94,
      steps: [
        {
          id: '1',
          name: 'Intelligent Data Discovery',
          phase: 'Phase 1: Onboarding',
          status: 'completed',
          progress: 100,
          aiInsights: ['Schema validated automatically', 'Data quality score: 96%'],
          recommendations: [],
          duration: '2m 15s',
          autoTrigger: true
        },
        {
          id: '2',
          name: 'Smart Field Mapping',
          phase: 'Phase 1: Onboarding',
          status: 'completed',
          progress: 100,
          aiInsights: ['87 fields mapped automatically', 'Confidence: 98%'],
          recommendations: [],
          duration: '45s',
          autoTrigger: true
        },
        {
          id: '3',
          name: 'Real-time Ingestion',
          phase: 'Phase 2: Ingestion',
          status: 'completed',
          progress: 100,
          aiInsights: ['2.4M records processed', 'Zero data loss'],
          recommendations: [],
          duration: '12m 30s',
          autoTrigger: true
        },
        {
          id: '4',
          name: 'Pipeline Optimization',
          phase: 'Phase 3: Processing',
          status: 'in_progress',
          progress: 78,
          aiInsights: ['Performance improved by 34%', 'Memory usage optimized'],
          recommendations: ['Consider horizontal scaling for peak hours'],
          autoTrigger: true
        },
        {
          id: '5',
          name: 'Clinical Intelligence',
          phase: 'Phase 4: Analysis',
          status: 'pending',
          progress: 0,
          aiInsights: [],
          recommendations: ['Ready for predictive analytics'],
          autoTrigger: true
        },
        {
          id: '6',
          name: 'Executive Insights',
          phase: 'Phase 5: Intelligence',
          status: 'pending',
          progress: 0,
          aiInsights: [],
          recommendations: [],
          autoTrigger: true
        },
        {
          id: '7',
          name: 'Autonomous Operations',
          phase: 'Phase 6: Operations',
          status: 'pending',
          progress: 0,
          aiInsights: [],
          recommendations: [],
          autoTrigger: true
        }
      ]
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-400" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-400" />;
      case 'optimizing': return <Zap className="h-4 w-4 text-yellow-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'in_progress': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'failed': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'optimizing': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Workflow Overview */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-400" />
            AI-Driven Workflow Orchestration
            <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">Active</Badge>
          </CardTitle>
          <CardDescription>
            End-to-end AI automation from data ingestion to autonomous operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{workflows.length}</div>
              <div className="text-xs text-muted-foreground">Active Workflows</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {workflows.reduce((acc, w) => acc + w.aiDecisions, 0)}
              </div>
              <div className="text-xs text-muted-foreground">AI Decisions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {workflows.reduce((acc, w) => acc + w.automatedActions, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Automated Actions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">
                {Math.round(workflows.reduce((acc, w) => acc + w.confidenceScore, 0) / workflows.length)}%
              </div>
              <div className="text-xs text-muted-foreground">Avg Confidence</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Workflows */}
      {workflows.map((workflow) => (
        <Card key={workflow.sourceId} className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Database className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-foreground">{workflow.sourceName}</CardTitle>
                  <CardDescription>
                    Phase {workflow.currentPhase}/6 • {workflow.overallProgress}% Complete
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  AI Active
                </Badge>
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Configure
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium text-foreground">{workflow.overallProgress}%</span>
              </div>
              <Progress value={workflow.overallProgress} className="h-2" />
            </div>

            {/* Workflow Steps */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Workflow Steps</h4>
              <div className="space-y-3">
                {workflow.steps.map((step, index) => (
                  <div key={step.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h5 className="font-medium text-foreground">{step.name}</h5>
                          <p className="text-xs text-muted-foreground">{step.phase}</p>
                        </div>
                        <Badge variant="outline" className={`text-xs ${getStatusColor(step.status)}`}>
                          {step.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      {step.progress > 0 && (
                        <div className="mb-2">
                          <Progress value={step.progress} className="h-1" />
                        </div>
                      )}

                      {step.aiInsights.length > 0 && (
                        <div className="mb-2">
                          <p className="text-xs font-medium text-foreground mb-1">AI Insights:</p>
                          {step.aiInsights.map((insight, i) => (
                            <p key={i} className="text-xs text-green-600 flex items-center gap-1">
                              <Brain className="h-3 w-3" />
                              {insight}
                            </p>
                          ))}
                        </div>
                      )}

                      {step.recommendations.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-foreground mb-1">Recommendations:</p>
                          {step.recommendations.map((rec, i) => (
                            <p key={i} className="text-xs text-yellow-600 flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              {rec}
                            </p>
                          ))}
                        </div>
                      )}

                      {step.duration && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Duration: {step.duration}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Performance Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">{workflow.aiDecisions}</div>
                <div className="text-xs text-muted-foreground">AI Decisions</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">{workflow.automatedActions}</div>
                <div className="text-xs text-muted-foreground">Automated Actions</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">{workflow.confidenceScore}%</div>
                <div className="text-xs text-muted-foreground">Confidence Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WorkflowOrchestrator;
