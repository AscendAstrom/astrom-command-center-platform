
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, MapPin } from "lucide-react";

interface FieldMappingStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const COMMON_BUSINESS_FIELDS = [
  { key: 'entity_id', label: 'Entity ID', type: 'string' },
  { key: 'record_number', label: 'Record Number', type: 'string' },
  { key: 'timestamp', label: 'Timestamp', type: 'datetime' },
  { key: 'description', label: 'Description', type: 'string' },
  { key: 'status', label: 'Status', type: 'string' },
  { key: 'priority_level', label: 'Priority Level', type: 'integer' },
  { key: 'assignment', label: 'Assignment', type: 'string' },
  { key: 'user_id', label: 'User ID', type: 'string' },
  { key: 'completion_time', label: 'Completion Time', type: 'datetime' },
  { key: 'category_code', label: 'Category Code', type: 'string' },
  { key: 'location', label: 'Location', type: 'string' },
  { key: 'department', label: 'Department', type: 'string' }
];

export const FieldMappingStep = ({ formData, updateFormData }: FieldMappingStepProps) => {
  const [mappings, setMappings] = useState<Array<{
    sourceField: string;
    targetField: string;
    dataType: string;
    required: boolean;
  }>>(
    Object.entries(formData.fieldMappings || {}).map(([target, source]: any) => ({
      sourceField: source.sourceField || '',
      targetField: target,
      dataType: source.dataType || 'string',
      required: source.required || false
    }))
  );

  const addMapping = () => {
    setMappings([...mappings, {
      sourceField: '',
      targetField: '',
      dataType: 'string',
      required: false
    }]);
  };

  const removeMapping = (index: number) => {
    const newMappings = mappings.filter((_, i) => i !== index);
    setMappings(newMappings);
    updateMappings(newMappings);
  };

  const updateMapping = (index: number, updates: Partial<typeof mappings[0]>) => {
    const newMappings = mappings.map((mapping, i) => 
      i === index ? { ...mapping, ...updates } : mapping
    );
    setMappings(newMappings);
    updateMappings(newMappings);
  };

  const updateMappings = (newMappings: typeof mappings) => {
    const fieldMappings = newMappings.reduce((acc, mapping) => {
      if (mapping.targetField && mapping.sourceField) {
        acc[mapping.targetField] = {
          sourceField: mapping.sourceField,
          dataType: mapping.dataType,
          required: mapping.required
        };
      }
      return acc;
    }, {} as Record<string, any>);

    updateFormData({ fieldMappings });
  };

  const addCommonField = (field: typeof COMMON_BUSINESS_FIELDS[0]) => {
    const newMappings = [...mappings, {
      sourceField: '',
      targetField: field.key,
      dataType: field.type,
      required: false
    }];
    setMappings(newMappings);
    updateMappings(newMappings);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-astrom-blue">
        <div className="p-2 rounded-xl bg-astrom-blue/10">
          <MapPin className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold">Field Mapping</h3>
      </div>
      
      <p className="text-muted-foreground">
        Map source fields from your {formData.type} data to standardized business fields.
      </p>

      {/* Quick Add Common Fields */}
      <div>
        <Label className="text-foreground mb-3 block font-semibold">Quick Add Common Fields</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {COMMON_BUSINESS_FIELDS.map((field) => (
            <Button
              key={field.key}
              variant="outline"
              size="sm"
              onClick={() => addCommonField(field)}
              className="border-border text-foreground hover:bg-muted text-xs font-medium"
            >
              {field.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Field Mappings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-foreground font-semibold">Field Mappings</Label>
          <Button onClick={addMapping} size="sm" variant="outline" className="border-border hover:bg-muted">
            <Plus className="h-4 w-4 mr-2" />
            Add Mapping
          </Button>
        </div>

        {mappings.length === 0 ? (
          <div className="text-center py-12 surface-elevated rounded-xl border-border/30">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Field Mappings</h3>
            <p className="text-muted-foreground">
              No field mappings defined. Click "Add Mapping" or use quick add buttons above.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {mappings.map((mapping, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-end surface-elevated p-4 rounded-xl border-border/30">
                <div className="col-span-4">
                  <Label className="text-muted-foreground text-sm font-medium">Source Field</Label>
                  <Input
                    value={mapping.sourceField}
                    onChange={(e) => updateMapping(index, { sourceField: e.target.value })}
                    placeholder="e.g., field.value.1"
                    className="mt-1 bg-background border-border text-foreground"
                  />
                </div>
                
                <div className="col-span-4">
                  <Label className="text-muted-foreground text-sm font-medium">Target Field</Label>
                  <Input
                    value={mapping.targetField}
                    onChange={(e) => updateMapping(index, { targetField: e.target.value })}
                    placeholder="e.g., entity_id"
                    className="mt-1 bg-background border-border text-foreground"
                  />
                </div>

                <div className="col-span-3">
                  <Label className="text-muted-foreground text-sm font-medium">Data Type</Label>
                  <Select 
                    value={mapping.dataType} 
                    onValueChange={(value) => updateMapping(index, { dataType: value })}
                  >
                    <SelectTrigger className="mt-1 bg-background border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="string">String</SelectItem>
                      <SelectItem value="integer">Integer</SelectItem>
                      <SelectItem value="datetime">DateTime</SelectItem>
                      <SelectItem value="boolean">Boolean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMapping(index)}
                    className="text-status-error hover:text-status-error hover:bg-status-error/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
