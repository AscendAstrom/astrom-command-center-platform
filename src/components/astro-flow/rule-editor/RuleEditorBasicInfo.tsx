
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AutomationRule, TriggerType } from '../types';

interface RuleEditorBasicInfoProps {
  rule: AutomationRule;
  onUpdateRule: (updatedFields: Partial<AutomationRule>) => void;
  canEdit: boolean;
}

const triggerTypes: Array<{ value: TriggerType; label: string }> = [
  { value: 'sla_breach', label: 'SLA Breach' },
  { value: 'surge_prediction', label: 'Surge Prediction' },
  { value: 'data_anomaly', label: 'Data Anomaly' },
  { value: 'threshold_exceeded', label: 'Threshold Exceeded' },
  { value: 'time_based', label: 'Time-based' }
];

export const RuleEditorBasicInfo = ({ rule, onUpdateRule, canEdit }: RuleEditorBasicInfoProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-foreground text-sm font-medium">Rule Name</Label>
          <Input
            value={rule.name}
            onChange={(e) => onUpdateRule({ name: e.target.value })}
            className="bg-background border-border text-foreground mt-1"
            disabled={!canEdit}
            placeholder="Descriptive rule name"
          />
        </div>
        <div>
          <Label className="text-foreground text-sm font-medium">Priority Level</Label>
          <Select
            value={rule.priority}
            onValueChange={(value: any) => onUpdateRule({ priority: value })}
            disabled={!canEdit}
          >
            <SelectTrigger className="bg-background border-border text-foreground mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="low">Low Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="critical">Critical Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-foreground text-sm font-medium">Description</Label>
        <Textarea
          value={rule.description}
          onChange={(e) => onUpdateRule({ description: e.target.value })}
          className="bg-background border-border text-foreground mt-1"
          disabled={!canEdit}
          placeholder="Describe what this rule monitors and when it triggers"
          rows={3}
        />
      </div>

      <div>
        <Label className="text-foreground text-sm font-medium">Trigger Type</Label>
        <Select
          value={rule.triggerType}
          onValueChange={(value: TriggerType) => onUpdateRule({ triggerType: value })}
          disabled={!canEdit}
        >
          <SelectTrigger className="bg-background border-border text-foreground mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {triggerTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
