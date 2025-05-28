
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsData } from '@/services/analyticsDataService';
import { Server, Cpu, MemoryStick, Wifi, Shield, Clock } from 'lucide-react';

interface SystemHealthTabProps {
  data: AnalyticsData;
  isLive: boolean;
}

const SystemHealthTab = ({ data, isLive }: SystemHealthTabProps) => {
  const { systemHealth } = data;

  const getHealthColor = (value: number, type: 'usage' | 'score' | 'uptime') => {
    if (type === 'usage') {
      if (value > 80) return 'text-red-400';
      if (value > 60) return 'text-yellow-400';
      return 'text-green-400';
    }
    if (type === 'score' || type === 'uptime') {
      if (value >= 95) return 'text-green-400';
      if (value >= 85) return 'text-yellow-400';
      return 'text-red-400';
    }
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Server className="h-5 w-5 text-orange-400" />
          System Health Monitor
          {isLive && (
            <Badge variant="outline" className="text-green-400 border-green-400 animate-pulse">
              Live
            </Badge>
          )}
        </h3>
        
        <Badge variant="outline" className={getHealthColor(systemHealth.uptime, 'uptime')}>
          <Clock className="h-3 w-3 mr-1" />
          {systemHealth.uptime.toFixed(1)}% Uptime
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                <Cpu className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className={`text-2xl font-bold animate-fade-in ${getHealthColor(systemHealth.cpuUsage, 'usage')}`}>
                  {systemHealth.cpuUsage}%
                </p>
                <p className="text-sm text-muted-foreground">CPU Usage</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                <MemoryStick className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className={`text-2xl font-bold animate-fade-in ${getHealthColor(systemHealth.memoryUsage, 'usage')}`}>
                  {systemHealth.memoryUsage}%
                </p>
                <p className="text-sm text-muted-foreground">Memory Usage</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/30">
                <Wifi className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {systemHealth.networkLatency}ms
                </p>
                <p className="text-sm text-muted-foreground">Network Latency</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/30">
                <Clock className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className={`text-2xl font-bold animate-fade-in ${getHealthColor(systemHealth.uptime, 'uptime')}`}>
                  {systemHealth.uptime.toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30">
                <Shield className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <p className={`text-2xl font-bold animate-fade-in ${getHealthColor(systemHealth.securityScore, 'score')}`}>
                  {systemHealth.securityScore}%
                </p>
                <p className="text-sm text-muted-foreground">Security Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Resource Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-lg flex items-center justify-center">
              <p className="text-sm text-muted-foreground">System resource charts</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Security Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 rounded-lg flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Security monitoring dashboard</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemHealthTab;
