
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AutomationRule, FlowUserRole } from './types';
import { Plus, Zap } from 'lucide-react';

interface RulesListProps {
  rules: AutomationRule[];
  selectedRule: AutomationRule | null;
  onSelectRule: (rule: AutomationRule) => void;
  onCreateRule: () => void;
  onToggleRule: (ruleId: string) => void;
  userRole: FlowUserRole;
}

const RulesList = ({ rules, selectedRule, onSelectRule, onCreateRule, onToggleRule, userRole }: RulesListProps) => {
  const canEdit = userRole === 'ADMIN';

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-cyan-400" />
            <CardTitle className="text-foreground">Automation Rules</CardTitle>
          </div>
          {canEdit && (
            <Button onClick={onCreateRule} size="sm" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg">
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription>Click to configure automation rules</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
              selectedRule?.id === rule.id
                ? 'border-cyan-500 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 shadow-lg'
                : 'border-border hover:border-muted-foreground hover:bg-muted/50'
            }`}
            onClick={() => onSelectRule(rule)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${rule.isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
                <h3 className="font-medium text-foreground">{rule.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(rule.priority)} variant="secondary">
                  {rule.priority}
                </Badge>
                {canEdit && (
                  <Switch
                    checked={rule.isActive}
                    onCheckedChange={() => onToggleRule(rule.id)}
                  />
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{rule.description}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground capitalize">{rule.triggerType.replace('_', ' ')}</span>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400">{rule.conditions.length} conditions</span>
                <span className="text-purple-400">{rule.actions.length} actions</span>
                <span className="text-green-400">{rule.executionCount} runs</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RulesList;
