
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Network, RefreshCw } from "lucide-react";
import { ModuleConnection } from "../hooks/useCrossModuleIntegration";

interface IntegrationOverviewCardProps {
  connections: ModuleConnection[];
  integrationHealth: number;
  crossModuleData: any;
  isIntegrating: boolean;
  onSync: () => void;
}

const IntegrationOverviewCard = ({
  connections,
  integrationHealth,
  crossModuleData,
  isIntegrating,
  onSync
}: IntegrationOverviewCardProps) => {
  return (
    <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-6 w-6 text-blue-400" />
          Cross-Module Integration Hub
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
            {connections.filter(c => c.status === 'connected').length} Connected
          </Badge>
        </CardTitle>
        <CardDescription>
          Seamless data orchestration across AstroFlow, AstroView, AstroBricks, and AstroMetrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{integrationHealth}%</div>
            <div className="text-xs text-muted-foreground">Integration Health</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{connections.length}</div>
            <div className="text-xs text-muted-foreground">Active Modules</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {crossModuleData?.workflows?.length || 0}
            </div>
            <div className="text-xs text-muted-foreground">Active Workflows</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">
              {crossModuleData?.astroBricks?.activePipelines || 0}
            </div>
            <div className="text-xs text-muted-foreground">Data Pipelines</div>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Last sync: {connections[0]?.lastSync?.toLocaleTimeString() || 'Never'}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSync}
            disabled={isIntegrating}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isIntegrating ? 'animate-spin' : ''}`} />
            {isIntegrating ? 'Syncing...' : 'Sync Now'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationOverviewCard;
