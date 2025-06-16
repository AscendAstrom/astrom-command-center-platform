import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Workflow, 
  Brain, 
  Crown, 
  Activity,
  Zap
} from "lucide-react";
import WorkflowOrchestrator from "@/components/workflow/WorkflowOrchestrator";
import AIIntelligenceDashboard from "@/components/workflow/AIIntelligenceDashboard";
import ExecutiveCommandCenter from "@/components/workflow/ExecutiveCommandCenter";
import EnhancedAutomationPanel from "@/components/workflow/EnhancedAutomationPanel";
import { toast } from "sonner";

const AstroWorkflow = () => {
  const [activeTab, setActiveTab] = useState("orchestrator");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast.info(`Switched to ${value} view`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">AstroWorkflow AI</h1>
          <p className="text-muted-foreground">
            End-to-end AI-driven workflow automation and intelligence platform
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger 
              value="orchestrator" 
              className="data-[state=active]:bg-blue-500/20 transition-all duration-200 hover:bg-blue-500/10"
            >
              <Workflow className="h-4 w-4 mr-2" />
              Workflow Orchestrator
            </TabsTrigger>
            <TabsTrigger 
              value="automation" 
              className="data-[state=active]:bg-green-500/20 transition-all duration-200 hover:bg-green-500/10"
            >
              <Zap className="h-4 w-4 mr-2" />
              Smart Automation
            </TabsTrigger>
            <TabsTrigger 
              value="intelligence" 
              className="data-[state=active]:bg-purple-500/20 transition-all duration-200 hover:bg-purple-500/10"
            >
              <Brain className="h-4 w-4 mr-2" />
              AI Intelligence
            </TabsTrigger>
            <TabsTrigger 
              value="executive" 
              className="data-[state=active]:bg-gold-500/20 transition-all duration-200 hover:bg-gold-500/10"
            >
              <Crown className="h-4 w-4 mr-2" />
              Executive Center
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orchestrator" className="space-y-6">
            <Card className="bg-card border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-blue-400" />
                  AI Workflow Orchestration
                </CardTitle>
                <CardDescription>
                  Monitor and manage end-to-end AI-driven workflows from data ingestion to operational outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WorkflowOrchestrator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Card className="bg-card border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-400" />
                  Enhanced AI Automation
                </CardTitle>
                <CardDescription>
                  Real-time AI decision making, smart workflow branching, and predictive optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedAutomationPanel />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="intelligence" className="space-y-6">
            <Card className="bg-card border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  AI Intelligence Dashboard
                </CardTitle>
                <CardDescription>
                  Real-time AI insights, predictions, and automated decision making across all workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIIntelligenceDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="executive" className="space-y-6">
            <Card className="bg-card border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Crown className="h-5 w-5 text-gold-400" />
                  Executive Command Center
                </CardTitle>
                <CardDescription>
                  Strategic insights and executive decision support powered by comprehensive AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExecutiveCommandCenter />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AstroWorkflow;
