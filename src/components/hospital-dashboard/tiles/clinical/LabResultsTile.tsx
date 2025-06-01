
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export const LabResultsTile = () => {
  const turnaroundData = [
    { hour: '6AM', routine: 45, urgent: 12, stat: 8 },
    { hour: '9AM', routine: 38, urgent: 15, stat: 6 },
    { hour: '12PM', routine: 42, urgent: 18, stat: 10 },
    { hour: '3PM', routine: 52, urgent: 22, stat: 14 },
    { hour: '6PM', routine: 48, urgent: 16, stat: 9 },
    { hour: '9PM', routine: 35, urgent: 12, stat: 7 }
  ];

  const testVolumes = [
    { test: 'CBC', volume: 285, avgTime: 25 },
    { test: 'BMP', volume: 198, avgTime: 22 },
    { test: 'Lipid Panel', volume: 156, avgTime: 35 },
    { test: 'Liver Function', volume: 142, avgTime: 28 },
    { test: 'Cardiac Markers', volume: 89, avgTime: 18 }
  ];

  const qualityMetrics = [
    { name: 'Normal', value: 76, color: '#22c55e' },
    { name: 'Abnormal', value: 18, color: '#f59e0b' },
    { name: 'Critical', value: 4, color: '#ef4444' },
    { name: 'Pending', value: 2, color: '#94a3b8' }
  ];

  const metrics = {
    totalTests: 1248,
    avgTurnaround: 28,
    criticalAlerts: 12,
    accuracyRate: 99.2,
    onTimeDelivery: 94.5
  };

  const alerts = [
    { patient: 'PT-4521', test: 'Troponin I', value: 'Critical High', time: '14:32' },
    { patient: 'PT-8934', test: 'K+', value: 'Critical Low', time: '14:28' },
    { patient: 'PT-2156', test: 'Glucose', value: 'Critical High', time: '14:15' }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FlaskConical className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Lab Results</CardTitle>
              <CardDescription>Diagnostic analytics</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            <Clock className="h-3 w-3 mr-1" />
            Real-time
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.totalTests}</div>
            <div className="text-xs text-muted-foreground">Tests Today</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{metrics.avgTurnaround}m</div>
            <div className="text-xs text-muted-foreground">Avg TAT</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={turnaroundData}>
              <XAxis dataKey="hour" fontSize={8} />
              <YAxis hide />
              <Tooltip formatter={(value) => [`${value} min`, 'Turnaround']} />
              <Area 
                type="monotone" 
                dataKey="routine" 
                stackId="1"
                stroke="#3b82f6" 
                fill="#3b82f620"
                name="Routine"
              />
              <Area 
                type="monotone" 
                dataKey="urgent" 
                stackId="1"
                stroke="#f59e0b" 
                fill="#f59e0b20"
                name="Urgent"
              />
              <Area 
                type="monotone" 
                dataKey="stat" 
                stackId="1"
                stroke="#ef4444" 
                fill="#ef444420"
                name="STAT"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Top Tests by Volume</div>
          {testVolumes.slice(0, 3).map((test, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{test.test}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{test.volume}</span>
                <div className="w-8 h-1.5 bg-gray-200 rounded">
                  <div 
                    className="h-full bg-blue-500 rounded" 
                    style={{ width: `${(test.volume / 300) * 100}%` }}
                  />
                </div>
                <span className="font-medium">{test.avgTime}m</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-red-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <AlertTriangle className="h-3 w-3 text-red-500" />
            <span className="font-semibold text-red-600">Critical Alerts ({metrics.criticalAlerts})</span>
          </div>
          <div className="text-muted-foreground">
            Latest: {alerts[0].test} - {alerts[0].value} ({alerts[0].time})
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
