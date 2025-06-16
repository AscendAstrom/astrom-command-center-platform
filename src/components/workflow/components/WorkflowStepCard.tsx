
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Zap,
  Brain,
  Target
} from "lucide-react";
import { WorkflowStep } from "../hooks/useWorkflowData";

interface WorkflowStepCardProps {
  step: WorkflowStep;
  index: number;
}

const WorkflowStepCard = ({ step }: WorkflowStepCardProps) => {
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
    <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
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
  );
};

export default WorkflowStepCard;
