
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Activity, AlertTriangle, CheckCircle, Plus, Settings } from "lucide-react";
import { sampleDataSources } from "./data/sampleDataSources";

export const DataSourceList = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-green-400 border-green-400 bg-green-400/10';
      case 'WARNING': return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
      case 'PAUSED': return 'text-orange-400 border-orange-400 bg-orange-400/10';
      case 'ERROR': return 'text-red-400 border-red-400 bg-red-400/10';
      default: return 'text-muted-foreground border-border bg-muted/10';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 95) return 'text-green-400';
    if (health >= 85) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatLastSync = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Connected Data Sources</h3>
          <p className="text-sm text-muted-foreground">
            Manage and monitor your healthcare data integration points
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Data Source
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sampleDataSources.map((source) => (
          <Card key={source.id} className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Database className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base text-foreground">{source.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {source.description}
                    </CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={getStatusColor(source.status)}>
                    {source.status === 'ACTIVE' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {source.status === 'WARNING' && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {source.status === 'PAUSED' && <Activity className="h-3 w-3 mr-1" />}
                    {source.status}
                  </Badge>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getHealthColor(source.health_score)}`}>
                      {source.health_score}%
                    </div>
                    <div className="text-xs text-muted-foreground">Health</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Records</div>
                    <div className="font-medium text-foreground">
                      {source.records_count.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Last Sync</div>
                    <div className="font-medium text-foreground">
                      {formatLastSync(source.last_sync)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {source.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                  <div className="font-medium mb-1">Technical Details:</div>
                  <div>Type: {source.type} • Version: {source.metadata.version}</div>
                  <div>Endpoint: {source.metadata.endpoint}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
