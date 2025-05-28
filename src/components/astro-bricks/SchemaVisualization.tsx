
import React, { useState } from 'react';
import { SchemaTable, SchemaRelationship } from './types';
import { SchemaVisualizationToolbar } from './components/SchemaVisualizationToolbar';
import { SchemaCanvas } from './components/SchemaCanvas';
import { SchemaTableDetails } from './components/SchemaTableDetails';

export const SchemaVisualization = () => {
  const [tables] = useState<SchemaTable[]>([
    {
      id: 'fact_ed_inbound',
      name: 'fact_ed_inbound',
      type: 'fact',
      position: { x: 400, y: 200 },
      fields: [
        { id: 'f1', name: 'inbound_key', type: 'bigint', isPrimaryKey: true, isForeignKey: false, isRequired: true },
        { id: 'f2', name: 'patient_key', type: 'bigint', isPrimaryKey: false, isForeignKey: true, isRequired: true },
        { id: 'f3', name: 'zone_key', type: 'bigint', isPrimaryKey: false, isForeignKey: true, isRequired: true },
        { id: 'f4', name: 'admission_datetime', type: 'timestamp', isPrimaryKey: false, isForeignKey: false, isRequired: true },
        { id: 'f5', name: 'triage_priority', type: 'int', isPrimaryKey: false, isForeignKey: false, isRequired: true },
        { id: 'f6', name: 'chief_complaint', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isRequired: false }
      ]
    },
    {
      id: 'dim_patient',
      name: 'dim_patient',
      type: 'dimension',
      position: { x: 100, y: 100 },
      fields: [
        { id: 'd1', name: 'patient_key', type: 'bigint', isPrimaryKey: true, isForeignKey: false, isRequired: true },
        { id: 'd2', name: 'patient_id', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isRequired: true },
        { id: 'd3', name: 'first_name', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isRequired: false },
        { id: 'd4', name: 'last_name', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isRequired: false },
        { id: 'd5', name: 'date_of_birth', type: 'date', isPrimaryKey: false, isForeignKey: false, isRequired: false }
      ]
    },
    {
      id: 'dim_zone',
      name: 'dim_zone',
      type: 'dimension',
      position: { x: 700, y: 100 },
      fields: [
        { id: 'z1', name: 'zone_key', type: 'bigint', isPrimaryKey: true, isForeignKey: false, isRequired: true },
        { id: 'z2', name: 'zone_id', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isRequired: true },
        { id: 'z3', name: 'zone_name', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isRequired: true },
        { id: 'z4', name: 'zone_type', type: 'varchar', isPrimaryKey: false, isForeignKey: false, isRequired: false },
        { id: 'z5', name: 'capacity', type: 'int', isPrimaryKey: false, isForeignKey: false, isRequired: false }
      ]
    }
  ]);

  const [relationships] = useState<SchemaRelationship[]>([
    {
      id: 'r1',
      fromTableId: 'fact_ed_inbound',
      toTableId: 'dim_patient',
      fromFieldId: 'f2',
      toFieldId: 'd1',
      type: 'many-to-one'
    },
    {
      id: 'r2',
      fromTableId: 'fact_ed_inbound',
      toTableId: 'dim_zone',
      fromFieldId: 'f3',
      toFieldId: 'z1',
      type: 'many-to-one'
    }
  ]);

  const [scale, setScale] = useState(1);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
  const handleReset = () => setScale(1);

  return (
    <div className="space-y-4">
      <SchemaVisualizationToolbar
        tables={tables}
        relationships={relationships}
        scale={scale}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
      />

      <SchemaCanvas
        tables={tables}
        relationships={relationships}
        scale={scale}
        selectedTable={selectedTable}
        onTableSelect={setSelectedTable}
      />

      {selectedTable && (
        <SchemaTableDetails
          selectedTable={selectedTable}
          tables={tables}
          relationships={relationships}
        />
      )}
    </div>
  );
};
