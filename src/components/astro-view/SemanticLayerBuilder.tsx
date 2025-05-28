
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SemanticTerm, ViewUserRole } from './types';
import { Plus, Edit, Trash2, Calculator, Database } from 'lucide-react';

interface SemanticLayerBuilderProps {
  userRole: ViewUserRole;
}

const SemanticLayerBuilder = ({ userRole }: SemanticLayerBuilderProps) => {
  const [semanticTerms, setSemanticTerms] = useState<SemanticTerm[]>([
    {
      id: '1',
      name: 'Average Wait Time',
      description: 'Average time patients wait before being seen',
      formula: 'AVG(seen_timestamp - arrival_timestamp)',
      unit: 'minutes',
      category: 'Patient Flow',
      dataSource: 'patient_visits',
      createdBy: 'admin',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'Bed Utilization Rate',
      description: 'Percentage of beds currently occupied',
      formula: '(occupied_beds / total_beds) * 100',
      unit: 'percentage',
      category: 'Capacity',
      dataSource: 'bed_status',
      createdBy: 'analyst',
      createdAt: '2024-01-16T09:00:00Z',
      updatedAt: '2024-01-16T09:00:00Z'
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingTerm, setEditingTerm] = useState<SemanticTerm | null>(null);

  const canEdit = userRole === 'ADMIN' || userRole === 'ANALYST';

  const handleCreateTerm = () => {
    setIsCreating(true);
    setEditingTerm({
      id: '',
      name: '',
      description: '',
      formula: '',
      unit: '',
      category: '',
      dataSource: '',
      createdBy: userRole.toLowerCase(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  const handleSaveTerm = (term: SemanticTerm) => {
    if (isCreating) {
      const newTerm = { ...term, id: Date.now().toString() };
      setSemanticTerms([...semanticTerms, newTerm]);
    } else {
      setSemanticTerms(semanticTerms.map(t => t.id === term.id ? term : t));
    }
    setIsCreating(false);
    setEditingTerm(null);
  };

  const handleDeleteTerm = (termId: string) => {
    setSemanticTerms(semanticTerms.filter(t => t.id !== termId));
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Patient Flow': 'bg-blue-600',
      'Capacity': 'bg-green-600',
      'Quality': 'bg-yellow-600',
      'Financial': 'bg-purple-600'
    };
    return colors[category] || 'bg-gray-600';
  };

  if (editingTerm) {
    return (
      <SemanticTermEditor
        term={editingTerm}
        onSave={handleSaveTerm}
        onCancel={() => {
          setIsCreating(false);
          setEditingTerm(null);
        }}
        isCreating={isCreating}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Business Terms Dictionary</h3>
          <p className="text-sm text-slate-400">Define standardized metrics and calculations</p>
        </div>
        {canEdit && (
          <Button onClick={handleCreateTerm} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Term
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {semanticTerms.map((term) => (
          <Card key={term.id} className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-white text-lg">{term.name}</CardTitle>
                  <CardDescription>{term.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getCategoryColor(term.category)}>
                    {term.category}
                  </Badge>
                  {canEdit && (
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingTerm(term)}
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTerm(term.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Calculator className="h-4 w-4 text-purple-400" />
                <code className="bg-slate-900 px-2 py-1 rounded text-cyan-400">
                  {term.formula}
                </code>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Database className="h-4 w-4 text-blue-400" />
                <span>Source: {term.dataSource}</span>
                <span className="text-slate-500">•</span>
                <span>Unit: {term.unit}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

interface SemanticTermEditorProps {
  term: SemanticTerm;
  onSave: (term: SemanticTerm) => void;
  onCancel: () => void;
  isCreating: boolean;
}

const SemanticTermEditor = ({ term, onSave, onCancel, isCreating }: SemanticTermEditorProps) => {
  const [editedTerm, setEditedTerm] = useState(term);

  const handleSave = () => {
    onSave({
      ...editedTerm,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">
          {isCreating ? 'Create New Term' : 'Edit Term'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">Term Name</Label>
            <Input
              id="name"
              value={editedTerm.name}
              onChange={(e) => setEditedTerm({ ...editedTerm, name: e.target.value })}
              className="bg-slate-900 border-slate-600 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category" className="text-slate-300">Category</Label>
            <Select
              value={editedTerm.category}
              onValueChange={(value) => setEditedTerm({ ...editedTerm, category: value })}
            >
              <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="Patient Flow">Patient Flow</SelectItem>
                <SelectItem value="Capacity">Capacity</SelectItem>
                <SelectItem value="Quality">Quality</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-slate-300">Description</Label>
          <Textarea
            id="description"
            value={editedTerm.description}
            onChange={(e) => setEditedTerm({ ...editedTerm, description: e.target.value })}
            className="bg-slate-900 border-slate-600 text-white"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="formula" className="text-slate-300">Formula</Label>
          <Textarea
            id="formula"
            value={editedTerm.formula}
            onChange={(e) => setEditedTerm({ ...editedTerm, formula: e.target.value })}
            className="bg-slate-900 border-slate-600 text-white font-mono"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="unit" className="text-slate-300">Unit</Label>
            <Input
              id="unit"
              value={editedTerm.unit}
              onChange={(e) => setEditedTerm({ ...editedTerm, unit: e.target.value })}
              className="bg-slate-900 border-slate-600 text-white"
              placeholder="e.g., minutes, percentage, count"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dataSource" className="text-slate-300">Data Source</Label>
            <Input
              id="dataSource"
              value={editedTerm.dataSource}
              onChange={(e) => setEditedTerm({ ...editedTerm, dataSource: e.target.value })}
              className="bg-slate-900 border-slate-600 text-white"
              placeholder="e.g., patient_visits, bed_status"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
            {isCreating ? 'Create Term' : 'Save Changes'}
          </Button>
          <Button variant="outline" onClick={onCancel} className="border-slate-600 text-slate-300">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SemanticLayerBuilder;
