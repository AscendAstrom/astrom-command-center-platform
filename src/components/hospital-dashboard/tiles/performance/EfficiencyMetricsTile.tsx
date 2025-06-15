
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gauge, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEfficiencyMetricsData } from "@/hooks/useEfficiencyMetricsData";
import { Skeleton } from "@/components/ui/skeleton";

export const EfficiencyMetricsTile = () => {
  const { data: metrics, isLoading } = useEfficiencyMetricsData();

  if (isLoading || !metrics) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Gauge className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Efficiency Metrics</CardTitle>
                <CardDescription>Performance indicators & optimization</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-16 rounded" />
              <Skeleton className="h-16 rounded" />
            </div>
            <Skeleton className="h-24 rounded" />
            <Skeleton className="h-24 rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const { overallEfficiency, weeklyImprovement, benchmarkRank, optimizationScore, trendData, departmentEfficiency } = metrics;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Gauge className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Efficiency Metrics</CardTitle>
              <CardDescription>Performance indicators & optimization</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            {benchmarkRank}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{overallEfficiency}%</div>
            <div className="text-xs text-muted-foreground">Overall Efficiency</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">+{weeklyImprovement}%</div>
            <div className="text-xs text-muted-foreground">Weekly Improvement</div>
          </div>
        </div>

        {trendData.length > 0 ? (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="week" fontSize={10} />
                <YAxis hide />
                <Tooltip formatter={(value, name) => [`${value}%`, String(name).replace(' %', '')]} />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Efficiency %"
                />
                <Line 
                  type="monotone" 
                  dataKey="productivity" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  name="Productivity %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
            <p className="text-muted-foreground text-sm">No trend data available</p>
          </div>
        )}

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Department Performance</div>
          {departmentEfficiency.slice(0, 3).map((dept, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{dept.dept}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{dept.efficiency}%</span>
                <span className="text-green-600 text-xs">+{dept.improvement}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
          <strong>Efficiency Score:</strong> {optimizationScore.toFixed(1)}/10 - Performance tracking from real hospital data.
        </div>
      </CardContent>
    </Card>
  );
};
