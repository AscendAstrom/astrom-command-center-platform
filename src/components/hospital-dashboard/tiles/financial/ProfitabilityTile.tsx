
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useProfitabilityData } from "@/hooks/useProfitabilityData";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfitabilityTile = () => {
  const { data: profitabilityData, isLoading } = useProfitabilityData();

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <PieChart className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Profitability</CardTitle>
                <CardDescription>Margin analysis & drivers</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 h-16"><Skeleton className="h-full" /><Skeleton className="h-full" /></div>
            <Skeleton className="h-24" />
            <div className="space-y-2"><Skeleton className="h-4" /><Skeleton className="h-4" /><Skeleton className="h-4" /></div>
        </CardContent>
      </Card>
    );
  }

  const metrics = profitabilityData ? {
    netProfit: profitabilityData.netProfit,
    profitMargin: profitabilityData.profitMargin,
    roi: profitabilityData.roi
  } : {
    netProfit: 0,
    profitMargin: 0,
    roi: 0
  };

  const profitHistory = profitabilityData?.profitabilityHistory || [];
  const departmentProfitability = profitabilityData?.departmentProfitability || [];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <PieChart className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Profitability</CardTitle>
              <CardDescription>Margin analysis & drivers</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={metrics.profitMargin >= 0 ? "text-green-600 border-green-200 bg-green-50" : "text-red-600 border-red-200 bg-red-50"}>
            <TrendingUp className="h-3 w-3 mr-1" />
            {metrics.profitMargin.toFixed(1)}% Margin
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">${(metrics.netProfit / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">YTD Net Profit</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{metrics.roi}%</div>
            <div className="text-xs text-muted-foreground">Est. ROI</div>
          </div>
        </div>

        {profitHistory.length > 0 ? (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={profitHistory}>
                <XAxis dataKey="month" fontSize={10} />
                <YAxis hide />
                <Tooltip formatter={(value) => [`$${typeof value === 'number' ? (value / 1000).toFixed(0) : 0}K`, 'Profit']} />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf620"
                  name="Monthly Profit"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
           <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
                <p className="text-muted-foreground text-sm">No profitability data available</p>
           </div>
        )}

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Department Margins</div>
          {departmentProfitability.length > 0 ? departmentProfitability.slice(0, 3).map((dept, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{dept.department}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium w-16 text-right">${(dept.profit / 1000).toFixed(0)}K</span>
                <Badge variant="outline" className={dept.margin > 15 ? "text-green-600" : "text-orange-600"}>{dept.margin}%</Badge>
              </div>
            </div>
          )) : (
            <div className="text-center text-xs text-muted-foreground py-2">No department data</div>
          )}
        </div>

        <div className="text-xs text-muted-foreground bg-purple-50 p-2 rounded">
          <strong>Profit Driver:</strong> Surgical services and cardiology showing highest profit margins.
        </div>
      </CardContent>
    </Card>
  );
};
