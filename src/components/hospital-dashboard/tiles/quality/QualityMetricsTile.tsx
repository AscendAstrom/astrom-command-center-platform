
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

export const QualityMetricsTile = () => {
  const qualityData = [
    { name: 'Overall', score: 88, fill: '#22c55e' },
    { name: 'Safety', score: 92, fill: '#3b82f6' },
    { name: 'Effectiveness', score: 85, fill: '#f59e0b' },
    { name: 'Experience', score: 90, fill: '#8b5cf6' }
  ];

  const metrics = {
    overallScore: 88,
    safetyIncidents: 2,
    qualityIndicators: 15,
    accreditationStatus: 'Compliant'
  };

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
              <CardDescription>Care quality indicators</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <CheckCircle className="h-3 w-3 mr-1" />
            {metrics.accreditationStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{metrics.overallScore}%</div>
            <div className="text-xs text-muted-foreground">Quality Score</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.qualityIndicators}</div>
            <div className="text-xs text-muted-foreground">Active Indicators</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart data={qualityData} innerRadius="60%" outerRadius="90%">
              <RadialBar dataKey="score" cornerRadius={10} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="bg-green-50 p-2 rounded text-center">
            <div className="font-bold text-green-600">{metrics.safetyIncidents}</div>
            <div className="text-xs text-muted-foreground">Safety Incidents (This Month)</div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
          <strong>Quality AI:</strong> All quality indicators trending positive. Safety score improved 5% this quarter.
        </div>
      </CardContent>
    </Card>
  );
};
