
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface EpicConfigurationFieldsProps {
  config: any;
  updateConfig: (key: string, value: any) => void;
}

export const EpicConfigurationFields = ({ config, updateConfig }: EpicConfigurationFieldsProps) => {
  return (
    <>
      <div>
        <Label className="text-foreground font-medium">Epic Server URL</Label>
        <Input
          value={config.serverUrl || ''}
          onChange={(e) => updateConfig('serverUrl', e.target.value)}
          placeholder="https://epic.hospital.org/interconnect-prd-oauth2/api/FHIR/R4"
          className="mt-2 bg-background border-border text-foreground"
        />
      </div>
      <div>
        <Label className="text-foreground font-medium">Epic Client ID</Label>
        <Input
          value={config.clientId || ''}
          onChange={(e) => updateConfig('clientId', e.target.value)}
          placeholder="Your Epic App Client ID"
          className="mt-2 bg-background border-border text-foreground"
        />
      </div>
      <div>
        <Label className="text-foreground font-medium">Epic Environment</Label>
        <Select value={config.environment || 'sandbox'} onValueChange={(value) => updateConfig('environment', value)}>
          <SelectTrigger className="mt-2 bg-background border-border text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border-border">
            <SelectItem value="sandbox">Sandbox</SelectItem>
            <SelectItem value="production">Production</SelectItem>
            <SelectItem value="staging">Staging</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-foreground font-medium">Epic API Version</Label>
        <Select value={config.apiVersion || 'R4'} onValueChange={(value) => updateConfig('apiVersion', value)}>
          <SelectTrigger className="mt-2 bg-background border-border text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border-border">
            <SelectItem value="R4">FHIR R4</SelectItem>
            <SelectItem value="STU3">FHIR STU3</SelectItem>
            <SelectItem value="DSTU2">FHIR DSTU2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-foreground font-medium">Epic Applications/Modules</Label>
        <Textarea
          value={config.applications || ''}
          onChange={(e) => updateConfig('applications', e.target.value)}
          placeholder="Hyperspace,MyChart,Beacon,Willow,Tapestry"
          className="mt-2 bg-background border-border text-foreground"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={config.enableSSL || true}
          onCheckedChange={(checked) => updateConfig('enableSSL', checked)}
        />
        <Label className="text-foreground font-medium">Enable SSL/TLS</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={config.enableSmartAuth || false}
          onCheckedChange={(checked) => updateConfig('enableSmartAuth', checked)}
        />
        <Label className="text-foreground font-medium">Enable SMART on FHIR Authentication</Label>
      </div>
    </>
  );
};
