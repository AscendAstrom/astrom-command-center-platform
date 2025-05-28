
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Key, Link2 } from 'lucide-react';
import { SchemaTable, SchemaRelationship, SchemaField } from '../types';

interface SchemaTableDetailsProps {
  selectedTable: string;
  tables: SchemaTable[];
  relationships: SchemaRelationship[];
}

export const SchemaTableDetails = ({ selectedTable, tables, relationships }: SchemaTableDetailsProps) => {
  const table = tables.find(t => t.id === selectedTable);
  
  if (!table) return null;

  const getFieldIcon = (field: SchemaField) => {
    if (field.isPrimaryKey) return <Key className="h-3 w-3 text-yellow-400" />;
    if (field.isForeignKey) return <Link2 className="h-3 w-3 text-blue-400" />;
    return null;
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">
          Table Details: {table.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Fields</h4>
            <div className="space-y-1">
              {table.fields.map((field) => (
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
  );
};
