
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";
import { AIWorkflowState } from "../hooks/useWorkflowData";

interface WorkflowOverviewCardProps {
  workflows: AIWorkflowState[];
}

const WorkflowOverviewCard = ({ workflows }: WorkflowOverviewCardProps) => {
  return (
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
  );
};

export default WorkflowOverviewCard;
