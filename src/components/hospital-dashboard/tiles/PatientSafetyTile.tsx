
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, MessageSquare } from "lucide-react";

export const PatientSafetyTile = () => {
  const metrics = {
    todayIncidents: 2,
    monthlyIncidents: 15,
    frequentIncidentType: "Medication Error",
    complaintsToday: 1,
    avgSentiment: 78
  };

  const incidentTypes = [
    { type: 'Medication Error', count: 5, trend: 'down' },
    { type: 'Fall', count: 3, trend: 'up' },
    { type: 'Equipment', count: 2, trend: 'stable' },
    { type: 'Communication', count: 5, trend: 'down' }
  ];

  const getSentimentColor = (score: number) => {
    if (score >= 80) return 'text-green-600 border-green-200 bg-green-50';
    if (score >= 60) return 'text-orange-600 border-orange-200 bg-orange-50';
    return 'text-red-600 border-red-200 bg-red-50';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Shield className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Patient Safety & Complaints</CardTitle>
              <CardDescription>Incident tracking & sentiment</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={getSentimentColor(metrics.avgSentiment)}>
            <MessageSquare className="h-3 w-3 mr-1" />
            {metrics.avgSentiment}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-orange-600">{metrics.todayIncidents}</div>
            <div className="text-xs text-muted-foreground">Incidents Today</div>
          </div>
          <div>
            <div className="text-xl font-bold text-blue-600">{metrics.complaintsToday}</div>
            <div className="text-xs text-muted-foreground">Complaints</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Frequent Incident Types</div>
          {incidentTypes.slice(0, 3).map((incident) => (
            <div key={incident.type} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm">{incident.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{incident.count}</span>
                <div className={`w-2 h-2 rounded-full ${
                  incident.trend === 'up' ? 'bg-red-500' :
                  incident.trend === 'down' ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Most Frequent Type</div>
          <div className="p-2 bg-orange-50 rounded-lg text-center">
            <div className="flex items-center justify-center gap-1">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span className="font-medium text-orange-700">{metrics.frequentIncidentType}</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
          <strong>Sentiment Analyzer:</strong> Patient satisfaction improved 5% this week. Communication training effective.
        </div>
      </CardContent>
    </Card>
  );
};
