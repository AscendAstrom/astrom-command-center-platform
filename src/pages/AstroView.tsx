
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Layout, 
  Palette, 
  Settings,
  Workflow,
  Monitor,
  Layers
} from "lucide-react";
import DashboardBuilder from "@/components/astro-view/DashboardBuilder";
import DashboardManager from "@/components/astro-view/DashboardManager";
import RealtimeDashboard from "@/components/astro-view/RealtimeDashboard";
import SemanticLayerBuilder from "@/components/astro-view/SemanticLayerBuilder";
import { useUserRole } from "@/components/astro-bricks/hooks/useUserRole";

const AstroView = () => {
  const { userRole, isLoading } = useUserRole();

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

  // Default to ANALYST if userRole is null
  const effectiveUserRole = userRole || 'ANALYST';

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Eye className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">ASTRO-VIEW</h1>
            <span className="text-sm text-purple-400 font-medium">Data Visualization & Dashboards</span>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Create interactive dashboards, semantic layers, and real-time visualizations for healthcare analytics and operations.
          </p>
        </div>

        <Tabs defaultValue="workflow" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50">
            <TabsTrigger value="workflow" className="data-[state=active]:bg-purple-500/20">
              <Workflow className="h-4 w-4 mr-2" />
              Dashboard Workflow
            </TabsTrigger>
            <TabsTrigger value="builder">Dashboard Builder</TabsTrigger>
            <TabsTrigger value="manager">Dashboard Manager</TabsTrigger>
            <TabsTrigger value="realtime">Real-time Views</TabsTrigger>
            <TabsTrigger value="semantic">Semantic Layer</TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-purple-400" />
                  Semantic Layer & Dashboard View Workflow
                </CardTitle>
                <CardDescription>
                  End-to-end workflow for building interactive dashboards with real-time insights and advanced visualizations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Interactive Dashboard Components</h3>
                    <p className="text-muted-foreground">
                      Build dashboards with zone census displays, patient-level timers, and trend charts. 
                      Includes hover actions, drilldowns, and custom widget configurations for comprehensive healthcare monitoring.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Layout className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">Zone Census Display</p>
                          <p className="text-muted-foreground text-sm">Real-time patient count by zone</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">Patient-Level Timers</p>
                          <p className="text-muted-foreground text-sm">Individual patient wait times</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                          <BarChart3 className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">Trend Charts</p>
                          <p className="text-muted-foreground text-sm">Historical performance trends</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                          <PieChart className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">Interactive Widgets</p>
                          <p className="text-muted-foreground text-sm">Custom visualization components</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Advanced Dashboard Features</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted/50 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Eye className="h-5 w-5 text-purple-400" />
                          <span className="text-foreground font-medium">Hover Actions</span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Interactive tooltips and contextual information on hover for enhanced user experience
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Layers className="h-5 w-5 text-blue-400" />
                          <span className="text-foreground font-medium">Drilldown Navigation</span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Multi-level data exploration with seamless navigation between summary and detail views
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Palette className="h-5 w-5 text-green-400" />
                          <span className="text-foreground font-medium">Custom Widgets</span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Configurable dashboard widgets tailored to specific healthcare workflows and metrics
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        <Eye className="h-4 w-4 mr-2" />
                        Launch Dashboard Builder
                      </Button>
                      <Button variant="outline" className="w-full">
                        View Live Dashboards
                      </Button>
                      <Button variant="outline" className="w-full">
                        Configure Widgets
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="builder" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="h-5 w-5 text-purple-400" />
                  Dashboard Builder
                </CardTitle>
                <CardDescription>
                  Drag-and-drop dashboard creation with healthcare-specific widgets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardBuilder 
                  dashboard={null} 
                  onSave={() => {}} 
                  onCancel={() => {}} 
                  userRole={effectiveUserRole} 
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manager" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-400" />
                  Dashboard Manager
                </CardTitle>
                <CardDescription>
                  Manage existing dashboards, permissions, and sharing settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardManager userRole={effectiveUserRole} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="realtime" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                  Real-time Dashboard
                </CardTitle>
                <CardDescription>
                  Live healthcare operations dashboard with real-time data updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RealtimeDashboard userRole={effectiveUserRole} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="semantic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                  Semantic Layer Builder
                </CardTitle>
                <CardDescription>
                  Define business logic and data relationships for consistent reporting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SemanticLayerBuilder userRole={effectiveUserRole} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AstroView;
