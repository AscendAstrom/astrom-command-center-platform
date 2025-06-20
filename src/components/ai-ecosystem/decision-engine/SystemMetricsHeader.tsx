
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain } from 'lucide-react';
import { SystemMetrics } from '@/hooks/useAutonomousWorkflows';

interface SystemMetricsHeaderProps {
  systemMetrics: SystemMetrics;
}

const SystemMetricsHeader = ({ systemMetrics }: SystemMetricsHeaderProps) => {
  const getSystemStatus = () => {
    if (systemMetrics.avgConfidence > 90 && systemMetrics.systemLoad < 50) {
      return { text: "Optimal", className: "bg-green-500/10 text-green-500 border-green-500/20" };
    }
    if (systemMetrics.avgConfidence > 80) {
      return { text: "Healthy", className: "bg-blue-500/10 text-blue-500 border-blue-500/20" };
    }
    return { text: "Monitoring", className: "bg-orange-500/10 text-orange-500 border-orange-500/20" };
  };

  const systemStatus = getSystemStatus();

  return (
    <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Brain className="h-6 w-6 text-purple-400" />
          Autonomous Decision Engine
          <Badge className={systemStatus.className}>{systemStatus.text}</Badge>
        </CardTitle>
        <CardDescription>
          {`System is operating at ${systemMetrics.avgConfidence.toFixed(1)}% average confidence. Overseeing ${systemMetrics.activeWorkflows} active workflows and ${systemMetrics.learningModels} learning models.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{systemMetrics.totalDecisions.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Decisions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{systemMetrics.autonomousResolutions.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Auto Resolved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{systemMetrics.learningModels}</div>
            <div className="text-xs text-muted-foreground">Learning Models</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{systemMetrics.activeWorkflows}</div>
            <div className="text-xs text-muted-foreground">Active Workflows</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">{systemMetrics.avgConfidence.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Avg Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{systemMetrics.systemLoad}%</div>
            <div className="text-xs text-muted-foreground">System Load</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemMetricsHeader;
