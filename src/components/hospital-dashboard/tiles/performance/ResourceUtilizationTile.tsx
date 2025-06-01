
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, AlertTriangle } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export const ResourceUtilizationTile = () => {
  const utilizationData = [
    { name: 'Beds', utilization: 85, capacity: 100, color: '#3b82f6' },
    { name: 'Staff', utilization: 92, capacity: 100, color: '#22c55e' },
    { name: 'Equipment', utilization: 78, capacity: 100, color: '#f59e0b' },
    { name: 'OR Suites', utilization: 88, capacity: 100, color: '#8b5cf6' }
  ];

  const trendData = [
    { hour: '6AM', utilization: 65 },
    { hour: '9AM', utilization: 78 },
    { hour: '12PM', utilization: 85 },
    { hour: '3PM', utilization: 92 },
    { hour: '6PM', utilization: 88 },
    { hour: '9PM', utilization: 72 }
  ];

  const metrics = {
    avgUtilization: 86,
    peakUtilization: 94,
    bottlenecks: 2,
    efficiency: 89
  };

  const resourceAlerts = [
    { resource: 'ICU Beds', status: 'At Capacity', level: 'High' },
    { resource: 'Ventilators', status: 'Low Stock', level: 'Medium' },
    { resource: 'OR Schedule', status: 'Overbooked', level: 'High' }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Zap className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Resource Utilization</CardTitle>
              <CardDescription>Capacity & efficiency tracking</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            {metrics.efficiency}% Efficient
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{metrics.avgUtilization}%</div>
            <div className="text-xs text-muted-foreground">Avg Utilization</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{metrics.bottlenecks}</div>
            <div className="text-xs text-muted-foreground">Bottlenecks</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <XAxis dataKey="hour" fontSize={10} />
              <YAxis hide />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="utilization" 
                stroke="#8b5cf6" 
                fill="#8b5cf620"
                name="Utilization %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Resource Status</div>
          {utilizationData.slice(0, 3).map((resource) => (
            <div key={resource.name} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{resource.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1.5 bg-gray-200 rounded">
                  <div 
                    className="h-full rounded" 
                    style={{ 
                      width: `${resource.utilization}%`,
                      backgroundColor: resource.color
                    }}
                  />
                </div>
                <span className="font-medium w-8">{resource.utilization}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <AlertTriangle className="h-3 w-3 text-orange-500" />
            <span className="font-semibold text-orange-600">Resource Alerts</span>
          </div>
          <div className="text-muted-foreground">
            {resourceAlerts[0].resource}: {resourceAlerts[0].status}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
