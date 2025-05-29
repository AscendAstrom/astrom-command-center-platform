
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Activity, TrendingUp, Shield, Brain, AlertTriangle, Eye, Database } from "lucide-react";
import { AdvancedMonitoringPanel } from "./AdvancedMonitoringPanel";

interface MonitoringTabContentProps {
  onNavigate?: (path: string) => void;
  onTabNavigate?: (path: string, tab?: string) => void;
}

const MonitoringTabContent = ({ onNavigate, onTabNavigate }: MonitoringTabContentProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-400" />
                System Monitoring & Health Dashboard
              </CardTitle>
              <CardDescription>
                Comprehensive monitoring of all system components and AI agents
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onNavigate?.('/ai-ecosystem')}>
                <Brain className="h-4 w-4 mr-2" />
                AI Ecosystem
              </Button>
              <Button variant="outline" onClick={() => onTabNavigate?.('/astro-metrics', 'alerts')}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Alert Manager
              </Button>
              <Button onClick={() => onNavigate?.('/dashboard')}>
                <Eye className="h-4 w-4 mr-2" />
                Live Dashboard
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Button variant="outline" onClick={() => onNavigate?.('/astro-flow')}>
              <Activity className="h-4 w-4 mr-2" />
              Workflow Engine
            </Button>
            <Button variant="outline" onClick={() => onTabNavigate?.('/astro-metrics', 'sla-configuration')}>
              <TrendingUp className="h-4 w-4 mr-2" />
              SLA Management
            </Button>
            <Button variant="outline" onClick={() => onNavigate?.('/admin')}>
              <Shield className="h-4 w-4 mr-2" />
              Security Center
            </Button>
            <Button variant="outline" onClick={() => onTabNavigate?.('/astro-scan', 'sources')}>
              <Database className="h-4 w-4 mr-2" />
              Data Sources
            </Button>
          </div>

          <AdvancedMonitoringPanel />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">System Health</h4>
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Optimal</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CPU Usage</span>
                  <span className="text-green-400">23%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Memory</span>
                  <span className="text-green-400">45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Storage</span>
                  <span className="text-green-400">67%</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">AI Agents</h4>
                <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">14 Active</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SLA Sentinel</span>
                  <span className="text-blue-400">Running</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Flow Optimizer</span>
                  <span className="text-blue-400">Running</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Guardian</span>
                  <span className="text-blue-400">Running</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">Data Pipeline</h4>
                <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">Processing</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Throughput</span>
                  <span className="text-purple-400">1.2M/hr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quality Score</span>
                  <span className="text-purple-400">98.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Latency</span>
                  <span className="text-purple-400">45ms</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringTabContent;
