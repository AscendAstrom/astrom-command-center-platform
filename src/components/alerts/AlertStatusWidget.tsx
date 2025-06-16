
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bell, BellOff, Settings } from "lucide-react";
import { useAlertMonitoring } from '@/hooks/useAlertMonitoring';
import { useState } from 'react';

interface AlertStatusWidgetProps {
  onOpenManagement?: () => void;
}

const AlertStatusWidget = ({ onOpenManagement }: AlertStatusWidgetProps) => {
  const { recentAlerts, isMonitoring, toggleMonitoring } = useAlertMonitoring();
  const [isExpanded, setIsExpanded] = useState(false);

  const criticalAlertsCount = recentAlerts.filter(
    alert => alert.priority === 'CRITICAL' || alert.priority === 'HIGH'
  ).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-500 text-white';
      case 'HIGH': return 'bg-orange-500 text-white';
      case 'MEDIUM': return 'bg-yellow-500 text-white';
      case 'LOW': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    return `${Math.floor(diffHours / 24)}d`;
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {isMonitoring ? (
              <Bell className="h-5 w-5 text-green-500" />
            ) : (
              <BellOff className="h-5 w-5 text-gray-500" />
            )}
            Alert System
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMonitoring}
              className="h-8 w-8 p-0"
            >
              {isMonitoring ? (
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              ) : (
                <div className="w-2 h-2 bg-gray-400 rounded-full" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 p-0"
            >
              <Settings className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Status Summary */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">{recentAlerts.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">{criticalAlertsCount}</div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
          <div>
            <div className={`text-lg font-bold ${isMonitoring ? 'text-green-600' : 'text-gray-500'}`}>
              {isMonitoring ? 'ACTIVE' : 'PAUSED'}
            </div>
            <div className="text-xs text-muted-foreground">Status</div>
          </div>
        </div>

        {/* Recent Alerts (if expanded) */}
        {isExpanded && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground">Recent Alerts</div>
            {recentAlerts.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                <Bell className="h-6 w-6 mx-auto mb-1 opacity-50" />
                <p className="text-xs">No recent alerts</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {recentAlerts.slice(0, 5).map((alert, index) => (
                  <div
                    key={`${alert.ruleId}-${alert.timestamp.getTime()}`}
                    className="p-2 bg-muted/50 rounded text-xs"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`${getPriorityColor(alert.priority)} text-xs px-1`}>
                        {alert.priority}
                      </Badge>
                      <span className="text-muted-foreground">
                        {formatTimestamp(alert.timestamp)}
                      </span>
                    </div>
                    <p className="text-foreground line-clamp-2">{alert.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={onOpenManagement}
          >
            <Settings className="h-3 w-3 mr-1" />
            Manage
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={toggleMonitoring}
          >
            {isMonitoring ? (
              <>
                <BellOff className="h-3 w-3 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Bell className="h-3 w-3 mr-1" />
                Resume
              </>
            )}
          </Button>
        </div>

        {criticalAlertsCount > 0 && (
          <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">
                {criticalAlertsCount} critical alert{criticalAlertsCount > 1 ? 's' : ''} require attention
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertStatusWidget;
