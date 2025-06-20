import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Target, 
  Bell, 
  Shield
} from "lucide-react";
import AIMetricsRolesSection from "@/components/astro-metrics/sections/AIMetricsRolesSection";
import AstroMetricsHeader from "@/components/astro-metrics/AstroMetricsHeader";
import KPIBuilderTab from "@/components/astro-metrics/tabs/KPIBuilderTab";
import KPIDictionaryTab from "@/components/astro-metrics/tabs/KPIDictionaryTab";
import SLAConfigurationTab from "@/components/astro-metrics/tabs/SLAConfigurationTab";
import AlertsManagerTab from "@/components/astro-metrics/tabs/AlertsManagerTab";
import AccessControlTab from "@/components/astro-metrics/tabs/AccessControlTab";
import { useUserRole } from "@/components/astro-bricks/hooks/useUserRole";
import { useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { UserRole } from "@/components/astro-bricks/types";
import { MetricsUserRole } from "@/components/astro-metrics/types";

// Helper function to map UserRole to MetricsUserRole
const mapUserRoleToMetricsUserRole = (userRole: UserRole | null): MetricsUserRole | null => {
  if (!userRole) return null;
  switch (userRole) {
    case 'ADMIN':
      return 'ADMIN';
    case 'EDITOR':
      return 'ANALYST'; // Map EDITOR to ANALYST for metrics context
    case 'VIEWER':
      return 'VIEWER';
    case 'ANALYST':
      return 'ANALYST';
    default:
      // This case should not be reached with the current UserRole type, but it's good practice
      return 'VIEWER';
  }
};

const AstroMetrics = () => {
  const { userRole, isLoading } = useUserRole();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "kpi-builder");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast.info(`Switched to ${value.replace('-', ' ')} module`);
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

  const metricsUserRole = mapUserRoleToMetricsUserRole(userRole);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <AstroMetricsHeader />

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50">
            <TabsTrigger value="kpi-builder" className="data-[state=active]:bg-orange-500/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              KPI Builder
            </TabsTrigger>
            <TabsTrigger value="dictionary" className="data-[state=active]:bg-blue-500/20">
              <Target className="h-4 w-4 mr-2" />
              KPI Dictionary
            </TabsTrigger>
            <TabsTrigger value="sla-config" className="data-[state=active]:bg-green-500/20">
              <Target className="h-4 w-4 mr-2" />
              SLA Configuration
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-red-500/20">
              <Bell className="h-4 w-4 mr-2" />
              Alerts Manager
            </TabsTrigger>
            <TabsTrigger value="access" className="data-[state=active]:bg-purple-500/20">
              <Shield className="h-4 w-4 mr-2" />
              Access Control
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kpi-builder" className="space-y-6">
            <KPIBuilderTab userRole={metricsUserRole} />
          </TabsContent>

          <TabsContent value="dictionary" className="space-y-6">
            <KPIDictionaryTab userRole={metricsUserRole} />
          </TabsContent>

          <TabsContent value="sla-config" className="space-y-6">
            <SLAConfigurationTab userRole={metricsUserRole} />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <AlertsManagerTab userRole={metricsUserRole} />
          </TabsContent>

          <TabsContent value="access" className="space-y-6">
            <AccessControlTab userRole={metricsUserRole} />
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <AIMetricsRolesSection />
        </div>
      </div>
    </div>
  );
};

export default AstroMetrics;
