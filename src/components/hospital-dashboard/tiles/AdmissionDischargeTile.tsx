
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Brain } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const AdmissionDischargeTile = () => {
  const metrics = {
    todayAdmissions: 28,
    scheduledDischarges: 15,
    completedDischarges: 12,
    pendingDischarges: 3
  };

  const trendData = [
    { time: '00:00', admissions: 2, discharges: 0 },
    { time: '04:00', admissions: 1, discharges: 1 },
    { time: '08:00', admissions: 8, discharges: 4 },
    { time: '12:00', admissions: 12, discharges: 6 },
    { time: '16:00', admissions: 5, discharges: 1 },
    { time: '20:00', admissions: 0, discharges: 0 }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <ArrowUp className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Admission & Discharge Flow</CardTitle>
              <CardDescription>24-hour patient flow monitoring</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
            <Brain className="h-3 w-3 mr-1" />
            AI Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Admissions Today</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{metrics.todayAdmissions}</div>
            <div className="text-xs text-muted-foreground">+12% vs yesterday</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ArrowDown className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Discharges</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {metrics.completedDischarges}/{metrics.scheduledDischarges}
            </div>
            <div className="text-xs text-muted-foreground">{metrics.pendingDischarges} pending</div>
          </div>
        </div>

        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="time" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="admissions" 
                stroke="#22c55e" 
                strokeWidth={2}
                name="Admissions"
              />
              <Line 
                type="monotone" 
                dataKey="discharges" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Discharges"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-green-50 p-2 rounded">
            <strong>Admission Forecast:</strong> +5 patients expected by 6 PM
          </div>
          <div className="bg-blue-50 p-2 rounded">
            <strong>Discharge Predictor:</strong> 2 more likely to discharge by EOD
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
