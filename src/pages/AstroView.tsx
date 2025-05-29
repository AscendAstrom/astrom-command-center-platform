
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  BarChart3, 
  Layout, 
  Database,
  RefreshCw,
  Plus,
  Settings,
  Play,
  Target
} from "lucide-react";
import DashboardManager from "@/components/astro-view/DashboardManager";
import RealtimeDashboard from "@/components/astro-view/RealtimeDashboard";
import SemanticLayerBuilder from "@/components/astro-view/SemanticLayerBuilder";
import LogoIcon from "@/components/ui/LogoIcon";
import { toast } from "sonner";

const AstroView = () => {
  const [activeTab, setActiveTab] = useState("dashboards");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const tabNames: { [key: string]: string } = {
      dashboards: "Dashboard Management",
      builder: "Dashboard Builder",
      realtime: "Real-time Visualization",
      semantic: "Semantic Layer"
    };
    toast.info(`Switched to ${tabNames[value]} module`);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    toast.info("Refreshing visualizations and dashboards...");
    
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Dashboards refreshed successfully!");
    }, 2000);
  };

  const handleCreateDashboard = () => {
    toast.info("Opening dashboard creation wizard...");
    setActiveTab("builder");
  };

  const handleOptimizeViews = () => {
    toast.info("Analyzing dashboard performance for optimization...");
    setTimeout(() => {
      toast.success("Dashboard optimization recommendations generated!");
    }, 1500);
  };

  const handleExportDashboard = () => {
    toast.info("Preparing dashboard export...");
    setTimeout(() => {
      toast.success("Dashboard exported successfully!");
    }, 1000);
  };

  const handleShareDashboard = () => {
    toast.info("Generating shareable dashboard link...");
    setTimeout(() => {
      toast.success("Dashboard link copied to clipboard!");
    }, 800);
  };

  return (
    <div className="h-full bg-background">
      <div className="h-full max-w-7xl mx-auto p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <LogoIcon size="sm" animate={true} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">ASTRO-VIEW</h1>
                <p className="text-purple-400 font-medium">Data Visualization & Dashboard Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="hover:bg-purple-500/10 border-purple-500/20"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? "Refreshing..." : "Refresh Views"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCreateDashboard}
                className="hover:bg-blue-500/10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Dashboard
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleOptimizeViews}
                className="hover:bg-green-500/10"
              >
                <Target className="h-4 w-4 mr-2" />
                Optimize
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportDashboard}
                className="hover:bg-orange-500/10"
              >
                <Database className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShareDashboard}
                className="hover:bg-pink-500/10"
              >
                <Eye className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground max-w-3xl mt-2">
            Advanced visualization platform for creating interactive dashboards, real-time analytics, 
            and comprehensive data storytelling with semantic layer integration.
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Dashboards</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <Layout className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Visualizations</p>
                <p className="text-2xl font-bold text-foreground">187</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-foreground">342</p>
              </div>
              <Eye className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data Sources</p>
                <p className="text-2xl font-bold text-foreground">56</p>
              </div>
              <Database className="h-8 w-8 text-orange-400" />
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
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
      </div>
    </div>
  );
};

export default AstroView;
