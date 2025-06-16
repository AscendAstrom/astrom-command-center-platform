
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Database, Settings } from "lucide-react";
import { AIWorkflowState } from "../hooks/useWorkflowData";
import WorkflowStepCard from "./WorkflowStepCard";
import WorkflowMetricsBar from "./WorkflowMetricsBar";

interface WorkflowCardProps {
  workflow: AIWorkflowState;
}

const WorkflowCard = ({ workflow }: WorkflowCardProps) => {
  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
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
              <WorkflowStepCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* AI Performance Metrics */}
        <WorkflowMetricsBar workflow={workflow} />
      </CardContent>
    </Card>
  );
};

export default WorkflowCard;
