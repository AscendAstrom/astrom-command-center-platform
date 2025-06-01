
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle } from "lucide-react";

export const InfectionControlTile = () => {
  const metrics = {
    isolationRoomsUsed: 8,
    totalIsolationRooms: 15,
    aiInfectionRisk: 12,
    outbreakIndicator: false
  };

  const riskLevel = metrics.aiInfectionRisk <= 5 ? 'low' : 
                   metrics.aiInfectionRisk <= 15 ? 'medium' : 'high';
  
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 border-green-200 bg-green-50';
      case 'medium': return 'text-orange-600 border-orange-200 bg-orange-50';
      case 'high': return 'text-red-600 border-red-200 bg-red-50';
      default: return 'text-gray-600 border-gray-200 bg-gray-50';
    }
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
              <CardTitle className="text-lg">Infection Control</CardTitle>
              <CardDescription>Isolation & outbreak monitoring</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={getRiskColor()}>
            Risk: {riskLevel.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {metrics.isolationRoomsUsed}/{metrics.totalIsolationRooms}
            </div>
            <div className="text-xs text-muted-foreground">Isolation Rooms</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{metrics.aiInfectionRisk}%</div>
            <div className="text-xs text-muted-foreground">AI Risk Score</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Risk Indicators</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-gray-50 rounded text-center">
              <div className="text-sm font-bold">Contact Tracing</div>
              <div className="text-xs text-green-600">Active</div>
            </div>
            <div className="p-2 bg-gray-50 rounded text-center">
              <div className="text-sm font-bold">PPE Compliance</div>
              <div className="text-xs text-green-600">98%</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Outbreak Status</div>
          <div className={`p-2 rounded-lg text-center ${
            metrics.outbreakIndicator ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {metrics.outbreakIndicator ? (
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Outbreak Detected</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">No Active Outbreak</span>
              </div>
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-orange-50 p-2 rounded">
          <strong>Risk Assessor:</strong> Elevated risk in ICU wing. Enhanced monitoring recommended.
        </div>
      </CardContent>
    </Card>
  );
};
