
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Activity, TrendingUp, AlertTriangle } from "lucide-react";

const CopilotSummaryTile = () => {
  // Mock data since we no longer have patient tables
  const mockSummary = {
    totalPatients: 156,
    criticalAlerts: 3,
    aiRecommendations: 7,
    systemHealth: "Optimal",
    lastUpdate: "2 minutes ago"
  };

  const recommendations = [
    {
      type: "efficiency",
      message: "Consider redistributing staff in Emergency Department",
      priority: "medium"
    },
    {
      type: "resource",
      message: "ICU capacity approaching threshold",
      priority: "high"
    },
    {
      type: "quality",
      message: "Medication adherence rates improving",
      priority: "low"
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-500" />
          AI Copilot Summary
        </CardTitle>
        <CardDescription>Intelligent insights and recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-2xl font-bold">{mockSummary.totalPatients}</div>
            <div className="text-xs text-muted-foreground">Active Patients</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-orange-500">{mockSummary.criticalAlerts}</div>
            <div className="text-xs text-muted-foreground">Critical Alerts</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-sm">System Health</span>
            </div>
            <Badge variant="secondary" className="bg-green-500/10 text-green-600">
              {mockSummary.systemHealth}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span className="text-sm">AI Recommendations</span>
            </div>
            <Badge variant="outline">{mockSummary.aiRecommendations}</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Recent Recommendations:</div>
          {recommendations.slice(0, 2).map((rec, index) => (
            <div key={index} className="text-xs p-2 bg-muted/50 rounded border-l-2 border-blue-500">
              <div className="flex items-center gap-1 mb-1">
                <AlertTriangle className="h-3 w-3" />
                <Badge variant="outline" className="text-xs">
                  {rec.priority}
                </Badge>
              </div>
              <div className="text-muted-foreground">{rec.message}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-muted-foreground">
            Last updated: {mockSummary.lastUpdate}
          </div>
          <Button size="sm" variant="outline">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CopilotSummaryTile;
