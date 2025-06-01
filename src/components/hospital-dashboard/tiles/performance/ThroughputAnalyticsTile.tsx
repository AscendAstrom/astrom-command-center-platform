
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowUp, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts";

export const ThroughputAnalyticsTile = () => {
  const throughputData = [
    { hour: '6AM', patients: 12, capacity: 20 },
    { hour: '8AM', patients: 28, capacity: 30 },
    { hour: '10AM', patients: 35, capacity: 40 },
    { hour: '12PM', patients: 42, capacity: 45 },
    { hour: '2PM', patients: 38, capacity: 40 },
    { hour: '4PM', patients: 31, capacity: 35 },
    { hour: '6PM', patients: 24, capacity: 30 }
  ];

  const metrics = {
    avgThroughput: 32,
    peakHours: "12-2PM",
    efficiency: 87,
    bottlenecks: 3
  };

  const departmentThroughput = [
    { dept: 'Emergency', throughput: 156, target: 140 },
    { dept: 'Surgery', throughput: 89, target: 95 },
    { dept: 'Radiology', throughput: 234, target: 220 },
    { dept: 'Lab', throughput: 445, target: 400 }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Throughput Analytics</CardTitle>
              <CardDescription>Patient flow optimization</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <ArrowUp className="h-3 w-3 mr-1" />
            {metrics.efficiency}% Efficient
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.avgThroughput}</div>
            <div className="text-xs text-muted-foreground">Avg Patients/Hour</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{metrics.bottlenecks}</div>
            <div className="text-xs text-muted-foreground">Active Bottlenecks</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={throughputData}>
              <XAxis dataKey="hour" fontSize={10} />
              <YAxis hide />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="patients" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Patients"
              />
              <Line 
                type="monotone" 
                dataKey="capacity" 
                stroke="#94a3b8" 
                strokeWidth={1}
                strokeDasharray="3 3"
                name="Capacity"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          {departmentThroughput.slice(0, 2).map((dept) => (
            <div key={dept.dept} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{dept.dept}</span>
              <div className="flex items-center gap-2">
                <div className="text-xs">
                  {dept.throughput}/{dept.target}
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  dept.throughput >= dept.target ? 'bg-green-500' : 'bg-orange-500'
                }`} />
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
          <strong>Flow Optimization:</strong> Peak hours: {metrics.peakHours}. Consider additional staffing during peak times.
        </div>
      </CardContent>
    </Card>
  );
};
