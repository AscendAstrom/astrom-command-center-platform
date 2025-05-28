
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, MapPin, AlertTriangle, Edit, Trash2, Plus } from "lucide-react";
import { SLAConfiguration as SLAConfig, MetricsUserRole } from './types';

interface SLAConfigurationProps {
  userRole: MetricsUserRole | null;
}

const SLAConfiguration = ({ userRole }: SLAConfigurationProps) => {
  const [slaConfigs, setSlaConfigs] = useState<SLAConfig[]>([
    {
      id: '1',
      name: 'ED Wait Time SLA',
      description: 'Maximum wait time for emergency department patients',
      zoneId: 'zone_1',
      zoneName: 'Emergency Department',
      metricType: 'wait_time',
      threshold: 30,
      unit: 'minutes',
      timeWindow: 'real_time',
      alertEnabled: true,
      escalationRules: [
        {
          id: '1',
          delay: 5,
          delayUnit: 'minutes',
          recipients: [
            { type: 'email', address: 'ed-manager@hospital.com', name: 'ED Manager' }
          ],
          actions: [
            { type: 'notification', config: { message: 'SLA breach detected' } }
          ]
        }
      ],
      status: 'active',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'ICU Bed Utilization',
      description: 'ICU bed utilization threshold',
      zoneId: 'zone_2',
      zoneName: 'Intensive Care Unit',
      metricType: 'utilization',
      threshold: 85,
      unit: 'percentage',
      timeWindow: 'hourly',
      alertEnabled: true,
      escalationRules: [],
      status: 'active',
      createdAt: '2024-01-16T09:00:00Z',
      updatedAt: '2024-01-16T09:00:00Z'
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newSLA, setNewSLA] = useState<Partial<SLAConfig>>({
    name: '',
    description: '',
    metricType: 'wait_time',
    threshold: 0,
    unit: 'minutes',
    timeWindow: 'real_time',
    alertEnabled: true,
    status: 'active'
  });

  const canEdit = userRole === 'ADMIN' || userRole === 'ANALYST';

  const getMetricTypeIcon = (type: string) => {
    switch (type) {
      case 'wait_time': return <Clock className="h-4 w-4" />;
      case 'utilization': return <MapPin className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'paused': return 'bg-yellow-600';
      case 'disabled': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const handleCreateSLA = () => {
    if (newSLA.name && newSLA.description) {
      const sla: SLAConfig = {
        id: Date.now().toString(),
        name: newSLA.name,
        description: newSLA.description,
        metricType: newSLA.metricType || 'wait_time',
        threshold: newSLA.threshold || 0,
        unit: newSLA.unit || 'minutes',
        timeWindow: newSLA.timeWindow || 'real_time',
        alertEnabled: newSLA.alertEnabled || true,
        escalationRules: [],
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setSlaConfigs([...slaConfigs, sla]);
      setNewSLA({
        name: '',
        description: '',
        metricType: 'wait_time',
        threshold: 0,
        unit: 'minutes',
        timeWindow: 'real_time',
        alertEnabled: true,
        status: 'active'
      });
      setIsCreateDialogOpen(false);
    }
  };

  const toggleSLAStatus = (slaId: string) => {
    setSlaConfigs(slaConfigs.map(sla => 
      sla.id === slaId 
        ? { ...sla, status: sla.status === 'active' ? 'paused' : 'active' }
        : sla
    ));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">SLA Configuration</CardTitle>
              <CardDescription>Configure service level agreements and thresholds per zone</CardDescription>
            </div>
            {canEdit && (
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add SLA
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New SLA</DialogTitle>
                    <DialogDescription>Define a new service level agreement</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sla-name">SLA Name</Label>
                        <Input
                          id="sla-name"
                          value={newSLA.name || ''}
                          onChange={(e) => setNewSLA({...newSLA, name: e.target.value})}
                          className="bg-slate-800 border-slate-700"
                          placeholder="e.g., ED Wait Time SLA"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zone">Zone</Label>
                        <Select value={newSLA.zoneName} onValueChange={(value) => setNewSLA({...newSLA, zoneName: value})}>
                          <SelectTrigger className="bg-slate-800 border-slate-700">
                            <SelectValue placeholder="Select zone" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="Emergency Department">Emergency Department</SelectItem>
                            <SelectItem value="Intensive Care Unit">ICU</SelectItem>
                            <SelectItem value="Operating Room">Operating Room</SelectItem>
                            <SelectItem value="Medical Ward">Medical Ward</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newSLA.description || ''}
                        onChange={(e) => setNewSLA({...newSLA, description: e.target.value})}
                        className="bg-slate-800 border-slate-700"
                        placeholder="Describe the SLA requirements"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="metric-type">Metric Type</Label>
                        <Select value={newSLA.metricType} onValueChange={(value) => setNewSLA({...newSLA, metricType: value as any})}>
                          <SelectTrigger className="bg-slate-800 border-slate-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="wait_time">Wait Time</SelectItem>
                            <SelectItem value="throughput">Throughput</SelectItem>
                            <SelectItem value="utilization">Utilization</SelectItem>
                            <SelectItem value="response_time">Response Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="threshold">Threshold</Label>
                        <Input
                          id="threshold"
                          type="number"
                          value={newSLA.threshold || ''}
                          onChange={(e) => setNewSLA({...newSLA, threshold: Number(e.target.value)})}
                          className="bg-slate-800 border-slate-700"
                          placeholder="30"
                        />
                      </div>
                      <div>
                        <Label htmlFor="unit">Unit</Label>
                        <Select value={newSLA.unit} onValueChange={(value) => setNewSLA({...newSLA, unit: value as any})}>
                          <SelectTrigger className="bg-slate-800 border-slate-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="minutes">Minutes</SelectItem>
                            <SelectItem value="hours">Hours</SelectItem>
                            <SelectItem value="percentage">Percentage</SelectItem>
                            <SelectItem value="count">Count</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="time-window">Time Window</Label>
                        <Select value={newSLA.timeWindow} onValueChange={(value) => setNewSLA({...newSLA, timeWindow: value as any})}>
                          <SelectTrigger className="bg-slate-800 border-slate-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="real_time">Real-time</SelectItem>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2 pt-6">
                        <Switch
                          id="alerts"
                          checked={newSLA.alertEnabled}
                          onCheckedChange={(checked) => setNewSLA({...newSLA, alertEnabled: checked})}
                        />
                        <Label htmlFor="alerts">Enable Alerts</Label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateSLA} className="bg-cyan-600 hover:bg-cyan-700">
                        Create SLA
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800">
                <TableHead className="text-slate-300">SLA Name</TableHead>
                <TableHead className="text-slate-300">Zone</TableHead>
                <TableHead className="text-slate-300">Metric</TableHead>
                <TableHead className="text-slate-300">Threshold</TableHead>
                <TableHead className="text-slate-300">Alerts</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                {canEdit && <TableHead className="text-slate-300">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {slaConfigs.map((sla) => (
                <TableRow key={sla.id} className="border-slate-800">
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">{sla.name}</div>
                      <div className="text-sm text-slate-400">{sla.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-cyan-400" />
                      <span className="text-slate-300">{sla.zoneName || 'All Zones'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getMetricTypeIcon(sla.metricType)}
                      <span className="text-slate-300 capitalize">
                        {sla.metricType.replace('_', ' ')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {sla.threshold} {sla.unit}
                  </TableCell>
                  <TableCell>
                    {sla.alertEnabled ? (
                      <Badge className="bg-green-600">Enabled</Badge>
                    ) : (
                      <Badge variant="outline">Disabled</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(sla.status)}>
                      {sla.status}
                    </Badge>
                  </TableCell>
                  {canEdit && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Switch
                          checked={sla.status === 'active'}
                          onCheckedChange={() => toggleSLAStatus(sla.id)}
                          size="sm"
                        />
                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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

export default SLAConfiguration;
