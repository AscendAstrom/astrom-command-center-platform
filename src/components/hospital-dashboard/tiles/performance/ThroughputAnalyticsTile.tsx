
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const ThroughputAnalyticsTile = () => {
  const throughputData = [
    { hour: '00', patients: 12, capacity: 20 },
    { hour: '04', patients: 8, capacity: 20 },
    { hour: '08', patients: 25, capacity: 30 },
    { hour: '12', patients: 35, capacity: 40 },
    { hour: '16', patients: 28, capacity: 35 },
    { hour: '20', patients: 18, capacity: 25 }
  ];

  const metrics = {
    dailyThroughput: 145,
    avgProcessingTime: 32,
    peakCapacity: 85,
    efficiency: 78
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Zap className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Throughput Analytics</CardTitle>
              <CardDescription>Patient flow efficiency</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
            <Clock className="h-3 w-3 mr-1" />
            {metrics.efficiency}% Efficient
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{metrics.dailyThroughput}</div>
            <div className="text-xs text-muted-foreground">Daily Throughput</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{metrics.avgProcessingTime}m</div>
            <div className="text-xs text-muted-foreground">Avg Processing</div>
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
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Patients/Hour"
              />
              <Line 
                type="monotone" 
                dataKey="capacity" 
                stroke="#6b7280" 
                strokeWidth={1}
                strokeDasharray="5 5"
                name="Capacity"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="text-xs text-muted-foreground bg-purple-50 p-2 rounded">
          <strong>Flow Optimizer:</strong> Peak efficiency achieved at 12-16h. Consider staff redistribution for morning shift.
        </div>
      </CardContent>
    </Card>
  );
};
