
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const RevenueAnalyticsTile = () => {
  const revenueData = [
    { month: 'Jan', revenue: 2800000, target: 2500000 },
    { month: 'Feb', revenue: 3200000, target: 2600000 },
    { month: 'Mar', revenue: 2900000, target: 2700000 },
    { month: 'Apr', revenue: 3500000, target: 2800000 },
    { month: 'May', revenue: 3800000, target: 2900000 },
    { month: 'Jun', revenue: 4100000, target: 3000000 }
  ];

  const metrics = {
    monthlyRevenue: 4100000,
    growth: 12.5,
    target: 3000000,
    variance: 36.7
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Revenue Analytics</CardTitle>
              <CardDescription>Monthly performance</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            +{metrics.growth}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-green-600">${(metrics.monthlyRevenue / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Monthly Revenue</div>
          </div>
          <div>
            <div className="text-xl font-bold text-blue-600">+{metrics.variance}%</div>
            <div className="text-xs text-muted-foreground">vs Target</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <XAxis dataKey="month" fontSize={10} />
              <YAxis hide />
              <Tooltip formatter={(value) => [`$${(value as number / 1000000).toFixed(1)}M`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#22c55e" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
          <strong>Revenue AI:</strong> Q2 performance exceeds targets. Projected annual revenue: $42.5M (+15% YoY).
        </div>
      </CardContent>
    </Card>
  );
};
