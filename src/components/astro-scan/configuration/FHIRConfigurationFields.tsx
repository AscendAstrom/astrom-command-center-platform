
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FHIRConfigurationFieldsProps {
  config: any;
  updateConfig: (key: string, value: any) => void;
}

export const FHIRConfigurationFields = ({ config, updateConfig }: FHIRConfigurationFieldsProps) => {
  return (
    <>
      <div>
        <Label className="text-foreground font-medium">FHIR Base URL</Label>
        <Input
          value={config.baseUrl || ''}
          onChange={(e) => updateConfig('baseUrl', e.target.value)}
          placeholder="https://fhir.example.com/R4"
          className="mt-2 bg-background border-border text-foreground"
        />
      </div>
      <div>
        <Label className="text-foreground font-medium">Authentication Token</Label>
        <Input
          type="password"
          value={config.authToken || ''}
          onChange={(e) => updateConfig('authToken', e.target.value)}
          placeholder="Bearer token or API key"
          className="mt-2 bg-background border-border text-foreground"
        />
      </div>
      <div>
        <Label className="text-foreground font-medium">Resource Types</Label>
        <Input
          value={config.resourceTypes || ''}
          onChange={(e) => updateConfig('resourceTypes', e.target.value)}
          placeholder="Patient,Encounter,Observation"
          className="mt-2 bg-background border-border text-foreground"
        />
      </div>
    </>
  );
};
