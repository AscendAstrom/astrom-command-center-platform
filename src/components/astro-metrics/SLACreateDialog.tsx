
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { SLAConfiguration } from './types';

interface SLACreateDialogProps {
  onCreateSLA: (sla: SLAConfiguration) => void;
  canEdit: boolean;
}

const SLACreateDialog = ({ onCreateSLA, canEdit }: SLACreateDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newSLA, setNewSLA] = useState<Partial<SLAConfiguration>>({
    name: '',
    description: '',
    metricType: 'wait_time',
    threshold: 0,
    unit: 'minutes',
    timeWindow: 'real_time',
    alertEnabled: true,
    status: 'active'
  });

  const handleCreate = () => {
    if (newSLA.name && newSLA.description) {
      const sla: SLAConfiguration = {
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
      
      onCreateSLA(sla);
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
      setIsOpen(false);
    }
  };

  if (!canEdit) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} className="bg-cyan-600 hover:bg-cyan-700">
              Create SLA
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SLACreateDialog;
