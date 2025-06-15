
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from 'lucide-react';
import { DataPipeline } from '../types';

interface VersionHistoryCardProps {
  pipeline: DataPipeline;
}

export const VersionHistoryCard = ({ pipeline }: VersionHistoryCardProps) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Version History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[...Array(pipeline.version || 1)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <span className="font-medium text-foreground">Version {(pipeline.version || 1) - i}</span>
                <p className="text-sm text-muted-foreground">
                  {i === 0 ? 'Current version' : 'Previous version'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {new Date(Date.now() - i * 86400000).toISOString().split('T')[0]}
                </span>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
