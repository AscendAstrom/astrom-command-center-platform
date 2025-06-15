import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingUp, Users } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const PatientOutcomesTile = () => {
  const [metrics, setMetrics] = useState({
    avgLengthOfStay: 0,
    satisfactionScore: 0,
    complicationRate: 0,
    mortalityRate: 0
  });
  const [outcomeData, setOutcomeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutcomes = async () => {
      setLoading(true);
      const { data: visits, error } = await supabase
        .from('patient_visits')
        .select('admission_date, discharge_date')
        .not('discharge_date', 'is', null);

      if (error) {
        console.error("Error fetching patient outcomes:", error);
        setLoading(false);
        return;
      }
      
      if (visits && visits.length > 0) {
        const totalStayDuration = visits.reduce((acc, visit) => {
          const admission = new Date(visit.admission_date);
          const discharge = new Date(visit.discharge_date!);
          const duration = (discharge.getTime() - admission.getTime()) / (1000 * 3600 * 24);
          return acc + duration;
        }, 0);

        const avgLengthOfStay = totalStayDuration / visits.length;
        
        // Mocked data for other metrics until real data is available
        const satisfactionScore = 8.7; 
        const complicationRate = 5.2;
        const mortalityRate = 2.8;

        setMetrics({
          avgLengthOfStay: parseFloat(avgLengthOfStay.toFixed(1)),
          satisfactionScore,
          complicationRate,
          mortalityRate
        });

        setOutcomeData([
            { name: 'Excellent', value: 45, color: '#22c55e' },
            { name: 'Good', value: 35, color: '#3b82f6' },
            { name: 'Fair', value: 15, color: '#f59e0b' },
            { name: 'Poor', value: 5, color: '#ef4444' }
        ]);
      }
      setLoading(false);
    };

    fetchOutcomes();
  }, []);
  
  if (loading) {
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
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-2 gap-4"><div className="h-12 bg-gray-200 rounded"></div><div className="h-12 bg-gray-200 rounded"></div></div>
            <div className="h-20 bg-gray-200 rounded-full w-20 mx-auto"></div>
            <div className="grid grid-cols-2 gap-2"><div className="h-10 bg-gray-200 rounded"></div><div className="h-10 bg-gray-200 rounded"></div></div>
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

        {outcomeData.length > 0 ? (
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
        ) : (
            <div className="h-20 flex items-center justify-center bg-muted/20 rounded">
                <p className="text-muted-foreground text-sm">No outcome data available</p>
            </div>
        )}

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
