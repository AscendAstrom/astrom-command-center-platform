
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Download
} from 'lucide-react';
import { SchemaTable, SchemaRelationship } from '../types';

interface SchemaVisualizationToolbarProps {
  tables: SchemaTable[];
  relationships: SchemaRelationship[];
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export const SchemaVisualizationToolbar = ({
  tables,
  relationships,
  scale,
  onZoomIn,
  onZoomOut,
  onReset
}: SchemaVisualizationToolbarProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <Badge variant="outline" className="text-purple-400 border-purple-400">
          {tables.filter(t => t.type === 'fact').length} Fact Tables
        </Badge>
        <Badge variant="outline" className="text-green-400 border-green-400">
          {tables.filter(t => t.type === 'dimension').length} Dimension Tables
        </Badge>
        <Badge variant="outline" className="text-blue-400 border-blue-400">
          {relationships.length} Relationships
        </Badge>
      </div>
      
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={onZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};
