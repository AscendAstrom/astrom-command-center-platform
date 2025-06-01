
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, AlertTriangle, Users } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts";

export const CapacityPlanningTile = () => {
  const capacityForecast = [
    { month: 'Jul', current: 245, projected: 250, demand: 235 },
    { month: 'Aug', current: 245, projected: 255, demand: 248 },
    { month: 'Sep', current: 245, projected: 260, demand: 252 },
    { month: 'Oct', current: 245, projected: 265, demand: 258 },
    { month: 'Nov', current: 245, projected: 270, demand: 265 },
    { month: 'Dec', current: 245, projected: 275, demand: 270 }
  ];

  const departmentCapacity = [
    { dept: 'ICU', current: 24, max: 30, utilization: 80, expansion: 6 },
    { dept: 'Emergency', current: 40, max: 50, utilization: 85, expansion: 10 },
    { dept: 'Surgery', current: 12, max: 16, utilization: 75, expansion: 4 },
    { dept: 'General', current: 169, max: 200, utilization: 84, expansion: 31 }
  ];

  const metrics = {
    currentCapacity: 245,
    projectedNeed: 275,
    capacityGap: 30,
    plannedExpansion: 35
  };

  const expansionProjects = [
    { project: 'ICU Wing Expansion', beds: 12, completion: '2025-Q1', status: 'In Progress' },
    { project: 'Emergency Department', beds: 15, completion: '2025-Q2', status: 'Planning' },
    { project: 'Surgical Suite Addition', beds: 8, completion: '2025-Q3', status: 'Approved' }
  ];

  const demandDrivers = [
    { driver: 'Population Growth', impact: '+8%', confidence: 92 },
    { driver: 'Service Expansion', impact: '+5%', confidence: 87 },
    { driver: 'Referral Network', impact: '+3%', confidence: 89 },
    { driver: 'Seasonal Variation', impact: '+2%', confidence: 95 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'text-blue-600 bg-blue-50';
      case 'Planning': return 'text-orange-600 bg-orange-50';
      case 'Approved': return 'text-green-600 bg-green-50';
      case 'Delayed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Calendar className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Capacity Planning</CardTitle>
              <CardDescription>Future capacity management</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {metrics.capacityGap} Bed Gap
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-orange-600">{metrics.projectedNeed}</div>
            <div className="text-xs text-muted-foreground">Projected Need (2025)</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{metrics.plannedExpansion}</div>
            <div className="text-xs text-muted-foreground">Planned Expansion</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={capacityForecast}>
              <XAxis dataKey="month" fontSize={10} />
              <YAxis hide />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="demand" 
                stroke="#f59e0b" 
                fill="#f59e0b20"
                name="Projected Demand"
              />
              <Area 
                type="monotone" 
                dataKey="current" 
                stroke="#3b82f6" 
                fill="#3b82f620"
                name="Current Capacity"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Department Analysis</div>
          {departmentCapacity.slice(0, 3).map((dept, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{dept.dept}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{dept.current}/{dept.max}</span>
                <div className="w-8 h-1.5 bg-gray-200 rounded">
                  <div 
                    className="h-full bg-orange-500 rounded" 
                    style={{ width: `${dept.utilization}%` }}
                  />
                </div>
                <span className="font-medium">{dept.utilization}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <Users className="h-3 w-3 text-orange-500" />
            <span className="font-semibold text-orange-600">Next Expansion: {expansionProjects[0].project}</span>
          </div>
          <div className="text-muted-foreground">
            +{expansionProjects[0].beds} beds by {expansionProjects[0].completion}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
