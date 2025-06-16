
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Workflow, CheckCircle, AlertTriangle } from "lucide-react";

interface WorkflowIntegrationTabProps {
  onConnectPipeline: (pipelineId: string, workflowId: string) => void;
  onStreamToDashboard: (workflowId: string, dashboardId: string) => void;
  onTriggerAutomation: (workflowId: string, ruleId: string) => void;
}

const WorkflowIntegrationTab = ({
  onConnectPipeline,
  onStreamToDashboard,
  onTriggerAutomation
}: WorkflowIntegrationTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Workflow className="h-5 w-5 text-purple-400" />
          Workflow Integration Controls
        </CardTitle>
        <CardDescription>
          Connect workflows with automation rules and data pipelines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">FHIR Data Processing Workflow</h4>
                <p className="text-sm text-muted-foreground">Active • Phase 4 of 6</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onConnectPipeline('pipeline_1', 'workflow_1')}
                >
                  Connect Pipeline
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onStreamToDashboard('workflow_1', 'dashboard_1')}
                >
                  Stream to Dashboard
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">AstroBricks Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">AstroView Streaming</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">AstroFlow Pending</span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">Patient Analytics Pipeline</h4>
                <p className="text-sm text-muted-foreground">Running • Real-time processing</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onTriggerAutomation('workflow_2', 'rule_1')}
                >
                  Trigger Automation
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onStreamToDashboard('workflow_2', 'dashboard_2')}
                >
                  Update Dashboard
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">All Modules Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Auto-scaling Active</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Real-time Sync</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowIntegrationTab;
