
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Workflow, 
  Shield, 
  Database,
  Building,
  Network,
  Brain,
  Activity
} from "lucide-react";
import { ApiGatewayTab } from "./ApiGatewayTab";
import { WorkflowsTab } from "./WorkflowsTab";
import { GovernanceTab } from "./GovernanceTab";
import { FederationTab } from "./FederationTab";
import { EHRIntegrationTab } from "./EHRIntegrationTab";
import { ComplianceEngineTab } from "./ComplianceEngineTab";
import { IntegrationStatus, WorkflowMetrics } from "./types";

const EnterpriseIntegrationHub = () => {
  const [activeIntegrations] = useState<IntegrationStatus[]>([
    { name: 'Epic MyChart', status: 'active', uptime: 99.9, throughput: '2.3K/min', type: 'EHR' },
    { name: 'Cerner PowerChart', status: 'active', uptime: 98.7, throughput: '1.8K/min', type: 'EHR' },
    { name: 'Allscripts', status: 'maintenance', uptime: 95.2, throughput: '0.5K/min', type: 'EHR' },
    { name: 'Oracle Health', status: 'active', uptime: 99.5, throughput: '1.2K/min', type: 'EHR' },
    { name: 'MEDITECH', status: 'active', uptime: 97.8, throughput: '0.9K/min', type: 'EHR' },
    { name: 'athenahealth', status: 'active', uptime: 98.5, throughput: '1.5K/min', type: 'EHR' },
    { name: 'NextGen Healthcare', status: 'active', uptime: 97.2, throughput: '0.8K/min', type: 'EHR' },
    { name: 'eClinicalWorks', status: 'active', uptime: 96.8, throughput: '0.7K/min', type: 'EHR' }
  ]);

  const [workflowMetrics] = useState<WorkflowMetrics>({
    activeWorkflows: 347,
    completedToday: 2847,
    averageProcessingTime: 1.8,
    automationRate: 96.7
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="ehr-integration" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-muted/50">
          <TabsTrigger value="ehr-integration">
            <Building className="h-4 w-4 mr-2" />
            EHR Integration
          </TabsTrigger>
          <TabsTrigger value="api-gateway">
            <Globe className="h-4 w-4 mr-2" />
            API Gateway
          </TabsTrigger>
          <TabsTrigger value="workflows">
            <Workflow className="h-4 w-4 mr-2" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="compliance">
            <Shield className="h-4 w-4 mr-2" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="governance">
            <Brain className="h-4 w-4 mr-2" />
            Governance
          </TabsTrigger>
          <TabsTrigger value="federation">
            <Database className="h-4 w-4 mr-2" />
            Federation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ehr-integration" className="space-y-4">
          <EHRIntegrationTab activeIntegrations={activeIntegrations} />
        </TabsContent>

        <TabsContent value="api-gateway" className="space-y-4">
          <ApiGatewayTab activeIntegrations={activeIntegrations} />
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <WorkflowsTab workflowMetrics={workflowMetrics} />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <ComplianceEngineTab />
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
