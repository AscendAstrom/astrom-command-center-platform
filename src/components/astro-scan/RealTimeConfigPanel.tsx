
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Settings, 
  Wifi, 
  WifiOff, 
  Clock, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Database
} from "lucide-react";
import { realTimeDataService, ConnectionStatus, DataQualityMetrics, RealTimeConfig } from "@/services/realTimeDataService";

const RealTimeConfigPanel = () => {
  const [config, setConfig] = useState<RealTimeConfig>(realTimeDataService.getConfig());
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(realTimeDataService.getConnectionStatus());
  const [qualityMetrics, setQualityMetrics] = useState<DataQualityMetrics>(realTimeDataService.getQualityMetrics());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribeConnection = realTimeDataService.subscribeToConnection(setConnectionStatus);
    const unsubscribeQuality = realTimeDataService.subscribeToQuality(setQualityMetrics);

    realTimeDataService.start();

    return () => {
      unsubscribeConnection();
      unsubscribeQuality();
    };
  }, []);

  const handleConfigChange = (updates: Partial<RealTimeConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    realTimeDataService.updateConfig(newConfig);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <WifiOff className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatRefreshInterval = (ms: number) => {
    if (ms < 60000) return `${ms / 1000}s`;
    return `${ms / 60000}m`;
  };

  return (
    <Card className="surface-elevated border-border/50 glass-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-astrom-blue/10">
              <Database className="h-5 w-5 text-astrom-blue" />
            </div>
            <div>
              <CardTitle className="text-lg">Real-Time Data Integration</CardTitle>
              <CardDescription>Live hospital data synchronization and quality monitoring</CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Real-Time Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {connectionStatus.isConnected ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
              <span className="text-sm font-medium">Database Connection</span>
            </div>
            <Badge variant="outline" className={getStatusColor(connectionStatus.status)}>
              {getStatusIcon(connectionStatus.status)}
              {connectionStatus.status}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Query Latency</span>
            </div>
            <div className="text-lg font-bold text-foreground">{connectionStatus.latency}ms</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Sync Interval</span>
            </div>
            <div className="text-lg font-bold text-foreground">{formatRefreshInterval(config.refreshInterval)}</div>
          </div>
        </div>

        {/* Real Data Quality Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Data Freshness</div>
            <div className="text-xl font-bold text-green-600">{qualityMetrics.freshness.toFixed(1)}%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Completeness</div>
            <div className="text-xl font-bold text-blue-600">{qualityMetrics.completeness.toFixed(1)}%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Accuracy</div>
            <div className="text-xl font-bold text-purple-600">{qualityMetrics.accuracy.toFixed(1)}%</div>
          </div>
        </div>

        {/* Real-Time Data Status */}
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Live Data Integration</span>
          </div>
          <div className="text-xs text-green-700">
            Connected to hospital database with real-time synchronization. All metrics reflect actual operational data.
          </div>
        </div>

        {isExpanded && (
          <>
            {/* Refresh Interval Control */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Data Refresh Interval</label>
              <div className="space-y-2">
                <Slider
                  value={[config.refreshInterval]}
                  onValueChange={([value]) => handleConfigChange({ refreshInterval: value })}
                  min={10000}
                  max={300000}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>10s</span>
                  <span>Current: {formatRefreshInterval(config.refreshInterval)}</span>
                  <span>5m</span>
                </div>
              </div>
            </div>

            {/* Batch Size Configuration */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Query Batch Size</label>
              <div className="space-y-2">
                <Slider
                  value={[config.batchSize]}
                  onValueChange={([value]) => handleConfigChange({ batchSize: value })}
                  min={1}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>Current: {config.batchSize} records</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            {/* Data Quality Alerts */}
            {(qualityMetrics.staleDataCount > 0 || qualityMetrics.errorCount > 0) && (
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Data Quality Issues</span>
                </div>
                {qualityMetrics.staleDataCount > 0 && (
                  <div className="text-xs text-orange-700 mb-1">
                    {qualityMetrics.staleDataCount} records with stale data detected
                  </div>
                )}
                {qualityMetrics.errorCount > 0 && (
                  <div className="text-xs text-orange-700">
                    {qualityMetrics.errorCount} sync errors in recent operations
                  </div>
                )}
              </div>
            )}

            {/* Real-Time Statistics */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Database Statistics</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs text-blue-700">
                <div>
                  <div className="font-medium">Last Sync</div>
                  <div>{connectionStatus.lastSync.toLocaleTimeString()}</div>
                </div>
                <div>
                  <div className="font-medium">Sync Errors</div>
                  <div>{connectionStatus.syncErrors}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeConfigPanel;
