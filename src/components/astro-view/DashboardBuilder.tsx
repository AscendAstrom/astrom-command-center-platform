
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dashboard, DashboardWidget, ViewUserRole } from './types';
import { Save, X, Plus, Grid, BarChart, Clock, MapPin } from 'lucide-react';

interface DashboardBuilderProps {
  dashboard: Dashboard;
  onSave: (dashboard: Dashboard) => void;
  onCancel: () => void;
  userRole: ViewUserRole;
}

const DashboardBuilder = ({ dashboard, onSave, onCancel, userRole }: DashboardBuilderProps) => {
  const [editedDashboard, setEditedDashboard] = useState(dashboard);
  const [selectedWidget, setSelectedWidget] = useState<DashboardWidget | null>(null);

  const handleSave = () => {
    onSave({
      ...editedDashboard,
      updatedAt: new Date().toISOString()
    });
  };

  const handleAddWidget = (type: DashboardWidget['type']) => {
    const newWidget: DashboardWidget = {
      id: Date.now().toString(),
      type,
      title: `New ${type.replace('_', ' ')}`,
      position: { x: 0, y: 0, w: 4, h: 3 },
      config: {
        refreshInterval: 30,
        showDrillDown: true
      },
      semanticTerms: []
    };
    
    setEditedDashboard({
      ...editedDashboard,
      widgets: [...editedDashboard.widgets, newWidget]
    });
  };

  const handleRemoveWidget = (widgetId: string) => {
    setEditedDashboard({
      ...editedDashboard,
      widgets: editedDashboard.widgets.filter(w => w.id !== widgetId)
    });
  };

  const getWidgetIcon = (type: DashboardWidget['type']) => {
    switch (type) {
      case 'zone_tile': return <MapPin className="h-4 w-4" />;
      case 'patient_timer': return <Clock className="h-4 w-4" />;
      case 'chart': return <BarChart className="h-4 w-4" />;
      case 'metric_card': return <Grid className="h-4 w-4" />;
      default: return <Grid className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {dashboard.id ? 'Edit Dashboard' : 'Create Dashboard'}
        </h3>
        <div className="flex gap-2">
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
            <Save className="h-4 w-4 mr-2" />
            Save Dashboard
          </Button>
          <Button variant="outline" onClick={onCancel} className="border-slate-600 text-slate-300">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dashboard Settings */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Dashboard Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">Dashboard Name</Label>
              <Input
                id="name"
                value={editedDashboard.name}
                onChange={(e) => setEditedDashboard({ ...editedDashboard, name: e.target.value })}
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-300">Description</Label>
              <Textarea
                id="description"
                value={editedDashboard.description}
                onChange={(e) => setEditedDashboard({ ...editedDashboard, description: e.target.value })}
                className="bg-slate-900 border-slate-600 text-white"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience" className="text-slate-300">Target Audience</Label>
              <Select
                value={editedDashboard.targetAudience}
                onValueChange={(value: any) => setEditedDashboard({ ...editedDashboard, targetAudience: value })}
              >
                <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="ed_managers">ED Managers</SelectItem>
                  <SelectItem value="ops_staff">Operations Staff</SelectItem>
                  <SelectItem value="executives">Executives</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="refresh" className="text-slate-300">Auto Refresh (seconds)</Label>
              <Select
                value={editedDashboard.autoRefresh.toString()}
                onValueChange={(value) => setEditedDashboard({ ...editedDashboard, autoRefresh: parseInt(value) as any })}
              >
                <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <h4 className="text-white font-medium mb-3">Add Widgets</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddWidget('zone_tile')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  Zone Tile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddWidget('patient_timer')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Patient Timer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddWidget('chart')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <BarChart className="h-4 w-4 mr-1" />
                  Chart
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddWidget('metric_card')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Grid className="h-4 w-4 mr-1" />
                  Metric Card
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Widget List */}
        <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white text-lg">Dashboard Widgets</CardTitle>
          </CardHeader>
          <CardContent>
            {editedDashboard.widgets.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Grid className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No widgets added yet</p>
                <p className="text-sm">Add widgets from the panel on the left</p>
              </div>
            ) : (
              <div className="space-y-3">
                {editedDashboard.widgets.map((widget) => (
                  <div
                    key={widget.id}
                    className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700"
                  >
                    <div className="flex items-center gap-3">
                      {getWidgetIcon(widget.type)}
                      <div>
                        <div className="text-white font-medium">{widget.title}</div>
                        <div className="text-sm text-slate-400 capitalize">
                          {widget.type.replace('_', ' ')}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedWidget(widget)}
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        Configure
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveWidget(widget.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardBuilder;
