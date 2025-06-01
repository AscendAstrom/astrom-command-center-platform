
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, DollarSign } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";

export const PayerMixTile = () => {
  const payerMixData = [
    { name: 'Medicare', value: 42, amount: 1344000, color: '#3b82f6' },
    { name: 'Commercial', value: 35, amount: 1400000, color: '#22c55e' },
    { name: 'Medicaid', value: 18, amount: 576000, color: '#f59e0b' },
    { name: 'Self-Pay', value: 5, amount: 100000, color: '#ef4444' }
  ];

  const reimbursementRates = [
    { payer: 'Commercial', rate: 95.2, trend: 1.2 },
    { payer: 'Medicare', rate: 87.8, trend: -0.8 },
    { payer: 'Medicaid', rate: 78.5, trend: 0.5 },
    { payer: 'Self-Pay', rate: 45.3, trend: -2.1 }
  ];

  const metrics = {
    totalPatients: 3420,
    avgReimbursement: 85.2,
    commercialGrowth: 3.2,
    totalRevenue: 3420000
  };

  const monthlyTrends = [
    { month: 'Jan', commercial: 32, medicare: 44, medicaid: 19 },
    { month: 'Feb', commercial: 33, medicare: 43, medicaid: 19 },
    { month: 'Mar', commercial: 34, medicare: 42, medicaid: 18 },
    { month: 'Apr', commercial: 35, medicare: 42, medicaid: 18 }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Users className="h-5 w-5 text-indigo-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Payer Mix</CardTitle>
              <CardDescription>Insurance distribution & rates</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            {metrics.avgReimbursement}% Avg Rate
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-indigo-600">{metrics.totalPatients}</div>
            <div className="text-xs text-muted-foreground">Total Patients</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">${(metrics.totalRevenue / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Total Revenue</div>
          </div>
        </div>

        <div className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={payerMixData}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={35}
                dataKey="value"
              >
                {payerMixData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {payerMixData.map((payer) => (
            <div key={payer.name} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: payer.color }}
              />
              <span className="text-muted-foreground">{payer.name}</span>
              <span className="font-semibold ml-auto">{payer.value}%</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Reimbursement Rates</div>
          {reimbursementRates.slice(0, 3).map((rate, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{rate.payer}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{rate.rate}%</span>
                <span className={`text-xs ${rate.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {rate.trend > 0 ? '+' : ''}{rate.trend}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground bg-indigo-50 p-2 rounded">
          <strong>Mix Optimization:</strong> Commercial payer growth of +{metrics.commercialGrowth}% improving overall margins.
        </div>
      </CardContent>
    </Card>
  );
};
