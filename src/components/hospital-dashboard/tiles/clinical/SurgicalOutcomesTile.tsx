
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scissors, TrendingUp, Clock, Users } from "lucide-react";

export const SurgicalOutcomesTile = () => {
  const emptyMetrics = {
    totalSurgeries: 0,
    successRate: 0,
    avgDuration: 0,
    complications: 0,
    avgLOS: 0,
    onTimeStart: 0
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Scissors className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Surgical Outcomes</CardTitle>
              <CardDescription>OR performance metrics</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            No Data
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-600">{emptyMetrics.totalSurgeries}</div>
            <div className="text-xs text-muted-foreground">Surgeries MTD</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{emptyMetrics.avgDuration}m</div>
            <div className="text-xs text-muted-foreground">Avg Duration</div>
          </div>
        </div>

        <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
          <p className="text-muted-foreground text-sm">No surgical data available</p>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Surgery Types</div>
          <div className="text-center py-4 text-muted-foreground text-sm">
            Connect your OR systems to see surgical data
          </div>
        </div>

        <div className="bg-blue-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <Clock className="h-3 w-3 text-blue-500" />
            <span className="font-semibold text-blue-600">System Status</span>
          </div>
          <div className="text-muted-foreground">
            Waiting for surgical system connections
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
