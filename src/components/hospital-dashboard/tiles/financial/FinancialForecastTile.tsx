
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useFinancialForecastData } from "@/hooks/useFinancialForecastData";
import { Skeleton } from "@/components/ui/skeleton";

export const FinancialForecastTile = () => {
  const { data, isLoading } = useFinancialForecastData();

  if (isLoading || !data) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-cyan-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Financial Forecast</CardTitle>
                <CardDescription>Predictive analytics & scenarios</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4"><Skeleton className="h-12" /><Skeleton className="h-12" /></div>
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </CardContent>
      </Card>
    );
  }

  const { forecastData, projectedGrowth, confidenceLevel, yearEndTarget } = data;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-cyan-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Financial Forecast</CardTitle>
              <CardDescription>Predictive analytics & scenarios</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-cyan-600 border-cyan-200 bg-cyan-50">
            <Target className="h-3 w-3 mr-1" />
            {confidenceLevel}% Confidence
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-cyan-600">+{projectedGrowth}%</div>
            <div className="text-xs text-muted-foreground">Projected Growth</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">${(yearEndTarget / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Year-End Target</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <XAxis dataKey="month" fontSize={10} />
              <YAxis hide />
              <Tooltip formatter={(value) => [`$${typeof value === 'number' ? (value / 1000000).toFixed(1) : 0}M`, 'Revenue']} />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#22c55e" 
                strokeWidth={2}
                name="Actual"
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#06b6d4" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Forecast"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Scenario Analysis</div>
            <div className="text-center text-xs text-muted-foreground py-2">Scenario modeling pending...</div>
        </div>

        <div className="text-xs text-muted-foreground bg-cyan-50 p-2 rounded">
          <strong>Forecast AI:</strong> Projections based on v1.2 model. Key driver: Patient volume increase expected.
        </div>
      </CardContent>
    </Card>
  );
};
