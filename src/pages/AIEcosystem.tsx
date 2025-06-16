import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  MessageSquare, 
  TrendingUp, 
  Network,
  Zap,
  Settings,
  Cpu,
  GitBranch
} from "lucide-react";
import AIOrchestrator from "@/components/ai-ecosystem/AIOrchestrator";
import AIAssistantChat from "@/components/ai-ecosystem/AIAssistantChat";
import PredictiveAnalyticsEngine from "@/components/ai-ecosystem/PredictiveAnalyticsEngine";
import AutonomousDecisionEngine from "@/components/ai-ecosystem/AutonomousDecisionEngine";
import AdvancedMLPlatform from "@/components/ai-ecosystem/AdvancedMLPlatform";
import AdvancedConfiguration from "@/components/ai-ecosystem/AdvancedConfiguration";
import EnterpriseIntegrationHub from "@/components/ai-ecosystem/EnterpriseIntegrationHub";
import CognitiveAnalyticsPlatform from "@/components/ai-ecosystem/CognitiveAnalyticsPlatform";
import AdvancedWorkflowAutomation from "@/components/ai-ecosystem/AdvancedWorkflowAutomation";
import { useUserRole } from "@/components/astro-bricks/hooks/useUserRole";
import DashboardLayout from "@/components/DashboardLayout";

const AIEcosystem = () => {
  const { userRole, isLoading } = useUserRole();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-96 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">AI ECOSYSTEM</h1>
              <span className="text-sm text-purple-400 font-medium">Phase 3B: Enterprise Integration & Cognitive Analytics</span>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Enterprise-grade integration hub, cognitive analytics platform, advanced workflow automation, 
              and comprehensive AI configuration management for large-scale healthcare operations.
            </p>
          </div>

          <Tabs defaultValue="orchestrator" className="space-y-6">
            <TabsList className="grid w-full grid-cols-8 bg-muted/50">
              <TabsTrigger value="orchestrator" className="data-[state=active]:bg-purple-500/20">
                <Network className="h-4 w-4 mr-2" />
                Orchestrator
              </TabsTrigger>
              <TabsTrigger value="autonomous" className="data-[state=active]:bg-indigo-500/20">
                <Brain className="h-4 w-4 mr-2" />
                Autonomous
              </TabsTrigger>
              <TabsTrigger value="ml-platform" className="data-[state=active]:bg-cyan-500/20">
                <Cpu className="h-4 w-4 mr-2" />
                ML Platform
              </TabsTrigger>
              <TabsTrigger value="assistant" className="data-[state=active]:bg-blue-500/20">
                <MessageSquare className="h-4 w-4 mr-2" />
                AI Assistant
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-green-500/20">
                <Brain className="h-4 w-4 mr-2" />
                Cognitive
              </TabsTrigger>
              <TabsTrigger value="workflows" className="data-[state=active]:bg-orange-500/20">
                <Zap className="h-4 w-4 mr-2" />
                Workflows
              </TabsTrigger>
              <TabsTrigger value="integration" className="data-[state=active]:bg-pink-500/20">
                <GitBranch className="h-4 w-4 mr-2" />
                Integration
              </TabsTrigger>
              <TabsTrigger value="config" className="data-[state=active]:bg-red-500/20">
                <Settings className="h-4 w-4 mr-2" />
                Config
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orchestrator" className="space-y-6">
              <AIOrchestrator />
            </TabsContent>

            <TabsContent value="autonomous" className="space-y-6">
              <AutonomousDecisionEngine />
            </TabsContent>

            <TabsContent value="ml-platform" className="space-y-6">
              <AdvancedMLPlatform />
            </TabsContent>

            <TabsContent value="assistant" className="space-y-6">
              <AIAssistantChat />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <CognitiveAnalyticsPlatform />
            </TabsContent>

            <TabsContent value="workflows" className="space-y-6">
              <AdvancedWorkflowAutomation />
            </TabsContent>

            <TabsContent value="integration" className="space-y-6">
              <EnterpriseIntegrationHub />
            </TabsContent>

            <TabsContent value="config" className="space-y-6">
              <AdvancedConfiguration />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIEcosystem;
