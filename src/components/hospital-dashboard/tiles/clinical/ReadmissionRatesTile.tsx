
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, TrendingDown, AlertTriangle, Users } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, LineChart, Line } from "recharts";

export const ReadmissionRatesTile = () => {
  const readmissionData = [
    { month: 'Jan', rate: 12.8, target: 15.0, discharges: 342 },
    { month: 'Feb', rate: 13.2, target: 15.0, discharges: 318 },
    { month: 'Mar', rate: 11.9, target: 15.0, discharges: 365 },
    { month: 'Apr', rate: 12.1, target: 15.0, discharges: 339 },
    { month: 'May', rate: 11.5, target: 15.0, discharges: 356 },
    { month: 'Jun', rate: 10.8, target: 15.0, discharges: 372 }
  ];

  const riskFactors = [
    { factor: 'Heart Failure', rate: 18.5, count: 45 },
    { factor: 'COPD', rate: 16.2, count: 38 },
    { factor: 'Pneumonia', rate: 14.1, count: 29 },
    { factor: 'Sepsis', rate: 13.8, count: 24 },
    { factor: 'MI', rate: 12.3, count: 18 }
  ];

  const departmentRates = [
    { dept: 'Cardiology', rate: 15.2, discharges: 89 },
    { dept: 'Pulmonology', rate: 14.8, discharges: 76 },
    { dept: 'General Med', rate: 12.1, discharges: 156 },
    { dept: 'Surgery', rate: 8.9, discharges: 134 }
  ];

  const metrics = {
    overallRate: 10.8,
    targetRate: 15.0,
    reduction: 15.6,
    totalReadmissions: 42,
    avgTimeToReadmission: 8.5,
    preventableReadmissions: 28
  };

  const interventions = [
    { intervention: 'Discharge Planning', effectiveness: 85, patients: 156 },
    { intervention: 'Follow-up Calls', effectiveness: 78, patients: 234 },
    { intervention: 'Medication Reconciliation', effectiveness: 72, patients: 198 }
  ];

  const getBarColor = (rate: number) => {
    if (rate < 10) return '#22c55e';
    if (rate < 15) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <RotateCcw className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Readmission Rates</CardTitle>
              <CardDescription>30-day readmissions</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingDown className="h-3 w-3 mr-1" />
            {metrics.overallRate}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-orange-600">{metrics.totalReadmissions}</div>
            <div className="text-xs text-muted-foreground">This Month</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{metrics.avgTimeToReadmission}d</div>
            <div className="text-xs text-muted-foreground">Avg Time</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={readmissionData}>
              <XAxis dataKey="month" fontSize={10} />
              <YAxis hide />
              <Tooltip formatter={(value) => [`${typeof value === 'number' ? value.toFixed(1) : 0}%`, 'Rate']} />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#f97316" 
                strokeWidth={2}
                name="Readmission Rate"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#94a3b8" 
                strokeWidth={1}
                strokeDasharray="5 5"
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">High-Risk Conditions</div>
          {riskFactors.slice(0, 3).map((factor, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{factor.factor}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{factor.count}</span>
                <div className="w-8 h-1.5 bg-gray-200 rounded">
                  <div 
                    className={`h-full rounded`}
                    style={{ 
                      width: `${(factor.rate / 20) * 100}%`,
                      backgroundColor: getBarColor(factor.rate)
                    }}
                  />
                </div>
                <span className="font-medium">{factor.rate}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <TrendingDown className="h-3 w-3 text-green-500" />
            <span className="font-semibold text-green-600">Improvement</span>
          </div>
          <div className="text-muted-foreground">
            {metrics.reduction}% reduction vs last year. {metrics.preventableReadmissions} preventable cases avoided.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
