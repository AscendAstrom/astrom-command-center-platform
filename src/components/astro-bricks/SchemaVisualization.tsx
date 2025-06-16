
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ZoomIn, ZoomOut, RotateCcw, Database, Table } from 'lucide-react';

export const SchemaVisualization = () => {
  const [scale, setScale] = useState(1);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
  const handleReset = () => setScale(1);

  // Sample schema tables for visualization
  const sampleTables = [
    {
      id: 'patients',
      name: 'patients',
      type: 'fact' as const,
      fields: [
        { name: 'id', type: 'uuid', isPrimaryKey: true, isForeignKey: false },
        { name: 'first_name', type: 'text', isPrimaryKey: false, isForeignKey: false },
        { name: 'last_name', type: 'text', isPrimaryKey: false, isForeignKey: false },
        { name: 'date_of_birth', type: 'date', isPrimaryKey: false, isForeignKey: false },
        { name: 'medical_record_number', type: 'text', isPrimaryKey: false, isForeignKey: false }
      ]
    },
    {
      id: 'visits',
      name: 'patient_visits',
      type: 'fact' as const,
      fields: [
        { name: 'id', type: 'uuid', isPrimaryKey: true, isForeignKey: false },
        { name: 'patient_id', type: 'uuid', isPrimaryKey: false, isForeignKey: true },
        { name: 'admission_date', type: 'timestamp', isPrimaryKey: false, isForeignKey: false },
        { name: 'discharge_date', type: 'timestamp', isPrimaryKey: false, isForeignKey: false },
        { name: 'visit_type', type: 'text', isPrimaryKey: false, isForeignKey: false }
      ]
    },
    {
      id: 'departments',
      name: 'departments',
      type: 'dimension' as const,
      fields: [
        { name: 'id', type: 'uuid', isPrimaryKey: true, isForeignKey: false },
        { name: 'name', type: 'text', isPrimaryKey: false, isForeignKey: false },
        { name: 'code', type: 'text', isPrimaryKey: false, isForeignKey: false },
        { name: 'type', type: 'text', isPrimaryKey: false, isForeignKey: false }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            Schema Visualization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{sampleTables.length} Tables</Badge>
              <Badge variant="outline">Scale: {Math.round(scale * 100)}%</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schema Canvas */}
      <Card>
        <CardContent className="p-6">
          <div 
            className="relative bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20 min-h-[400px] overflow-auto"
            style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              {sampleTables.map((table, index) => (
                <div
                  key={table.id}
                  className={`bg-card border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedTable === table.id ? 'ring-2 ring-primary shadow-lg' : ''
                  }`}
                  onClick={() => setSelectedTable(selectedTable === table.id ? null : table.id)}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Table className={`h-4 w-4 ${table.type === 'fact' ? 'text-blue-500' : 'text-green-500'}`} />
                    <h3 className="font-semibold text-sm">{table.name}</h3>
                    <Badge variant={table.type === 'fact' ? 'default' : 'secondary'} className="text-xs">
                      {table.type}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {table.fields.slice(0, 5).map((field) => (
                      <div key={field.name} className="flex items-center justify-between text-xs">
                        <span className={`font-mono ${field.isPrimaryKey ? 'font-bold text-yellow-600' : field.isForeignKey ? 'text-blue-600' : ''}`}>
                          {field.name}
                        </span>
                        <span className="text-muted-foreground">{field.type}</span>
                      </div>
                    ))}
                    {table.fields.length > 5 && (
                      <div className="text-xs text-muted-foreground">
                        +{table.fields.length - 5} more fields
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {sampleTables.length === 0 && (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No schema tables found</p>
                  <p className="text-sm">Connect a data source to visualize schemas</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table Details */}
      {selectedTable && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Table className="h-5 w-5" />
              Table Details: {sampleTables.find(t => t.id === selectedTable)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const table = sampleTables.find(t => t.id === selectedTable);
              if (!table) return null;
              
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Table Information</h4>
                      <div className="space-y-1 text-sm">
                        <div><strong>Name:</strong> {table.name}</div>
                        <div><strong>Type:</strong> <Badge variant={table.type === 'fact' ? 'default' : 'secondary'}>{table.type}</Badge></div>
                        <div><strong>Fields:</strong> {table.fields.length}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Field Details</h4>
                      <div className="space-y-1 text-sm max-h-32 overflow-y-auto">
                        {table.fields.map((field) => (
                          <div key={field.name} className="flex items-center justify-between">
                            <span className={`font-mono ${field.isPrimaryKey ? 'font-bold text-yellow-600' : field.isForeignKey ? 'text-blue-600' : ''}`}>
                              {field.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">{field.type}</span>
                              {field.isPrimaryKey && <Badge variant="outline" className="text-xs">PK</Badge>}
                              {field.isForeignKey && <Badge variant="outline" className="text-xs">FK</Badge>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
