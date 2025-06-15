import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AutomationRule, FlowUserRole } from './types';
import { Plus, Zap, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface RulesListProps {
  rules: AutomationRule[];
  selectedRule: AutomationRule | null;
  onSelectRule: (rule: AutomationRule) => void;
  onCreateRule: () => void;
  onToggleRule: (ruleId: string) => void;
  userRole: FlowUserRole;
  onRefresh: () => Promise<any>;
}

const RulesList = ({ rules, selectedRule, onSelectRule, onCreateRule, onToggleRule, userRole, onRefresh }: RulesListProps) => {
  const canEdit = userRole === 'ADMIN';
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-600 text-white';
      case 'medium': return 'bg-yellow-600 text-white';
      case 'low': return 'bg-green-600 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleCreateRule = () => {
    if (!canEdit) {
      toast.error("You don't have permission to create rules");
      return;
    }
    onCreateRule();
    toast.success("Creating new automation rule...");
  };

  const handleToggleRule = (ruleId: string) => {
    if (!canEdit) {
      toast.error("You don't have permission to modify rules");
      return;
    }
    onToggleRule(ruleId);
  };

  const handleRefreshRules = async () => {
    setIsRefreshing(true);
    toast.info("Refreshing automation rules...");
    
    try {
      await onRefresh();
      toast.success("Rules refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh rules.");
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const activeRules = rules.filter(rule => rule.isActive).length;
  const totalExecutions = rules.reduce((sum, rule) => sum + rule.executionCount, 0);

  return (
    <Card className="bg-card border-border backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-cyan-400" />
            <CardTitle className="text-foreground">Automation Rules</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleRefreshRules}
              disabled={isRefreshing}
              className="hover:bg-cyan-500/10"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            {canEdit && (
              <Button 
                onClick={handleCreateRule} 
                size="sm" 
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <CardDescription>
          {activeRules} of {rules.length} rules active • {totalExecutions} total executions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {rules.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="font-medium">No automation rules found</p>
            <p className="text-sm">Create your first rule to get started</p>
            {canEdit && (
              <Button 
                onClick={handleCreateRule}
                variant="outline"
                className="mt-3"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Rule
              </Button>
            )}
          </div>
        ) : (
          rules.map((rule) => (
            <div
              key={rule.id}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                selectedRule?.id === rule.id
                  ? 'border-cyan-500 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 shadow-lg'
                  : 'border-border hover:border-muted-foreground hover:bg-accent'
              }`}
              onClick={() => {
                onSelectRule(rule);
                toast.info(`Selected rule: ${rule.name}`);
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${rule.isActive ? 'bg-green-400 animate-pulse' : 'bg-muted-foreground'}`} />
                  <h3 className="font-medium text-foreground">{rule.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(rule.priority)} variant="secondary">
                    {rule.priority}
                  </Badge>
                  {canEdit && (
                    <Switch
                      checked={rule.isActive}
                      onCheckedChange={() => handleToggleRule(rule.id)}
                      onClick={(e) => e.stopPropagation()}
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
              {rule.last_executed && (
                <div className="text-xs text-muted-foreground mt-2">
                  Last executed: {new Date(rule.last_executed).toLocaleString()}
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default RulesList;
