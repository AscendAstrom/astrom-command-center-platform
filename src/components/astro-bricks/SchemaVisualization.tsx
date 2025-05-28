
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Table, 
  Key, 
  Link2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Download
} from 'lucide-react';
import { SchemaTable, SchemaField, SchemaRelationship } from './types';

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

  const getFieldIcon = (field: SchemaField) => {
    if (field.isPrimaryKey) return <Key className="h-3 w-3 text-yellow-400" />;
    if (field.isForeignKey) return <Link2 className="h-3 w-3 text-blue-400" />;
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            {tables.filter(t => t.type === 'fact').length} Fact Tables
          </Badge>
          <Badge variant="outline" className="text-green-400 border-green-400">
            {tables.filter(t => t.type === 'dimension').length} Dimension Tables
          </Badge>
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            {relationships.length} Relationships
          </Badge>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="relative bg-background/30 rounded-lg border border-border h-96 overflow-hidden">
        <div 
          className="absolute inset-0 p-4"
          style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
        >
          {/* Render Tables */}
          {tables.map((table) => (
            <div
              key={table.id}
              className={`absolute bg-card/80 border rounded-lg shadow-lg transition-all cursor-pointer ${
                selectedTable === table.id
                  ? 'border-purple-500 shadow-purple-500/20'
                  : table.type === 'fact'
                  ? 'border-orange-500/50 hover:border-orange-400'
                  : 'border-green-500/50 hover:border-green-400'
              }`}
              style={{
                left: table.position.x,
                top: table.position.y,
                minWidth: '200px'
              }}
              onClick={() => setSelectedTable(table.id)}
            >
              {/* Table Header */}
              <div className={`p-3 border-b ${
                table.type === 'fact' 
                  ? 'bg-orange-500/20 border-orange-500/30' 
                  : 'bg-green-500/20 border-green-500/30'
              }`}>
                <div className="flex items-center gap-2">
                  {table.type === 'fact' ? (
                    <Database className="h-4 w-4 text-orange-400" />
                  ) : (
                    <Table className="h-4 w-4 text-green-400" />
                  )}
                  <span className="font-medium text-foreground text-sm">{table.name}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      table.type === 'fact' 
                        ? 'text-orange-400 border-orange-400' 
                        : 'text-green-400 border-green-400'
                    }`}
                  >
                    {table.type}
                  </Badge>
                </div>
              </div>

              {/* Table Fields */}
              <div className="p-2 space-y-1">
                {table.fields.map((field) => (
                  <div 
                    key={field.id} 
                    className={`flex items-center gap-2 px-2 py-1 rounded text-xs ${
                      field.isPrimaryKey 
                        ? 'bg-yellow-500/10 text-yellow-300' 
                        : field.isForeignKey
                        ? 'bg-blue-500/10 text-blue-300'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {getFieldIcon(field)}
                    <span className="font-mono">{field.name}</span>
                    <span className="text-muted-foreground ml-auto">{field.type}</span>
                  </div>
                ))}
              </div>
            </div>
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

      {/* Table Details */}
      {selectedTable && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Table Details: {tables.find(t => t.id === selectedTable)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Fields</h4>
                <div className="space-y-1">
                  {tables.find(t => t.id === selectedTable)?.fields.map((field) => (
                    <div key={field.id} className="flex items-center gap-2 text-sm">
                      {getFieldIcon(field)}
                      <span className="text-foreground">{field.name}</span>
                      <span className="text-muted-foreground">({field.type})</span>
                      {field.isRequired && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Relationships</h4>
                <div className="space-y-1">
                  {relationships
                    .filter(r => r.fromTableId === selectedTable || r.toTableId === selectedTable)
                    .map((rel) => (
                      <div key={rel.id} className="text-sm text-muted-foreground">
                        {rel.fromTableId === selectedTable ? 'References' : 'Referenced by'}{' '}
                        <span className="text-foreground">
                          {rel.fromTableId === selectedTable 
                            ? tables.find(t => t.id === rel.toTableId)?.name
                            : tables.find(t => t.id === rel.fromTableId)?.name
                          }
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
