
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Workflow, Brain, RefreshCw, Play, Pause, Settings } from "lucide-react";
import { WorkflowMetrics, WorkflowPerformance } from "./types";
import { useState } from "react";
import { toast } from "sonner";

interface WorkflowsTabProps {
  workflowMetrics: WorkflowMetrics;
}

export const WorkflowsTab = ({ workflowMetrics: initialMetrics }: WorkflowsTabProps) => {
  const [workflowMetrics, setWorkflowMetrics] = useState(initialMetrics);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [workflowPerformance, setWorkflowPerformance] = useState<WorkflowPerformance[]>([
    { name: 'Patient Registration Flow', completion: 98, efficiency: 'Excellent', isActive: true },
    { name: 'Discharge Processing', completion: 92, efficiency: 'Good', isActive: true },
    { name: 'Lab Result Distribution', completion: 85, efficiency: 'Fair', isActive: false },
    { name: 'Insurance Verification', completion: 76, efficiency: 'Needs Optimization', isActive: true }
  ]);

  const handleAIOptimize = () => {
    setIsOptimizing(true);
    toast.info("AI optimization started for all workflows");
    
    // Simulate AI optimization process
    setTimeout(() => {
      setWorkflowPerformance(prev => 
        prev.map(workflow => ({
          ...workflow,
          completion: Math.min(100, workflow.completion + Math.floor(Math.random() * 10) + 5),
          efficiency: workflow.completion > 90 ? 'Excellent' : workflow.completion > 80 ? 'Good' : 'Fair'
        }))
      );
      
      setWorkflowMetrics(prev => ({
        ...prev,
        automationRate: Math.min(100, prev.automationRate + Math.floor(Math.random() * 5) + 2),
        averageProcessingTime: Math.max(1, prev.averageProcessingTime - Math.floor(Math.random() * 3) - 1)
      }));
      
      setIsOptimizing(false);
      toast.success("AI optimization completed successfully!");
    }, 3000);
  };

  const toggleWorkflow = (index: number) => {
    setWorkflowPerformance(prev => 
      prev.map((workflow, i) => 
        i === index 
          ? { ...workflow, isActive: !workflow.isActive }
          : workflow
      )
    );
    const workflow = workflowPerformance[index];
    toast.success(`${workflow.name} ${workflow.isActive ? 'paused' : 'activated'}`);
  };

  const optimizeIndividualWorkflow = (index: number) => {
    const workflow = workflowPerformance[index];
    toast.info(`Optimizing ${workflow.name}...`);
    
    setTimeout(() => {
      setWorkflowPerformance(prev => 
        prev.map((w, i) => 
          i === index 
            ? { 
                ...w, 
                completion: Math.min(100, w.completion + Math.floor(Math.random() * 8) + 3),
                efficiency: w.completion > 95 ? 'Excellent' : w.completion > 85 ? 'Good' : 'Fair'
              }
            : w
        )
      );
      toast.success(`${workflow.name} optimization completed`);
    }, 2000);
  };

  const refreshMetrics = () => {
    setWorkflowMetrics(prev => ({
      activeWorkflows: prev.activeWorkflows + Math.floor(Math.random() * 3),
      completedToday: prev.completedToday + Math.floor(Math.random() * 50) + 10,
      averageProcessingTime: Math.max(1, prev.averageProcessingTime + Math.floor(Math.random() * 5) - 2),
      automationRate: Math.min(100, prev.automationRate + Math.random() * 3)
    }));
    toast.success("Workflow metrics refreshed");
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5 text-purple-400" />
              Advanced Workflow Automation
            </CardTitle>
            <CardDescription>
              AI-powered workflow orchestration and optimization
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshMetrics}
            className="hover:bg-purple-500/10"
            showToast={true}
            toastMessage="Refreshing workflow metrics..."
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:bg-purple-500/15 transition-colors">
            <div className="text-2xl font-bold text-purple-400">{workflowMetrics.activeWorkflows}</div>
            <div className="text-xs text-muted-foreground">Active Workflows</div>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 hover:bg-green-500/15 transition-colors">
            <div className="text-2xl font-bold text-green-400">{workflowMetrics.completedToday}</div>
            <div className="text-xs text-muted-foreground">Completed Today</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:bg-blue-500/15 transition-colors">
            <div className="text-2xl font-bold text-blue-400">{workflowMetrics.averageProcessingTime}m</div>
            <div className="text-xs text-muted-foreground">Avg Processing</div>
          </div>
          <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20 hover:bg-orange-500/15 transition-colors">
            <div className="text-2xl font-bold text-orange-400">{workflowMetrics.automationRate.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Automation Rate</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Workflow Performance</h4>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleAIOptimize}
              disabled={isOptimizing}
              className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 hover:from-purple-600/20 hover:to-blue-600/20"
              showToast={true}
              toastMessage={isOptimizing ? "AI optimization in progress..." : "Starting AI optimization..."}
            >
              {isOptimizing ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Brain className="h-4 w-4 mr-2" />
              )}
              {isOptimizing ? "Optimizing..." : "AI Optimize"}
            </Button>
          </div>
          
          {workflowPerformance.map((workflow, index) => (
            <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${workflow.isActive ? 'bg-green-400 animate-pulse' : 'bg-muted-foreground'}`} />
                  <span className="font-medium">{workflow.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{workflow.efficiency}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleWorkflow(index)}
                    className="h-6 w-6 p-0"
                    showToast={true}
                    toastMessage={`${workflow.isActive ? 'Pausing' : 'Activating'} ${workflow.name}`}
                  >
                    {workflow.isActive ? 
                      <Pause className="h-3 w-3" /> : 
                      <Play className="h-3 w-3" />
                    }
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => optimizeIndividualWorkflow(index)}
                    className="h-6 w-6 p-0"
                    showToast={true}
                    toastMessage={`Optimizing ${workflow.name}...`}
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Progress value={workflow.completion} className="h-2 mb-1" />
              <div className="text-xs text-muted-foreground">{workflow.completion}% completion rate</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
