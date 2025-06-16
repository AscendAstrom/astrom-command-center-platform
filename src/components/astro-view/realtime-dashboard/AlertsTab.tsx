
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { AnalyticsData } from "@/services/analytics/types";

interface AlertsTabProps {
  analyticsData: AnalyticsData | null;
}

export const AlertsTab = ({ analyticsData }: AlertsTabProps) => {
  return (
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
  );
};
