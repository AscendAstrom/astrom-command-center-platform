
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useFinancialData } from "@/hooks/useFinancialData";
import { Skeleton } from "@/components/ui/skeleton";

export const RevenueAnalyticsTile = () => {
  const { data: financialData, isLoading } = useFinancialData();

  if (isLoading) {
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
                <CardDescription>Financial performance tracking</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </div>
          <Skeleton className="h-24" />
          <Skeleton className="h-12" />
        </CardContent>
      </Card>
    );
  }

  const metrics = financialData ? {
    totalRevenue: financialData.totalRevenue,
    monthlyGrowth: financialData.monthlyGrowth,
    yearOverYear: financialData.yearOverYear,
    revenuePerPatient: financialData.revenuePerPatient
  } : {
    totalRevenue: 0,
    monthlyGrowth: 0,
    yearOverYear: 0,
    revenuePerPatient: 0
  };

  const revenueData = financialData?.revenueHistory.map(item => ({...item, revenue: item.revenue, target: item.revenue * 0.85})) || [];
  const departmentRevenue = financialData?.departmentRevenue || [];

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
              <CardDescription>Financial performance tracking</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={metrics.monthlyGrowth >= 0 ? "text-green-600 border-green-200 bg-green-50" : "text-red-600 border-red-200 bg-red-50"}>
            <TrendingUp className={`h-3 w-3 mr-1 ${metrics.monthlyGrowth < 0 ? 'rotate-180' : ''}`} />
            {metrics.monthlyGrowth >= 0 ? `+${metrics.monthlyGrowth}%` : `${metrics.monthlyGrowth}%`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {metrics.totalRevenue > 0 ? `$${(metrics.totalRevenue / 1000000).toFixed(1)}M` : '$0'}
            </div>
            <div className="text-xs text-muted-foreground">YTD Revenue</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {metrics.revenuePerPatient > 0 ? `$${(metrics.revenuePerPatient / 1000).toFixed(1)}K` : '$0'}
            </div>
            <div className="text-xs text-muted-foreground">Per Patient</div>
          </div>
        </div>

        {revenueData.length > 0 && metrics.totalRevenue > 0 ? (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <XAxis dataKey="month" fontSize={10} />
                <YAxis hide />
                <Tooltip 
                  formatter={(value) => [`$${typeof value === 'number' ? value.toLocaleString('en-US', { maximumFractionDigits: 0 }) : 0}`, 'Revenue']}
                  labelStyle={{ fontWeight: 'bold' }}
                  contentStyle={{
                    borderRadius: '0.5rem',
                    border: '1px solid hsl(var(--border))',
                    backgroundColor: 'hsl(var(--background))'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#22c55e" 
                  fill="#22c55e20"
                  name="Revenue"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
            <p className="text-muted-foreground text-sm">No revenue data available</p>
          </div>
        )}

        {departmentRevenue.length > 0 ? (
          <div className="space-y-2">
            {departmentRevenue.slice(0, 2).map((dept) => (
              <div key={dept.department} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{dept.department}</span>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1.5 bg-gray-200 rounded">
                    <div 
                      className="h-full bg-green-500 rounded" 
                      style={{ width: `${Math.min(dept.percentage, 100)}%` }}
                    />
                  </div>
                  <span className="font-medium">${(dept.revenue / 1000000).toFixed(1)}M</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-center py-4 text-muted-foreground text-sm">
              No department revenue data available
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
          <strong>Revenue AI:</strong> {financialData ? `YoY growth: ${metrics.yearOverYear}%. Financial performance tracking active.` : 'Connect billing systems for revenue analysis.'}
        </div>
      </CardContent>
    </Card>
  );
};
