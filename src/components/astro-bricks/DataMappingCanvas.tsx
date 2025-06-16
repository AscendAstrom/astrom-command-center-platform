
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

// Sample source fields from Epic EHR
const sampleSourceFields: SourceField[] = [
  {
    id: 'epic_patient_id',
    name: 'PAT_ID',
    type: 'VARCHAR(18)',
    description: 'Epic patient identifier',
    sample: 'Z7004242'
  },
  {
    id: 'epic_mrn',
    name: 'PAT_MRN_ID',
    type: 'VARCHAR(50)',
    description: 'Medical record number',
    sample: '1000028943'
  },
  {
    id: 'epic_first_name',
    name: 'PAT_FIRST_NAME',
    type: 'VARCHAR(64)',
    description: 'Patient first name',
    sample: 'John'
  },
  {
    id: 'epic_last_name',
    name: 'PAT_LAST_NAME',
    type: 'VARCHAR(64)',
    description: 'Patient last name',
    sample: 'Smith'
  },
  {
    id: 'epic_birth_date',
    name: 'BIRTH_DATE',
    type: 'DATE',
    description: 'Date of birth',
    sample: '1985-03-15'
  },
  {
    id: 'epic_gender',
    name: 'SEX_C',
    type: 'CHAR(1)',
    description: 'Gender code (M/F/O)',
    sample: 'M'
  },
  {
    id: 'epic_phone',
    name: 'HOME_PHONE',
    type: 'VARCHAR(20)',
    description: 'Home phone number',
    sample: '+966 11 123 4567'
  },
  {
    id: 'epic_address',
    name: 'ADD_LINE_1',
    type: 'VARCHAR(254)',
    description: 'Primary address line',
    sample: 'King Fahd Road, Al Olaya'
  }
];

// Sample target fields for FHIR Patient resource
const sampleTargetFields: TargetField[] = [
  {
    id: 'fhir_identifier',
    name: 'identifier',
    type: 'Identifier[]',
    description: 'Patient identifiers including MRN',
    required: true
  },
  {
    id: 'fhir_name',
    name: 'name',
    type: 'HumanName[]',
    description: 'Patient name components',
    required: true
  },
  {
    id: 'fhir_gender',
    name: 'gender',
    type: 'code',
    description: 'Administrative gender (male|female|other|unknown)',
    required: false
  },
  {
    id: 'fhir_birth_date',
    name: 'birthDate',
    type: 'date',
    description: 'Date of birth in YYYY-MM-DD format',
    required: false
  },
  {
    id: 'fhir_telecom',
    name: 'telecom',
    type: 'ContactPoint[]',
    description: 'Contact details including phone numbers',
    required: false
  },
  {
    id: 'fhir_address',
    name: 'address',
    type: 'Address[]',
    description: 'Patient addresses',
    required: false
  }
];

// Sample mappings
const sampleMappings: FieldMapping[] = [
  {
    id: 'map_1',
    sourceFieldId: 'epic_mrn',
    targetFieldId: 'fhir_identifier',
    transformationRule: 'Create identifier with system="http://hospital.local/mrn"'
  },
  {
    id: 'map_2',
    sourceFieldId: 'epic_first_name',
    targetFieldId: 'fhir_name',
    transformationRule: 'Map to name.given[0]'
  },
  {
    id: 'map_3',
    sourceFieldId: 'epic_gender',
    targetFieldId: 'fhir_gender',
    transformationRule: 'Transform M->male, F->female, O->other'
  },
  {
    id: 'map_4',
    sourceFieldId: 'epic_birth_date',
    targetFieldId: 'fhir_birth_date',
    transformationRule: 'Direct mapping with date validation'
  }
];

export const DataMappingCanvas = ({ readOnly = false }: DataMappingCanvasProps) => {
  const [sourceFields, setSourceFields] = useState<SourceField[]>(sampleSourceFields);
  const [targetFields, setTargetFields] = useState<TargetField[]>(sampleTargetFields);
  const [mappings, setMappings] = useState<FieldMapping[]>(sampleMappings);

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
              Source Fields (Epic EHR)
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
              Target Schema (FHIR R4 Patient)
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
