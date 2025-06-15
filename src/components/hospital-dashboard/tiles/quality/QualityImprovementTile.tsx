import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const QualityImprovementTile = () => {
  const [metrics, setMetrics] = useState({
    overallImprovement: 0,
    completedInitiatives: 0,
    activeProjects: 0,
    targetsMet: 0
  });
  const [improvementData, setImprovementData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQualityData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('quality_measurements')
        .select(`
          measurement_date,
          value,
          quality_indicators ( name, target_value )
        `)
        .order('measurement_date', { ascending: true });
      
      if (error) {
        console.error("Error fetching quality data", error);
      } else if (data) {
        const formattedData = data.map(d => ({
          month: new Date(d.measurement_date).toLocaleString('default', { month: 'short' }),
          // @ts-ignore
          score: d.value,
          // @ts-ignore
          target: d.quality_indicators?.target_value
        }));
        setImprovementData(formattedData);

        if(data.length > 1) {
            // @ts-ignore
            const improvement = ((data[data.length-1].value - data[0].value) / data[0].value) * 100;
            setMetrics(prev => ({ ...prev, overallImprovement: Math.round(improvement) }));
        }
      }
      setLoading(false);
    };
    fetchQualityData();
  }, []);

  if (loading) {
    return (
        <Card className="h-full">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <Target className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Quality Improvement</CardTitle>
                            <CardDescription>Continuous improvement tracking</CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="animate-pulse space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-16 bg-gray-200 rounded"></div>
                        <div className="h-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-24 bg-gray-200 rounded"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
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
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Target className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Quality Improvement</CardTitle>
              <CardDescription>Continuous improvement tracking</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            {metrics.overallImprovement > 0 ? `+${metrics.overallImprovement}` : metrics.overallImprovement}% Score
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-green-600">{metrics.completedInitiatives}</div>
            <div className="text-xs text-muted-foreground">Completed Projects</div>
          </div>
          <div>
            <div className="text-xl font-bold text-blue-600">{metrics.activeProjects}</div>
            <div className="text-xs text-muted-foreground">Active Initiatives</div>
          </div>
        </div>

        {improvementData.length > 0 ? (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={improvementData}>
                <XAxis dataKey="month" fontSize={10} />
                <YAxis hide />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  name="Quality Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#94a3b8" 
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
           <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
                <p className="text-muted-foreground text-sm">No quality data available</p>
           </div>
        )}

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Active Initiatives</div>
           <div className="text-center py-2 text-xs text-muted-foreground">No active initiatives</div>
        </div>

        <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
          Connect to quality management systems for live initiative tracking.
        </div>
      </CardContent>
    </Card>
  );
};
