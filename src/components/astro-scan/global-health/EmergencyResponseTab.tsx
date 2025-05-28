
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Activity, Truck, Users } from "lucide-react";

export const EmergencyResponseTab = () => {
  const emergencyMetrics = {
    activeAlerts: 3,
    responseTime: "4.2min",
    coordinatedCountries: 12,
    resourcesDeployed: 847
  };

  const globalAlerts = [
    { region: "Southeast Asia", type: "Disease Outbreak", severity: "high", status: "responding", countries: 4 },
    { region: "Eastern Europe", type: "Supply Shortage", severity: "medium", status: "coordinating", countries: 3 },
    { region: "West Africa", type: "Capacity Crisis", severity: "low", status: "monitoring", countries: 5 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'responding': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'coordinating': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'monitoring': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-400" />
          Global Emergency Response System
        </CardTitle>
        <CardDescription>
          Worldwide pandemic early warning and coordinated emergency response
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="text-2xl font-bold text-orange-400">{emergencyMetrics.activeAlerts}</div>
            <div className="text-xs text-muted-foreground">Active Alerts</div>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{emergencyMetrics.responseTime}</div>
            <div className="text-xs text-muted-foreground">Avg Response Time</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{emergencyMetrics.coordinatedCountries}</div>
            <div className="text-xs text-muted-foreground">Coordinated Countries</div>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">{emergencyMetrics.resourcesDeployed}</div>
            <div className="text-xs text-muted-foreground">Resources Deployed</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Global Health Alerts</h4>
            <Button variant="outline" size="sm">
              <Activity className="h-4 w-4 mr-2" />
              Command Center
            </Button>
          </div>
          
          {globalAlerts.map((alert, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  <span className="font-medium">{alert.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(alert.status)}>
                    {alert.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Emergency Type</div>
                  <div className="font-medium">{alert.type}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Affected Countries</div>
                  <div className="font-medium">{alert.countries}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
          <h4 className="font-semibold text-foreground mb-2">Emergency Response Capabilities</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-orange-400" />
              <span>Global resource coordination</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-orange-400" />
              <span>International expert deployment</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-orange-400" />
              <span>Real-time situation monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-400" />
              <span>Predictive outbreak modeling</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
