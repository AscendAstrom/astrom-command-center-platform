
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, Zap } from "lucide-react";

export const AlertsEscalationsTile = () => {
  const metrics = {
    openAlerts: 12,
    resolvedToday: 24,
    avgResponseTime: 8.5,
    criticalAlerts: 3
  };

  const recentAlerts = [
    { id: 1, type: 'Critical', message: 'ICU Bed 12 - Equipment malfunction', time: '2m ago', priority: 'high' },
    { id: 2, type: 'Warning', message: 'Lab results delayed - Sample ID 4521', time: '8m ago', priority: 'medium' },
    { id: 3, type: 'Info', message: 'Pharmacy stock low - Medication ABC', time: '15m ago', priority: 'low' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Alerts & Escalations</CardTitle>
              <CardDescription>Real-time alert monitoring</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
            <Zap className="h-3 w-3 mr-1" />
            {metrics.criticalAlerts} Critical
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-xl font-bold text-red-600">{metrics.openAlerts}</div>
            <div className="text-xs text-muted-foreground">Open</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-600">{metrics.resolvedToday}</div>
            <div className="text-xs text-muted-foreground">Resolved</div>
          </div>
          <div>
            <div className="text-xl font-bold text-blue-600">{metrics.avgResponseTime}m</div>
            <div className="text-xs text-muted-foreground">Avg Response</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Recent Alerts</div>
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="p-2 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`text-xs border ${getPriorityColor(alert.priority)}`}>
                      {alert.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <div className="text-sm">{alert.message}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1 p-2 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100">
            <CheckCircle className="h-3 w-3" />
            Resolve All
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 p-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100">
            <Clock className="h-3 w-3" />
            Escalate
          </button>
        </div>

        <div className="text-xs text-muted-foreground bg-red-50 p-2 rounded">
          <strong>Priority Rebalancer:</strong> 2 medium alerts upgraded to high based on context.
        </div>
      </CardContent>
    </Card>
  );
};
