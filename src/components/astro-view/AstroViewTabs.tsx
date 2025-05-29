
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout, Settings, Play, Database } from "lucide-react";
import DashboardManager from "./DashboardManager";
import RealtimeDashboard from "./RealtimeDashboard";
import SemanticLayerBuilder from "./SemanticLayerBuilder";

interface AstroViewTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const AstroViewTabs = ({ activeTab, onTabChange }: AstroViewTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 bg-muted/50">
        <TabsTrigger value="dashboards" className="data-[state=active]:bg-purple-500/20">
          <Layout className="h-4 w-4 mr-2" />
          Dashboards
        </TabsTrigger>
        <TabsTrigger value="builder" className="data-[state=active]:bg-blue-500/20">
          <Settings className="h-4 w-4 mr-2" />
          Builder
        </TabsTrigger>
        <TabsTrigger value="realtime" className="data-[state=active]:bg-green-500/20">
          <Play className="h-4 w-4 mr-2" />
          Real-time
        </TabsTrigger>
        <TabsTrigger value="semantic" className="data-[state=active]:bg-orange-500/20">
          <Database className="h-4 w-4 mr-2" />
          Semantic Layer
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboards" className="space-y-6">
        <DashboardManager userRole="ADMIN" />
      </TabsContent>

      <TabsContent value="builder" className="space-y-6">
        <DashboardManager userRole="ADMIN" />
      </TabsContent>

      <TabsContent value="realtime" className="space-y-6">
        <RealtimeDashboard userRole="ADMIN" />
      </TabsContent>

      <TabsContent value="semantic" className="space-y-6">
        <SemanticLayerBuilder userRole="ADMIN" />
      </TabsContent>
    </Tabs>
  );
};

export default AstroViewTabs;
