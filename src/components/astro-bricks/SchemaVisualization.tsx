
import React, { useState } from 'react';
import { SchemaTable, SchemaRelationship } from './types';
import { SchemaVisualizationToolbar } from './components/SchemaVisualizationToolbar';
import { SchemaCanvas } from './components/SchemaCanvas';
import { SchemaTableDetails } from './components/SchemaTableDetails';

// Mock data for healthcare database schema
const mockTables: SchemaTable[] = [
  {
    id: 'patients',
    name: 'patients',
    type: 'dimension',
    position: { x: 50, y: 50 },
    fields: [
      { id: 'patient_id', name: 'patient_id', type: 'UUID', isPrimaryKey: true, isRequired: true },
      { id: 'mrn', name: 'mrn', type: 'VARCHAR(20)', isRequired: true },
      { id: 'first_name', name: 'first_name', type: 'VARCHAR(50)', isRequired: true },
      { id: 'last_name', name: 'last_name', type: 'VARCHAR(50)', isRequired: true },
      { id: 'date_of_birth', name: 'date_of_birth', type: 'DATE', isRequired: true },
      { id: 'gender', name: 'gender', type: 'VARCHAR(10)' },
      { id: 'phone', name: 'phone', type: 'VARCHAR(15)' },
      { id: 'email', name: 'email', type: 'VARCHAR(100)' }
    ]
  },
  {
    id: 'patient_visits',
    name: 'patient_visits',
    type: 'fact',
    position: { x: 350, y: 100 },
    fields: [
      { id: 'visit_id', name: 'visit_id', type: 'UUID', isPrimaryKey: true, isRequired: true },
      { id: 'patient_id', name: 'patient_id', type: 'UUID', isForeignKey: true, isRequired: true },
      { id: 'department_id', name: 'department_id', type: 'UUID', isForeignKey: true, isRequired: true },
      { id: 'admission_date', name: 'admission_date', type: 'TIMESTAMP', isRequired: true },
      { id: 'discharge_date', name: 'discharge_date', type: 'TIMESTAMP' },
      { id: 'visit_type', name: 'visit_type', type: 'VARCHAR(20)', isRequired: true },
      { id: 'status', name: 'status', type: 'VARCHAR(15)', isRequired: true },
      { id: 'chief_complaint', name: 'chief_complaint', type: 'TEXT' }
    ]
  },
  {
    id: 'departments',
    name: 'departments',
    type: 'dimension',
    position: { x: 650, y: 50 },
    fields: [
      { id: 'department_id', name: 'department_id', type: 'UUID', isPrimaryKey: true, isRequired: true },
      { id: 'name', name: 'name', type: 'VARCHAR(100)', isRequired: true },
      { id: 'code', name: 'code', type: 'VARCHAR(10)', isRequired: true },
      { id: 'type', name: 'type', type: 'VARCHAR(30)', isRequired: true },
      { id: 'capacity', name: 'capacity', type: 'INTEGER' },
      { id: 'manager_id', name: 'manager_id', type: 'UUID', isForeignKey: true }
    ]
  },
  {
    id: 'beds',
    name: 'beds',
    type: 'dimension',
    position: { x: 350, y: 350 },
    fields: [
      { id: 'bed_id', name: 'bed_id', type: 'UUID', isPrimaryKey: true, isRequired: true },
      { id: 'bed_number', name: 'bed_number', type: 'VARCHAR(10)', isRequired: true },
      { id: 'room_number', name: 'room_number', type: 'VARCHAR(10)' },
      { id: 'department_id', name: 'department_id', type: 'UUID', isForeignKey: true, isRequired: true },
      { id: 'status', name: 'status', type: 'VARCHAR(15)', isRequired: true },
      { id: 'bed_type', name: 'bed_type', type: 'VARCHAR(20)' }
    ]
  },
  {
    id: 'staff',
    name: 'staff',
    type: 'dimension',
    position: { x: 50, y: 250 },
    fields: [
      { id: 'staff_id', name: 'staff_id', type: 'UUID', isPrimaryKey: true, isRequired: true },
      { id: 'first_name', name: 'first_name', type: 'VARCHAR(50)', isRequired: true },
      { id: 'last_name', name: 'last_name', type: 'VARCHAR(50)', isRequired: true },
      { id: 'role', name: 'role', type: 'VARCHAR(30)', isRequired: true },
      { id: 'email', name: 'email', type: 'VARCHAR(100)' },
      { id: 'phone', name: 'phone', type: 'VARCHAR(15)' }
    ]
  },
  {
    id: 'alerts',
    name: 'alerts',
    type: 'fact',
    position: { x: 650, y: 300 },
    fields: [
      { id: 'alert_id', name: 'alert_id', type: 'UUID', isPrimaryKey: true, isRequired: true },
      { id: 'title', name: 'title', type: 'VARCHAR(200)', isRequired: true },
      { id: 'message', name: 'message', type: 'TEXT', isRequired: true },
      { id: 'severity', name: 'severity', type: 'VARCHAR(15)', isRequired: true },
      { id: 'status', name: 'status', type: 'VARCHAR(15)', isRequired: true },
      { id: 'source_type', name: 'source_type', type: 'VARCHAR(30)', isRequired: true },
      { id: 'created_at', name: 'created_at', type: 'TIMESTAMP', isRequired: true }
    ]
  }
];

const mockRelationships: SchemaRelationship[] = [
  {
    id: 'patients_visits',
    source: 'patient_id',
    target: 'patient_id',
    fromTableId: 'patients',
    toTableId: 'patient_visits'
  },
  {
    id: 'departments_visits',
    source: 'department_id',
    target: 'department_id',
    fromTableId: 'departments',
    toTableId: 'patient_visits'
  },
  {
    id: 'departments_beds',
    source: 'department_id',
    target: 'department_id',
    fromTableId: 'departments',
    toTableId: 'beds'
  },
  {
    id: 'departments_staff',
    source: 'department_id',
    target: 'manager_id',
    fromTableId: 'departments',
    toTableId: 'staff'
  }
];

export const SchemaVisualization = () => {
  const [tables, setTables] = useState<SchemaTable[]>(mockTables);
  const [relationships, setRelationships] = useState<SchemaRelationship[]>(mockRelationships);
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
