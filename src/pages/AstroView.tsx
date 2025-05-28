
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
    <div className="p-6 space-y-6 bg-background min-h-full animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-display">
                ASTRO-VIEW
              </h1>
              <p className="text-muted-foreground text-xl font-medium mt-1">
                Data Visualization & Analytics Platform
              </p>
            </div>
          </div>
        </div>
        
        <Button 
          variant="secondary" 
          size="sm"
          className="gradient-bg-blue hover:shadow-xl hover-lift transition-all duration-300 px-8 py-4 text-base font-semibold"
        >
          <Plus className="h-5 w-5 mr-2" /> 
          Create New
        </Button>
      </div>

      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-slate-800/50 p-2 rounded-t-md grid w-full grid-cols-4">
              <TabsTrigger value="dashboards" className="data-[state=active]:bg-blue-500/20">
                <Monitor className="h-4 w-4 mr-2" />
                Dashboards
              </TabsTrigger>
              <TabsTrigger value="realtime" className="data-[state=active]:bg-blue-500/20">
                <BarChart3 className="h-4 w-4 mr-2" />
                Realtime Data
              </TabsTrigger>
              <TabsTrigger value="semantic" className="data-[state=active]:bg-blue-500/20">
                <Layers className="h-4 w-4 mr-2" />
                Semantic Layer
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-blue-500/20">
                <PieChart className="h-4 w-4 mr-2" />
                Reports
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboards" className="pt-4">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-blue-400" />
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
            
            <TabsContent value="realtime" className="pt-4">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-400" />
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
            
            <TabsContent value="semantic" className="pt-4">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Layers className="h-5 w-5 text-purple-400" />
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
            
            <TabsContent value="reports" className="pt-4">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-orange-400" />
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AstroView;
