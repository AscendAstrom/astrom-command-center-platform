
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Users, Bed, TrendingUp, AlertTriangle, RefreshCw, DollarSign } from "lucide-react";
import { analyticsService } from "@/services/analytics/mainAnalyticsService";
import { AnalyticsData } from "@/services/analytics/types";

const RealtimeDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const unsubscribe = analyticsService.subscribe((data) => {
      console.log('Received analytics data:', data);
      setAnalyticsData(data);
      setLastUpdate(new Date());
      setLoading(false);
    });

    // Start real-time updates
    const stopUpdates = analyticsService.startRealTimeUpdates();

    return () => {
      unsubscribe();
      stopUpdates();
    };
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      await analyticsService.refreshData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSystemHealth = () => {
    if (!analyticsData) return "Unknown";
    const occupancyRate = analyticsData.beds?.utilization || 0;
    if (occupancyRate > 90) return "High Load";
    if (occupancyRate > 75) return "Normal";
    return "Optimal";
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
                Live operational metrics and system status with real database integration
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                Live Data
              </Badge>
              <Button onClick={refreshData} size="sm" variant="outline" disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="beds">Bed Management</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
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
                <div className="text-2xl font-bold">
                  {loading ? '-' : analyticsData?.beds?.total || 0}
                </div>
                <div className="text-xs text-muted-foreground">System capacity</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Occupied</span>
                </div>
                <div className="text-2xl font-bold">
                  {loading ? '-' : analyticsData?.beds?.occupied || 0}
                </div>
                <div className="text-xs text-muted-foreground">Current patients</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Available</span>
                </div>
                <div className="text-2xl font-bold">
                  {loading ? '-' : analyticsData?.beds?.available || 0}
                </div>
                <div className="text-xs text-muted-foreground">Ready for admission</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Occupancy</span>
                </div>
                <div className="text-2xl font-bold">
                  {loading ? '-' : `${analyticsData?.beds?.utilization || 0}%`}
                </div>
                <div className="text-xs text-muted-foreground">Current utilization</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
                <CardDescription>Real-time system health from database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Emergency Department</span>
                    <Badge variant="secondary">
                      {analyticsData?.emergencyDepartment?.totalPatients || 0} Patients
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Staff On Duty</span>
                    <Badge variant="secondary">
                      {analyticsData?.staffing?.onDuty || 0} Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Health</span>
                    <Badge variant={getSystemHealth() === 'Optimal' ? 'default' : 'secondary'}>
                      {getSystemHealth()}
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
                <CardTitle className="text-lg">Performance Metrics</CardTitle>
                <CardDescription>Key operational indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Wait Time</span>
                    <span className="text-sm font-medium">
                      {analyticsData?.emergencyDepartment?.avgWaitTime || 0} min
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Equipment Available</span>
                    <span className="text-sm font-medium">
                      {analyticsData?.equipment?.available || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Critical Patients</span>
                    <span className="text-sm font-medium text-red-600">
                      {analyticsData?.emergencyDepartment?.criticalPatients || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Uptime</span>
                    <span className="text-sm font-medium">
                      {analyticsData?.systemHealth?.uptime || 0}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="beds" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Bed Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Beds</span>
                    <span className="font-medium">{analyticsData?.beds?.total || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Occupied</span>
                    <span className="font-medium">{analyticsData?.beds?.occupied || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Available</span>
                    <span className="font-medium">{analyticsData?.beds?.available || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Out of Order</span>
                    <span className="font-medium">{analyticsData?.beds?.outOfOrder || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Staffing Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">On Duty</span>
                    <span className="font-medium">{analyticsData?.staffing?.onDuty || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">On Call</span>
                    <span className="font-medium">{analyticsData?.staffing?.onCall || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Scheduled Next</span>
                    <span className="font-medium">{analyticsData?.staffing?.scheduledNext || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Equipment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Available</span>
                    <span className="font-medium">{analyticsData?.equipment?.available || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">In Use</span>
                    <span className="font-medium">{analyticsData?.equipment?.inUse || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Maintenance</span>
                    <span className="font-medium">{analyticsData?.equipment?.maintenance || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Emergency Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Current Patients</span>
                    <span className="font-medium">{analyticsData?.emergencyDepartment?.totalPatients || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Admissions</span>
                    <span className="font-medium">{analyticsData?.emergencyDepartment?.totalAdmissions || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Critical Patients</span>
                    <span className="font-medium text-red-600">{analyticsData?.emergencyDepartment?.criticalPatients || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Clinical Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Active Cases</span>
                    <span className="font-medium">{analyticsData?.clinicalOperations?.activeCases || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Lab Results</span>
                    <span className="font-medium">{analyticsData?.clinicalOperations?.labResults || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Imaging Studies</span>
                    <span className="font-medium">{analyticsData?.clinicalOperations?.imagingStudies || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Daily Revenue</span>
                </div>
                <div className="text-2xl font-bold">
                  ${(analyticsData?.financial?.dailyRevenue || 0).toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Today's earnings</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Insurance Claims</span>
                </div>
                <div className="text-2xl font-bold">
                  {analyticsData?.financial?.insuranceClaims || 0}
                </div>
                <div className="text-xs text-muted-foreground">Claims processed</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Pending Billing</span>
                </div>
                <div className="text-2xl font-bold">
                  ${(analyticsData?.financial?.pendingBilling || 0).toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Awaiting processing</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Revenue/Patient</span>
                </div>
                <div className="text-2xl font-bold">
                  ${analyticsData?.financial?.revenuePerPatient || 0}
                </div>
                <div className="text-xs text-muted-foreground">Average per visit</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                System Alerts
              </CardTitle>
              <CardDescription>Active alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData?.emergencyDepartment?.criticalAlerts ? (
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">Critical Patient Alert</span>
                    </div>
                    <Badge variant="destructive">Active</Badge>
                  </div>
                ) : null}
                
                {(analyticsData?.beds?.utilization || 0) > 90 ? (
                  <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">High Bed Occupancy</span>
                    </div>
                    <Badge variant="secondary">Warning</Badge>
                  </div>
                ) : null}

                {!analyticsData?.emergencyDepartment?.criticalAlerts && (analyticsData?.beds?.utilization || 0) <= 90 ? (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No active alerts at this time</p>
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealtimeDashboard;
