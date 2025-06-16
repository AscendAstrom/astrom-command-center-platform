
import React, { useState } from 'react';
import { SchemaTable, SchemaRelationship } from './types';
import { SchemaVisualizationToolbar } from './components/SchemaVisualizationToolbar';
import { SchemaCanvas } from './components/SchemaCanvas';
import { SchemaTableDetails } from './components/SchemaTableDetails';

export const SchemaVisualization = () => {
  const [tables, setTables] = useState<SchemaTable[]>([]);

  const [relationships, setRelationships] = useState<SchemaRelationship[]>([]);

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
