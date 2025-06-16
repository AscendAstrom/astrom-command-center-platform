
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Bed, TrendingUp, Activity } from "lucide-react";
import { AnalyticsData } from "@/services/analytics/types";

interface OverviewTabProps {
  loading: boolean;
  analyticsData: AnalyticsData | null;
  lastUpdate: Date;
  getSystemHealth: () => string;
}

export const OverviewTab = ({ loading, analyticsData, lastUpdate, getSystemHealth }: OverviewTabProps) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};
