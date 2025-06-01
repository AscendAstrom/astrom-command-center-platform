
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gauge, TrendingUp, Zap } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export const EfficiencyMetricsTile = () => {
  const efficiencyData = [
    { name: 'Overall', value: 87, target: 85, color: '#22c55e' },
    { name: 'Throughput', value: 92, target: 90, color: '#3b82f6' },
    { name: 'Resource', value: 84, target: 85, color: '#f59e0b' },
    { name: 'Cost', value: 89, target: 80, color: '#8b5cf6' }
  ];

  const trendData = [
    { week: 'W1', efficiency: 82, productivity: 78 },
    { week: 'W2', efficiency: 84, productivity: 81 },
    { week: 'W3', efficiency: 86, productivity: 84 },
    { week: 'W4', efficiency: 87, productivity: 87 }
  ];

  const departmentEfficiency = [
    { dept: 'Emergency', efficiency: 91, improvement: 5.2 },
    { dept: 'Surgery', efficiency: 88, improvement: 3.1 },
    { dept: 'Radiology', efficiency: 94, improvement: 2.8 },
    { dept: 'Laboratory', efficiency: 89, improvement: 4.5 }
  ];

  const metrics = {
    overallEfficiency: 87,
    weeklyImprovement: 2.3,
    benchmarkRank: "Top 20%",
    optimizationScore: 8.7
  };

  const improvements = [
    { area: 'Wait Time Reduction', impact: '+5%', status: 'Completed' },
    { area: 'Staff Optimization', impact: '+3%', status: 'In Progress' },
    { area: 'Equipment Utilization', impact: '+4%', status: 'Planned' }
  ];

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
            {metrics.benchmarkRank}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.overallEfficiency}%</div>
            <div className="text-xs text-muted-foreground">Overall Efficiency</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">+{metrics.weeklyImprovement}%</div>
            <div className="text-xs text-muted-foreground">Weekly Improvement</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="week" fontSize={10} />
              <YAxis hide />
              <Tooltip />
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
          <strong>Efficiency Score:</strong> {metrics.optimizationScore}/10 - Opportunities identified in 3 areas.
        </div>
      </CardContent>
    </Card>
  );
};
