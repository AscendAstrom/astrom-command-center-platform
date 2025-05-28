
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

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Astro-View: Data Visualization Suite
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Visualize, analyze, and present your data with ease.
          </CardDescription>
        </CardHeader>
        <Button variant="secondary" size="sm">
          <Plus className="h-4 w-4 mr-2" /> Create New
        </Button>
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-secondary p-2 rounded-t-md">
              <TabsTrigger value="dashboards">
                <Monitor className="h-4 w-4 mr-2" />
                Dashboards
              </TabsTrigger>
              <TabsTrigger value="realtime">
                <BarChart3 className="h-4 w-4 mr-2" />
                Realtime Data
              </TabsTrigger>
              <TabsTrigger value="semantic">
                <Layers className="h-4 w-4 mr-2" />
                Semantic Layer
              </TabsTrigger>
              <TabsTrigger value="reports">
                <PieChart className="h-4 w-4 mr-2" />
                Reports
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dashboards" className="pt-4">
              <DashboardManager userRole="ADMIN" />
            </TabsContent>
            <TabsContent value="realtime" className="pt-4">
              <RealtimeDashboard userRole="ADMIN" />
            </TabsContent>
            <TabsContent value="semantic" className="pt-4">
              <SemanticLayerBuilder userRole="ADMIN" />
            </TabsContent>
            <TabsContent value="reports" className="pt-4">
              <DashboardBuilder userRole="ADMIN" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AstroView;
