
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Trash2, 
  ArrowRight, 
  Database, 
  Filter,
  Shuffle,
  Calculator,
  Type,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

interface TransformationStep {
  id: string;
  type: 'filter' | 'map' | 'aggregate' | 'join' | 'sort' | 'calculate';
  name: string;
  config: Record<string, any>;
  inputFields: string[];
  outputFields: string[];
}

interface VisualTransformationBuilderProps {
  sourceFields: string[];
  onTransformationChange: (steps: TransformationStep[]) => void;
}

export const VisualTransformationBuilder = ({ 
  sourceFields, 
  onTransformationChange 
}: VisualTransformationBuilderProps) => {
  const [steps, setSteps] = useState<TransformationStep[]>([]);
  const [selectedStepType, setSelectedStepType] = useState<string>('');

  const stepTypes = [
    { value: 'filter', label: 'Filter Rows', icon: Filter, description: 'Remove rows based on conditions' },
    { value: 'map', label: 'Transform Fields', icon: Shuffle, description: 'Modify field values' },
    { value: 'calculate', label: 'Calculate Fields', icon: Calculator, description: 'Create calculated columns' },
    { value: 'aggregate', label: 'Aggregate Data', icon: Database, description: 'Group and summarize data' },
    { value: 'sort', label: 'Sort Data', icon: ArrowRight, description: 'Order rows by fields' },
    { value: 'join', label: 'Join Data', icon: Type, description: 'Combine with other datasets' }
  ];

  const addTransformationStep = () => {
    if (!selectedStepType) {
      toast.error('Please select a transformation type');
      return;
    }

    const stepType = stepTypes.find(t => t.value === selectedStepType);
    const newStep: TransformationStep = {
      id: Date.now().toString(),
      type: selectedStepType as any,
      name: stepType?.label || 'New Step',
      config: {},
      inputFields: sourceFields,
      outputFields: sourceFields
    };

    const updatedSteps = [...steps, newStep];
    setSteps(updatedSteps);
    onTransformationChange(updatedSteps);
    setSelectedStepType('');
    toast.success(`Added ${stepType?.label} step`);
  };

  const removeStep = (stepId: string) => {
    const updatedSteps = steps.filter(s => s.id !== stepId);
    setSteps(updatedSteps);
    onTransformationChange(updatedSteps);
    toast.success('Transformation step removed');
  };

  const updateStepConfig = (stepId: string, config: Record<string, any>) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, config: { ...step.config, ...config } } : step
    );
    setSteps(updatedSteps);
    onTransformationChange(updatedSteps);
  };

  const renderStepConfig = (step: TransformationStep) => {
    switch (step.type) {
      case 'filter':
        return (
          <div className="grid grid-cols-3 gap-2">
            <Select 
              value={step.config.field || ''} 
              onValueChange={(value) => updateStepConfig(step.id, { field: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Field" />
              </SelectTrigger>
              <SelectContent>
                {sourceFields.map(field => (
                  <SelectItem key={field} value={field}>{field}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select 
              value={step.config.operator || ''} 
              onValueChange={(value) => updateStepConfig(step.id, { operator: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equals">Equals</SelectItem>
                <SelectItem value="not_equals">Not Equals</SelectItem>
                <SelectItem value="greater_than">Greater Than</SelectItem>
                <SelectItem value="less_than">Less Than</SelectItem>
                <SelectItem value="contains">Contains</SelectItem>
              </SelectContent>
            </Select>
            <Input 
              placeholder="Value" 
              value={step.config.value || ''} 
              onChange={(e) => updateStepConfig(step.id, { value: e.target.value })}
            />
          </div>
        );

      case 'map':
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Select 
                value={step.config.sourceField || ''} 
                onValueChange={(value) => updateStepConfig(step.id, { sourceField: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Source Field" />
                </SelectTrigger>
                <SelectContent>
                  {sourceFields.map(field => (
                    <SelectItem key={field} value={field}>{field}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input 
                placeholder="Target Field Name" 
                value={step.config.targetField || ''} 
                onChange={(e) => updateStepConfig(step.id, { targetField: e.target.value })}
              />
            </div>
            <Select 
              value={step.config.transform || ''} 
              onValueChange={(value) => updateStepConfig(step.id, { transform: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Transformation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uppercase">To Uppercase</SelectItem>
                <SelectItem value="lowercase">To Lowercase</SelectItem>
                <SelectItem value="trim">Trim Spaces</SelectItem>
                <SelectItem value="date_format">Format Date</SelectItem>
                <SelectItem value="number_format">Format Number</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      case 'calculate':
        return (
          <div className="space-y-2">
            <Input 
              placeholder="New Field Name" 
              value={step.config.fieldName || ''} 
              onChange={(e) => updateStepConfig(step.id, { fieldName: e.target.value })}
            />
            <Input 
              placeholder="Formula (e.g., field1 + field2)" 
              value={step.config.formula || ''} 
              onChange={(e) => updateStepConfig(step.id, { formula: e.target.value })}
            />
          </div>
        );

      case 'aggregate':
        return (
          <div className="grid grid-cols-2 gap-2">
            <Select 
              value={step.config.groupBy || ''} 
              onValueChange={(value) => updateStepConfig(step.id, { groupBy: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Group By Field" />
              </SelectTrigger>
              <SelectContent>
                {sourceFields.map(field => (
                  <SelectItem key={field} value={field}>{field}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select 
              value={step.config.aggregation || ''} 
              onValueChange={(value) => updateStepConfig(step.id, { aggregation: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Aggregation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="count">Count</SelectItem>
                <SelectItem value="sum">Sum</SelectItem>
                <SelectItem value="avg">Average</SelectItem>
                <SelectItem value="min">Minimum</SelectItem>
                <SelectItem value="max">Maximum</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      default:
        return <div className="text-sm text-muted-foreground">Configure this step</div>;
    }
  };

  const getStepIcon = (type: string) => {
    const stepType = stepTypes.find(t => t.value === type);
    const IconComponent = stepType?.icon || Database;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Visual Transformation Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Select value={selectedStepType} onValueChange={setSelectedStepType}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select transformation type" />
              </SelectTrigger>
              <SelectContent>
                {stepTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <type.icon className="h-4 w-4" />
                      <div>
                        <div>{type.label}</div>
                        <div className="text-xs text-muted-foreground">{type.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addTransformationStep}>
              <Plus className="h-4 w-4 mr-2" />
              Add Step
            </Button>
          </div>

          {steps.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No transformation steps added yet</p>
              <p className="text-sm">Add steps above to build your data transformation pipeline</p>
            </div>
          ) : (
            <div className="space-y-3">
              {steps.map((step, index) => (
                <Card key={step.id} className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-background">
                          {index + 1}
                        </Badge>
                        {getStepIcon(step.type)}
                        <span className="font-medium">{step.name}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeStep(step.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {renderStepConfig(step)}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {steps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Transformation Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline">Source: {sourceFields.length} fields</Badge>
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <Badge variant="outline">{step.name}</Badge>
                </React.Fragment>
              ))}
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <Badge className="bg-green-500">Output Ready</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
