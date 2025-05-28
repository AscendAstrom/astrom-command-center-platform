
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Plus, 
  Trash2, 
  Database, 
  Target,
  Save,
  Download,
  Upload
} from 'lucide-react';
import { SourceField, TargetField, FieldMapping } from './types';

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
  const getTargetFieldById = (id: string) => targetFields.find(f => f.id === id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            {sourceFields.length} Source Fields
          </Badge>
          <Badge variant="outline" className="text-green-400 border-green-400">
            {targetFields.length} Target Fields
          </Badge>
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            {mappings.length} Mappings
          </Badge>
        </div>
        {!readOnly && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Mapping
            </Button>
          </div>
        )}
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
              <div
                key={field.id}
                draggable={!readOnly}
                onDragStart={() => handleDragStart(field.id)}
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
              const sourceField = mapping ? getSourceFieldById(mapping.sourceFieldId) : null;

              return (
                <div
                  key={field.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(field.id)}
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
                          onClick={() => removeMapping(mapping.id)}
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
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
