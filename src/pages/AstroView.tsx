
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViewUserRole } from '@/components/astro-view/types';
import SemanticLayerBuilder from '@/components/astro-view/SemanticLayerBuilder';
import DashboardManager from '@/components/astro-view/DashboardManager';
import RealtimeDashboard from '@/components/astro-view/RealtimeDashboard';
import { BarChart3, Eye, Settings } from 'lucide-react';

const AstroView = () => {
  // Simulate user role - in real app this would come from auth context
  const [currentUserRole] = useState<ViewUserRole>('ANALYST');

  const canCreateDashboards = currentUserRole === 'ADMIN' || currentUserRole === 'ANALYST';
  const canEditSemanticLayer = currentUserRole === 'ADMIN' || currentUserRole === 'ANALYST';

  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
          <BarChart3 className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">ASTRO-VIEW</h1>
          <p className="text-slate-400">Data Visualization & Dashboard Management</p>
        </div>
      </div>

      <Tabs defaultValue="dashboards" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="dashboards" className="data-[state=active]:bg-purple-600">
            <Eye className="h-4 w-4 mr-2" />
            Dashboards
          </TabsTrigger>
          <TabsTrigger value="builder" disabled={!canCreateDashboards} className="data-[state=active]:bg-purple-600">
            <Settings className="h-4 w-4 mr-2" />
            Dashboard Builder
          </TabsTrigger>
          <TabsTrigger value="semantic" disabled={!canEditSemanticLayer} className="data-[state=active]:bg-purple-600">
            <BarChart3 className="h-4 w-4 mr-2" />
            Semantic Layer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboards" className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Live Dashboards</CardTitle>
              <CardDescription>Real-time operational dashboards with auto-refresh</CardDescription>
            </CardHeader>
            <CardContent>
              <RealtimeDashboard userRole={currentUserRole} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Dashboard Builder</CardTitle>
              <CardDescription>Create and manage custom dashboards</CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardManager userRole={currentUserRole} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="semantic" className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Semantic Layer Builder</CardTitle>
              <CardDescription>Define business terms and calculations</CardDescription>
            </CardHeader>
            <CardContent>
              <SemanticLayerBuilder userRole={currentUserRole} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AstroView;
