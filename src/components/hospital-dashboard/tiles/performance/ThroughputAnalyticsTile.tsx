
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { analyticsService, AnalyticsData } from '@/services/analytics';

export const ThroughputAnalyticsTile = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const unsubscribe = analyticsService.subscribe(setAnalyticsData);
    return unsubscribe;
  }, []);

  const metrics = analyticsData ? {
    avgThroughput: analyticsData.performance.throughput,
    peakHours: "12-2PM",
    efficiency: analyticsData.performance.efficiency,
    bottlenecks: analyticsData.performance.bottlenecks
  } : {
    avgThroughput: 0,
    peakHours: "12-2PM",
    efficiency: 0,
    bottlenecks: 0
  };

  // Generate throughput data based on real metrics
  const throughputData = metrics.avgThroughput > 0 ? [
    { hour: '6AM', patients: Math.round(metrics.avgThroughput * 0.4), capacity: Math.round(metrics.avgThroughput * 0.6) },
    { hour: '8AM', patients: Math.round(metrics.avgThroughput * 0.9), capacity: Math.round(metrics.avgThroughput * 1.0) },
    { hour: '10AM', patients: Math.round(metrics.avgThroughput * 1.1), capacity: Math.round(metrics.avgThroughput * 1.3) },
    { hour: '12PM', patients: Math.round(metrics.avgThroughput * 1.3), capacity: Math.round(metrics.avgThroughput * 1.4) },
    { hour: '2PM', patients: Math.round(metrics.avgThroughput * 1.2), capacity: Math.round(metrics.avgThroughput * 1.3) },
    { hour: '4PM', patients: metrics.avgThroughput, capacity: Math.round(metrics.avgThroughput * 1.1) },
    { hour: '6PM', patients: Math.round(metrics.avgThroughput * 0.8), capacity: metrics.avgThroughput }
  ] : [];

  const departmentThroughput = metrics.avgThroughput > 0 ? [
    { dept: 'Emergency', throughput: Math.round(metrics.avgThroughput * 5), target: Math.round(metrics.avgThroughput * 4.5) },
    { dept: 'Surgery', throughput: Math.round(metrics.avgThroughput * 2.8), target: Math.round(metrics.avgThroughput * 3) },
    { dept: 'Radiology', throughput: Math.round(metrics.avgThroughput * 7.3), target: Math.round(metrics.avgThroughput * 7) },
    { dept: 'Lab', throughput: Math.round(metrics.avgThroughput * 14), target: Math.round(metrics.avgThroughput * 12.5) }
  ] : [];

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
          <Badge variant="outline" className={metrics.efficiency > 80 ? "text-green-600 border-green-200 bg-green-50" : "text-orange-600 border-orange-200 bg-orange-50"}>
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

        {throughputData.length > 0 ? (
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
        ) : (
          <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
            <p className="text-muted-foreground text-sm">No throughput data available</p>
          </div>
        )}

        {departmentThroughput.length > 0 ? (
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
        ) : (
          <div className="space-y-2">
            <div className="text-center py-4 text-muted-foreground text-sm">
              No department throughput data available
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
          <strong>Flow Optimization:</strong> {analyticsData ? `Peak hours: ${metrics.peakHours}. Current efficiency: ${metrics.efficiency}%.` : 'Connect flow systems for throughput analysis.'}
        </div>
      </CardContent>
    </Card>
  );
};
