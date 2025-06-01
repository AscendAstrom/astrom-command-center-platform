
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt, TrendingUp, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts";

export const BillingEfficiencyTile = () => {
  const billingData = [
    { week: 'W1', processed: 1200, denied: 48, avgDays: 3.2 },
    { week: 'W2', processed: 1350, denied: 42, avgDays: 2.8 },
    { week: 'W3', processed: 1280, denied: 38, avgDays: 2.5 },
    { week: 'W4', processed: 1420, denied: 35, avgDays: 2.3 }
  ];

  const denialReasons = [
    { reason: 'Missing Documentation', count: 15, percentage: 42.9 },
    { reason: 'Coding Errors', count: 8, percentage: 22.9 },
    { reason: 'Authorization Issues', count: 7, percentage: 20.0 },
    { reason: 'Duplicate Claims', count: 5, percentage: 14.3 }
  ];

  const metrics = {
    processedThisWeek: 1420,
    denialRate: 2.5,
    avgCollectionTime: 2.3,
    revenueRecovered: 125000
  };

  const billingMetrics = [
    { metric: 'Claims Accuracy', value: 97.5, target: 95 },
    { metric: 'First Pass Rate', value: 89.2, target: 85 },
    { metric: 'Collection Rate', value: 94.8, target: 92 },
    { metric: 'Days in A/R', value: 28.5, target: 30 }
  ];

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

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Performance Metrics</div>
          {billingMetrics.slice(0, 3).map((metric, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{metric.metric}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{metric.value}%</span>
                <div className={`w-2 h-2 rounded-full ${
                  metric.value >= metric.target ? 'bg-green-500' : 'bg-orange-500'
                }`} />
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
          <strong>Revenue Recovery:</strong> ${metrics.revenueRecovered.toLocaleString()} recovered from denied claims this month.
        </div>
      </CardContent>
    </Card>
  );
};
