
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingUp, Users } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";

export const PatientOutcomesTile = () => {
  const outcomeData = [
    { name: 'Excellent', value: 45, color: '#22c55e' },
    { name: 'Good', value: 35, color: '#3b82f6' },
    { name: 'Fair', value: 15, color: '#f59e0b' },
    { name: 'Poor', value: 5, color: '#ef4444' }
  ];

  const mortalityData = [
    { department: 'ICU', rate: 8.2 },
    { department: 'Surgery', rate: 2.1 },
    { department: 'Emergency', rate: 3.5 },
    { department: 'General', rate: 1.8 }
  ];

  const metrics = {
    avgLengthOfStay: 4.2,
    mortalityRate: 2.8,
    satisfactionScore: 8.7,
    complicationRate: 5.2
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Patient Outcomes</CardTitle>
              <CardDescription>Clinical results & satisfaction</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            Improving
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-blue-600">{metrics.avgLengthOfStay}d</div>
            <div className="text-xs text-muted-foreground">Avg Length of Stay</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-600">{metrics.satisfactionScore}/10</div>
            <div className="text-xs text-muted-foreground">Satisfaction</div>
          </div>
        </div>

        <div className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={outcomeData}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={35}
                dataKey="value"
              >
                {outcomeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-red-50 p-2 rounded text-center">
            <div className="font-bold text-red-600">{metrics.mortalityRate}%</div>
            <div className="text-muted-foreground">Mortality Rate</div>
          </div>
          <div className="bg-orange-50 p-2 rounded text-center">
            <div className="font-bold text-orange-600">{metrics.complicationRate}%</div>
            <div className="text-muted-foreground">Complications</div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
          <strong>Clinical Insights:</strong> Patient satisfaction up 12% this quarter. Length of stay reduced by 0.8 days.
        </div>
      </CardContent>
    </Card>
  );
};
