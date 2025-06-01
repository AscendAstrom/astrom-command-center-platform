
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts";

export const RevenueAnalyticsTile = () => {
  const revenueData = [
    { month: 'Jan', revenue: 2400000, target: 2200000 },
    { month: 'Feb', revenue: 2100000, target: 2200000 },
    { month: 'Mar', revenue: 2800000, target: 2200000 },
    { month: 'Apr', revenue: 2600000, target: 2200000 },
    { month: 'May', revenue: 2900000, target: 2200000 },
    { month: 'Jun', revenue: 3200000, target: 2200000 }
  ];

  const metrics = {
    totalRevenue: 16000000,
    monthlyGrowth: 12.5,
    yearOverYear: 8.3,
    revenuePerPatient: 8500
  };

  const departmentRevenue = [
    { department: 'Surgery', revenue: 4800000, percentage: 30 },
    { department: 'Emergency', revenue: 3200000, percentage: 20 },
    { department: 'Cardiology', revenue: 2400000, percentage: 15 },
    { department: 'Oncology', revenue: 1600000, percentage: 10 }
  ];

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
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            +{metrics.monthlyGrowth}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">${(metrics.totalRevenue / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">YTD Revenue</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">${(metrics.revenuePerPatient / 1000).toFixed(1)}K</div>
            <div className="text-xs text-muted-foreground">Per Patient</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <XAxis dataKey="month" fontSize={10} />
              <YAxis hide />
              <Tooltip formatter={(value) => [`$${typeof value === 'number' ? (value / 1000000).toFixed(1) : 0}M`, 'Revenue']} />
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

        <div className="space-y-2">
          {departmentRevenue.slice(0, 2).map((dept) => (
            <div key={dept.department} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{dept.department}</span>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1.5 bg-gray-200 rounded">
                  <div 
                    className="h-full bg-green-500 rounded" 
                    style={{ width: `${dept.percentage * 3}%` }}
                  />
                </div>
                <span className="font-medium">${(dept.revenue / 1000000).toFixed(1)}M</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
          <strong>Revenue AI:</strong> Predicted revenue increase of 15% next quarter based on current trends.
        </div>
      </CardContent>
    </Card>
  );
};
