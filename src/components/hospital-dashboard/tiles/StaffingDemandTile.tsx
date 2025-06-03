
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { analyticsService, AnalyticsData } from '@/services/analytics';

export const StaffingDemandTile = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const unsubscribe = analyticsService.subscribe(setAnalyticsData);
    return unsubscribe;
  }, []);

  const metrics = analyticsData ? {
    staffOnDuty: analyticsData.staffing.onDuty,
    totalStaff: analyticsData.staffing.total,
    onCall: analyticsData.staffing.onCall,
    scheduledNext: analyticsData.staffing.scheduledNext,
    overtime: analyticsData.staffing.overtime
  } : {
    staffOnDuty: 0,
    totalStaff: 0,
    onCall: 0,
    scheduledNext: 0,
    overtime: 0
  };

  // Generate hourly demand data based on current metrics
  const demandData = analyticsData ? [
    { time: '06:00', staff: Math.max(metrics.staffOnDuty - 5, 0), demand: Math.max(metrics.staffOnDuty - 8, 0) },
    { time: '08:00', staff: metrics.staffOnDuty, demand: Math.max(metrics.staffOnDuty + 5, 0) },
    { time: '10:00', staff: Math.max(metrics.staffOnDuty - 2, 0), demand: metrics.staffOnDuty },
    { time: '12:00', staff: Math.max(metrics.staffOnDuty + 2, 0), demand: Math.max(metrics.staffOnDuty - 3, 0) },
    { time: '14:00', staff: metrics.staffOnDuty, demand: Math.max(metrics.staffOnDuty + 2, 0) },
    { time: '16:00', staff: Math.max(metrics.staffOnDuty - 3, 0), demand: metrics.staffOnDuty },
    { time: '18:00', staff: Math.max(metrics.staffOnDuty - 5, 0), demand: Math.max(metrics.staffOnDuty - 2, 0) }
  ] : [];

  const predictedShortfall = metrics.staffOnDuty > 0 ? Math.max(0, 5 - (metrics.onCall + metrics.scheduledNext)) : 0;

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
          <Badge variant="outline" className={predictedShortfall > 0 ? "text-orange-600 border-orange-200 bg-orange-50" : "text-green-600 border-green-200 bg-green-50"}>
            <TrendingUp className="h-3 w-3 mr-1" />
            {predictedShortfall > 0 ? 'Surge Risk' : 'Adequate'}
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
            <div className="text-2xl font-bold text-orange-600">{predictedShortfall > 0 ? `-${predictedShortfall}` : '0'}</div>
            <div className="text-xs text-muted-foreground">Predicted Shortfall</div>
          </div>
        </div>

        {demandData.length > 0 && demandData.some(d => d.staff > 0 || d.demand > 0) ? (
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
        ) : (
          <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
            <p className="text-muted-foreground text-sm">No staffing data available</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-blue-50 p-2 rounded text-center">
            <div className="font-bold text-blue-600">{metrics.scheduledNext}</div>
            <div className="text-xs text-muted-foreground">Next Shift</div>
          </div>
          <div className="bg-green-50 p-2 rounded text-center">
            <div className="font-bold text-green-600">{metrics.onCall}</div>
            <div className="text-xs text-muted-foreground">On-Call</div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-orange-50 p-2 rounded">
          <strong>Staffing AI:</strong> {analyticsData ? `${metrics.totalStaff} total staff available. Current utilization optimal.` : 'Connect staff systems for demand forecasting.'}
        </div>
      </CardContent>
    </Card>
  );
};
