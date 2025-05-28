
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HL7ConfigurationFieldsProps {
  config: any;
  updateConfig: (key: string, value: any) => void;
}

export const HL7ConfigurationFields = ({ config, updateConfig }: HL7ConfigurationFieldsProps) => {
  return (
    <>
      <div>
        <Label className="text-foreground font-medium">HL7 Server Host</Label>
        <Input
          value={config.host || ''}
          onChange={(e) => updateConfig('host', e.target.value)}
          placeholder="localhost"
          className="mt-2 bg-background border-border text-foreground"
        />
      </div>
      <div>
        <Label className="text-foreground font-medium">Port</Label>
        <Input
          value={config.port || ''}
          onChange={(e) => updateConfig('port', e.target.value)}
          placeholder="2575"
          className="mt-2 bg-background border-border text-foreground"
        />
      </div>
      <div>
        <Label className="text-foreground font-medium">Message Types</Label>
        <Input
          value={config.messageTypes || ''}
          onChange={(e) => updateConfig('messageTypes', e.target.value)}
          placeholder="ADT^A01,ADT^A04,ADT^A08"
          className="mt-2 bg-background border-border text-foreground"
        />
      </div>
    </>
  );
};
