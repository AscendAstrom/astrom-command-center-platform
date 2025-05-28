
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2 } from 'lucide-react';
import { TargetField, FieldMapping, SourceField } from '../types';

interface TargetFieldCardProps {
  field: TargetField;
  mapping?: FieldMapping;
  sourceField?: SourceField;
  onDrop: (targetFieldId: string) => void;
  onRemoveMapping: (mappingId: string) => void;
  readOnly: boolean;
}

export const TargetFieldCard = ({ 
  field, 
  mapping, 
  sourceField, 
  onDrop, 
  onRemoveMapping, 
  readOnly 
}: TargetFieldCardProps) => {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(field.id)}
      className={`p-3 rounded-lg border transition-all ${
        mapping 
          ? 'bg-green-500/10 border-green-500/30' 
          : 'bg-muted border-border border-dashed'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-medium text-foreground">{field.name}</span>
        <div className="flex gap-1">
          <Badge variant="secondary" className="text-xs">
            {field.type}
          </Badge>
          {field.required && (
            <Badge variant="destructive" className="text-xs">
              Required
            </Badge>
          )}
        </div>
      </div>
      {field.description && (
        <p className="text-sm text-muted-foreground mb-2">{field.description}</p>
      )}
      
      {mapping && sourceField && (
        <div className="bg-muted/50 rounded p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-green-400" />
            <span className="text-sm text-green-400">{sourceField.name}</span>
            {mapping.transformationRule && (
              <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                {mapping.transformationRule}
              </Badge>
            )}
          </div>
          {!readOnly && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRemoveMapping(mapping.id)}
              className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}
      
      {!mapping && !readOnly && (
        <div className="text-center py-2">
          <span className="text-xs text-muted-foreground">Drop source field here</span>
        </div>
      )}
    </div>
  );
};
