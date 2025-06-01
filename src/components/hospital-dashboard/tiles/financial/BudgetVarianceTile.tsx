
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingDown, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from "recharts";

export const BudgetVarianceTile = () => {
  const varianceData = [
    { category: 'Revenue', budget: 3000000, actual: 3200000, variance: 6.7 },
    { category: 'Labor', budget: 1200000, actual: 1180000, variance: -1.7 },
    { category: 'Supplies', budget: 400000, actual: 420000, variance: 5.0 },
    { category: 'Equipment', budget: 200000, actual: 185000, variance: -7.5 },
    { category: 'Utilities', budget: 150000, actual: 145000, variance: -3.3 }
  ];

  const monthlyTrend = [
    { month: 'Jan', variance: -2.1 },
    { month: 'Feb', variance: 1.8 },
    { month: 'Mar', variance: -0.5 },
    { month: 'Apr', variance: 2.3 },
    { month: 'May', variance: -1.2 },
    { month: 'Jun', variance: 1.5 }
  ];

  const metrics = {
    totalBudget: 4950000,
    totalActual: 5130000,
    overallVariance: 3.6,
    favorableVariances: 3,
    unfavorableVariances: 2
  };

  const alerts = [
    { item: 'Medical Supplies', variance: 15.2, reason: 'Emergency purchases' },
    { item: 'Overtime Costs', variance: 22.8, reason: 'Staffing shortage' },
    { item: 'Equipment Maintenance', variance: -12.4, reason: 'Deferred maintenance' }
  ];

  const getVarianceColor = (variance: number) => {
    if (variance > 5) return 'text-red-600 bg-red-50';
    if (variance < -5) return 'text-green-600 bg-green-50';
    return 'text-blue-600 bg-blue-50';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Calculator className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Budget Variance</CardTitle>
              <CardDescription>Budget vs actual analysis</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={metrics.overallVariance > 0 ? "text-red-600 border-red-200 bg-red-50" : "text-green-600 border-green-200 bg-green-50"}>
            {metrics.overallVariance > 0 ? '+' : ''}{metrics.overallVariance}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">${(metrics.totalBudget / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Budget</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">${(metrics.totalActual / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Actual</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={varianceData.slice(0, 4)}>
              <XAxis dataKey="category" fontSize={8} />
              <YAxis hide />
              <Tooltip formatter={(value) => [`${value > 0 ? '+' : ''}${value}%`, 'Variance']} />
              <Bar 
                dataKey="variance" 
                fill={(entry) => entry.variance > 0 ? '#ef4444' : '#22c55e'}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Category Variances</div>
          {varianceData.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{item.category}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">${(item.actual / 1000000).toFixed(1)}M</span>
                <Badge variant="outline" className={getVarianceColor(item.variance)}>
                  {item.variance > 0 ? '+' : ''}{item.variance}%
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <AlertTriangle className="h-3 w-3 text-orange-500" />
            <span className="font-semibold text-orange-600">Variance Alert</span>
          </div>
          <div className="text-muted-foreground">
            {alerts[0].item}: +{alerts[0].variance}% - {alerts[0].reason}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
