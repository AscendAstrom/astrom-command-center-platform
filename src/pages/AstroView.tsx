
import { useState } from "react";
import { Plus, Eye, BarChart3, Monitor, Layers, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardBuilder from "@/components/astro-view/DashboardBuilder";
import DashboardManager from "@/components/astro-view/DashboardManager";
import RealtimeDashboard from "@/components/astro-view/RealtimeDashboard";
import SemanticLayerBuilder from "@/components/astro-view/SemanticLayerBuilder";

const AstroView = () => {
  const [activeTab, setActiveTab] = useState("dashboards");

  const mockDashboard = {
    id: "mock",
    name: "New Dashboard",
    description: "",
    targetAudience: "ed_managers" as const,
    widgets: [],
    autoRefresh: 30 as const,
    isPublic: false,
    createdBy: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const handleSaveDashboard = (dashboard: any) => {
    console.log('Saving dashboard:', dashboard);
  };

  const handleCancelDashboard = () => {
    console.log('Cancelling dashboard creation');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">ASTRO-VIEW</h1>
            <span className="text-sm text-purple-500 font-medium">Data Visualization & Analytics</span>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Create interactive dashboards and visualizations with real-time data connections and advanced analytics capabilities.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="dashboards" className="data-[state=active]:bg-purple-500/20">
              Dashboard Manager
            </TabsTrigger>
            <TabsTrigger value="realtime" className="data-[state=active]:bg-purple-500/20">
              Real-time Analytics
            </TabsTrigger>
            <TabsTrigger value="semantic" className="data-[state=active]:bg-purple-500/20">
              Semantic Layer
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-purple-500/20">
              Report Builder
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboards" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-purple-500" />
                  Dashboard Manager
                </CardTitle>
                <CardDescription>
                  Create and manage interactive dashboards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardManager userRole="ADMIN" />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="realtime" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  Real-time Dashboard
                </CardTitle>
                <CardDescription>
                  Monitor live data streams and metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RealtimeDashboard userRole="ADMIN" />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="semantic" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Layers className="h-5 w-5 text-blue-500" />
                  Semantic Layer Builder
                </CardTitle>
                <CardDescription>
                  Define data relationships and business logic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SemanticLayerBuilder userRole="ADMIN" />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-orange-500" />
                  Report Builder
                </CardTitle>
                <CardDescription>
                  Create custom reports and visualizations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardBuilder 
                  dashboard={mockDashboard}
                  onSave={handleSaveDashboard}
                  onCancel={handleCancelDashboard}
                  userRole="ADMIN"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AstroView;
