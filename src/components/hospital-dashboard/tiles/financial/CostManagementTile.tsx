
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, DollarSign, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts";

export const CostManagementTile = () => {
  const costTrendData = [
    { month: 'Jan', total: 1200000, labor: 480000, supplies: 360000, overhead: 360000 },
    { month: 'Feb', total: 1150000, labor: 470000, supplies: 340000, overhead: 340000 },
    { month: 'Mar', total: 1300000, labor: 520000, supplies: 390000, overhead: 390000 },
    { month: 'Apr', total: 1250000, labor: 500000, supplies: 375000, overhead: 375000 },
    { month: 'May', total: 1180000, labor: 480000, supplies: 350000, overhead: 350000 },
    { month: 'Jun', total: 1220000, labor: 490000, supplies: 365000, overhead: 365000 }
  ];

  const costCategories = [
    { category: 'Labor Costs', amount: 490000, variance: -2.1, trend: 'decreasing' },
    { category: 'Medical Supplies', amount: 365000, variance: 3.2, trend: 'increasing' },
    { category: 'Utilities', amount: 125000, variance: -5.8, trend: 'decreasing' },
    { category: 'Equipment', amount: 85000, variance: 1.4, trend: 'stable' }
  ];

  const metrics = {
    totalCosts: 1220000,
    budgetVariance: -2.3,
    costPerPatient: 6180,
    savingsThisMonth: 45000
  };

  const costOptimizations = [
    { initiative: 'Supply Chain Optimization', savings: 25000, status: 'Active' },
    { initiative: 'Energy Efficiency', savings: 12000, status: 'Completed' },
    { initiative: 'Staffing Optimization', savings: 18000, status: 'In Progress' }
  ];

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
            <div className="text-2xl font-bold text-red-600">${(metrics.totalCosts / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Monthly Costs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">${(metrics.savingsThisMonth / 1000).toFixed(0)}K</div>
            <div className="text-xs text-muted-foreground">Savings This Month</div>
          </div>
        </div>

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

        <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
          <strong>Cost Optimization:</strong> ${costOptimizations.reduce((sum, opt) => sum + opt.savings, 0).toLocaleString()} saved through optimization initiatives.
        </div>
      </CardContent>
    </Card>
  );
};
