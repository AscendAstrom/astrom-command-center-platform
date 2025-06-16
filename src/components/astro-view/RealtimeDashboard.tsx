
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Users, Bed, TrendingUp, AlertTriangle, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const RealtimeDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [metrics, setMetrics] = useState({
    totalBeds: 0,
    occupiedBeds: 0,
    availableBeds: 0,
    occupancyRate: 0,
    activeSources: 0,
    systemHealth: "Optimal"
  });

  useEffect(() => {
    fetchDashboardData();
    
    // Set up real-time subscription for beds
    const channel = supabase
      .channel('dashboard-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'beds' }, () => {
        fetchDashboardData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'data_sources' }, () => {
        fetchDashboardData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const [
        { data: beds },
        { data: dataSources }
      ] = await Promise.all([
        supabase.from('beds').select('*').is('deleted_at', null),
        supabase.from('data_sources').select('*').eq('status', 'CONNECTED')
      ]);

      const totalBeds = beds?.length || 0;
      const occupiedBeds = beds?.filter(bed => bed.status === 'OCCUPIED').length || 0;
      const availableBeds = beds?.filter(bed => bed.status === 'AVAILABLE').length || 0;
      const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;
      const activeSources = dataSources?.length || 0;

      setMetrics({
        totalBeds,
        occupiedBeds,
        availableBeds,
        occupancyRate,
        activeSources,
        systemHealth: occupancyRate > 90 ? "High Load" : occupancyRate > 75 ? "Normal" : "Optimal"
      });

      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchDashboardData();
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-blue-400" />
                Real-Time Hospital Dashboard
              </CardTitle>
              <CardDescription>
                Live operational metrics and system status
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                Live
              </Badge>
              <Button onClick={refreshData} size="sm" variant="outline">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="beds">Bed Management</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Bed className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Total Beds</span>
                </div>
                <div className="text-2xl font-bold">{loading ? '-' : metrics.totalBeds}</div>
                <div className="text-xs text-muted-foreground">System capacity</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Occupied</span>
                </div>
                <div className="text-2xl font-bold">{loading ? '-' : metrics.occupiedBeds}</div>
                <div className="text-xs text-muted-foreground">Current patients</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Available</span>
                </div>
                <div className="text-2xl font-bold">{loading ? '-' : metrics.availableBeds}</div>
                <div className="text-xs text-muted-foreground">Ready for admission</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Occupancy</span>
                </div>
                <div className="text-2xl font-bold">{loading ? '-' : `${metrics.occupancyRate}%`}</div>
                <div className="text-xs text-muted-foreground">Current utilization</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
                <CardDescription>Real-time system health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Sources</span>
                    <Badge variant="secondary">{metrics.activeSources} Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Health</span>
                    <Badge variant={metrics.systemHealth === 'Optimal' ? 'default' : 'secondary'}>
                      {metrics.systemHealth}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Update</span>
                    <span className="text-xs text-muted-foreground">
                      {lastUpdate.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Common operational tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Bed className="h-4 w-4 mr-2" />
                    Manage Bed Assignments
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Review Alerts
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Activity className="h-4 w-4 mr-2" />
                    System Diagnostics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="beds" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Bed Management Overview</CardTitle>
              <CardDescription>Real-time bed status and allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Bed className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Bed management data will be populated from real hospital systems
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Operational Metrics</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Operational metrics will be displayed once data sources are connected
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Active alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No active alerts at this time
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealtimeDashboard;
