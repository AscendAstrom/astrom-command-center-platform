
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Plus, 
  GitBranch,
  Clock,
  Trash2
} from 'lucide-react';
import { DataPipeline } from '@/hooks/useDataPipelines';

interface PipelineListCardProps {
  pipelines: DataPipeline[];
  selectedPipeline: DataPipeline | null;
  readOnly: boolean;
  onCreatePipeline: () => void;
  onSelectPipeline: (pipeline: DataPipeline) => void;
  onTogglePipeline: (pipelineId: string) => void;
  onDeletePipeline?: (pipelineId: string) => void;
  onExecutePipeline?: (pipelineId: string) => void;
}

export const PipelineListCard = ({
  pipelines,
  selectedPipeline,
  readOnly,
  onCreatePipeline,
  onSelectPipeline,
  onTogglePipeline,
  onDeletePipeline,
  onExecutePipeline
}: PipelineListCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-400 border-green-400';
      case 'draft': return 'text-yellow-400 border-yellow-400';
      case 'deprecated': return 'text-red-400 border-red-400';
      default: return 'text-muted-foreground border-border';
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-foreground text-lg">Data Pipelines</CardTitle>
          {!readOnly && (
            <Button size="sm" onClick={onCreatePipeline}>
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {pipelines.map((pipeline) => (
          <div
            key={pipeline.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              selectedPipeline?.id === pipeline.id
                ? 'bg-cyan-500/20 border-cyan-500/50'
                : 'bg-muted/30 border-border hover:border-muted-foreground'
            }`}
            onClick={() => onSelectPipeline(pipeline)}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium text-foreground text-sm">{pipeline.name}</span>
              <Badge variant="outline" className={`text-xs ${getStatusColor(pipeline.status)}`}>
                {pipeline.status.toUpperCase()}
              </Badge>
            </div>
            
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {pipeline.description}
            </p>
            
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <GitBranch className="h-3 w-3" />
                <span>v{pipeline.version}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{pipeline.schedule_cron || 'Manual'}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">
                {pipeline.steps?.length || 0} steps
              </span>
              <div className="flex gap-1">
                {!readOnly && pipeline.status === 'ACTIVE' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePipeline(pipeline.id);
                    }}
                  >
                    <Pause className="h-3 w-3" />
                  </Button>
                )}
                {!readOnly && pipeline.status !== 'ACTIVE' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-green-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePipeline(pipeline.id);
                    }}
                  >
                    <Play className="h-3 w-3" />
                  </Button>
                )}
                {!readOnly && onDeletePipeline && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-red-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeletePipeline(pipeline.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
