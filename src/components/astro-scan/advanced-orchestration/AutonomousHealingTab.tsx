
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Brain, Activity, CheckCircle, AlertTriangle, Zap } from "lucide-react";

export const AutonomousHealingTab = () => {
  const healingMetrics = {
    systemHealth: 98.7,
    autoResolvedIssues: 247,
    preventedDowntime: "99.2%",
    healingAccuracy: 94.3
  };

  const activeHealingProcesses = [
    { name: "Epic Integration Timeout", status: "healing", progress: 75, eta: "2m" },
    { name: "HL7 Message Queue Backlog", status: "resolved", progress: 100, eta: "0m" },
    { name: "FHIR API Rate Limit", status: "healing", progress: 45, eta: "5m" },
    { name: "Database Connection Pool", status: "monitoring", progress: 20, eta: "15m" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'healing': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'monitoring': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'healing': return <Activity className="h-4 w-4" />;
      case 'monitoring': return <AlertTriangle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-400" />
          Autonomous System Healing
        </CardTitle>
        <CardDescription>
          AI-powered self-healing capabilities with predictive issue resolution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{healingMetrics.systemHealth}%</div>
            <div className="text-xs text-muted-foreground">System Health</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{healingMetrics.autoResolvedIssues}</div>
            <div className="text-xs text-muted-foreground">Auto-Resolved (24h)</div>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">{healingMetrics.preventedDowntime}</div>
            <div className="text-xs text-muted-foreground">Prevented Downtime</div>
          </div>
          <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="text-2xl font-bold text-orange-400">{healingMetrics.healingAccuracy}%</div>
            <div className="text-xs text-muted-foreground">Healing Accuracy</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Active Healing Processes</h4>
            <Button variant="outline" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Force Healing Scan
            </Button>
          </div>
          
          {activeHealingProcesses.map((process, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(process.status)}
                  <span className="font-medium">{process.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">ETA: {process.eta}</span>
                  <Badge variant="outline" className={getStatusColor(process.status)}>
                    {process.status}
                  </Badge>
                </div>
              </div>
              <Progress value={process.progress} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">{process.progress}% complete</div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
          <h4 className="font-semibold text-foreground mb-2">Healing Capabilities</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Automatic connection pool optimization</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Intelligent circuit breaker management</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Predictive resource scaling</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Self-healing workflow orchestration</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
