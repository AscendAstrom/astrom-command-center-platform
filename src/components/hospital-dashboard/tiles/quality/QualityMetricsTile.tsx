
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, AlertCircle } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export const QualityMetricsTile = () => {
  const qualityScores = [
    { name: 'Patient Safety', value: 94, color: '#22c55e' },
    { name: 'Clinical Excellence', value: 89, color: '#3b82f6' },
    { name: 'Patient Satisfaction', value: 92, color: '#f59e0b' },
    { name: 'Care Coordination', value: 87, color: '#8b5cf6' }
  ];

  const overallScore = 90.5;
  
  const incidents = [
    { type: 'Medication Errors', count: 3, severity: 'Low' },
    { type: 'Falls', count: 1, severity: 'Medium' },
    { type: 'Infections', count: 2, severity: 'Low' },
    { type: 'Procedure Delays', count: 5, severity: 'Low' }
  ];

  const improvements = {
    monthlyIncrease: 2.3,
    targetScore: 95,
    ranking: "Top 15%"
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
              <CardDescription>Healthcare quality indicators</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            {improvements.ranking}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">{overallScore}%</div>
          <div className="text-xs text-muted-foreground">Overall Quality Score</div>
          <div className="text-xs text-green-600">+{improvements.monthlyIncrease}% this month</div>
        </div>

        <div className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={qualityScores}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={35}
                dataKey="value"
              >
                {qualityScores.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {qualityScores.map((score) => (
            <div key={score.name} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: score.color }}
              />
              <span className="text-muted-foreground truncate">{score.name}</span>
              <span className="font-semibold ml-auto">{score.value}%</span>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <AlertCircle className="h-3 w-3 text-orange-500" />
            <span className="font-semibold text-orange-600">Active Incidents: {incidents.length}</span>
          </div>
          <div className="text-muted-foreground">
            Recent: {incidents[0].count} {incidents[0].type}, {incidents[1].count} {incidents[1].type}
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
          <strong>Quality AI:</strong> On track to reach {improvements.targetScore}% target by year-end.
        </div>
      </CardContent>
    </Card>
  );
};
