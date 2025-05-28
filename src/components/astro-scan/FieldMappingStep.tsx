
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

const COMMON_HEALTHCARE_FIELDS = [
  { key: 'patient_id', label: 'Patient ID', type: 'string' },
  { key: 'mrn', label: 'Medical Record Number', type: 'string' },
  { key: 'triage_time', label: 'Triage Time', type: 'datetime' },
  { key: 'chief_complaint', label: 'Chief Complaint', type: 'string' },
  { key: 'ems_status', label: 'EMS Status', type: 'string' },
  { key: 'acuity_level', label: 'Acuity Level', type: 'integer' },
  { key: 'bed_assignment', label: 'Bed Assignment', type: 'string' },
  { key: 'provider_id', label: 'Provider ID', type: 'string' },
  { key: 'discharge_time', label: 'Discharge Time', type: 'datetime' },
  { key: 'diagnosis_code', label: 'Diagnosis Code (ICD-10)', type: 'string' }
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

  const addCommonField = (field: typeof COMMON_HEALTHCARE_FIELDS[0]) => {
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
      <div className="flex items-center gap-2 text-cyan-400">
        <MapPin className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Field Mapping</h3>
      </div>
      
      <p className="text-slate-400 text-sm">
        Map source fields from your {formData.type} data to standardized healthcare fields.
      </p>

      {/* Quick Add Common Fields */}
      <div>
        <Label className="text-slate-300 mb-3 block">Quick Add Common Fields</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {COMMON_HEALTHCARE_FIELDS.map((field) => (
            <Button
              key={field.key}
              variant="outline"
              size="sm"
              onClick={() => addCommonField(field)}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
            >
              {field.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Field Mappings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-slate-300">Field Mappings</Label>
          <Button onClick={addMapping} size="sm" variant="outline" className="border-slate-700">
            <Plus className="h-4 w-4 mr-1" />
            Add Mapping
          </Button>
        </div>

        {mappings.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            No field mappings defined. Click "Add Mapping" or use quick add buttons above.
          </div>
        ) : (
          <div className="space-y-3">
            {mappings.map((mapping, index) => (
              <div key={index} className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-4">
                  <Label className="text-slate-400 text-xs">Source Field</Label>
                  <Input
                    value={mapping.sourceField}
                    onChange={(e) => updateMapping(index, { sourceField: e.target.value })}
                    placeholder="e.g., PID.3.1"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                
                <div className="col-span-4">
                  <Label className="text-slate-400 text-xs">Target Field</Label>
                  <Input
                    value={mapping.targetField}
                    onChange={(e) => updateMapping(index, { targetField: e.target.value })}
                    placeholder="e.g., patient_id"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div className="col-span-3">
                  <Label className="text-slate-400 text-xs">Data Type</Label>
                  <Select 
                    value={mapping.dataType} 
                    onValueChange={(value) => updateMapping(index, { dataType: value })}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
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
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
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
