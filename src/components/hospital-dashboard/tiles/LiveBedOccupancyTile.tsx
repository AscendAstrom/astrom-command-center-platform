
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, TrendingUp, Activity } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { analyticsService, AnalyticsData } from '@/services/analytics';

export const LiveBedOccupancyTile = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const unsubscribe = analyticsService.subscribe(setAnalyticsData);
    return unsubscribe;
  }, []);

  const bedData = analyticsData ? [
    { name: 'Occupied', value: analyticsData.beds.occupied, color: '#ef4444' },
    { name: 'Available', value: analyticsData.beds.available, color: '#22c55e' },
    { name: 'Out of Order', value: analyticsData.beds.outOfOrder, color: '#f59e0b' }
  ] : [];

  const metrics = analyticsData ? {
    total: analyticsData.beds.total,
    occupied: analyticsData.beds.occupied,
    available: analyticsData.beds.available,
    utilization: analyticsData.beds.utilization,
    outOfOrder: analyticsData.beds.outOfOrder
  } : {
    total: 0,
    occupied: 0,
    available: 0,
    utilization: 0,
    outOfOrder: 0
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600 border-red-200 bg-red-50';
    if (utilization >= 75) return 'text-orange-600 border-orange-200 bg-orange-50';
    return 'text-green-600 border-green-200 bg-green-50';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Bed className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Live Bed Occupancy</CardTitle>
              <CardDescription>Real-time bed availability</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={getUtilizationColor(metrics.utilization)}>
            <Activity className="h-3 w-3 mr-1" />
            {metrics.utilization}% Full
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.total}</div>
            <div className="text-xs text-muted-foreground">Total Beds</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{metrics.available}</div>
            <div className="text-xs text-muted-foreground">Available</div>
          </div>
        </div>

        {bedData.length > 0 && bedData.some(d => d.value > 0) ? (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bedData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={35}
                  dataKey="value"
                >
                  {bedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
            <p className="text-muted-foreground text-sm">No bed data available</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-red-50 p-2 rounded text-center">
            <div className="font-bold text-red-600">{metrics.occupied}</div>
            <div className="text-muted-foreground">Occupied</div>
          </div>
          <div className="bg-orange-50 p-2 rounded text-center">
            <div className="font-bold text-orange-600">{metrics.outOfOrder}</div>
            <div className="text-muted-foreground">Out of Order</div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
          <strong>Live Tracking:</strong> {analyticsData ? 'Connected to real hospital data' : 'Loading bed status...'}
        </div>
      </CardContent>
    </Card>
  );
};
