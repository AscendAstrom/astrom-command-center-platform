
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import DashboardManager from "./DashboardManager";
import ExecutiveDashboard from "./ExecutiveDashboard";
import RealtimeDashboard from "./RealtimeDashboard";
import SemanticLayerBuilder from "./SemanticLayerBuilder";
import AdvancedDashboardCreator from "./AdvancedDashboardCreator";
import AIConfigurationManager from "./ai-configuration/AIConfigurationManager";

interface AstroViewTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const AstroViewTabs = ({ activeTab, onTabChange }: AstroViewTabsProps) => {
  return (
    <div className="mt-6">
      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-muted/50">
          <TabsTrigger value="executive" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Executive
          </TabsTrigger>
          <TabsTrigger value="dashboards" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Dashboards
          </TabsTrigger>
          <TabsTrigger value="realtime" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Real-time
          </TabsTrigger>
          <TabsTrigger value="semantic" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Semantic Layer
          </TabsTrigger>
          <TabsTrigger value="creator" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <div className="flex items-center gap-1">
              Creator
              <Badge variant="secondary" className="text-xs bg-orange-500 text-white border-orange-600">
                NEW
              </Badge>
            </div>
          </TabsTrigger>
          <TabsTrigger value="ai-config" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <div className="flex items-center gap-1">
              AI Config
              <Badge variant="secondary" className="text-xs bg-green-500 text-white border-green-600">
                AI
              </Badge>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="executive" className="space-y-4">
          <ExecutiveDashboard />
        </TabsContent>

        <TabsContent value="dashboards" className="space-y-4">
          <DashboardManager />
        </TabsContent>

        <TabsContent value="realtime" className="space-y-4">
          <RealtimeDashboard />
        </TabsContent>

        <TabsContent value="semantic" className="space-y-4">
          <SemanticLayerBuilder />
        </TabsContent>

        <TabsContent value="creator" className="space-y-4">
          <AdvancedDashboardCreator />
        </TabsContent>

        <TabsContent value="ai-config" className="space-y-4">
          <AIConfigurationManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AstroViewTabs;
