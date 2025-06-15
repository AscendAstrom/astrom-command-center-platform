
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";


interface AIInsight {
  type: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
}

const AIStrategicInsights = () => {
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('alerts')
        .select('title, message, severity')
        .in('severity', ['CRITICAL', 'HIGH'])
        .eq('status', 'ACTIVE')
        .limit(3)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching AI insights from alerts:", error);
        setAiInsights([]);
      } else if (data) {
        const insights: AIInsight[] = data.map(alert => ({
          type: 'Operational Alert',
          priority: alert.severity === 'CRITICAL' ? 'high' : 'medium',
          title: alert.title,
          description: alert.message,
        }));
        setAiInsights(insights);
      }
      setLoading(false);
    };

    fetchInsights();
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-cyan-400" />
          AI Strategic Intelligence
        </CardTitle>
        <CardDescription>
          Machine learning-driven strategic recommendations and forecasting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 2 }).map((_, index) => <Skeleton key={index} className="h-32 w-full" />)
          ) : aiInsights.length > 0 ? (
            aiInsights.map((insight, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10">
                      <Brain className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{insight.title}</h4>
                      <Badge variant="outline" className={getPriorityColor(insight.priority)}>
                        {insight.priority} priority
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                <div className="flex items-center justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 border border-dashed rounded-lg">
              <Info className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <h4 className="text-foreground font-medium">No Insights Available</h4>
              <p className="text-muted-foreground text-sm">The AI has not generated any new insights.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIStrategicInsights;
