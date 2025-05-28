
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
  const [sourceFields] = useState<SourceField[]>([
    { id: '1', name: 'patient_id', type: 'string', description: 'Unique patient identifier', sample: 'PAT001' },
    { id: '2', name: 'admission_time', type: 'date', description: 'Patient admission timestamp', sample: '2024-01-15 14:30:00' },
    { id: '3', name: 'chief_complaint', type: 'string', description: 'Primary reason for visit', sample: 'Chest pain' },
    { id: '4', name: 'triage_level', type: 'number', description: 'Triage priority level', sample: '3' },
    { id: '5', name: 'zone_assignment', type: 'string', description: 'Assigned treatment zone', sample: 'ZONE_A' },
  ]);

  const [targetFields] = useState<TargetField[]>([
    { id: 't1', name: 'dim_patient_key', type: 'string', required: true, description: 'Patient dimension key' },
    { id: 't2', name: 'dim_zone_key', type: 'string', required: true, description: 'Zone dimension key' },
    { id: 't3', name: 'admission_datetime', type: 'date', required: true, description: 'Normalized admission time' },
    { id: 't4', name: 'chief_complaint_text', type: 'string', required: false, description: 'Complaint description' },
    { id: 't5', name: 'triage_priority', type: 'number', required: true, description: 'Triage priority score' },
  ]);

  const [mappings, setMappings] = useState<FieldMapping[]>([
    { id: 'm1', sourceFieldId: '1', targetFieldId: 't1' },
    { id: 'm2', sourceFieldId: '5', targetFieldId: 't2' },
    { id: 'm3', sourceFieldId: '2', targetFieldId: 't3', transformationRule: 'TIMESTAMP_CLEAN' },
  ]);

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
            {sourceFields.map((field) => (
              <SourceFieldCard
                key={field.id}
                field={field}
                onDragStart={handleDragStart}
                readOnly={readOnly}
              />
            ))}
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
            {targetFields.map((field) => {
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
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
