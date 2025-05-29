
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Database, Settings, Eye, TrendingUp, AlertTriangle } from "lucide-react";
import { IngestionDashboard } from "./IngestionDashboard";

interface IngestionTabContentProps {
  onNavigate?: (path: string) => void;
  onTabNavigate?: (path: string, tab?: string) => void;
}

const IngestionTabContent = ({ onNavigate, onTabNavigate }: IngestionTabContentProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-400" />
                Real-time Data Ingestion Pipeline
              </CardTitle>
              <CardDescription>
                Monitor and manage data flow from all connected healthcare sources
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onNavigate?.('/astro-bricks')}>
                <Settings className="h-4 w-4 mr-2" />
                Configure Pipeline
              </Button>
              <Button variant="outline" onClick={() => onTabNavigate?.('/astro-metrics', 'alerts')}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Alerts Manager
              </Button>
              <Button onClick={() => onNavigate?.('/astro-view')}>
                <Eye className="h-4 w-4 mr-2" />
                View Dashboards
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Button variant="outline" onClick={() => onTabNavigate?.('/astro-scan', 'sources')}>
              <Database className="h-4 w-4 mr-2" />
              Manage Sources
            </Button>
            <Button variant="outline" onClick={() => onTabNavigate?.('/astro-metrics', 'kpi-builder')}>
              <TrendingUp className="h-4 w-4 mr-2" />
              KPI Builder
            </Button>
            <Button variant="outline" onClick={() => onNavigate?.('/astro-flow')}>
              <Activity className="h-4 w-4 mr-2" />
              Workflow Rules
            </Button>
            <Button variant="outline" onClick={() => onNavigate?.('/settings')}>
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </Button>
          </div>

          <IngestionDashboard />

          <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-foreground">Ingestion Performance Summary</h4>
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                All Systems Operational
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">99.7%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">1.2M</div>
                <div className="text-xs text-muted-foreground">Records/Hour</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">45ms</div>
                <div className="text-xs text-muted-foreground">Avg Latency</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">12</div>
                <div className="text-xs text-muted-foreground">Active Sources</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IngestionTabContent;
