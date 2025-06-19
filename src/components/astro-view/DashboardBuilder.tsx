
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dashboard, DashboardWidget, ViewUserRole } from './types';
import { Save, X, Plus, Grid, BarChart, Clock, MapPin } from 'lucide-react';
import WidgetConfigurationPanel from './WidgetConfigurationPanel';

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

  const handleSaveWidget = (updatedWidget: DashboardWidget) => {
    setEditedDashboard({
      ...editedDashboard,
      widgets: editedDashboard.widgets.map(w => w.id === updatedWidget.id ? updatedWidget : w)
    });
    setSelectedWidget(null);
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

  // Show configuration panel if a widget is selected
  if (selectedWidget) {
    return (
      <WidgetConfigurationPanel
        widget={selectedWidget}
        onSave={handleSaveWidget}
        onCancel={() => setSelectedWidget(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {dashboard.id ? 'Edit Dashboard' : 'Create Dashboard'}
        </h3>
        <div className="flex gap-2">
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
            <Save className="h-4 w-4 mr-2" />
            Save Dashboard
          </Button>
          <Button variant="outline" onClick={onCancel} className="border-border text-foreground">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dashboard Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-lg">Dashboard Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Dashboard Name</Label>
              <Input
                id="name"
                value={editedDashboard.name}
                onChange={(e) => setEditedDashboard({ ...editedDashboard, name: e.target.value })}
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">Description</Label>
              <Textarea
                id="description"
                value={editedDashboard.description}
                onChange={(e) => setEditedDashboard({ ...editedDashboard, description: e.target.value })}
                className="bg-background border-border text-foreground"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience" className="text-foreground">Target Audience</Label>
              <Select
                value={editedDashboard.targetAudience}
                onValueChange={(value: any) => setEditedDashboard({ ...editedDashboard, targetAudience: value })}
              >
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="ed_managers">ED Managers</SelectItem>
                  <SelectItem value="ops_staff">Operations Staff</SelectItem>
                  <SelectItem value="executives">Executives</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="refresh" className="text-foreground">Auto Refresh (seconds)</Label>
              <Select
                value={editedDashboard.autoRefresh.toString()}
                onValueChange={(value) => setEditedDashboard({ ...editedDashboard, autoRefresh: parseInt(value) as any })}
              >
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <h4 className="text-foreground font-medium mb-3">Add Widgets</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddWidget('zone_tile')}
                  className="border-border text-foreground hover:bg-muted"
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  Zone Tile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddWidget('patient_timer')}
                  className="border-border text-foreground hover:bg-muted"
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Patient Timer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddWidget('chart')}
                  className="border-border text-foreground hover:bg-muted"
                >
                  <BarChart className="h-4 w-4 mr-1" />
                  Chart
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddWidget('metric_card')}
                  className="border-border text-foreground hover:bg-muted"
                >
                  <Grid className="h-4 w-4 mr-1" />
                  Metric Card
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Widget List */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground text-lg">Dashboard Widgets</CardTitle>
          </CardHeader>
          <CardContent>
            {editedDashboard.widgets.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Grid className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No widgets added yet</p>
                <p className="text-sm">Add widgets from the panel on the left</p>
              </div>
            ) : (
              <div className="space-y-3">
                {editedDashboard.widgets.map((widget) => (
                  <div
                    key={widget.id}
                    className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      {getWidgetIcon(widget.type)}
                      <div>
                        <div className="text-foreground font-medium">{widget.title}</div>
                        <div className="text-sm text-muted-foreground capitalize">
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
