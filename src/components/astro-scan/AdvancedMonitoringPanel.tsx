
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, Clock, Zap, Bell } from "lucide-react";

interface SLAMonitor {
  id: string;
  name: string;
  currentValue: number;
  threshold: number;
  status: 'healthy' | 'warning' | 'critical';
  timeToBreach?: number;
  escalationLevel: number;
}

const AdvancedMonitoringPanel = () => {
  const [slaMonitors] = useState<SLAMonitor[]>([
    {
      id: '1',
      name: 'Data Freshness',
      currentValue: 3.2,
      threshold: 5.0,
      status: 'healthy',
      escalationLevel: 0
    },
    {
      id: '2',
      name: 'Quality Score',
      currentValue: 94.2,
      threshold: 95.0,
      status: 'warning',
      timeToBreach: 15,
      escalationLevel: 1
    },
    {
      id: '3',
      name: 'Sync Latency',
      currentValue: 8.7,
      threshold: 10.0,
      status: 'warning',
      timeToBreach: 45,
      escalationLevel: 1
    },
    {
      id: '4',
      name: 'Error Rate',
      currentValue: 0.2,
      threshold: 1.0,
      status: 'healthy',
      escalationLevel: 0
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'warning': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'critical': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const calculateProgress = (current: number, threshold: number, isReverse = false) => {
    if (isReverse) {
      return (current / threshold) * 100;
    }
    return Math.min(100, (current / threshold) * 100);
  };

  return (
    <div className="space-y-4">
      {/* SLA Monitors */}
      <div className="grid grid-cols-1 gap-3">
        {slaMonitors.map((monitor) => (
          <Card key={monitor.id} className="p-4 border border-border/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {getStatusIcon(monitor.status)}
                <span className="font-medium text-foreground text-sm">{monitor.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {monitor.timeToBreach && (
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {monitor.timeToBreach}min
                  </Badge>
                )}
                <Badge variant="outline" className={getStatusColor(monitor.status)}>
                  {monitor.status}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {monitor.currentValue} / {monitor.threshold}
                </span>
                <span className="text-muted-foreground">
                  {monitor.status === 'healthy' ? 'Within SLA' : 'Risk detected'}
                </span>
              </div>
              <Progress 
                value={calculateProgress(monitor.currentValue, monitor.threshold, monitor.name === 'Quality Score')} 
                className="h-1.5"
              />
            </div>

            {monitor.escalationLevel > 0 && (
              <div className="mt-3 flex items-center gap-2 text-xs text-yellow-600">
                <Bell className="h-3 w-3" />
                <span>Escalation Level {monitor.escalationLevel} - Team notified</span>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Zap className="h-3 w-3" />
          Auto-tune
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Bell className="h-3 w-3" />
          Alerts
        </Button>
      </div>

      {/* Escalation Status */}
      <Card className="p-3 bg-muted/30">
        <div className="text-xs font-medium text-foreground mb-2">Automated Escalation</div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div>• Level 1: Team notifications active</div>
          <div>• Level 2: Manager alerts pending</div>
          <div>• Level 3: Executive alerts standby</div>
        </div>
      </Card>
    </div>
  );
};

export default AdvancedMonitoringPanel;
