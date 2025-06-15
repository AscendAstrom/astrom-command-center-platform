import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";

export const ProfitabilityTile = () => {
  const [metrics, setMetrics] = useState({
    netProfit: 0,
    profitMargin: 0,
    roi: 0
  });
  const [profitabilityData, setProfitabilityData] = useState<any[]>([]);
  const [departmentProfitability, setDepartmentProfitability] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement data fetching from a profitability/financial table when available.
    setLoading(false);
  }, []);

  if (loading) {
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
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <PieChart className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Profitability</CardTitle>
              <CardDescription>Margin analysis & drivers</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            {metrics.profitMargin}% Margin
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">${(metrics.netProfit / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Net Profit</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{metrics.roi}%</div>
            <div className="text-xs text-muted-foreground">ROI</div>
          </div>
        </div>

        {profitabilityData.length > 0 ? (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={profitabilityData}>
                <XAxis dataKey="month" fontSize={10} />
                <YAxis hide />
                <Tooltip formatter={(value) => [
                  typeof value === 'number' && value > 1000 ? `$${(value / 1000000).toFixed(1)}M` : `${value}%`,
                  'Value'
                ]} />
                <Area 
                  type="monotone" 
                  dataKey="margin" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf620"
                  name="Profit Margin %"
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
                <div className="w-12 h-1.5 bg-gray-200 rounded">
                  <div 
                    className="h-full bg-purple-500 rounded" 
                    style={{ width: `${(dept.margin / 40) * 100}%` }}
                  />
                </div>
                <span className="font-medium w-8">{dept.margin}%</span>
              </div>
            </div>
          )) : (
            <div className="text-center text-xs text-muted-foreground py-2">No department data</div>
          )}
        </div>

        <div className="text-xs text-muted-foreground bg-purple-50 p-2 rounded">
          <strong>Profit Driver:</strong> Connect to financial systems for profitability analysis.
        </div>
      </CardContent>
    </Card>
  );
};
