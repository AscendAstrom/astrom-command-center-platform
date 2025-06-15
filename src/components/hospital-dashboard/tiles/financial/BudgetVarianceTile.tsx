
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { useBudgetVarianceData } from "@/hooks/useBudgetVarianceData";
import { Skeleton } from "@/components/ui/skeleton";

export const BudgetVarianceTile = () => {
  const { data: budgetData, isLoading } = useBudgetVarianceData();

  if (isLoading || !budgetData) {
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
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4"><Skeleton className="h-12" /><Skeleton className="h-12" /></div>
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </CardContent>
      </Card>
    );
  }

  const { varianceData, totalBudget, totalActual, overallVariance } = budgetData;

  const getVarianceColor = (variance: number) => {
    if (variance > 5) return 'text-red-600 bg-red-50';
    if (variance < -5) return 'text-green-600 bg-green-50';
    return 'text-blue-600 bg-blue-50';
  };

  const getBarColor = (variance: number) => {
    return variance > 0 ? '#ef4444' : '#22c55e';
  };

  const alert = varianceData.find(item => Math.abs(item.variance) > 10);

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
          <Badge variant="outline" className={overallVariance > 0 ? "text-red-600 border-red-200 bg-red-50" : "text-green-600 border-green-200 bg-green-50"}>
            {overallVariance > 0 ? '+' : ''}{overallVariance}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">${(totalBudget / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Budget</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">${(totalActual / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Actual</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={varianceData.filter(d => d.category !== 'Revenue').slice(0, 4)}>
              <XAxis dataKey="category" fontSize={8} />
              <YAxis hide />
              <Tooltip formatter={(value) => [`${typeof value === 'number' && value > 0 ? '+' : ''}${value}%`, 'Variance']} />
              <Bar dataKey="variance" radius={[2, 2, 0, 0]}>
                {varianceData.filter(d => d.category !== 'Revenue').slice(0, 4).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.variance)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Category Variances</div>
          {varianceData.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{item.category}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">${(item.actual / 1000).toFixed(0)}K</span>
                <Badge variant="outline" className={getVarianceColor(item.variance)}>
                  {item.variance > 0 ? '+' : ''}{item.variance}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        {alert && (
            <div className="bg-orange-50 p-2 rounded text-xs">
              <div className="flex items-center gap-1 mb-1">
                <AlertTriangle className="h-3 w-3 text-orange-500" />
                <span className="font-semibold text-orange-600">Variance Alert</span>
              </div>
              <div className="text-muted-foreground">
                {alert.category}: {alert.variance > 0 ? '+' : ''}{alert.variance}% variance
              </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
};
