
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CommonConfigurationFieldsProps {
  config: any;
  updateConfig: (key: string, value: any) => void;
  formData: any;
  updateFormData: (updates: any) => void;
}

export const CommonConfigurationFields = ({ 
  config, 
  updateConfig, 
  formData, 
  updateFormData 
}: CommonConfigurationFieldsProps) => {
  return (
    <>
      {/* Schedule Configuration for Batch Mode */}
      {formData.ingestionMode === 'BATCH' && (
        <div>
          <Label className="text-foreground font-medium">Schedule (Cron Expression)</Label>
          <Input
            value={formData.scheduleCron || ''}
            onChange={(e) => updateFormData({ scheduleCron: e.target.value })}
            placeholder="0 */5 * * * (every 5 minutes)"
            className="mt-2 bg-background border-border text-foreground"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Leave empty for manual runs only. Use cron format: minute hour day month weekday
          </p>
        </div>
      )}

      {/* Connection Timeout */}
      <div>
        <Label className="text-foreground font-medium">Connection Timeout (seconds)</Label>
        <Input
          type="number"
          value={config.timeout || 30}
          onChange={(e) => updateConfig('timeout', parseInt(e.target.value))}
          className="mt-2 bg-background border-border text-foreground"
        />
      </div>

      {/* Retry Configuration */}
      <div>
        <Label className="text-foreground font-medium">Max Retry Attempts</Label>
        <Input
          type="number"
          value={config.maxRetries || 3}
          onChange={(e) => updateConfig('maxRetries', parseInt(e.target.value))}
          className="mt-2 bg-background border-border text-foreground"
        />
      </div>
    </>
  );
};
