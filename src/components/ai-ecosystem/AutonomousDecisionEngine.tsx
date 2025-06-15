
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from 'lucide-react';
import { useAutonomousWorkflows, AutonomousWorkflow } from '@/hooks/useAutonomousWorkflows';
import SystemMetricsHeader from './decision-engine/SystemMetricsHeader';
import WorkflowCard from './decision-engine/WorkflowCard';
import LearningStatusPanel from './decision-engine/LearningStatusPanel';

const AutonomousDecisionEngine = () => {
  const { workflows, systemMetrics, isLoading, error, retrainMutation } = useAutonomousWorkflows();

  const handleRetrain = (workflow: AutonomousWorkflow) => {
    retrainMutation.mutate(workflow);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Error Loading Decision Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Could not fetch autonomous workflow data. Please try again later.</p>
          <p className="text-xs text-muted-foreground mt-2">{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
        </CardContent>
      </Card>
    );
  }
  
  if (!systemMetrics) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <SystemMetricsHeader systemMetrics={systemMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <WorkflowCard
            key={workflow.id}
            workflow={workflow}
            retrainMutation={retrainMutation}
            onRetrain={handleRetrain}
          />
        ))}
      </div>

      <LearningStatusPanel />
    </div>
  );
};

export default AutonomousDecisionEngine;
