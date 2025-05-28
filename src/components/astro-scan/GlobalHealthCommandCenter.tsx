
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Shield, 
  Brain, 
  AlertTriangle,
  Languages,
  Network
} from "lucide-react";
import { GlobalNetworkTab } from "./global-health/GlobalNetworkTab";
import { InternationalComplianceTab } from "./global-health/InternationalComplianceTab";
import { UniversalAITab } from "./global-health/UniversalAITab";
import { EmergencyResponseTab } from "./global-health/EmergencyResponseTab";
import { WorldIntelligenceTab } from "./global-health/WorldIntelligenceTab";
import { DataSovereigntyTab } from "./global-health/DataSovereigntyTab";

const GlobalHealthCommandCenter = () => {
  return (
    <div className="p-6 glass-card border border-border/50 rounded-lg">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-bold text-foreground">Global Health Command Center</h3>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-3 h-3 bg-astrom-green rounded-full animate-pulse"></div>
          <span className="text-sm text-astrom-green font-medium">Worldwide Network Active</span>
        </div>
      </div>

      <Tabs defaultValue="global-network" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-muted/50">
          <TabsTrigger value="global-network">
            <Globe className="h-4 w-4 mr-2" />
            Global Network
          </TabsTrigger>
          <TabsTrigger value="compliance">
            <Shield className="h-4 w-4 mr-2" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="universal-ai">
            <Brain className="h-4 w-4 mr-2" />
            Universal AI
          </TabsTrigger>
          <TabsTrigger value="emergency">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Emergency
          </TabsTrigger>
          <TabsTrigger value="intelligence">
            <Languages className="h-4 w-4 mr-2" />
            Intelligence
          </TabsTrigger>
          <TabsTrigger value="sovereignty">
            <Network className="h-4 w-4 mr-2" />
            Sovereignty
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global-network" className="space-y-4">
          <GlobalNetworkTab />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <InternationalComplianceTab />
        </TabsContent>

        <TabsContent value="universal-ai" className="space-y-4">
          <UniversalAITab />
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <EmergencyResponseTab />
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-4">
          <WorldIntelligenceTab />
        </TabsContent>

        <TabsContent value="sovereignty" className="space-y-4">
          <DataSovereigntyTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalHealthCommandCenter;
