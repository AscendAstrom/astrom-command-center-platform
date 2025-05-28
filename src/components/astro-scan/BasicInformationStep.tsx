
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Database } from "lucide-react";

interface BasicInformationStepProps {
  formData: {
    name: string;
    type: 'HL7' | 'FHIR' | 'API' | 'CSV' | 'MANUAL' | 'EPIC';
    ingestionMode: 'BATCH' | 'STREAM';
  };
  updateFormData: (updates: any) => void;
}

export const BasicInformationStep = ({ formData, updateFormData }: BasicInformationStepProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-astrom-blue">
        <div className="p-2 rounded-xl bg-astrom-blue/10">
          <Database className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold">Basic Information</h3>
      </div>

      <div>
        <Label htmlFor="name" className="text-foreground font-medium">Data Source Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          placeholder="e.g., Epic EMR - Main Campus"
          className="mt-2 bg-background border-border text-foreground"
        />
      </div>

      <div>
        <Label className="text-foreground font-medium">Source Type</Label>
        <Select value={formData.type} onValueChange={(value: any) => updateFormData({ type: value })}>
          <SelectTrigger className="mt-2 bg-background border-border text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border-border">
            <SelectItem value="EPIC">Epic EMR (Enterprise Healthcare)</SelectItem>
            <SelectItem value="HL7">HL7 (Health Level 7)</SelectItem>
            <SelectItem value="FHIR">FHIR (Fast Healthcare Interoperability)</SelectItem>
            <SelectItem value="API">REST/GraphQL API</SelectItem>
            <SelectItem value="CSV">CSV/File Upload</SelectItem>
            <SelectItem value="MANUAL">Manual Entry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-foreground font-medium">Ingestion Mode</Label>
        <div className="flex items-center space-x-3 mt-3">
          <Switch
            checked={formData.ingestionMode === 'STREAM'}
            onCheckedChange={(checked) => 
              updateFormData({ ingestionMode: checked ? 'STREAM' : 'BATCH' })
            }
          />
          <span className="text-foreground font-medium">
            {formData.ingestionMode === 'STREAM' ? 'Real-time Stream' : 'Batch Processing'}
          </span>
        </div>
      </div>
    </div>
  );
};
