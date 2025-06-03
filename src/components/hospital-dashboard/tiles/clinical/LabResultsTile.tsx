
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const LabResultsTile = () => {
  const emptyData = [];
  const emptyMetrics = {
    totalTests: 0,
    avgTurnaround: 0,
    criticalAlerts: 0,
    accuracyRate: 0,
    onTimeDelivery: 0
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FlaskConical className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Lab Results</CardTitle>
              <CardDescription>Diagnostic analytics</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            <Clock className="h-3 w-3 mr-1" />
            No Data
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{emptyMetrics.totalTests}</div>
            <div className="text-xs text-muted-foreground">Tests Today</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{emptyMetrics.avgTurnaround}m</div>
            <div className="text-xs text-muted-foreground">Avg TAT</div>
          </div>
        </div>

        <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
          <p className="text-muted-foreground text-sm">No lab data available</p>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Top Tests by Volume</div>
          <div className="text-center py-4 text-muted-foreground text-sm">
            Connect your lab systems to see test data
          </div>
        </div>

        <div className="bg-blue-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <AlertTriangle className="h-3 w-3 text-blue-500" />
            <span className="font-semibold text-blue-600">System Status</span>
          </div>
          <div className="text-muted-foreground">
            Waiting for data source connections
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
