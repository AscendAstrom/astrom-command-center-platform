
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RuleCondition, ConditionOperator } from './types';
import { Clock, MapPin, TrendingUp, AlertCircle, Trash2 } from 'lucide-react';

interface ConditionBlockProps {
  condition: RuleCondition;
  onUpdate: (condition: RuleCondition) => void;
  onDelete: () => void;
  canEdit: boolean;
}

const ConditionBlock = ({ condition, onUpdate, onDelete, canEdit }: ConditionBlockProps) => {
  const getFieldIcon = (field: string) => {
    if (field.includes('wait_time') || field.includes('time')) return <Clock className="h-4 w-4 text-blue-400" />;
    if (field.includes('zone') || field.includes('location')) return <MapPin className="h-4 w-4 text-green-400" />;
    if (field.includes('count') || field.includes('volume')) return <TrendingUp className="h-4 w-4 text-purple-400" />;
    return <AlertCircle className="h-4 w-4 text-orange-400" />;
  };

  const operators: Array<{ value: ConditionOperator; label: string; symbol: string }> = [
    { value: 'equals', label: 'Equals', symbol: '=' },
    { value: 'not_equals', label: 'Not Equals', symbol: '≠' },
    { value: 'greater_than', label: 'Greater Than', symbol: '>' },
    { value: 'less_than', label: 'Less Than', symbol: '<' },
    { value: 'greater_equal', label: 'Greater or Equal', symbol: '≥' },
    { value: 'less_equal', label: 'Less or Equal', symbol: '≤' },
    { value: 'contains', label: 'Contains', symbol: '∋' },
    { value: 'not_contains', label: 'Does Not Contain', symbol: '∌' }
  ];

  const currentOperator = operators.find(op => op.value === condition.operator);

  return (
    <Card className="bg-card border-border backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {/* Field Section */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {getFieldIcon(condition.field)}
            <div className="flex-1">
              <Input
                value={condition.field}
                onChange={(e) => onUpdate({ ...condition, field: e.target.value })}
                placeholder="Field name (e.g., wait_time_minutes)"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                disabled={!canEdit}
              />
            </div>
          </div>

          {/* Operator Section */}
          <div className="flex items-center gap-2">
            <Select
              value={condition.operator}
              onValueChange={(value: ConditionOperator) => onUpdate({ ...condition, operator: value })}
              disabled={!canEdit}
            >
              <SelectTrigger className="w-32 bg-background border-border text-foreground">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-cyan-400">{currentOperator?.symbol}</span>
                    <span className="text-xs text-muted-foreground">{currentOperator?.label}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {operators.map((op) => (
                  <SelectItem key={op.value} value={op.value}>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-cyan-400 w-4">{op.symbol}</span>
                      <span>{op.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Value Section */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Input
              value={condition.value.toString()}
              onChange={(e) => onUpdate({ ...condition, value: e.target.value })}
              placeholder="Value"
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              disabled={!canEdit}
            />
          </div>

          {/* Delete Button */}
          {canEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConditionBlock;
