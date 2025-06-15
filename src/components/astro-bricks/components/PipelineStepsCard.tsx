import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataPipeline, PipelineStep } from '../types';

interface PipelineStepsCardProps {
  pipeline: DataPipeline;
}

export const PipelineStepsCard = ({ pipeline }: PipelineStepsCardProps) => {
  const getStepTypeColor = (type: PipelineStep['type']) => {
    switch (type) {
      case 'extract': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'transform': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'load': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Pipeline Steps</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pipeline.steps
            .sort((a, b) => a.order - b.order)
            .map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium text-foreground">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className={`p-3 rounded-lg border ${getStepTypeColor(step.type)}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{step.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {step.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
                {index < pipeline.steps.length - 1 && (
                  <div className="flex-shrink-0 text-muted-foreground">
                    →
                  </div>
                )}
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};
