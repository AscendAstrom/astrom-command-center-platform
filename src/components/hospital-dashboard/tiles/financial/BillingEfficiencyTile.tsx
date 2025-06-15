import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const BillingEfficiencyTile = () => {
  const [metrics, setMetrics] = useState({
    processedThisWeek: 0,
    denialRate: 0,
    avgCollectionTime: 0,
    revenueRecovered: 0
  });
  const [billingData, setBillingData] = useState<any[]>([]);
  const [billingMetrics, setBillingMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement data fetching from a billing table when available.
    setLoading(false);
  }, []);
  
  if (loading) {
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
                <CardDescription>Revenue cycle metrics</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-2 gap-4 h-16"><div className="bg-gray-200 rounded"></div><div className="bg-gray-200 rounded"></div></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="space-y-2"><div className="h-4 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded"></div></div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
              <CardDescription>Revenue cycle metrics</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            {(100 - metrics.denialRate).toFixed(1)}% Success Rate
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.processedThisWeek}</div>
            <div className="text-xs text-muted-foreground">Claims Processed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{metrics.avgCollectionTime}</div>
            <div className="text-xs text-muted-foreground">Avg Days to Collect</div>
          </div>
        </div>

        {billingData.length > 0 ? (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={billingData}>
                <XAxis dataKey="week" fontSize={10} />
                <YAxis hide />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="processed" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Claims Processed"
                />
                <Line 
                  type="monotone" 
                  dataKey="denied" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Claims Denied"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
           <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
                <p className="text-muted-foreground text-sm">No billing data available</p>
           </div>
        )}

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Performance Metrics</div>
          {billingMetrics.length > 0 ? billingMetrics.slice(0, 3).map((metric, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{metric.metric}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{metric.value}%</span>
                <div className={`w-2 h-2 rounded-full ${
                  metric.value >= metric.target ? 'bg-green-500' : 'bg-orange-500'
                }`} />
              </div>
            </div>
          )) : (
            <div className="text-center text-xs text-muted-foreground py-2">No performance metrics</div>
          )}
        </div>

        <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
          <strong>Revenue Recovery:</strong> Connect to RCM system for financial data.
        </div>
      </CardContent>
    </Card>
  );
};
