
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

interface AIInsight {
  type: string;
  priority: string;
  title: string;
  description: string;
  confidence: number;
  impact: string;
}

interface AIStrategicInsightsProps {
  aiInsights: AIInsight[];
}

const AIStrategicInsights = ({ aiInsights }: AIStrategicInsightsProps) => {
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
          {aiInsights.map((insight, index) => (
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
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{insight.confidence}%</div>
                  <div className="text-xs text-muted-foreground">Confidence</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  Impact: {insight.impact}
                </Badge>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIStrategicInsights;
