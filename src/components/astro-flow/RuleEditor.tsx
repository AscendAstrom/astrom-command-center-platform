
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AutomationRule, FlowUserRole } from './types';
import { RuleEditorHeader } from './rule-editor/RuleEditorHeader';
import { RuleEditorBasicInfo } from './rule-editor/RuleEditorBasicInfo';
import { RuleEditorConditions } from './rule-editor/RuleEditorConditions';
import { RuleEditorActions } from './rule-editor/RuleEditorActions';

interface RuleEditorProps {
  selectedRule: AutomationRule;
  onUpdateRule: (rule: AutomationRule) => void;
  onSaveRule: () => void;
  onDeleteRule: () => void;
  isCreating: boolean;
  userRole: FlowUserRole;
}

const RuleEditor = ({ selectedRule, onUpdateRule, onSaveRule, onDeleterule, isCreating, userRole }: RuleEditorProps) => {
  const canEdit = userRole === 'ADMIN';

  const handleBasicInfoUpdate = (updatedFields: Partial<AutomationRule>) => {
    onUpdateRule({ ...selectedRule, ...updatedFields });
  };

  return (
    <Card className="bg-card border-border backdrop-blur-sm">
      <RuleEditorHeader
        isCreating={isCreating}
        canEdit={canEdit}
        onSaveRule={onSaveRule}
        onDeleteRule={onDeleteRule}
      />
      <CardContent className="space-y-6 pt-6">
        <RuleEditorBasicInfo
          rule={selectedRule}
          onUpdateRule={handleBasicInfoUpdate}
          canEdit={canEdit}
        />

        <Separator className="bg-border" />

        <RuleEditorConditions
          selectedRule={selectedRule}
          onUpdateRule={onUpdateRule}
          canEdit={canEdit}
        />

        <Separator className="bg-border" />

        <RuleEditorActions
          selectedRule={selectedRule}
          onUpdateRule={onUpdateRule}
          canEdit={canEdit}
        />
      </CardContent>
    </Card>
  );
};

export default RuleEditor;
