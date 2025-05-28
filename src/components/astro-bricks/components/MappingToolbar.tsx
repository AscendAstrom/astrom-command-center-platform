
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Download, Save } from 'lucide-react';

interface MappingToolbarProps {
  readOnly: boolean;
}

export const MappingToolbar = ({ readOnly }: MappingToolbarProps) => {
  if (readOnly) return null;

  return (
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
  );
};
