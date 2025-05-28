
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsData } from '@/services/analytics';
import { Server, Shield, Activity, Cpu, HardDrive, Wifi } from 'lucide-react';
import RealtimeLineChart from '../charts/RealtimeLineChart';
import RealtimeAreaChart from '../charts/RealtimeAreaChart';

interface SystemHealthTabProps {
  data: AnalyticsData;
  isLive: boolean;
}

const SystemHealthTab = ({ data, isLive }: SystemHealthTabProps) => {
  const { systemHealth } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Server className="h-5 w-5 text-orange-400" />
          System Health & Performance
          {isLive && (
            <Badge variant="outline" className="text-green-400 border-green-400 animate-pulse">
              Live
            </Badge>
          )}
        </h3>
        
        <Badge variant="outline" className="text-green-400 border-green-400">
          <Shield className="h-3 w-3 mr-1" />
          Uptime {systemHealth.uptime.toFixed(1)}%
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30">
                <Cpu className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
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
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                <HardDrive className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
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
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                <Activity className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
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
              <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/30">
                <Shield className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {systemHealth.securityScore}
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
            <CardTitle className="text-foreground flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-400" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RealtimeLineChart
              data={data.chartData.systemHealth}
              dataKeys={['cpu', 'memory']}
              colors={['#ef4444', '#3b82f6']}
              height={200}
            />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Wifi className="h-5 w-5 text-green-400" />
              Network Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RealtimeAreaChart
              data={data.chartData.systemHealth}
              dataKeys={['network']}
              colors={['#10b981']}
              height={200}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemHealthTab;
