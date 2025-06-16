
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bell, BellOff, Settings } from "lucide-react";
import { useState } from 'react';

interface AlertStatusWidgetProps {
  onOpenManagement?: () => void;
}

const AlertStatusWidget = ({ onOpenManagement }: AlertStatusWidgetProps) => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMonitoring = () => {
    setIsMonitoring(prev => !prev);
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
            <div className="text-lg font-bold text-foreground">0</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div>
            <div className="text-lg font-bold text-muted-foreground">0</div>
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
            <div className="text-center py-4 text-muted-foreground">
              <Bell className="h-6 w-6 mx-auto mb-1 opacity-50" />
              <p className="text-xs">No recent alerts</p>
              <p className="text-xs">Configure data sources to enable monitoring</p>
            </div>
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

        <div className="p-2 bg-muted/30 border border-muted-foreground/20 rounded-lg">
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">
              Configure data sources to enable alert monitoring
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertStatusWidget;
