
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface APIConfigurationFieldsProps {
  config: any;
  updateConfig: (key: string, value: any) => void;
}

export const APIConfigurationFields = ({ config, updateConfig }: APIConfigurationFieldsProps) => {
  return (
    <>
      <div>
        <Label className="text-foreground font-medium">API Endpoint</Label>
        <Input
          value={config.endpoint || ''}
          onChange={(e) => updateConfig('endpoint', e.target.value)}
          placeholder="https://api.example.com/data"
          className="mt-2 bg-background border-border text-foreground"
        />
      </div>
      <div>
        <Label className="text-foreground font-medium">HTTP Method</Label>
        <Select value={config.method || 'GET'} onValueChange={(value) => updateConfig('method', value)}>
          <SelectTrigger className="mt-2 bg-background border-border text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border-border">
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-foreground font-medium">Headers (JSON)</Label>
        <Textarea
          value={config.headers || ''}
          onChange={(e) => updateConfig('headers', e.target.value)}
          placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
          className="mt-2 bg-background border-border text-foreground"
        />
      </div>
    </>
  );
};
