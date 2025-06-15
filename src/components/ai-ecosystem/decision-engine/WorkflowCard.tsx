
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Settings, TrendingUp, RefreshCw } from 'lucide-react';
import { AutonomousWorkflow } from '@/hooks/useAutonomousWorkflows';
import { getStatusColor, getCategoryIcon } from './utils';
import { UseMutationResult } from '@tanstack/react-query';

interface WorkflowCardProps {
  workflow: AutonomousWorkflow;
  retrainMutation: UseMutationResult<any, Error, AutonomousWorkflow, unknown>;
  onRetrain: (workflow: AutonomousWorkflow) => void;
}

const WorkflowCard = ({ workflow, retrainMutation, onRetrain }: WorkflowCardProps) => {
  const isRetrainingThis = retrainMutation.isPending && retrainMutation.variables?.id === workflow.id;
  
  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getCategoryIcon(workflow.category)}
            <CardTitle className="text-base">{workflow.name}</CardTitle>
          </div>
          <Badge variant="outline" className={getStatusColor(workflow.status)}>
            {workflow.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-purple-400">{workflow.autonomyLevel}%</div>
            <div className="text-xs text-muted-foreground">Autonomy</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-400">{workflow.interventions}</div>
            <div className="text-xs text-muted-foreground">Interventions</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-400">{workflow.accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-foreground">Decision Nodes</div>
          {workflow.nodes.length > 0 ? workflow.nodes.map((node) => (
            <div key={node.id} className="p-2 bg-muted/50 rounded border border-border/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{node.name}</span>
                <Badge variant="outline" className={`text-xs ${getStatusColor(node.status)}`}>
                  {node.status}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div>Confidence: {node.confidence}%</div>
                <div>Success: {node.successRate}%</div>
                <div>Decisions: {node.decisions}</div>
              </div>
              {node.status === 'optimizing' && (
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Training Progress</span>
                    <span>{node.progress}%</span>
                  </div>
                  <Progress value={node.progress} className="h-1" />
                </div>
              )}
            </div>
          )) : (
            <div className="text-center text-xs text-muted-foreground p-3 bg-muted/50 rounded">
              No training jobs found for this model.
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Settings className="h-3 w-3 mr-1" />
            Configure
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            Analytics
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onRetrain(workflow)}
            disabled={isRetrainingThis}
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${isRetrainingThis ? 'animate-spin' : ''}`} />
            {isRetrainingThis ? 'Starting...' : 'Retrain'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowCard;
