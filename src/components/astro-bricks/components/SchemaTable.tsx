
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Table, 
  Key, 
  Link2
} from 'lucide-react';
import { SchemaTable as SchemaTableType, SchemaField } from '../types';

interface SchemaTableProps {
  table: SchemaTableType;
  isSelected: boolean;
  onClick: () => void;
}

export const SchemaTable = ({ table, isSelected, onClick }: SchemaTableProps) => {
  const getFieldIcon = (field: SchemaField) => {
    if (field.isPrimaryKey) return <Key className="h-3 w-3 text-yellow-400" />;
    if (field.isForeignKey) return <Link2 className="h-3 w-3 text-blue-400" />;
    return null;
  };

  return (
    <div
      className={`absolute bg-card/80 border rounded-lg shadow-lg transition-all cursor-pointer ${
        isSelected
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
      onClick={onClick}
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
  );
};
