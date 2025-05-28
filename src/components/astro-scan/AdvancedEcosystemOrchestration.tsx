
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Network, 
  Shield, 
  Cpu,
  Workflow,
  Globe
} from "lucide-react";
import { AutonomousHealingTab } from "./advanced-orchestration/AutonomousHealingTab";
import { PredictiveOptimizationTab } from "./advanced-orchestration/PredictiveOptimizationTab";
import { FederatedLearningTab } from "./advanced-orchestration/FederatedLearningTab";
import { IntelligentEcosystemTab } from "./advanced-orchestration/IntelligentEcosystemTab";
import { NextGenWorkflowsTab } from "./advanced-orchestration/NextGenWorkflowsTab";
import { GlobalHealthNetworkTab } from "./advanced-orchestration/GlobalHealthNetworkTab";

const AdvancedEcosystemOrchestration = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="autonomous-healing" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-muted/50">
          <TabsTrigger value="autonomous-healing">
            <Brain className="h-4 w-4 mr-2" />
            Autonomous Healing
          </TabsTrigger>
          <TabsTrigger value="predictive-optimization">
            <Cpu className="h-4 w-4 mr-2" />
            Predictive Optimization
          </TabsTrigger>
          <TabsTrigger value="federated-learning">
            <Network className="h-4 w-4 mr-2" />
            Federated Learning
          </TabsTrigger>
          <TabsTrigger value="intelligent-ecosystem">
            <Shield className="h-4 w-4 mr-2" />
            Intelligent Ecosystem
          </TabsTrigger>
          <TabsTrigger value="nextgen-workflows">
            <Workflow className="h-4 w-4 mr-2" />
            NextGen Workflows
          </TabsTrigger>
          <TabsTrigger value="global-network">
            <Globe className="h-4 w-4 mr-2" />
            Global Network
          </TabsTrigger>
        </TabsList>

        <TabsContent value="autonomous-healing" className="space-y-4">
          <AutonomousHealingTab />
        </TabsContent>

        <TabsContent value="predictive-optimization" className="space-y-4">
          <PredictiveOptimizationTab />
        </TabsContent>

        <TabsContent value="federated-learning" className="space-y-4">
          <FederatedLearningTab />
        </TabsContent>

        <TabsContent value="intelligent-ecosystem" className="space-y-4">
          <IntelligentEcosystemTab />
        </TabsContent>

        <TabsContent value="nextgen-workflows" className="space-y-4">
          <NextGenWorkflowsTab />
        </TabsContent>

        <TabsContent value="global-network" className="space-y-4">
          <GlobalHealthNetworkTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedEcosystemOrchestration;
