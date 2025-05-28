
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Play, 
  Save, 
  Plus, 
  Trash2,
  CheckCircle,
  AlertCircle,
  Copy,
  Eye
} from 'lucide-react';
import { TimestampCleaningRule, DuplicateResolutionRule } from './types';

interface TimestampToolsProps {
  readOnly?: boolean;
}

export const TimestampTools = ({ readOnly = false }: TimestampToolsProps) => {
  const [timestampRules, setTimestampRules] = useState<TimestampCleaningRule[]>([
    {
      id: '1',
      name: 'ISO 8601 Standardization',
      pattern: '(\\d{2})/(\\d{2})/(\\d{4}) (\\d{2}):(\\d{2}):(\\d{2})',
      replacement: '$3-$1-$2T$4:$5:$6',
      description: 'Convert MM/DD/YYYY HH:MM:SS to ISO 8601 format'
    },
    {
      id: '2',
      name: 'Handle Null Timestamps',
      pattern: '^(null|NULL|\\s*)$',
      replacement: 'CURRENT_TIMESTAMP',
      description: 'Replace null or empty timestamp values with current timestamp'
    }
  ]);

  const [duplicateRules, setDuplicateRules] = useState<DuplicateResolutionRule[]>([
    {
      id: '1',
      name: 'Patient Admission Duplicates',
      fields: ['patient_id', 'admission_datetime'],
      strategy: 'keep_last',
      description: 'For duplicate patient admissions, keep the most recent entry'
    },
    {
      id: '2',
      name: 'Zone Assignment Duplicates',
      fields: ['patient_id', 'zone_id', 'assignment_time'],
      strategy: 'merge',
      description: 'Merge duplicate zone assignments for the same patient'
    }
  ]);

  const [testInput, setTestInput] = useState('01/15/2024 14:30:00');
  const [testResults, setTestResults] = useState<string[]>([]);

  const handleTestTimestampRule = (rule: TimestampCleaningRule) => {
    try {
      const regex = new RegExp(rule.pattern, 'g');
      const result = testInput.replace(regex, rule.replacement);
      setTestResults(prev => [...prev, `${rule.name}: ${testInput} → ${result}`]);
    } catch (error) {
      setTestResults(prev => [...prev, `${rule.name}: Error - Invalid regex pattern`]);
    }
  };

  const handleAddTimestampRule = () => {
    if (readOnly) return;
    
    const newRule: TimestampCleaningRule = {
      id: Date.now().toString(),
      name: 'New Rule',
      pattern: '',
      replacement: '',
      description: ''
    };
    setTimestampRules(prev => [...prev, newRule]);
  };

  const handleAddDuplicateRule = () => {
    if (readOnly) return;
    
    const newRule: DuplicateResolutionRule = {
      id: Date.now().toString(),
      name: 'New Duplicate Rule',
      fields: [],
      strategy: 'keep_first',
      description: ''
    };
    setDuplicateRules(prev => [...prev, newRule]);
  };

  const getStrategyColor = (strategy: DuplicateResolutionRule['strategy']) => {
    switch (strategy) {
      case 'keep_first': return 'text-blue-400 border-blue-400';
      case 'keep_last': return 'text-green-400 border-green-400';
      case 'merge': return 'text-purple-400 border-purple-400';
      case 'manual_review': return 'text-yellow-400 border-yellow-400';
      default: return 'text-muted-foreground border-border';
    }
  };

  return (
    <Tabs defaultValue="timestamp" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 bg-muted/50">
        <TabsTrigger value="timestamp">Timestamp Cleaning</TabsTrigger>
        <TabsTrigger value="duplicates">Duplicate Resolution</TabsTrigger>
      </TabsList>

      <TabsContent value="timestamp" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Timestamp Rules */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-foreground text-lg">Cleaning Rules</CardTitle>
                {!readOnly && (
                  <Button size="sm" onClick={handleAddTimestampRule}>
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {timestampRules.map((rule) => (
                <div key={rule.id} className="p-3 rounded-lg bg-muted/30 border border-border">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-foreground text-sm">{rule.name}</span>
                    {!readOnly && (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={() => handleTestTimestampRule(rule)}
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-red-400"
                          onClick={() => setTimestampRules(prev => prev.filter(r => r.id !== rule.id))}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">{rule.description}</p>
                  
                  <div className="space-y-1">
                    <div className="text-xs">
                      <span className="text-muted-foreground">Pattern:</span>
                      <code className="ml-2 text-blue-400 font-mono">{rule.pattern}</code>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground">Replace:</span>
                      <code className="ml-2 text-green-400 font-mono">{rule.replacement}</code>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Test Panel */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-400" />
                Test Timestamp Cleaning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Test Input
                </label>
                <Input
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  placeholder="Enter timestamp to test"
                  className="bg-muted border-border font-mono"
                  readOnly={readOnly}
                />
              </div>
              
              {!readOnly && (
                <Button
                  onClick={() => setTestResults([])}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Clear Results
                </Button>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Test Results
                </label>
                <div className="bg-muted/80 rounded-lg p-3 max-h-40 overflow-y-auto">
                  {testResults.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No test results yet</p>
                  ) : (
                    <div className="space-y-1">
                      {testResults.map((result, index) => (
                        <div key={index} className="text-sm font-mono text-foreground">
                          {result}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="duplicates" className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-foreground">Duplicate Resolution Rules</CardTitle>
              {!readOnly && (
                <Button size="sm" onClick={handleAddDuplicateRule}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              )}
              {readOnly && (
                <Badge variant="outline" className="text-amber-400 border-amber-400">
                  <Eye className="h-3 w-3 mr-1" />
                  View Only
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {duplicateRules.map((rule) => (
              <div key={rule.id} className="p-4 rounded-lg bg-muted/30 border border-border">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-medium text-foreground">{rule.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${getStrategyColor(rule.strategy)}`}>
                      {rule.strategy.replace('_', ' ').toUpperCase()}
                    </Badge>
                    {!readOnly && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-red-400"
                        onClick={() => setDuplicateRules(prev => prev.filter(r => r.id !== rule.id))}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
                
                <div>
                  <span className="text-sm text-muted-foreground mb-2 block">Duplicate Detection Fields:</span>
                  <div className="flex flex-wrap gap-1">
                    {rule.fields.map((field, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {field}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Duplicate Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-foreground">1,247</p>
                  <p className="text-sm text-muted-foreground">Records Processed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-8 w-8 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-foreground">23</p>
                  <p className="text-sm text-muted-foreground">Duplicates Found</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Copy className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-foreground">18</p>
                  <p className="text-sm text-muted-foreground">Auto-Resolved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};
