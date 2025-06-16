
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Network, 
  Zap, 
  BarChart3, 
  Database,
  Activity,
  ArrowRightLeft
} from "lucide-react";
import { ModuleConnection } from "../hooks/useCrossModuleIntegration";

interface ModuleConnectionsTabProps {
  connections: ModuleConnection[];
}

const ModuleConnectionsTab = ({ connections }: ModuleConnectionsTabProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'disconnected': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'error': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getDataFlowIcon = (flow: string) => {
    switch (flow) {
      case 'bidirectional': return <ArrowRightLeft className="h-4 w-4" />;
      case 'inbound': return <Activity className="h-4 w-4 rotate-180" />;
      case 'outbound': return <Activity className="h-4 w-4" />;
      default: return <Network className="h-4 w-4" />;
    }
  };

  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case 'astro-flow': return <Zap className="h-5 w-5 text-purple-400" />;
      case 'astro-view': return <BarChart3 className="h-5 w-5 text-blue-400" />;
      case 'astro-bricks': return <Database className="h-5 w-5 text-green-400" />;
      case 'astro-metrics': return <Activity className="h-5 w-5 text-orange-400" />;
      default: return <Network className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5 text-blue-400" />
          Module Connection Status
        </CardTitle>
        <CardDescription>
          Real-time status and health metrics for all connected modules
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {connections.map((connection) => (
            <div key={connection.moduleId} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-card rounded-lg">
                    {getModuleIcon(connection.moduleId)}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{connection.moduleName}</h4>
                    <p className="text-sm text-muted-foreground">{connection.moduleId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getStatusColor(connection.status)}>
                    {connection.status}
                  </Badge>
                  {getDataFlowIcon(connection.dataFlow)}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium text-foreground">Health Score</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={connection.healthScore} className="flex-1 h-2" />
                    <span className="text-sm text-muted-foreground">{connection.healthScore}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Data Flow</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {connection.dataFlow.charAt(0).toUpperCase() + connection.dataFlow.slice(1)}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Last Sync</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {connection.lastSync?.toLocaleTimeString() || 'Never'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleConnectionsTab;
