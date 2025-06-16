import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Bell, Settings, Trash2, Plus, Clock } from "lucide-react";
import { useAlertMonitoring } from '@/hooks/useAlertMonitoring';
import { toast } from 'sonner';

const AlertManagementPanel = () => {
  const {
    recentAlerts,
    alertRules,
    isMonitoring,
    toggleMonitoring,
    updateAlertRule,
    removeAlertRule,
    clearRecentAlerts,
    clearRuleCooldown,
    getCooldownStatus
  } = useAlertMonitoring();

  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-500 text-white border-red-500';
      case 'HIGH': return 'bg-orange-500 text-white border-orange-500';
      case 'MEDIUM': return 'bg-yellow-500 text-white border-yellow-500';
      case 'LOW': return 'bg-blue-500 text-white border-blue-500';
      default: return 'bg-gray-500 text-white border-gray-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'CRITICAL' || priority === 'HIGH') {
      return <AlertTriangle className="h-4 w-4" />;
    }
    return <Bell className="h-4 w-4" />;
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return timestamp.toLocaleDateString();
  };

  const handleToggleRule = (ruleId: string, enabled: boolean) => {
    const success = updateAlertRule(ruleId, { enabled });
    if (success) {
      toast.success(`Alert rule ${enabled ? 'enabled' : 'disabled'}`);
    } else {
      toast.error('Failed to update alert rule');
    }
  };

  const handleRemoveRule = (ruleId: string) => {
    const success = removeAlertRule(ruleId);
    if (success) {
      toast.success('Alert rule removed');
    } else {
      toast.error('Failed to remove alert rule');
    }
  };

  const handleClearCooldown = (ruleId: string) => {
    clearRuleCooldown(ruleId);
    toast.success('Cooldown cleared for alert rule');
  };

  const cooldownStatus = getCooldownStatus();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <CardTitle>Alert Management System</CardTitle>
                <CardDescription>
                  Real-time monitoring and alerting for critical hospital metrics
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Monitoring</span>
                <Switch
                  checked={isMonitoring}
                  onCheckedChange={toggleMonitoring}
                />
                <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Alerts
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={clearRecentAlerts}
                disabled={recentAlerts.length === 0}
              >
                Clear All
              </Button>
            </div>
            <CardDescription>
              Last {recentAlerts.length} triggered alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {recentAlerts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No recent alerts</p>
                <p className="text-sm">All systems operating normally</p>
              </div>
            ) : (
              recentAlerts.map((alert, index) => (
                <div
                  key={`${alert.ruleId}-${alert.timestamp.getTime()}`}
                  className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getPriorityIcon(alert.priority)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getPriorityColor(alert.priority)}>
                          {alert.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(alert.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        {alert.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {alert.metric}: {alert.currentValue} (threshold: {alert.threshold})
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Alert Rules */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Alert Rules
              </CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </div>
            <CardDescription>
              Configure monitoring rules and thresholds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {alertRules.map((rule) => {
              const isExpanded = expandedRule === rule.id;
              const cooldown = cooldownStatus.get(rule.id);
              
              return (
                <div
                  key={rule.id}
                  className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(rule.priority)}>
                        {rule.priority}
                      </Badge>
                      <span className="text-sm font-medium">{rule.metric}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={(enabled) => handleToggleRule(rule.id, enabled)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedRule(isExpanded ? null : rule.id)}
                      >
                        <Settings className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveRule(rule.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {rule.condition.replace('_', ' ')} {rule.threshold}
                  </p>
                  
                  {cooldown && (
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        Cooldown: {rule.cooldownMinutes}m
                      </Badge>
                      {new Date() < cooldown.nextAllowed && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleClearCooldown(rule.id)}
                          className="text-xs"
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                  )}
                  
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm text-foreground">{rule.message}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlertManagementPanel;
