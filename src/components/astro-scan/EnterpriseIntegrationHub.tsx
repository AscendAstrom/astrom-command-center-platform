
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Workflow, 
  Shield, 
  Database
} from "lucide-react";
import { ApiGatewayTab } from "./enterprise-integration/ApiGatewayTab";
import { WorkflowsTab } from "./enterprise-integration/WorkflowsTab";
import { GovernanceTab } from "./enterprise-integration/GovernanceTab";
import { FederationTab } from "./enterprise-integration/FederationTab";
import { IntegrationStatus, WorkflowMetrics } from "./enterprise-integration/types";

const EnterpriseIntegrationHub = () => {
  const [activeIntegrations] = useState<IntegrationStatus[]>([
    { name: 'Epic MyChart', status: 'active', uptime: 99.9, throughput: '2.3K/min', type: 'EHR' },
    { name: 'Cerner PowerChart', status: 'active', uptime: 98.7, throughput: '1.8K/min', type: 'EHR' },
    { name: 'Allscripts', status: 'maintenance', uptime: 95.2, throughput: '0.5K/min', type: 'EHR' },
    { name: 'Oracle Health', status: 'active', uptime: 99.5, throughput: '1.2K/min', type: 'EHR' },
    { name: 'MEDITECH', status: 'active', uptime: 97.8, throughput: '0.9K/min', type: 'EHR' }
  ]);

  const [workflowMetrics] = useState<WorkflowMetrics>({
    activeWorkflows: 247,
    completedToday: 1542,
    averageProcessingTime: '2.3s',
    automationRate: 94.2
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="api-gateway" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="api-gateway">
            <Globe className="h-4 w-4 mr-2" />
            API Gateway
          </TabsTrigger>
          <TabsTrigger value="workflows">
            <Workflow className="h-4 w-4 mr-2" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="governance">
            <Shield className="h-4 w-4 mr-2" />
            Governance
          </TabsTrigger>
          <TabsTrigger value="federation">
            <Database className="h-4 w-4 mr-2" />
            Data Federation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api-gateway" className="space-y-4">
          <ApiGatewayTab activeIntegrations={activeIntegrations} />
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <WorkflowsTab workflowMetrics={workflowMetrics} />
        </TabsContent>

        <TabsContent value="governance" className="space-y-4">
          <GovernanceTab />
        </TabsContent>

        <TabsContent value="federation" className="space-y-4">
          <FederationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseIntegrationHub;
