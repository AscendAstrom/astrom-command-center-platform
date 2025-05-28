
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Check, X, Plus, Clock, Users, DollarSign, Activity } from "lucide-react";
import { KPIDefinition, MetricsUserRole } from './types';

interface KPIDictionaryProps {
  userRole: MetricsUserRole | null;
}

const KPIDictionary = ({ userRole }: KPIDictionaryProps) => {
  const [kpis, setKpis] = useState<KPIDefinition[]>([
    {
      id: '1',
      name: 'Average Wait Time',
      description: 'Average time patients wait before being seen',
      category: 'operational',
      unit: 'minutes',
      formula: 'SUM(wait_time) / COUNT(patients)',
      visualLogic: [],
      thresholds: [
        { id: '1', name: 'Optimal', condition: 'less_than', value: 15, severity: 'info', color: '#10B981' },
        { id: '2', name: 'Warning', condition: 'between', value: 15, upperValue: 30, severity: 'warning', color: '#F59E0B' },
        { id: '3', name: 'Critical', condition: 'greater_than', value: 30, severity: 'critical', color: '#EF4444' }
      ],
      status: 'active',
      createdBy: 'admin',
      approvedBy: 'admin',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      approvedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'SLA Breach Count',
      description: 'Number of SLA breaches in the current period',
      category: 'operational',
      unit: 'count',
      formula: 'COUNT(breaches WHERE resolved = false)',
      visualLogic: [],
      thresholds: [
        { id: '4', name: 'Good', condition: 'less_than', value: 5, severity: 'info', color: '#10B981' },
        { id: '5', name: 'Alert', condition: 'greater_than', value: 10, severity: 'critical', color: '#EF4444' }
      ],
      status: 'active',
      createdBy: 'data_engineer',
      createdAt: '2024-01-16T09:00:00Z',
      updatedAt: '2024-01-16T09:00:00Z'
    }
  ]);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newKPI, setNewKPI] = useState<Partial<KPIDefinition>>({
    name: '',
    description: '',
    category: 'operational',
    unit: '',
    formula: '',
    status: 'draft'
  });

  const canCreate = userRole === 'ADMIN' || userRole === 'ANALYST';
  const canApprove = userRole === 'ADMIN';
  const canEdit = userRole === 'ADMIN' || userRole === 'ANALYST';

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'operational': return <Activity className="h-4 w-4" />;
      case 'clinical': return <Users className="h-4 w-4" />;
      case 'financial': return <DollarSign className="h-4 w-4" />;
      case 'quality': return <Check className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'draft': return 'bg-yellow-600';
      case 'deprecated': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const filteredKPIs = selectedCategory === 'all' 
    ? kpis 
    : kpis.filter(kpi => kpi.category === selectedCategory);

  const handleCreateKPI = () => {
    if (newKPI.name && newKPI.description) {
      const kpi: KPIDefinition = {
        id: Date.now().toString(),
        name: newKPI.name,
        description: newKPI.description,
        category: newKPI.category || 'operational',
        unit: newKPI.unit || '',
        formula: newKPI.formula || '',
        visualLogic: [],
        thresholds: [],
        status: 'draft',
        createdBy: 'current_user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setKpis([...kpis, kpi]);
      setNewKPI({ name: '', description: '', category: 'operational', unit: '', formula: '', status: 'draft' });
      setIsCreateDialogOpen(false);
    }
  };

  const handleApproveKPI = (kpiId: string) => {
    setKpis(kpis.map(kpi => 
      kpi.id === kpiId 
        ? { ...kpi, status: 'active', approvedBy: 'current_user', approvedAt: new Date().toISOString() }
        : kpi
    ));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">KPI Dictionary</CardTitle>
              <CardDescription>Manage and define key performance indicators</CardDescription>
            </div>
            {canCreate && (
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add KPI
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-slate-800 text-white">
                  <DialogHeader>
                    <DialogTitle>Create New KPI</DialogTitle>
                    <DialogDescription>Define a new key performance indicator</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">KPI Name</Label>
                      <Input
                        id="name"
                        value={newKPI.name || ''}
                        onChange={(e) => setNewKPI({...newKPI, name: e.target.value})}
                        className="bg-slate-800 border-slate-700"
                        placeholder="e.g., Average Wait Time"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newKPI.description || ''}
                        onChange={(e) => setNewKPI({...newKPI, description: e.target.value})}
                        className="bg-slate-800 border-slate-700"
                        placeholder="Describe what this KPI measures"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={newKPI.category} onValueChange={(value) => setNewKPI({...newKPI, category: value as any})}>
                        <SelectTrigger className="bg-slate-800 border-slate-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="operational">Operational</SelectItem>
                          <SelectItem value="clinical">Clinical</SelectItem>
                          <SelectItem value="financial">Financial</SelectItem>
                          <SelectItem value="quality">Quality</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="unit">Unit</Label>
                      <Input
                        id="unit"
                        value={newKPI.unit || ''}
                        onChange={(e) => setNewKPI({...newKPI, unit: e.target.value})}
                        className="bg-slate-800 border-slate-700"
                        placeholder="e.g., minutes, count, percentage"
                      />
                    </div>
                    <div>
                      <Label htmlFor="formula">Formula</Label>
                      <Textarea
                        id="formula"
                        value={newKPI.formula || ''}
                        onChange={(e) => setNewKPI({...newKPI, formula: e.target.value})}
                        className="bg-slate-800 border-slate-700"
                        placeholder="Define the calculation logic"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateKPI} className="bg-cyan-600 hover:bg-cyan-700">
                        Create KPI
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-slate-800 border-slate-700">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="clinical">Clinical</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="quality">Quality</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-slate-800">
                <TableHead className="text-slate-300">Name</TableHead>
                <TableHead className="text-slate-300">Category</TableHead>
                <TableHead className="text-slate-300">Unit</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Created By</TableHead>
                {(canEdit || canApprove) && <TableHead className="text-slate-300">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKPIs.map((kpi) => (
                <TableRow key={kpi.id} className="border-slate-800">
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">{kpi.name}</div>
                      <div className="text-sm text-slate-400">{kpi.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(kpi.category)}
                      <span className="text-slate-300 capitalize">{kpi.category}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{kpi.unit}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(kpi.status)}>
                      {kpi.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300">{kpi.createdBy}</TableCell>
                  {(canEdit || canApprove) && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {canEdit && (
                          <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {canApprove && kpi.status === 'draft' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-green-400 hover:text-green-300"
                            onClick={() => handleApproveKPI(kpi.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        {canEdit && (
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPIDictionary;
