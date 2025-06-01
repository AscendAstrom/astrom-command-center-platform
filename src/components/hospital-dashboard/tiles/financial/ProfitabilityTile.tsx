
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, TrendingUp, DollarSign } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts";

export const ProfitabilityTile = () => {
  const profitabilityData = [
    { month: 'Jan', revenue: 2400000, costs: 1800000, margin: 25 },
    { month: 'Feb', revenue: 2100000, costs: 1650000, margin: 21.4 },
    { month: 'Mar', revenue: 2800000, costs: 2000000, margin: 28.6 },
    { month: 'Apr', revenue: 2600000, costs: 1900000, margin: 26.9 },
    { month: 'May', revenue: 2900000, costs: 2050000, margin: 29.3 },
    { month: 'Jun', revenue: 3200000, costs: 2200000, margin: 31.3 }
  ];

  const departmentProfitability = [
    { department: 'Surgery', revenue: 4800000, costs: 3200000, margin: 33.3 },
    { department: 'Cardiology', revenue: 2400000, costs: 1680000, margin: 30.0 },
    { department: 'Emergency', revenue: 3200000, costs: 2400000, margin: 25.0 },
    { department: 'Radiology', revenue: 1600000, costs: 1200000, margin: 25.0 }
  ];

  const metrics = {
    netProfit: 1000000,
    profitMargin: 31.3,
    roi: 18.5,
    ebitda: 1250000
  };

  const profitDrivers = [
    { driver: 'Patient Volume', impact: '+12%', value: 285000 },
    { driver: 'Service Mix', impact: '+8%', value: 190000 },
    { driver: 'Cost Reduction', impact: '+5%', value: 120000 }
  ];

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

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Department Margins</div>
          {departmentProfitability.slice(0, 3).map((dept, index) => (
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
          ))}
        </div>

        <div className="text-xs text-muted-foreground bg-purple-50 p-2 rounded">
          <strong>Profit Driver:</strong> Patient volume increase contributed ${(profitDrivers[0].value / 1000).toFixed(0)}K additional profit.
        </div>
      </CardContent>
    </Card>
  );
};
