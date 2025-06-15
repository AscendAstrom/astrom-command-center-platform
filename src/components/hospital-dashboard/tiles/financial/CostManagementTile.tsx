
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useCostData } from "@/hooks/useFinancialData";
import { Skeleton } from "@/components/ui/skeleton";

export const CostManagementTile = () => {
  const { data: costData, isLoading } = useCostData();

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <TrendingDown className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Cost Management</CardTitle>
                <CardDescription>Expense tracking & optimization</CardDescription>
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
          <Skeleton className="h-24" />
        </CardContent>
      </Card>
    );
  }

  const metrics = costData ? {
    totalCosts: costData.totalCosts,
    budgetVariance: costData.budgetVariance,
    savingsThisMonth: costData.savingsThisMonth
  } : {
    totalCosts: 0,
    budgetVariance: 0,
    savingsThisMonth: 0
  };

  const costTrendData = costData?.costTrendData || [];
  const costCategories = costData?.costCategories || [];
  const costOptimizations = costData?.costOptimizations || [];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <TrendingDown className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Cost Management</CardTitle>
              <CardDescription>Expense tracking & optimization</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingDown className="h-3 w-3 mr-1" />
            {Math.abs(metrics.budgetVariance)}% Under Budget
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-600">
              {metrics.totalCosts > 0 ? `$${(metrics.totalCosts / 1000000).toFixed(1)}M` : '$0'}
            </div>
            <div className="text-xs text-muted-foreground">Monthly Costs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {metrics.savingsThisMonth > 0 ? `$${(metrics.savingsThisMonth / 1000).toFixed(0)}K` : '$0'}
            </div>
            <div className="text-xs text-muted-foreground">Savings This Month</div>
          </div>
        </div>

        {costTrendData.length > 0 && metrics.totalCosts > 0 ? (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costTrendData}>
                <XAxis dataKey="month" fontSize={10} />
                <YAxis hide />
                <Tooltip formatter={(value) => [`$${typeof value === 'number' ? (value / 1000).toFixed(0) : 0}K`, 'Cost']} />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#ef4444" 
                  fill="#ef444420"
                  name="Total Costs"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
            <p className="text-muted-foreground text-sm">No cost data available</p>
          </div>
        )}

        {costCategories.length > 0 ? (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground mb-2">Cost Categories</div>
            {costCategories.slice(0, 3).map((cost, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{cost.category}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">${(cost.amount / 1000).toFixed(0)}K</span>
                  <span className={`text-xs ${cost.variance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {cost.variance > 0 ? '+' : ''}{cost.variance}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground text-sm">
            No cost category data available
          </div>
        )}

        <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
          <strong>Cost Optimization:</strong> ${costOptimizations.reduce((sum, opt) => sum + opt.savings, 0).toLocaleString()} saved through optimization initiatives.
        </div>
      </CardContent>
    </Card>
  );
};
