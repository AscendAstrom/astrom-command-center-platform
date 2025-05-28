
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dataSourceService } from '@/services/dataSourceService';
import { alertService } from '@/services/alertService';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { Activity, Database, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type DataSource = Tables<'data_sources'>;
type Alert = Tables<'alerts'>;

export const SystemHealth = () => {
  const { data: dataSources } = useRealTimeData<DataSource>({ table: 'data_sources' });
  const { data: alerts } = useRealTimeData<Alert>({ table: 'alerts' });

  const [systemStatus, setSystemStatus] = useState({
    overall: 'operational',
    dataSourcesHealth: 100,
    activeAlerts: 0,
    criticalAlerts: 0
  });

  useEffect(() => {
    if (dataSources && alerts) {
      const healthyDataSources = dataSources.filter(ds => ds.status === 'CONNECTED').length;
      const dataSourcesHealth = dataSources.length > 0 ? (healthyDataSources / dataSources.length) * 100 : 100;
      
      const activeAlerts = alerts.filter(alert => alert.status === 'ACTIVE').length;
      const criticalAlerts = alerts.filter(alert => 
        alert.status === 'ACTIVE' && alert.severity === 'CRITICAL'
      ).length;

      let overall = 'operational';
      if (criticalAlerts > 0) overall = 'critical';
      else if (dataSourcesHealth < 80 || activeAlerts > 5) overall = 'degraded';
      else if (dataSourcesHealth < 100 || activeAlerts > 0) overall = 'warning';

      setSystemStatus({
        overall,
        dataSourcesHealth,
        activeAlerts,
        criticalAlerts
      });
    }
  }, [dataSources, alerts]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'degraded':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'degraded':
        return 'bg-orange-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Health
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(systemStatus.overall)} animate-pulse`} />
            <Badge variant="outline" className="capitalize">
              {getStatusIcon(systemStatus.overall)}
              <span className="ml-1">{systemStatus.overall}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-foreground">Data Sources</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-foreground">
                {Math.round(systemStatus.dataSourcesHealth)}%
              </div>
              <div className="text-xs text-muted-foreground">
                {dataSources?.filter(ds => ds.status === 'CONNECTED').length || 0}/{dataSources?.length || 0} healthy
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-foreground">Active Alerts</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-foreground">
                {systemStatus.activeAlerts}
              </div>
              <div className="text-xs text-muted-foreground">
                total alerts
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-400" />
              <span className="text-sm text-foreground">Critical</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-foreground">
                {systemStatus.criticalAlerts}
              </div>
              <div className="text-xs text-muted-foreground">
                need attention
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
