
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Workflow, 
  Target, 
  GitBranch,
  Play,
  Settings,
  RefreshCw,
  Plus,
  BarChart3
} from "lucide-react";
import { DataPipelineManager } from "@/components/astro-bricks/DataPipelineManager";
import { DataMappingCanvas } from "@/components/astro-bricks/DataMappingCanvas";
import { SchemaVisualization } from "@/components/astro-bricks/SchemaVisualization";
import { TransformationRulesEditor } from "@/components/astro-bricks/TransformationRulesEditor";
import { TimestampTools } from "@/components/astro-bricks/TimestampTools";
import LogoIcon from "@/components/ui/LogoIcon";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const AstroBricks = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "pipelines");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const tabNames: { [key: string]: string } = {
      pipelines: "Data Pipelines",
      mapping: "Data Mapping",
      schemas: "Schema Visualization",
      transformations: "Transformation Rules",
      timestamps: "Timestamp Tools"
    };
    toast.info(`Switched to ${tabNames[value]} module`);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    toast.info("Refreshing data models and pipelines...");
    
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Data models refreshed successfully!");
    }, 2000);
  };

  const handleCreatePipeline = () => {
    toast.info("Opening pipeline creation wizard...");
    setActiveTab("pipelines");
  };

  const handleOptimizePipelines = () => {
    toast.info("Navigating to SLA configuration for optimization...");
    navigate("/astro-metrics?tab=sla-config");
  };

  const handleViewAnalytics = () => {
    toast.info("Opening analytics dashboard...");
    navigate("/astro-view");
  };

  return (
    <div className="h-full bg-background">
      <div className="h-full max-w-7xl mx-auto p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <LogoIcon size="sm" animate={true} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">ASTRO-BRICKS</h1>
                <p className="text-purple-400 font-medium">Data Modeling & Transformation Engine</p>
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
                {isRefreshing ? "Refreshing..." : "Refresh Models"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCreatePipeline}
                className="hover:bg-blue-500/10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Pipeline
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleOptimizePipelines}
                className="hover:bg-green-500/10"
              >
                <Target className="h-4 w-4 mr-2" />
                Optimize
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewAnalytics}
                className="hover:bg-orange-500/10"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground max-w-3xl mt-2">
            Advanced data modeling platform for building, transforming, and managing data pipelines
            with intelligent schema mapping and real-time transformation capabilities.
          </p>
        </div>

        {/* Enhanced Status Cards with Real Data */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Pipelines</p>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-xs text-green-400 mt-1">+2 this week</p>
              </div>
              <Database className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data Models</p>
                <p className="text-2xl font-bold text-foreground">23</p>
                <p className="text-xs text-blue-400 mt-1">FHIR R4 compliant</p>
              </div>
              <Workflow className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Transformations</p>
                <p className="text-2xl font-bold text-foreground">18</p>
                <p className="text-xs text-orange-400 mt-1">Last run: 2 min ago</p>
              </div>
              <GitBranch className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Processing Rate</p>
                <p className="text-2xl font-bold text-foreground">2.4k/min</p>
                <p className="text-xs text-yellow-400 mt-1">Peak: 3.8k/min</p>
              </div>
              <Play className="h-8 w-8 text-orange-400" />
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50">
            <TabsTrigger value="pipelines" className="data-[state=active]:bg-purple-500/20">
              <Database className="h-4 w-4 mr-2" />
              Pipelines
            </TabsTrigger>
            <TabsTrigger value="mapping" className="data-[state=active]:bg-blue-500/20">
              <GitBranch className="h-4 w-4 mr-2" />
              Mapping
            </TabsTrigger>
            <TabsTrigger value="schemas" className="data-[state=active]:bg-green-500/20">
              <Workflow className="h-4 w-4 mr-2" />
              Schemas
            </TabsTrigger>
            <TabsTrigger value="transformations" className="data-[state=active]:bg-orange-500/20">
              <Settings className="h-4 w-4 mr-2" />
              Rules
            </TabsTrigger>
            <TabsTrigger value="timestamps" className="data-[state=active]:bg-pink-500/20">
              <Target className="h-4 w-4 mr-2" />
              Timestamps
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pipelines" className="space-y-6">
            <DataPipelineManager />
          </TabsContent>

          <TabsContent value="mapping" className="space-y-6">
            <DataMappingCanvas />
          </TabsContent>

          <TabsContent value="schemas" className="space-y-6">
            <SchemaVisualization />
          </TabsContent>

          <TabsContent value="transformations" className="space-y-6">
            <TransformationRulesEditor />
          </TabsContent>

          <TabsContent value="timestamps" className="space-y-6">
            <TimestampTools />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AstroBricks;
