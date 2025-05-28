
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { SourceField } from '../types';

interface SourceFieldCardProps {
  field: SourceField;
  onDragStart: (fieldId: string) => void;
  readOnly: boolean;
}

export const SourceFieldCard = ({ field, onDragStart, readOnly }: SourceFieldCardProps) => {
  return (
    <div
      draggable={!readOnly}
      onDragStart={() => onDragStart(field.id)}
      className={`p-3 rounded-lg border transition-all ${
        readOnly 
          ? 'bg-muted border-border cursor-default' 
          : 'bg-muted/50 border-border hover:border-blue-400 cursor-grab active:cursor-grabbing'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-medium text-foreground">{field.name}</span>
        <Badge variant="secondary" className="text-xs">
          {field.type}
        </Badge>
      </div>
      {field.description && (
        <p className="text-sm text-muted-foreground mb-1">{field.description}</p>
      )}
      {field.sample && (
        <p className="text-xs text-muted-foreground/80">Sample: {field.sample}</p>
      )}
    </div>
  );
};
