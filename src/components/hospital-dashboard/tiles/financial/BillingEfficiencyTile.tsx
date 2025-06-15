
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useBillingEfficiencyData } from "@/hooks/useBillingEfficiencyData";
import { Skeleton } from "@/components/ui/skeleton";

export const BillingEfficiencyTile = () => {
  const { data: billingData, isLoading } = useBillingEfficiencyData();

  if (isLoading || !billingData) {
    return (
      <Card className="h-full">
        <CardHeader><Skeleton className="h-5 w-2/5" /></CardHeader>
        <CardContent><Skeleton className="h-48 w-full" /></CardContent>
      </Card>
    );
  }

  const { processedThisWeek, denialRate, avgCollectionTime, billingHistory, lastUpdated } = billingData;
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Receipt className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Billing Efficiency</CardTitle>
              <CardDescription>Last 90 days. Updated: {lastUpdated}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
            {denialRate}% Denial Rate
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{processedThisWeek}</div>
            <div className="text-xs text-muted-foreground">Claims Processed (Week)</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{avgCollectionTime}d</div>
            <div className="text-xs text-muted-foreground">Avg Days to Collect</div>
          </div>
        </div>

        {billingHistory.length > 0 ? (
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={billingHistory}>
                <XAxis dataKey="week" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend verticalAlign="top" height={36} iconSize={10} />
                <Line 
                  type="monotone" 
                  dataKey="processed" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Processed"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="denied" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Denied"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
           <div className="h-40 flex items-center justify-center bg-muted/20 rounded">
                <p className="text-muted-foreground text-sm">No billing history available</p>
           </div>
        )}

        <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
          <strong>Revenue Recovery:</strong> Data simulation is active.
        </div>
      </CardContent>
    </Card>
  );
};
