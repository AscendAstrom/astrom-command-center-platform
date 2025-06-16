
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Calendar, Clock } from "lucide-react";

const AdmissionDischargeTile = () => {
  // Mock data since we no longer have patient tables
  const mockData = {
    admissionsToday: 24,
    dischargesToday: 18,
    scheduledDischarges: 12,
    avgLengthOfStay: 4.2,
    occupancyRate: 87,
    trend: "+8%"
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          Admission & Discharge
        </CardTitle>
        <CardDescription>Patient flow management</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-600">{mockData.admissionsToday}</div>
            <div className="text-xs text-muted-foreground">Admissions Today</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-blue-600">{mockData.dischargesToday}</div>
            <div className="text-xs text-muted-foreground">Discharges Today</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Scheduled Discharges</span>
            </div>
            <Badge variant="secondary">{mockData.scheduledDischarges}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-500" />
              <span className="text-sm">Avg Length of Stay</span>
            </div>
            <span className="text-sm font-medium">{mockData.avgLengthOfStay} days</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm">Occupancy Rate</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{mockData.occupancyRate}%</span>
              <Badge variant="outline" className="text-xs">{mockData.trend}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdmissionDischargeTile;
