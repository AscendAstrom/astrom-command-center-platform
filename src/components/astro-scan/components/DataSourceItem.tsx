
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Database, Settings, Play, Pause, Trash2, AlertTriangle } from "lucide-react";
import type { DataSource, SyncStatus } from "../types";
import { getStatusColor, getHealthColor, formatNumber } from "../utils/dataSourceUtils";

interface DataSourceItemProps {
  source: DataSource;
  onUpdateStatus: (id: string, status: SyncStatus) => void;
  onDelete: (id: string) => void;
}

export const DataSourceItem = ({ source, onUpdateStatus, onDelete }: DataSourceItemProps) => {
  return (
    <div className="surface-elevated rounded-xl p-6 border border-border/30 hover-lift transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 gradient-bg-blue rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Database className="h-6 w-6 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground text-lg">{source.name}</h3>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className="text-xs border-astrom-blue/30 text-astrom-blue bg-astrom-blue/10"
              >
                {source.type}
              </Badge>
              <Badge 
                variant="outline" 
                className="text-xs border-astrom-purple/30 text-astrom-purple bg-astrom-purple/10"
              >
                {source.ingestion_mode}
              </Badge>
              <Badge 
                variant="outline" 
                className={`text-xs ${getStatusColor(source.status)}`}
              >
                {source.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* Records Info */}
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">
                {formatNumber(source.records_count || 0)}
              </span>
              <span className="text-sm text-muted-foreground">records</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Last sync: {source.last_sync ? 
                new Date(source.last_sync).toLocaleString() : 
                'Never'
              }
            </p>
          </div>

          {/* Health Score */}
          <div className="text-right space-y-2">
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold ${getHealthColor(source.health_score || 0)}`}>
                {source.health_score || 0}%
              </span>
              <span className="text-sm text-muted-foreground">health</span>
            </div>
            <Progress 
              value={source.health_score || 0} 
              className="w-24 h-2"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {source.status === 'PAUSED' ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateStatus(source.id, 'CONNECTED')}
                className="border-status-success/30 text-status-success hover:bg-status-success/10 hover-lift"
              >
                <Play className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateStatus(source.id, 'PAUSED')}
                className="border-status-warning/30 text-status-warning hover:bg-status-warning/10 hover-lift"
              >
                <Pause className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              className="border-border/30 text-muted-foreground hover:bg-muted/10 hover-lift"
            >
              <Settings className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(source.id)}
              className="border-status-error/30 text-status-error hover:bg-status-error/10 hover-lift"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {source.last_error && (
        <div className="mt-4 p-4 bg-status-error/10 border border-status-error/20 rounded-xl text-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-status-error" />
            <span className="font-medium text-status-error">Last Error</span>
          </div>
          <p className="text-status-error/80">{source.last_error}</p>
        </div>
      )}
    </div>
  );
};
