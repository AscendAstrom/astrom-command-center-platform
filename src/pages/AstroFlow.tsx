import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Workflow, 
  Bot, 
  Bell,
  Zap
} from "lucide-react";
import AlertSubscriptions from "@/components/astro-flow/AlertSubscriptions";
import AIFlowRolesSection from "@/components/astro-flow/sections/AIFlowRolesSection";
import AstroFlowHeader from "@/components/astro-flow/AstroFlowHeader";
import { useUserRole } from "@/components/astro-bricks/hooks/useUserRole";
import { UserRole } from "@/components/astro-bricks/types";
import { FlowUserRole } from "@/components/astro-flow/types";
import { toast } from "sonner";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import EnhancedRuleBuilder from "@/components/astro-flow/EnhancedRuleBuilder";
import AdvancedWorkflowAutomation from "@/components/ai-ecosystem/AdvancedWorkflowAutomation";

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
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "ai-automation");

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
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger 
              value="ai-automation" 
              className="data-[state=active]:bg-purple-500/20 transition-all duration-200 hover:bg-purple-500/10"
            >
              <Zap className="h-4 w-4 mr-2" />
              AI Automation
            </TabsTrigger>
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
              value="alerts" 
              className="data-[state=active]:bg-purple-500/20 transition-all duration-200 hover:bg-purple-500/10"
            >
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-automation">
             <EnhancedRuleBuilder userRole={flowUserRole} />
          </TabsContent>

          <TabsContent value="workflow" className="space-y-6">
            <AdvancedWorkflowAutomation />
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
