
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const StaffingDemandTile = () => {
  const metrics = {
    staffOnDuty: 87,
    predictedShortfall: 5,
    nextShiftStaff: 92,
    callInAvailable: 12
  };

  const demandData = [
    { time: '06:00', staff: 85, demand: 78 },
    { time: '08:00', staff: 92, demand: 95 },
    { time: '10:00', staff: 87, demand: 88 },
    { time: '12:00', staff: 89, demand: 85 },
    { time: '14:00', staff: 87, demand: 92 },
    { time: '16:00', staff: 85, demand: 89 },
    { time: '18:00', staff: 82, demand: 86 }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Staffing vs Demand</CardTitle>
              <CardDescription>Real-time staffing analytics</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            Surge Risk
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{metrics.staffOnDuty}</div>
            <div className="text-xs text-muted-foreground">Staff On-Duty</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">-{metrics.predictedShortfall}</div>
            <div className="text-xs text-muted-foreground">Predicted Shortfall</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={demandData}>
              <XAxis dataKey="time" fontSize={10} />
              <YAxis hide />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="demand" 
                stroke="#ef4444" 
                fill="#ef444420"
                name="Demand"
              />
              <Area 
                type="monotone" 
                dataKey="staff" 
                stroke="#3b82f6" 
                fill="#3b82f620"
                name="Staff Available"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-blue-50 p-2 rounded text-center">
            <div className="font-bold text-blue-600">{metrics.nextShiftStaff}</div>
            <div className="text-xs text-muted-foreground">Next Shift</div>
          </div>
          <div className="bg-green-50 p-2 rounded text-center">
            <div className="font-bold text-green-600">{metrics.callInAvailable}</div>
            <div className="text-xs text-muted-foreground">Call-in Available</div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-orange-50 p-2 rounded">
          <strong>Surge Forecaster:</strong> 15% surge probability at 7 PM. Consider early call-ins.
        </div>
      </CardContent>
    </Card>
  );
};
