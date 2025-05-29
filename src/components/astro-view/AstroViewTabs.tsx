
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Crown, Layout, Database, Brain } from "lucide-react";
import DashboardManager from "./DashboardManager";
import DashboardBuilder from "./DashboardBuilder";
import RealtimeDashboard from "./RealtimeDashboard";
import SemanticLayerBuilder from "./SemanticLayerBuilder";
import ExecutiveDashboard from "./ExecutiveDashboard";
import { ViewUserRole } from "./types";

interface AstroViewTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const AstroViewTabs = ({ activeTab, onTabChange }: AstroViewTabsProps) => {
  // Mock user role - in real app this would come from auth
  const userRole: ViewUserRole = 'ADMIN';

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
      <TabsList className="grid w-full grid-cols-5 bg-muted/50">
        <TabsTrigger 
          value="executive" 
          className="data-[state=active]:bg-purple-500/20 transition-all duration-200 hover:bg-purple-500/10"
        >
          <Crown className="h-4 w-4 mr-2" />
          Executive
        </TabsTrigger>
        <TabsTrigger 
          value="realtime" 
          className="data-[state=active]:bg-cyan-500/20 transition-all duration-200 hover:bg-cyan-500/10"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Real-time
        </TabsTrigger>
        <TabsTrigger 
          value="dashboards" 
          className="data-[state=active]:bg-blue-500/20 transition-all duration-200 hover:bg-blue-500/10"
        >
          <Layout className="h-4 w-4 mr-2" />
          Dashboards
        </TabsTrigger>
        <TabsTrigger 
          value="builder" 
          className="data-[state=active]:bg-green-500/20 transition-all duration-200 hover:bg-green-500/10"
        >
          <Layout className="h-4 w-4 mr-2" />
          Builder
        </TabsTrigger>
        <TabsTrigger 
          value="semantic" 
          className="data-[state=active]:bg-orange-500/20 transition-all duration-200 hover:bg-orange-500/10"
        >
          <Brain className="h-4 w-4 mr-2" />
          Semantic Layer
        </TabsTrigger>
      </TabsList>

      <TabsContent value="executive" className="space-y-6">
        <ExecutiveDashboard userRole={userRole} />
      </TabsContent>

      <TabsContent value="realtime" className="space-y-6">
        <RealtimeDashboard userRole={userRole} />
      </TabsContent>

      <TabsContent value="dashboards" className="space-y-6">
        <DashboardManager userRole={userRole} />
      </TabsContent>

      <TabsContent value="builder" className="space-y-6">
        {/* DashboardBuilder would be rendered when editing a dashboard */}
        <div className="text-center py-12">
          <Layout className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Dashboard Builder</h3>
          <p className="text-muted-foreground">Select a dashboard to edit or create a new one</p>
        </div>
      </TabsContent>

      <TabsContent value="semantic" className="space-y-6">
        <SemanticLayerBuilder userRole={userRole} />
      </TabsContent>
    </Tabs>
  );
};

export default AstroViewTabs;
