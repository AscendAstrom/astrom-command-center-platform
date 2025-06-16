
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Monitor, BarChart3, Activity, Settings, Layout } from 'lucide-react';
import DashboardManager from '@/components/astro-view/DashboardManager';
import RealtimeDashboard from '@/components/astro-view/RealtimeDashboard';
import { ViewUserRole } from '@/components/astro-view/types';

const AstroView = () => {
  const [activeTab, setActiveTab] = useState("overview");
  // For now, we'll default to ADMIN role - this could be integrated with actual auth later
  const userRole: ViewUserRole = 'ADMIN';

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AstroView Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive hospital visualization and monitoring
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Dashboard Overview
          </TabsTrigger>
          <TabsTrigger value="builder" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            Dashboard Builder
          </TabsTrigger>
          <TabsTrigger value="realtime" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Real-time Dashboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-500" />
                  Real-time Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Live Dashboards</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Data Visualization</span>
                    <Badge variant="secondary">Ready</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-green-500" />
                  System Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Performance Metrics</span>
                    <Badge variant="secondary">Tracking</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Alert Systems</span>
                    <Badge variant="secondary">Operational</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-500" />
                  Analytics View
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Data Analytics</span>
                    <Badge variant="secondary">Available</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Reporting Tools</span>
                    <Badge variant="secondary">Ready</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          <DashboardManager userRole={userRole} />
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <RealtimeDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AstroView;
