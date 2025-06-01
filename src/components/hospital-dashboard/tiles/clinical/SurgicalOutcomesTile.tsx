
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scissors, TrendingUp, Clock, Users } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export const SurgicalOutcomesTile = () => {
  const outcomeData = [
    { month: 'Jan', success: 98.2, complications: 1.8, mortality: 0.3 },
    { month: 'Feb', success: 97.8, complications: 2.1, mortality: 0.4 },
    { month: 'Mar', success: 98.5, complications: 1.5, mortality: 0.2 },
    { month: 'Apr', success: 98.1, complications: 1.9, mortality: 0.3 },
    { month: 'May', success: 98.7, complications: 1.3, mortality: 0.2 },
    { month: 'Jun', success: 98.9, complications: 1.1, mortality: 0.1 }
  ];

  const surgeryTypes = [
    { type: 'General', count: 145, success: 98.6, avgDuration: 95 },
    { type: 'Orthopedic', count: 89, success: 99.1, avgDuration: 120 },
    { type: 'Cardiac', count: 56, success: 97.3, avgDuration: 185 },
    { type: 'Neurosurgery', count: 34, success: 96.8, avgDuration: 240 },
    { type: 'Vascular', count: 28, success: 98.2, avgDuration: 155 }
  ];

  const performanceMetrics = [
    { name: 'On-Time Start', value: 94.5, color: '#22c55e' },
    { name: 'Delayed', value: 5.5, color: '#f59e0b' }
  ];

  const metrics = {
    totalSurgeries: 352,
    successRate: 98.9,
    avgDuration: 142,
    complications: 1.1,
    avgLOS: 3.2,
    onTimeStart: 94.5
  };

  const upcomingSurgeries = [
    { time: '08:00', type: 'Laparoscopic Cholecystectomy', surgeon: 'Dr. Smith', room: 'OR-3' },
    { time: '10:30', type: 'Total Knee Replacement', surgeon: 'Dr. Johnson', room: 'OR-1' },
    { time: '14:00', type: 'Coronary Bypass', surgeon: 'Dr. Williams', room: 'OR-2' }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Scissors className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Surgical Outcomes</CardTitle>
              <CardDescription>OR performance metrics</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            {metrics.successRate}% Success
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-600">{metrics.totalSurgeries}</div>
            <div className="text-xs text-muted-foreground">Surgeries MTD</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.avgDuration}m</div>
            <div className="text-xs text-muted-foreground">Avg Duration</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={outcomeData}>
              <XAxis dataKey="month" fontSize={10} />
              <YAxis hide />
              <Tooltip formatter={(value) => [`${typeof value === 'number' ? value.toFixed(1) : 0}%`, 'Rate']} />
              <Area 
                type="monotone" 
                dataKey="success" 
                stroke="#22c55e" 
                fill="#22c55e20"
                name="Success Rate"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Surgery Types</div>
          {surgeryTypes.slice(0, 3).map((surgery, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{surgery.type}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{surgery.count}</span>
                <div className="w-8 h-1.5 bg-gray-200 rounded">
                  <div 
                    className="h-full bg-red-500 rounded" 
                    style={{ width: `${surgery.success}%` }}
                  />
                </div>
                <span className="font-medium">{surgery.success}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <Clock className="h-3 w-3 text-green-500" />
            <span className="font-semibold text-green-600">Next Surgery</span>
          </div>
          <div className="text-muted-foreground">
            {upcomingSurgeries[0].time} - {upcomingSurgeries[0].type} ({upcomingSurgeries[0].room})
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
