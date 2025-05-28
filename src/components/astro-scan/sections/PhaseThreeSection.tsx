
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIDecisionEngineSection from "./AIDecisionEngineSection";
import AdvancedMonitoringSection from "./AdvancedMonitoringSection";
import ExecutiveCommandCenterSection from "./ExecutiveCommandCenterSection";
import ExecutiveCommandCenterNewSection from "./ExecutiveCommandCenterNewSection";
import SecurityComplianceSection from "./SecurityComplianceSection";

const PhaseThreeSection = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-foreground">Phase 3: Enterprise-Grade AI Intelligence & Autonomous Operations</h3>
        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
          <CheckCircle className="h-3 w-3 mr-1" />
          Complete
        </Badge>
      </div>
      <p className="text-muted-foreground mb-6">
        Complete autonomous healthcare intelligence platform with enterprise-grade AI decision engines,
        advanced monitoring, executive command centers, and comprehensive security & compliance intelligence.
      </p>

      <Tabs defaultValue="ai-decision" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-muted/50">
          <TabsTrigger value="ai-decision">AI Decision Engine</TabsTrigger>
          <TabsTrigger value="monitoring">Advanced Monitoring</TabsTrigger>
          <TabsTrigger value="executive-legacy">Executive Dashboard</TabsTrigger>
          <TabsTrigger value="executive-command">Strategic Command</TabsTrigger>
          <TabsTrigger value="security">Security Intelligence</TabsTrigger>
          <TabsTrigger value="overview">Phase Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-decision" className="space-y-4">
          <AIDecisionEngineSection />
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <AdvancedMonitoringSection />
        </TabsContent>

        <TabsContent value="executive-legacy" className="space-y-4">
          <ExecutiveCommandCenterSection />
        </TabsContent>

        <TabsContent value="executive-command" className="space-y-4">
          <ExecutiveCommandCenterNewSection />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecurityComplianceSection />
        </TabsContent>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">Phase 3A: Autonomous Decision Engine ✓</h4>
              <p className="text-sm text-muted-foreground">
                AI-powered decision making with advanced ML platform for autonomous healthcare operations.
              </p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">Phase 3B: Enterprise Integration ✓</h4>
              <p className="text-sm text-muted-foreground">
                Enterprise integration hub, cognitive analytics, and advanced workflow automation.
              </p>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <h4 className="font-semibold text-purple-400 mb-2">Phase 3C: Executive Command ✓</h4>
              <p className="text-sm text-muted-foreground">
                Strategic command center with AI-powered forecasting and performance optimization.
              </p>
            </div>
            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Phase 3D: Security & Compliance ✓</h4>
              <p className="text-sm text-muted-foreground">
                Comprehensive security intelligence and automated compliance management.
              </p>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <h4 className="text-xl font-bold text-green-400">Phase 3 Complete!</h4>
            </div>
            <p className="text-foreground">
              Enterprise-Grade AI Intelligence & Autonomous Operations platform is now fully operational.
              All components including AI decision engines, advanced monitoring, executive command centers,
              and security & compliance intelligence are active and integrated.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PhaseThreeSection;
