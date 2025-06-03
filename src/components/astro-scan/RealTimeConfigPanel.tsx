
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  Wifi, 
  WifiOff, 
  Clock, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from "lucide-react";
import { realTimeDataService, ConnectionStatus, DataQualityMetrics, RealTimeConfig } from "@/services/realTimeDataService";
import { emptyStateMessages } from "@/config/constants";

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
              <Settings className="h-5 w-5 text-astrom-blue" />
            </div>
            <div>
              <CardTitle className="text-lg">Real-time Configuration</CardTitle>
              <CardDescription>Configure data refresh and quality settings</CardDescription>
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
        {/* Connection Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {connectionStatus.isConnected ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
              <span className="text-sm font-medium">Connection</span>
            </div>
            <Badge variant="outline" className={getStatusColor(connectionStatus.status)}>
              {getStatusIcon(connectionStatus.status)}
              {connectionStatus.status}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Latency</span>
            </div>
            <div className="text-lg font-bold text-foreground">{connectionStatus.latency}ms</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Refresh Rate</span>
            </div>
            <div className="text-lg font-bold text-foreground">{formatRefreshInterval(config.refreshInterval)}</div>
          </div>
        </div>

        {/* Data Quality Metrics - Only show real data quality when available */}
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

        {/* Data Status Information */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">System Status</span>
          </div>
          <div className="text-xs text-blue-700">
            {emptyStateMessages.readyForRealData}
          </div>
        </div>

        {isExpanded && (
          <>
            {/* Refresh Interval Control */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Refresh Interval</label>
              <div className="space-y-2">
                <Slider
                  value={[config.refreshInterval]}
                  onValueChange={([value]) => handleConfigChange({ refreshInterval: value })}
                  min={5000}
                  max={300000}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5s</span>
                  <span>Current: {formatRefreshInterval(config.refreshInterval)}</span>
                  <span>5m</span>
                </div>
              </div>
            </div>

            {/* Data Variations */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Enable Data Variations</label>
                <Switch
                  checked={config.enableVariations}
                  onCheckedChange={(checked) => handleConfigChange({ enableVariations: checked })}
                />
              </div>
              {config.enableVariations && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Variation Intensity</label>
                  <Select 
                    value={config.variationIntensity} 
                    onValueChange={(value) => handleConfigChange({ variationIntensity: value as 'low' | 'medium' | 'high' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (±2%)</SelectItem>
                      <SelectItem value="medium">Medium (±5%)</SelectItem>
                      <SelectItem value="high">High (±10%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Advanced Settings */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Simulate Network Errors</label>
                <Switch
                  checked={config.simulateErrors}
                  onCheckedChange={(checked) => handleConfigChange({ simulateErrors: checked })}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Batch Size</label>
                <Slider
                  value={[config.batchSize]}
                  onValueChange={([value]) => handleConfigChange({ batchSize: value })}
                  min={1}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>Current: {config.batchSize}</span>
                  <span>50</span>
                </div>
              </div>
            </div>

            {/* Quality Alerts - Only show when there are actual issues */}
            {(qualityMetrics.staleDataCount > 0 || qualityMetrics.errorCount > 0) && (
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Data Quality Alerts</span>
                </div>
                {qualityMetrics.staleDataCount > 0 && (
                  <div className="text-xs text-orange-700">
                    {qualityMetrics.staleDataCount} stale data sources detected
                  </div>
                )}
                {qualityMetrics.errorCount > 0 && (
                  <div className="text-xs text-orange-700">
                    {qualityMetrics.errorCount} sync errors in the last hour
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeConfigPanel;
