
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock, Target } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from "recharts";

export const ProductivityTile = () => {
  const productivityData = [
    { week: 'W1', staff: 87, equipment: 82, overall: 85 },
    { week: 'W2', staff: 89, equipment: 84, overall: 87 },
    { week: 'W3', staff: 91, equipment: 86, overall: 89 },
    { week: 'W4', staff: 88, equipment: 88, overall: 88 }
  ];

  const departmentProductivity = [
    { dept: 'Surgery', productivity: 94, target: 90, variance: 4.4 },
    { dept: 'Emergency', productivity: 89, target: 85, variance: 4.7 },
    { dept: 'Radiology', productivity: 96, target: 92, variance: 4.3 },
    { dept: 'Laboratory', productivity: 91, target: 88, variance: 3.4 },
    { dept: 'ICU', productivity: 87, target: 85, variance: 2.4 }
  ];

  const efficiencyMetrics = [
    { metric: 'Cases per Hour', value: 3.8, target: 3.5, unit: 'cases' },
    { metric: 'Utilization Rate', value: 88, target: 85, unit: '%' },
    { metric: 'Turnaround Time', value: 45, target: 50, unit: 'min' },
    { metric: 'Patient Throughput', value: 156, target: 140, unit: 'patients' }
  ];

  const metrics = {
    overallProductivity: 88,
    weeklyImprovement: 3.5,
    topPerformer: 'Radiology',
    improvementOpportunities: 4
  };

  const productivityDrivers = [
    { driver: 'Technology Integration', impact: '+12%', status: 'Active' },
    { driver: 'Staff Training', impact: '+8%', status: 'Ongoing' },
    { driver: 'Process Optimization', impact: '+6%', status: 'Planned' },
    { driver: 'Equipment Upgrades', impact: '+5%', status: 'Completed' }
  ];

  const hourlyPatterns = [
    { hour: '6AM', productivity: 65 },
    { hour: '9AM', productivity: 85 },
    { hour: '12PM', productivity: 92 },
    { hour: '3PM', productivity: 89 },
    { hour: '6PM', productivity: 76 },
    { hour: '9PM', productivity: 68 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': 
      case 'Completed': return 'text-green-600 bg-green-50';
      case 'Ongoing': return 'text-blue-600 bg-blue-50';
      case 'Planned': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Productivity</CardTitle>
              <CardDescription>Output metrics & efficiency</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            +{metrics.weeklyImprovement}% This Week
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{metrics.overallProductivity}%</div>
            <div className="text-xs text-muted-foreground">Overall Productivity</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.improvementOpportunities}</div>
            <div className="text-xs text-muted-foreground">Improvement Areas</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={productivityData}>
              <XAxis dataKey="week" fontSize={10} />
              <YAxis hide />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="overall" 
                stroke="#22c55e" 
                strokeWidth={2}
                name="Overall %"
              />
              <Line 
                type="monotone" 
                dataKey="staff" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Staff %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Department Performance</div>
          {departmentProductivity.slice(0, 3).map((dept, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{dept.dept}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{dept.productivity}%</span>
                <span className="text-green-600 text-xs">+{dept.variance}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
          <strong>Top Performer:</strong> {metrics.topPerformer} department leading with 96% productivity.
        </div>
      </CardContent>
    </Card>
  );
};
