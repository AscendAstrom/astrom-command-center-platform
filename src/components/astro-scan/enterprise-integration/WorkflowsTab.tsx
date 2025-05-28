
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Workflow, Brain } from "lucide-react";
import { WorkflowMetrics, WorkflowPerformance } from "./types";

interface WorkflowsTabProps {
  workflowMetrics: WorkflowMetrics;
}

export const WorkflowsTab = ({ workflowMetrics }: WorkflowsTabProps) => {
  const workflowPerformance: WorkflowPerformance[] = [
    { name: 'Patient Registration Flow', completion: 98, efficiency: 'Excellent' },
    { name: 'Discharge Processing', completion: 92, efficiency: 'Good' },
    { name: 'Lab Result Distribution', completion: 85, efficiency: 'Fair' },
    { name: 'Insurance Verification', completion: 76, efficiency: 'Needs Optimization' }
  ];

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Workflow className="h-5 w-5 text-purple-400" />
          Advanced Workflow Automation
        </CardTitle>
        <CardDescription>
          AI-powered workflow orchestration and optimization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">{workflowMetrics.activeWorkflows}</div>
            <div className="text-xs text-muted-foreground">Active Workflows</div>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{workflowMetrics.completedToday}</div>
            <div className="text-xs text-muted-foreground">Completed Today</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{workflowMetrics.averageProcessingTime}</div>
            <div className="text-xs text-muted-foreground">Avg Processing</div>
          </div>
          <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="text-2xl font-bold text-orange-400">{workflowMetrics.automationRate}%</div>
            <div className="text-xs text-muted-foreground">Automation Rate</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Workflow Performance</h4>
            <Button variant="outline" size="sm">
              <Brain className="h-4 w-4 mr-2" />
              AI Optimize
            </Button>
          </div>
          
          {workflowPerformance.map((workflow, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{workflow.name}</span>
                <span className="text-sm text-muted-foreground">{workflow.efficiency}</span>
              </div>
              <Progress value={workflow.completion} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">{workflow.completion}% completion rate</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
