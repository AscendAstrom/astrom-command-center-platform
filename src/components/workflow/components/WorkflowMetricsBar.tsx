
import { AIWorkflowState } from "../hooks/useWorkflowData";

interface WorkflowMetricsBarProps {
  workflow: AIWorkflowState;
}

const WorkflowMetricsBar = ({ workflow }: WorkflowMetricsBarProps) => {
  return (
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
  );
};

export default WorkflowMetricsBar;
