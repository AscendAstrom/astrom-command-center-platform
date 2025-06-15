
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Workflow, 
  Bot, 
  Settings,
  AlertTriangle,
  TrendingUp,
  Brain,
  Bell
} from "lucide-react";
import RuleBuilder from "@/components/astro-flow/RuleBuilder";
import SLABreachRadar from "@/components/astro-flow/SLABreachRadar";
import SurgePredictor from "@/components/astro-flow/SurgePredictor";
import NLPAssistant from "@/components/astro-flow/NLPAssistant";
import AlertSubscriptions from "@/components/astro-flow/AlertSubscriptions";
import AIFlowRolesSection from "@/components/astro-flow/sections/AIFlowRolesSection";
import AstroFlowHeader from "@/components/astro-flow/AstroFlowHeader";
import WorkflowOverview from "@/components/astro-flow/WorkflowOverview";
import { useUserRole } from "@/components/astro-bricks/hooks/useUserRole";
import { UserRole } from "@/components/astro-bricks/types";
import { FlowUserRole } from "@/components/astro-flow/types";
import { toast } from "sonner";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

// Helper function to map UserRole to FlowUserRole
const mapUserRoleToFlowUserRole = (userRole: UserRole): FlowUserRole => {
  switch (userRole) {
    case 'ADMIN':
      return 'ADMIN';
    case 'EDITOR':
      return 'EDITOR';
    case 'VIEWER':
      return 'VIEWER';
    case 'ANALYST':
      return 'ANALYST';
    default:
      // Fallback for any unhandled roles
      return 'VIEWER';
  }
};

const AstroFlow = () => {
  const { userRole, isLoading } = useUserRole();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "workflow");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast.info(`Switched to ${value} module`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
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
    );
  }

  // Default to ANALYST if userRole is null, then map to FlowUserRole with admin permissions
  const effectiveUserRole = userRole || 'ANALYST';
  const flowUserRole = mapUserRoleToFlowUserRole(effectiveUserRole);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <AstroFlowHeader />

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-muted/50">
            <TabsTrigger 
              value="workflow" 
              className="data-[state=active]:bg-pink-500/20 transition-all duration-200 hover:bg-pink-500/10"
            >
              <Workflow className="h-4 w-4 mr-2" />
              AI Workflow
            </TabsTrigger>
            <TabsTrigger 
              value="aiRoles" 
              className="data-[state=active]:bg-cyan-500/20 transition-all duration-200 hover:bg-cyan-500/10"
            >
              <Bot className="h-4 w-4 mr-2" />
              AI Roles
            </TabsTrigger>
            <TabsTrigger 
              value="rules" 
              className="data-[state=active]:bg-orange-500/20 transition-all duration-200 hover:bg-orange-500/10"
            >
              <Settings className="h-4 w-4 mr-2" />
              Rules
            </TabsTrigger>
            <TabsTrigger 
              value="monitoring" 
              className="data-[state=active]:bg-red-500/20 transition-all duration-200 hover:bg-red-500/10"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              SLA Monitor
            </TabsTrigger>
            <TabsTrigger 
              value="predictions" 
              className="data-[state=active]:bg-blue-500/20 transition-all duration-200 hover:bg-blue-500/10"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Predictions
            </TabsTrigger>
            <TabsTrigger 
              value="nlp" 
              className="data-[state=active]:bg-green-500/20 transition-all duration-200 hover:bg-green-500/10"
            >
              <Brain className="h-4 w-4 mr-2" />
              NLP
            </TabsTrigger>
            <TabsTrigger 
              value="alerts" 
              className="data-[state=active]:bg-purple-500/20 transition-all duration-200 hover:bg-purple-500/10"
            >
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="space-y-6">
            <WorkflowOverview />
          </TabsContent>

          <TabsContent value="aiRoles" className="space-y-6">
            <Card className="bg-card border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Bot className="h-5 w-5 text-cyan-400" />
                  AI Flow & Automation Roles Management
                </CardTitle>
                <CardDescription>
                  Configure and monitor AI agent roles for workflow optimization and automation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIFlowRolesSection />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-pink-400" />
                  Rule Builder
                </CardTitle>
                <CardDescription>
                  Create and manage automation rules for healthcare workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RuleBuilder userRole={flowUserRole} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-pink-400" />
                  SLA Breach Radar
                </CardTitle>
                <CardDescription>
                  Real-time monitoring and prediction of SLA violations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SLABreachRadar userRole={flowUserRole} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-pink-400" />
                  Surge Predictor
                </CardTitle>
                <CardDescription>
                  AI-powered patient volume and surge prediction models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SurgePredictor userRole={flowUserRole} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nlp" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-pink-400" />
                  NLP Assistant
                </CardTitle>
                <CardDescription>
                  Natural language interface for healthcare operations management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NLPAssistant userRole={flowUserRole} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-pink-400" />
                  Alert Management
                </CardTitle>
                <CardDescription>
                  Configure and manage automated alerts and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertSubscriptions userRole={flowUserRole} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AstroFlow;
