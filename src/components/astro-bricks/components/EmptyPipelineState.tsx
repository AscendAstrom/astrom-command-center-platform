
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Database } from 'lucide-react';

interface EmptyPipelineStateProps {
  onCreatePipeline?: () => void;
}

export const EmptyPipelineState = ({ onCreatePipeline }: EmptyPipelineStateProps) => {
  return (
    <Card className="p-8 text-center bg-card border-border">
      <CardContent className="pt-6">
        <Database className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2 text-foreground">No Pipeline Selected</h3>
        <p className="text-muted-foreground mb-4">
          Select a pipeline from the list to view its details, or create a new one to get started.
        </p>
        {onCreatePipeline && (
          <Button onClick={onCreatePipeline}>
            <Plus className="h-4 w-4 mr-2" />
            Create Pipeline
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
