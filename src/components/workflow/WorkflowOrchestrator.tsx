
import { useWorkflowData } from './hooks/useWorkflowData';
import WorkflowOverviewCard from './components/WorkflowOverviewCard';
import WorkflowCard from './components/WorkflowCard';

const WorkflowOrchestrator = () => {
  const { workflows } = useWorkflowData();

  return (
    <div className="space-y-6">
      {/* AI Workflow Overview */}
      <WorkflowOverviewCard workflows={workflows} />

      {/* Active Workflows */}
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.sourceId} workflow={workflow} />
      ))}
    </div>
  );
};

export default WorkflowOrchestrator;
