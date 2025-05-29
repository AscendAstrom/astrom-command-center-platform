
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataPipeline } from '@/hooks/useDataPipelines';

interface PipelineStepsCardProps {
  pipeline: DataPipeline;
  onUpdatePipeline?: (id: string, updates: Partial<DataPipeline>) => Promise<any>;
  readOnly?: boolean;
}

export const PipelineStepsCard = ({ pipeline, onUpdatePipeline, readOnly }: PipelineStepsCardProps) => {
  const getStepTypeColor = (type: string) => {
    switch (type) {
      case 'extract': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'transform': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'load': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  // Default steps if none exist
  const defaultSteps = [
    { id: '1', type: 'extract', name: 'Data Extraction', config: {}, order: 1 },
    { id: '2', type: 'transform', name: 'Data Transformation', config: {}, order: 2 },
    { id: '3', type: 'load', name: 'Data Loading', config: {}, order: 3 }
  ];

  const steps = pipeline.steps && pipeline.steps.length > 0 ? pipeline.steps : defaultSteps;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Pipeline Steps</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps
            .sort((a, b) => a.order - b.order)
            .map((step, index) => (
              <div key={step.id} className="flex items-center gap-4">
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
                {index < steps.length - 1 && (
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
