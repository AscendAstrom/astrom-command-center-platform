
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, AlertCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useQualityMetricsData } from "@/hooks/useQualityMetricsData";
import { Skeleton } from "@/components/ui/skeleton";

export const QualityMetricsTile = () => {
  const { data: metrics, isLoading } = useQualityMetricsData();

  if (isLoading || !metrics) {
    return (
      <Card className="h-full">
        <CardHeader><Skeleton className="h-5 w-2/5" /></CardHeader>
        <CardContent><Skeleton className="h-48 w-full" /></CardContent>
      </Card>
    );
  }

  const qualityScores = [
    { name: 'Patient Safety', value: metrics.patientSafetyScore, color: '#22c55e' },
    { name: 'Patient Satisfaction', value: metrics.satisfactionScore, color: '#f59e0b' },
    { name: 'Care Coordination', value: 89.2, color: '#8b5cf6' }, // Placeholder
    { name: 'Clinical Excellence', value: 92.5, color: '#3b82f6' }, // Placeholder
  ];

  const ranking = metrics.overallScore > 90 ? "Top 10%" : metrics.overallScore > 80 ? "Top 25%" : "Average";

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Shield className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Quality Metrics</CardTitle>
              <CardDescription>Healthcare quality indicators</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={metrics.overallScore > 85 ? "text-green-600 border-green-200 bg-green-50" : "text-orange-600 border-orange-200 bg-orange-50"}>
            <TrendingUp className="h-3 w-3 mr-1" />
            {ranking}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">{metrics.overallScore}%</div>
          <div className="text-xs text-muted-foreground">Overall Quality Score</div>
        </div>

        <div className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={qualityScores} cx="50%" cy="50%" innerRadius={25} outerRadius={35} dataKey="value">
                {qualityScores.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {qualityScores.map((score) => (
            <div key={score.name} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: score.color }} />
              <span className="text-muted-foreground truncate">{score.name}</span>
              <span className="font-semibold ml-auto">{score.value}%</span>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <AlertCircle className="h-3 w-3 text-orange-500" />
            <span className="font-semibold text-orange-600">Active Incidents: {metrics.activeIncidents}</span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
