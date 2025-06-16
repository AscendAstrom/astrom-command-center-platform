
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsData } from "@/services/analytics/types";

interface BedsTabProps {
  analyticsData: AnalyticsData | null;
}

export const BedsTab = ({ analyticsData }: BedsTabProps) => {
  return (
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
  );
};
