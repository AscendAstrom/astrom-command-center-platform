
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Play, 
  Save, 
  Plus, 
  Edit3,
  Trash2,
  Eye,
  Database
} from 'lucide-react';
import { TransformationRule } from './types';

interface TransformationRulesEditorProps {
  readOnly?: boolean;
}

export const TransformationRulesEditor = ({ readOnly = false }: TransformationRulesEditorProps) => {
  const [rules, setRules] = useState<TransformationRule[]>([
    {
      id: '1',
      name: 'Clean Timestamps',
      description: 'Standardize timestamp formats and handle null values',
      ruleType: 'sql',
      sqlQuery: `SELECT 
  CASE 
    WHEN admission_time IS NULL THEN CURRENT_TIMESTAMP
    ELSE TO_TIMESTAMP(admission_time, 'YYYY-MM-DD HH24:MI:SS')
  END as cleaned_timestamp
FROM source_table`,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-16'
    },
    {
      id: '2',
      name: 'Patient ID Normalization',
      description: 'Ensure patient IDs follow standard format',
      ruleType: 'sql',
      sqlQuery: `SELECT 
  UPPER(TRIM(patient_id)) as normalized_patient_id,
  CASE 
    WHEN LENGTH(patient_id) < 6 
    THEN LPAD(patient_id, 6, '0')
    ELSE patient_id
  END as padded_id
FROM source_table`,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    }
  ]);

  const [selectedRule, setSelectedRule] = useState<TransformationRule | null>(rules[0]);
  const [editingRule, setEditingRule] = useState<Partial<TransformationRule>>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleCreateRule = () => {
    if (readOnly) return;
    setEditingRule({
      name: '',
      description: '',
      ruleType: 'sql',
      sqlQuery: ''
    });
    setIsEditing(true);
  };

  const handleSaveRule = () => {
    if (readOnly) return;
    
    if (editingRule.id) {
      // Update existing rule
      setRules(prev => prev.map(rule => 
        rule.id === editingRule.id 
          ? { ...rule, ...editingRule, updatedAt: new Date().toISOString().split('T')[0] }
          : rule
      ));
    } else {
      // Create new rule
      const newRule: TransformationRule = {
        id: Date.now().toString(),
        name: editingRule.name || '',
        description: editingRule.description || '',
        ruleType: editingRule.ruleType || 'sql',
        sqlQuery: editingRule.sqlQuery || '',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setRules(prev => [...prev, newRule]);
    }
    
    setIsEditing(false);
    setEditingRule({});
  };

  const handleDeleteRule = (ruleId: string) => {
    if (readOnly) return;
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
    if (selectedRule?.id === ruleId) {
      setSelectedRule(rules[0] || null);
    }
  };

  const handleTestRule = () => {
    console.log('Testing rule:', selectedRule?.sqlQuery);
    // In a real implementation, this would execute the SQL against a test dataset
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Rules List */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-foreground text-lg">Transformation Rules</CardTitle>
            {!readOnly && (
              <Button size="sm" onClick={handleCreateRule}>
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedRule?.id === rule.id
                  ? 'bg-purple-500/20 border-purple-500/50'
                  : 'bg-muted/30 border-border hover:border-muted-foreground'
              }`}
              onClick={() => setSelectedRule(rule)}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-foreground text-sm">{rule.name}</span>
                <Badge variant="outline" className="text-xs">
                  {rule.ruleType.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{rule.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">Updated: {rule.updatedAt}</span>
                {!readOnly && (
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingRule(rule);
                        setIsEditing(true);
                      }}
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 text-red-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRule(rule.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rule Editor */}
      <div className="lg:col-span-2">
        {isEditing ? (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">
                {editingRule.id ? 'Edit Rule' : 'Create New Rule'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Rule Name
                </label>
                <Input
                  value={editingRule.name || ''}
                  onChange={(e) => setEditingRule(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter rule name"
                  className="bg-muted border-border"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <Textarea
                  value={editingRule.description || ''}
                  onChange={(e) => setEditingRule(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this rule does"
                  className="bg-muted border-border"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  SQL Query
                </label>
                <Textarea
                  value={editingRule.sqlQuery || ''}
                  onChange={(e) => setEditingRule(prev => ({ ...prev, sqlQuery: e.target.value }))}
                  placeholder="Enter your SQL transformation query"
                  className="bg-muted/80 border-border font-mono text-sm"
                  rows={8}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveRule}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Rule
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : selectedRule ? (
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-foreground">{selectedRule.name}</CardTitle>
                  <p className="text-muted-foreground mt-1">{selectedRule.description}</p>
                </div>
                <div className="flex gap-2">
                  {!readOnly && (
                    <>
                      <Button size="sm" variant="outline" onClick={handleTestRule}>
                        <Play className="h-4 w-4 mr-2" />
                        Test
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setEditingRule(selectedRule);
                          setIsEditing(true);
                        }}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </>
                  )}
                  {readOnly && (
                    <Badge variant="outline" className="text-amber-400 border-amber-400">
                      <Eye className="h-3 w-3 mr-1" />
                      View Only
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="sql" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                  <TabsTrigger value="sql">SQL Query</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="sql" className="mt-4">
                  <div className="bg-muted/80 rounded-lg p-4">
                    <pre className="text-sm text-foreground font-mono whitespace-pre-wrap">
                      {selectedRule.sqlQuery}
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="preview" className="mt-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium text-foreground">Query Result Preview</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Preview functionality would show sample output here
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-card border-border">
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a rule to view or edit</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
