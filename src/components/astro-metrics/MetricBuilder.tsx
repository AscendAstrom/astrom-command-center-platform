
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, ArrowDown, Settings, Trash2, Database, Filter, Calculator, BarChart } from "lucide-react";
import { MetricLogicStep, MetricsUserRole } from './types';

interface MetricBuilderProps {
  userRole: MetricsUserRole | null;
}

const MetricBuilder = ({ userRole }: MetricBuilderProps) => {
  const [logicSteps, setLogicSteps] = useState<MetricLogicStep[]>([
    {
      id: '1',
      type: 'data_source',
      config: { source: 'patient_visits', table: 'ed_visits' },
      order: 1,
      description: 'Select ED visits data'
    },
    {
      id: '2',
      type: 'filter',
      config: { field: 'status', operator: 'equals', value: 'completed' },
      order: 2,
      description: 'Filter for completed visits only'
    },
    {
      id: '3',
      type: 'aggregate',
      config: { function: 'average', field: 'wait_time_minutes' },
      order: 3,
      description: 'Calculate average wait time'
    }
  ]);

  const [selectedStepType, setSelectedStepType] = useState<string>('data_source');
  const canEdit = userRole === 'ADMIN' || userRole === 'ANALYST';

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'data_source': return <Database className="h-4 w-4" />;
      case 'filter': return <Filter className="h-4 w-4" />;
      case 'aggregate': return <BarChart className="h-4 w-4" />;
      case 'calculate': return <Calculator className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case 'data_source': return 'bg-blue-600';
      case 'filter': return 'bg-purple-600';
      case 'aggregate': return 'bg-green-600';
      case 'calculate': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const addLogicStep = () => {
    const newStep: MetricLogicStep = {
      id: Date.now().toString(),
      type: selectedStepType as any,
      config: {},
      order: logicSteps.length + 1,
      description: `New ${selectedStepType} step`
    };
    setLogicSteps([...logicSteps, newStep]);
  };

  const removeLogicStep = (stepId: string) => {
    setLogicSteps(logicSteps.filter(step => step.id !== stepId));
  };

  const renderStepConfig = (step: MetricLogicStep) => {
    switch (step.type) {
      case 'data_source':
        return (
          <div className="space-y-2">
            <Select value={step.config.source} onValueChange={(value) => {
              const updatedStep = { ...step, config: { ...step.config, source: value } };
              setLogicSteps(logicSteps.map(s => s.id === step.id ? updatedStep : s));
            }}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select data source" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="patient_visits">Patient Visits</SelectItem>
                <SelectItem value="bed_management">Bed Management</SelectItem>
                <SelectItem value="lab_results">Lab Results</SelectItem>
                <SelectItem value="staff_schedule">Staff Schedule</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      
      case 'filter':
        return (
          <div className="grid grid-cols-3 gap-2">
            <Select value={step.config.field}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Field" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="zone">Zone</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="timestamp">Timestamp</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={step.config.operator}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Operator" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
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
              onChange={(e) => {
                const updatedStep = { ...step, config: { ...step.config, value: e.target.value } };
                setLogicSteps(logicSteps.map(s => s.id === step.id ? updatedStep : s));
              }}
              className="bg-background border-border"
            />
          </div>
        );
      
      case 'aggregate':
        return (
          <div className="grid grid-cols-2 gap-2">
            <Select value={step.config.function}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Function" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="count">Count</SelectItem>
                <SelectItem value="sum">Sum</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="min">Minimum</SelectItem>
                <SelectItem value="max">Maximum</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={step.config.field}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Field" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="wait_time_minutes">Wait Time</SelectItem>
                <SelectItem value="length_of_stay">Length of Stay</SelectItem>
                <SelectItem value="patient_count">Patient Count</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      
      default:
        return <div className="text-muted-foreground">Configure step parameters</div>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Visual Logic Builder</CardTitle>
          <CardDescription>Build metrics using drag-and-drop logic steps</CardDescription>
        </CardHeader>
        <CardContent>
          {canEdit && (
            <div className="flex items-center gap-4 mb-6 p-4 bg-muted rounded-lg">
              <Label className="text-foreground">Add Step:</Label>
              <Select value={selectedStepType} onValueChange={setSelectedStepType}>
                <SelectTrigger className="w-48 bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="data_source">Data Source</SelectItem>
                  <SelectItem value="filter">Filter</SelectItem>
                  <SelectItem value="aggregate">Aggregate</SelectItem>
                  <SelectItem value="calculate">Calculate</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={addLogicStep} className="bg-cyan-600 hover:bg-cyan-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            </div>
          )}

          <div className="space-y-4">
            {logicSteps.map((step, index) => (
              <div key={step.id}>
                <Card className="bg-muted border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getStepColor(step.type)}`}>
                          {getStepIcon(step.type)}
                        </div>
                        <div>
                          <div className="font-medium text-foreground capitalize">
                            {step.type.replace('_', ' ')} Step
                          </div>
                          <div className="text-sm text-muted-foreground">{step.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-foreground">
                          Step {step.order}
                        </Badge>
                        {canEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLogicStep(step.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {canEdit ? renderStepConfig(step) : (
                      <div className="text-sm text-foreground">
                        {JSON.stringify(step.config, null, 2)}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {index < logicSteps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowDown className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {logicSteps.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No logic steps defined. Add steps to build your metric calculation.
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Generated SQL Preview</CardTitle>
          <CardDescription>Preview of the SQL query that will be generated</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg">
            <code className="text-sm text-green-400">
              {`SELECT AVG(wait_time_minutes) as avg_wait_time
FROM patient_visits.ed_visits 
WHERE status = 'completed'
GROUP BY DATE(created_at);`}
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricBuilder;
