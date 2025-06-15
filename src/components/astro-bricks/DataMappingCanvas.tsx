import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Target } from 'lucide-react';
import { SourceField, TargetField, FieldMapping } from './types';
import { SourceFieldCard } from './components/SourceFieldCard';
import { TargetFieldCard } from './components/TargetFieldCard';
import { MappingStatsBar } from './components/MappingStatsBar';
import { MappingToolbar } from './components/MappingToolbar';

interface DataMappingCanvasProps {
  readOnly?: boolean;
}

export const DataMappingCanvas = ({ readOnly = false }: DataMappingCanvasProps) => {
  // Mock data removed. This data should be fetched based on a selected data source.
  const [sourceFields, setSourceFields] = useState<SourceField[]>([]);
  const [targetFields, setTargetFields] = useState<TargetField[]>([]);
  const [mappings, setMappings] = useState<FieldMapping[]>([]);

  const [draggedField, setDraggedField] = useState<string | null>(null);

  const handleDragStart = useCallback((fieldId: string) => {
    if (!readOnly) {
      setDraggedField(fieldId);
    }
  }, [readOnly]);

  const handleDrop = useCallback((targetFieldId: string) => {
    if (readOnly || !draggedField) return;

    const newMapping: FieldMapping = {
      id: `m${Date.now()}`,
      sourceFieldId: draggedField,
      targetFieldId: targetFieldId,
    };

    setMappings(prev => [...prev.filter(m => m.targetFieldId !== targetFieldId), newMapping]);
    setDraggedField(null);
  }, [draggedField, readOnly]);

  const removeMapping = useCallback((mappingId: string) => {
    if (!readOnly) {
      setMappings(prev => prev.filter(m => m.id !== mappingId));
    }
  }, [readOnly]);

  const getSourceFieldById = (id: string) => sourceFields.find(f => f.id === id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <MappingStatsBar 
          sourceFieldsCount={sourceFields.length}
          targetFieldsCount={targetFields.length}
          mappingsCount={mappings.length}
        />
        <MappingToolbar readOnly={readOnly} />
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Source Fields */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-400" />
              Source Fields
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sourceFields.length > 0 ? sourceFields.map((field) => (
              <SourceFieldCard
                key={field.id}
                field={field}
                onDragStart={handleDragStart}
                readOnly={readOnly}
              />
            )) : (
              <div className="text-center py-10 text-muted-foreground">
                Select a data source to see its fields.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Target Fields */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Target className="h-5 w-5 text-green-400" />
              Target Schema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {targetFields.length > 0 ? targetFields.map((field) => {
              const mapping = mappings.find(m => m.targetFieldId === field.id);
              const sourceField = mapping ? getSourceFieldById(mapping.sourceFieldId) : undefined;

              return (
                <TargetFieldCard
                  key={field.id}
                  field={field}
                  mapping={mapping}
                  sourceField={sourceField}
                  onDrop={handleDrop}
                  onRemoveMapping={removeMapping}
                  readOnly={readOnly}
                />
              );
            }) : (
              <div className="text-center py-10 text-muted-foreground">
                Select a data pipeline to see the target schema.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
