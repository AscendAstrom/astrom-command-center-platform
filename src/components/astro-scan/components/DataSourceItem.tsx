
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Database, Settings, Play, Pause, Trash2 } from "lucide-react";
import type { DataSource, SyncStatus } from "../types";
import { getStatusColor, getHealthColor, formatNumber } from "../utils/dataSourceUtils";

interface DataSourceItemProps {
  source: DataSource;
  onUpdateStatus: (id: string, status: SyncStatus) => void;
  onDelete: (id: string) => void;
}

export const DataSourceItem = ({ source, onUpdateStatus, onDelete }: DataSourceItemProps) => {
  return (
    <div className="p-4 rounded-lg border border-slate-800 bg-slate-800/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
            <Database className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{source.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {source.type}
              </Badge>
              <Badge variant="outline" className="text-xs">
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

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm text-slate-300">
              {formatNumber(source.records_count || 0)} records
            </p>
            <p className="text-xs text-slate-400">
              Last sync: {source.last_sync ? 
                new Date(source.last_sync).toLocaleString() : 
                'Never'
              }
            </p>
          </div>

          <div className="text-right">
            <p className={`text-sm font-medium ${getHealthColor(source.health_score || 0)}`}>
              {source.health_score || 0}% health
            </p>
            <Progress 
              value={source.health_score || 0} 
              className="w-20 h-2 mt-1"
            />
          </div>

          <div className="flex items-center gap-2">
            {source.status === 'PAUSED' ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateStatus(source.id, 'CONNECTED')}
                className="border-slate-700 text-green-400 hover:bg-green-900/20"
              >
                <Play className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateStatus(source.id, 'PAUSED')}
                className="border-slate-700 text-yellow-400 hover:bg-yellow-900/20"
              >
                <Pause className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <Settings className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(source.id)}
              className="border-slate-700 text-red-400 hover:bg-red-900/20"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {source.last_error && (
        <div className="mt-3 p-2 bg-red-900/20 border border-red-800 rounded text-sm text-red-300">
          Last error: {source.last_error}
        </div>
      )}
    </div>
  );
};
