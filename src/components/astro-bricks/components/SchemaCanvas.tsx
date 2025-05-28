
import React from 'react';
import { SchemaTable as SchemaTableComponent } from './SchemaTable';
import { SchemaTable, SchemaRelationship } from '../types';

interface SchemaCanvasProps {
  tables: SchemaTable[];
  relationships: SchemaRelationship[];
  scale: number;
  selectedTable: string | null;
  onTableSelect: (tableId: string) => void;
}

export const SchemaCanvas = ({ 
  tables, 
  relationships, 
  scale, 
  selectedTable, 
  onTableSelect 
}: SchemaCanvasProps) => {
  return (
    <div className="relative bg-background/30 rounded-lg border border-border h-96 overflow-hidden">
      <div 
        className="absolute inset-0 p-4"
        style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        {/* Render Tables */}
        {tables.map((table) => (
          <SchemaTableComponent
            key={table.id}
            table={table}
            isSelected={selectedTable === table.id}
            onClick={() => onTableSelect(table.id)}
          />
        ))}

        {/* Render Relationships (simplified lines) */}
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          {relationships.map((rel) => {
            const fromTable = tables.find(t => t.id === rel.fromTableId);
            const toTable = tables.find(t => t.id === rel.toTableId);
            
            if (!fromTable || !toTable) return null;
            
            const fromX = fromTable.position.x + 100;
            const fromY = fromTable.position.y + 50;
            const toX = toTable.position.x + 100;
            const toY = toTable.position.y + 50;
            
            return (
              <line
                key={rel.id}
                x1={fromX}
                y1={fromY}
                x2={toX}
                y2={toY}
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};
