
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExecutiveDashboard from "./ExecutiveDashboard";
import DashboardManager from "./DashboardManager";
import RealtimeDashboard from "./RealtimeDashboard";
import SemanticLayerBuilder from "./SemanticLayerBuilder";
import AdvancedDashboardCreator from "./AdvancedDashboardCreator";
import { ViewUserRole } from "./types";

interface AstroViewTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const AstroViewTabs = ({ activeTab, onTabChange }: AstroViewTabsProps) => {
  const userRole: ViewUserRole = 'ADMIN';

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mt-6">
      <TabsList className="grid w-full grid-cols-5 bg-card border border-border">
        <TabsTrigger 
          value="executive" 
          className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
        >
          Executive
        </TabsTrigger>
        <TabsTrigger 
          value="dashboards" 
          className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
        >
          Dashboards
        </TabsTrigger>
        <TabsTrigger 
          value="builder" 
          className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
        >
          Advanced Builder
        </TabsTrigger>
        <TabsTrigger 
          value="realtime" 
          className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
        >
          Real-time
        </TabsTrigger>
        <TabsTrigger 
          value="semantic" 
          className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
        >
          Semantic
        </TabsTrigger>
      </TabsList>

      <TabsContent value="executive" className="mt-6">
        <ExecutiveDashboard userRole={userRole} />
      </TabsContent>

      <TabsContent value="dashboards" className="mt-6">
        <DashboardManager userRole={userRole} />
      </TabsContent>

      <TabsContent value="builder" className="mt-6">
        <AdvancedDashboardCreator />
      </TabsContent>

      <TabsContent value="realtime" className="mt-6">
        <RealtimeDashboard userRole={userRole} />
      </TabsContent>

      <TabsContent value="semantic" className="mt-6">
        <SemanticLayerBuilder userRole={userRole} />
      </TabsContent>
    </Tabs>
  );
};

export default AstroViewTabs;
