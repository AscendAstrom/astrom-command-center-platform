
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Settings,
  History,
  Eye
} from 'lucide-react';
import { DataPipeline } from '../types';

interface PipelineDetailsCardProps {
  pipeline: DataPipeline;
  readOnly: boolean;
  onToggleVersionHistory: () => void;
}

export const PipelineDetailsCard = ({
  pipeline,
  readOnly,
  onToggleVersionHistory
}: PipelineDetailsCardProps) => {
  const getStatusColor = (status: DataPipeline['status']) => {
    switch (status) {
      case 'active': return 'text-green-400 border-green-400';
      case 'draft': return 'text-yellow-400 border-yellow-400';
      case 'deprecated': return 'text-red-400 border-red-400';
      default: return 'text-muted-foreground border-border';
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-foreground">{pipeline.name}</CardTitle>
            <p className="text-muted-foreground mt-1">{pipeline.description}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={onToggleVersionHistory}>
              <History className="h-4 w-4 mr-2" />
              History
            </Button>
            {!readOnly && (
              <>
                <Button size="sm" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
                <Button size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </>
            )}
            {readOnly && (
              <Badge variant="outline" className="text-amber-400 border-amber-400">
                <Eye className="h-3 w-3 mr-1" />
                View Only
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Status:</span>
            <div className="mt-1">
              <Badge variant="outline" className={getStatusColor(pipeline.status)}>
                {pipeline.status.toUpperCase()}
              </Badge>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Version:</span>
            <div className="mt-1 text-foreground">v{pipeline.version}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Schedule:</span>
            <div className="mt-1 text-foreground font-mono text-xs">
              {pipeline.schedule || 'Manual execution'}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Created by:</span>
            <div className="mt-1 text-foreground text-xs">{pipeline.createdBy}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
