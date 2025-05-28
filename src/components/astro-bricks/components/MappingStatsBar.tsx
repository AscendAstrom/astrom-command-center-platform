
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface MappingStatsBarProps {
  sourceFieldsCount: number;
  targetFieldsCount: number;
  mappingsCount: number;
}

export const MappingStatsBar = ({ 
  sourceFieldsCount, 
  targetFieldsCount, 
  mappingsCount 
}: MappingStatsBarProps) => {
  return (
    <div className="flex gap-2">
      <Badge variant="outline" className="text-blue-400 border-blue-400">
        {sourceFieldsCount} Source Fields
      </Badge>
      <Badge variant="outline" className="text-green-400 border-green-400">
        {targetFieldsCount} Target Fields
      </Badge>
      <Badge variant="outline" className="text-purple-400 border-purple-400">
        {mappingsCount} Mappings
      </Badge>
    </div>
  );
};
