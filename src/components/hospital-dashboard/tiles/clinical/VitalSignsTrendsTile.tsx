
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const VitalSignsTrendsTile = () => {
  const vitalsData = [
    { time: '00:00', bp: 120, hr: 75, temp: 98.6, spo2: 98 },
    { time: '04:00', bp: 118, hr: 72, temp: 98.4, spo2: 99 },
    { time: '08:00', bp: 125, hr: 80, temp: 99.1, spo2: 97 },
    { time: '12:00', bp: 130, hr: 85, temp: 99.8, spo2: 96 },
    { time: '16:00', bp: 128, hr: 82, temp: 99.2, spo2: 98 },
    { time: '20:00', bp: 122, hr: 78, temp: 98.8, spo2: 99 }
  ];

  const metrics = {
    criticalAlerts: 3,
    patientsMonitored: 156,
    avgHeartRate: 78,
    abnormalReadings: 12
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Activity className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Vital Signs Trends</CardTitle>
              <CardDescription>Real-time monitoring</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
            <AlertCircle className="h-3 w-3 mr-1" />
            {metrics.criticalAlerts} Critical
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-green-600">{metrics.patientsMonitored}</div>
            <div className="text-xs text-muted-foreground">Patients Monitored</div>
          </div>
          <div>
            <div className="text-xl font-bold text-orange-600">{metrics.abnormalReadings}</div>
            <div className="text-xs text-muted-foreground">Abnormal Readings</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={vitalsData}>
              <XAxis dataKey="time" fontSize={10} />
              <YAxis hide />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="hr" 
                stroke="#22c55e" 
                fill="#22c55e20"
                name="Heart Rate"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-green-50 p-2 rounded text-center">
            <div className="font-bold text-green-600">{metrics.avgHeartRate}</div>
            <div className="text-xs text-muted-foreground">Avg HR (bpm)</div>
          </div>
          <div className="bg-red-50 p-2 rounded text-center">
            <div className="font-bold text-red-600">{metrics.criticalAlerts}</div>
            <div className="text-xs text-muted-foreground">Critical Alerts</div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
          <strong>Vitals AI:</strong> Early warning system detected 5 deteriorating patients in last 2 hours.
        </div>
      </CardContent>
    </Card>
  );
};
