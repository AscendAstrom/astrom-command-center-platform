
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const ClinicalIndicatorsTile = () => {
  const indicatorsData = [
    { indicator: 'Mortality', value: 2.1, target: 2.5, trend: 'improving' },
    { indicator: 'Readmission', value: 8.7, target: 9.0, trend: 'improving' },
    { indicator: 'Length of Stay', value: 4.2, target: 4.0, trend: 'stable' },
    { indicator: 'Infection Rate', value: 1.8, target: 2.0, trend: 'improving' },
    { indicator: 'Patient Satisfaction', value: 8.9, target: 8.5, trend: 'improving' }
  ];

  const performanceMetrics = [
    { name: 'Hand Hygiene', compliance: 94, benchmark: 90 },
    { name: 'Fall Prevention', compliance: 87, benchmark: 85 },
    { name: 'Medication Reconciliation', compliance: 92, benchmark: 90 },
    { name: 'Pressure Ulcer Prevention', compliance: 96, benchmark: 95 }
  ];

  const alerts = [
    { indicator: 'Surgical Site Infections', status: 'Above Target', severity: 'Medium' },
    { indicator: 'Sepsis Recognition', status: 'Below Target', severity: 'High' }
  ];

  const metrics = {
    overallPerformance: 91,
    indicatorsMet: 8,
    totalIndicators: 12,
    trendsImproving: 7
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'declining': return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
      default: return <div className="h-3 w-3 rounded-full bg-gray-400" />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Clinical Indicators</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            {metrics.indicatorsMet}/{metrics.totalIndicators} Met
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-blue-600">{metrics.overallPerformance}%</div>
            <div className="text-xs text-muted-foreground">Overall Performance</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-600">{metrics.trendsImproving}</div>
            <div className="text-xs text-muted-foreground">Improving Trends</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceMetrics}>
              <XAxis dataKey="name" fontSize={8} />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="compliance" fill="#3b82f6" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Key Indicators</div>
          {indicatorsData.slice(0, 3).map((indicator, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{indicator.indicator}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{indicator.value}%</span>
                {getTrendIcon(indicator.trend)}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <AlertCircle className="h-3 w-3 text-orange-500" />
            <span className="font-semibold text-orange-600">{alerts.length} Active Alerts</span>
          </div>
          <div className="text-muted-foreground">
            {alerts[0].indicator}: {alerts[0].status}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
