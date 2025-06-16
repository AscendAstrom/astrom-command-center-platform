import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Activity, AlertTriangle, CheckCircle, TrendingUp, Shield } from "lucide-react";
import AdvancedMonitoringSection from "@/components/astro-scan/sections/AdvancedMonitoringSection";

const MonitoringTabContent = () => {
  const mockMonitoringData = {
    systemHealth: {
      overall: 'HEALTHY',
      uptime: 99.8,
      responseTime: 45,
      errorRate: 0.02
    },
    alerts: [
      {
        id: '1',
        type: 'WARNING',
        message: 'Emergency Data Feed latency increased to 350ms',
        source: 'Emergency Services Network',
        timestamp: new Date(Date.now() - 300000),
        severity: 'MEDIUM'
      },
      {
        id: '2',
        type: 'INFO',
        message: 'Insurance Claims Portal scheduled maintenance completed',
        source: 'Insurance Claims Portal',
        timestamp: new Date(Date.now() - 1200000),
        severity: 'LOW'
      },
      {
        id: '3',
        type: 'SUCCESS',
        message: 'Saudi MOH FHIR Gateway health check passed',
        source: 'Saudi MOH FHIR Gateway',
        timestamp: new Date(Date.now() - 1800000),
        severity: 'LOW'
      }
    ],
    dataSources: [
      { name: 'Saudi MOH FHIR Gateway', status: 'ACTIVE', health: 96, lastSync: '2 min ago' },
      { name: 'Riyadh General Hospital EHR', status: 'ACTIVE', health: 94, lastSync: '5 min ago' },
      { name: 'King Fahd Hospital Labs', status: 'ACTIVE', health: 98, lastSync: '1 min ago' },
      { name: 'PACS Imaging Network', status: 'WARNING', health: 87, lastSync: '45 min ago' },
      { name: 'Pharmacy Management System', status: 'ACTIVE', health: 91, lastSync: '8 min ago' },
      { name: 'Emergency Services Network', status: 'ACTIVE', health: 95, lastSync: '3 min ago' },
      { name: 'Insurance Claims Portal', status: 'PAUSED', health: 75, lastSync: '2 hours ago' }
    ],
    performance: {
      throughput: '2.4K/min',
      latency: '145ms',
      availability: '99.8%',
      dataQuality: '94.2%'
    },
    monitoring: {
      activeSources: 7,
      alertsToday: 12,
      incidentsResolved: 8,
      averageResolutionTime: '15 min'
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-green-400 border-green-400';
      case 'WARNING': return 'text-yellow-400 border-yellow-400';
      case 'PAUSED': return 'text-orange-400 border-orange-400';
      case 'ERROR': return 'text-red-400 border-red-400';
      default: return 'text-muted-foreground border-border';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'SUCCESS': return 'text-green-400 border-green-400';
      case 'WARNING': return 'text-yellow-400 border-yellow-400';
      case 'ERROR': return 'text-red-400 border-red-400';
      default: return 'text-blue-400 border-blue-400';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 95) return 'text-green-400';
    if (health >= 85) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/30">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockMonitoringData.systemHealth.uptime}%</p>
                <p className="text-sm text-muted-foreground">System Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                <Activity className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockMonitoringData.systemHealth.responseTime}ms</p>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockMonitoringData.performance.throughput}</p>
                <p className="text-sm text-muted-foreground">Data Throughput</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockMonitoringData.systemHealth.errorRate}%</p>
                <p className="text-sm text-muted-foreground">Error Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Sources Status */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-400" />
              Data Sources Status
            </CardTitle>
            <CardDescription>
              Real-time monitoring of all connected data sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockMonitoringData.dataSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={getStatusColor(source.status)}>
                      {source.status}
                    </Badge>
                    <div>
                      <div className="font-medium text-foreground">{source.name}</div>
                      <div className="text-sm text-muted-foreground">Last sync: {source.lastSync}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getHealthColor(source.health)}`}>
                      {source.health}%
                    </div>
                    <div className="text-xs text-muted-foreground">Health</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              Recent Alerts
            </CardTitle>
            <CardDescription>
              Latest system alerts and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMonitoringData.alerts.map((alert) => (
                <div key={alert.id} className="p-3 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className={getAlertColor(alert.type)}>
                      {alert.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {alert.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-sm text-foreground mb-1">{alert.message}</div>
                  <div className="text-xs text-muted-foreground">Source: {alert.source}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5 text-cyan-400" />
            Performance & Quality Metrics
          </CardTitle>
          <CardDescription>
            Key performance indicators and data quality metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {mockMonitoringData.performance.throughput}
              </div>
              <div className="text-sm text-muted-foreground">Data Throughput</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {mockMonitoringData.performance.latency}
              </div>
              <div className="text-sm text-muted-foreground">Average Latency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {mockMonitoringData.performance.availability}
              </div>
              <div className="text-sm text-muted-foreground">Availability</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">
                {mockMonitoringData.performance.dataQuality}
              </div>
              <div className="text-sm text-muted-foreground">Data Quality</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AdvancedMonitoringSection />
    </div>
  );
};

export default MonitoringTabContent;
