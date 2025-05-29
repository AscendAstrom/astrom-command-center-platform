
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { GitBranch } from 'lucide-react';

export const EmptyPipelineState = () => {
  return (
    <Card className="bg-card border-border">
      <CardContent className="flex items-center justify-center h-64">
        <div className="text-center">
          <GitBranch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Select a pipeline to view details</p>
        </div>
      </CardContent>
    </Card>
  );
};
