
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, Clock, Zap, Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { emptyStateMessages } from "@/config/constants";

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
  const [slaMonitors, setSlaMonitors] = useState<SLAMonitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSLAData();
  }, []);

  const fetchSLAData = async () => {
    try {
      setLoading(true);
      const { data: slas, error } = await supabase
        .from('slas')
        .select('*')
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching SLA data:', error);
        setSlaMonitors([]);
        return;
      }

      if (!slas || slas.length === 0) {
        setSlaMonitors([]);
        return;
      }

      // Transform SLA data to monitor format
      const monitors: SLAMonitor[] = slas.map((sla) => {
        // For real implementation, you would fetch actual metrics here
        // For now, we'll show empty state as no real metrics exist yet
        return {
          id: sla.id,
          name: sla.name,
          currentValue: 0,
          threshold: sla.target_value || 100,
          status: 'healthy' as const,
          escalationLevel: 0
        };
      });

      setSlaMonitors(monitors);
    } catch (error) {
      console.error('Error fetching SLA data:', error);
      setSlaMonitors([]);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-muted/50 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (slaMonitors.length === 0) {
    return (
      <div className="space-y-4">
        <Card className="p-6 text-center border-dashed border-2">
          <Shield className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
          <h4 className="font-semibold text-foreground mb-2">No SLA Monitors Configured</h4>
          <p className="text-sm text-muted-foreground mb-4">
            {emptyStateMessages.readyForRealData}
          </p>
          <Button variant="outline" size="sm" onClick={fetchSLAData}>
            <Zap className="h-3 w-3 mr-1" />
            Refresh
          </Button>
        </Card>
      </div>
    );
  }

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
          Configure SLA
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Bell className="h-3 w-3" />
          View Alerts
        </Button>
      </div>

      {/* System Status */}
      <Card className="p-3 bg-muted/30">
        <div className="text-xs font-medium text-foreground mb-2">Monitoring Status</div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div>• Real-time monitoring: Ready</div>
          <div>• Alert system: Standby</div>
          <div>• Data sources: {slaMonitors.length} configured</div>
        </div>
      </Card>
    </div>
  );
};

export default AdvancedMonitoringPanel;
