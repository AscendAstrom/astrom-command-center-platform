
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCrossModuleIntegration } from "./hooks/useCrossModuleIntegration";
import IntegrationOverviewCard from "./cross-module/IntegrationOverviewCard";
import ModuleConnectionsTab from "./cross-module/ModuleConnectionsTab";
import WorkflowIntegrationTab from "./cross-module/WorkflowIntegrationTab";
import AutomationSyncTab from "./cross-module/AutomationSyncTab";
import AnalyticsFlowTab from "./cross-module/AnalyticsFlowTab";

const CrossModuleIntegrationDashboard = () => {
  const {
    connections,
    crossModuleData,
    isIntegrating,
    integrationHealth,
    syncCrossModuleData,
    triggerWorkflowAutomation,
    connectPipelineToWorkflow,
    streamToDashboard
  } = useCrossModuleIntegration();

  return (
    <div className="space-y-6">
      <IntegrationOverviewCard
        connections={connections}
        integrationHealth={integrationHealth}
        crossModuleData={crossModuleData}
        isIntegrating={isIntegrating}
        onSync={syncCrossModuleData}
      />

      <Tabs defaultValue="connections" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="connections">Module Connections</TabsTrigger>
          <TabsTrigger value="workflows">Workflow Integration</TabsTrigger>
          <TabsTrigger value="automation">Automation Sync</TabsTrigger>
          <TabsTrigger value="analytics">Analytics Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-4">
          <ModuleConnectionsTab connections={connections} />
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <WorkflowIntegrationTab
            onConnectPipeline={connectPipelineToWorkflow}
            onStreamToDashboard={streamToDashboard}
            onTriggerAutomation={triggerWorkflowAutomation}
          />
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <AutomationSyncTab />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsFlowTab crossModuleData={crossModuleData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CrossModuleIntegrationDashboard;
