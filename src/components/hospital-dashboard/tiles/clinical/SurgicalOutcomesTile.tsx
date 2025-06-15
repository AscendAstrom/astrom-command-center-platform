
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scissors, TrendingUp, CheckCircle, Percent } from "lucide-react";
import { useSurgicalOutcomesData } from "@/hooks/useSurgicalOutcomesData";
import { Skeleton } from "@/components/ui/skeleton";

export const SurgicalOutcomesTile = () => {
  const { data: metrics, isLoading } = useSurgicalOutcomesData();

  if (isLoading || !metrics) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4"><Skeleton className="h-12" /><Skeleton className="h-12" /></div>
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </CardContent>
      </Card>
    );
  }

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
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <CheckCircle className="h-3 w-3 mr-1" />
            {metrics.successRate}% Success
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-600">{metrics.totalSurgeries}</div>
            <div className="text-xs text-muted-foreground">Surgeries MTD</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.avgDuration}m</div>
            <div className="text-xs text-muted-foreground">Avg Duration</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
           <div className="bg-blue-50 p-2 rounded text-center">
            <div className="font-bold text-blue-600">{metrics.onTimeStartRate}%</div>
            <div className="text-xs text-muted-foreground">On-Time Starts</div>
          </div>
           <div className="bg-green-50 p-2 rounded text-center">
            <div className="font-bold text-green-600">{metrics.successRate}%</div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Top Procedures (MTD)</div>
          {metrics.surgeryTypes.length > 0 ? (
            metrics.surgeryTypes.map(type => (
              <div key={type.name} className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">{type.name}</span>
                <span className="font-semibold">{type.count}</span>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No surgical data for this month.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
