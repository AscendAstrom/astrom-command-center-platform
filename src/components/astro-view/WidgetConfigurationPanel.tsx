
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DashboardWidget } from './types';
import { Save, X, Settings } from 'lucide-react';

interface WidgetConfigurationPanelProps {
  widget: DashboardWidget;
  onSave: (widget: DashboardWidget) => void;
  onCancel: () => void;
}

const WidgetConfigurationPanel = ({ widget, onSave, onCancel }: WidgetConfigurationPanelProps) => {
  const [editedWidget, setEditedWidget] = useState<DashboardWidget>(widget);

  const handleSave = () => {
    onSave(editedWidget);
  };

  const updateConfig = (key: string, value: any) => {
    setEditedWidget({
      ...editedWidget,
      config: {
        ...editedWidget.config,
        [key]: value
      }
    });
  };

  const renderTypeSpecificConfig = () => {
    switch (editedWidget.type) {
      case 'chart':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="chartType" className="text-foreground">Chart Type</Label>
              <Select
                value={editedWidget.config.chartType || 'bar'}
                onValueChange={(value) => updateConfig('chartType', value)}
              >
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                  <SelectItem value="donut">Donut Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'zone_tile':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="zoneId" className="text-foreground">Zone ID</Label>
              <Input
                id="zoneId"
                value={editedWidget.config.filters?.zoneId || ''}
                onChange={(e) => updateConfig('filters', { ...editedWidget.config.filters, zoneId: e.target.value })}
                placeholder="e.g., ED, ICU, OR"
                className="bg-background border-border text-foreground"
              />
            </div>
          </div>
        );

      case 'patient_timer':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timerType" className="text-foreground">Timer Type</Label>
              <Select
                value={editedWidget.config.filters?.timerType || 'wait_time'}
                onValueChange={(value) => updateConfig('filters', { ...editedWidget.config.filters, timerType: value })}
              >
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="wait_time">Wait Time</SelectItem>
                  <SelectItem value="treatment_time">Treatment Time</SelectItem>
                  <SelectItem value="total_time">Total Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Settings className="h-5 w-5" />
            Configure Widget
          </CardTitle>
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={onCancel} size="sm" className="border-border text-foreground">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Settings */}
        <div className="space-y-4">
          <h4 className="text-foreground font-medium">Basic Settings</h4>
          
          <div className="space-y-2">
            <Label htmlFor="widgetTitle" className="text-foreground">Widget Title</Label>
            <Input
              id="widgetTitle"
              value={editedWidget.title}
              onChange={(e) => setEditedWidget({ ...editedWidget, title: e.target.value })}
              className="bg-background border-border text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataSource" className="text-foreground">Data Source</Label>
            <Select
              value={editedWidget.config.dataSource || ''}
              onValueChange={(value) => updateConfig('dataSource', value)}
            >
              <SelectTrigger className="bg-background border-border text-foreground">
                <SelectValue placeholder="Select data source" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="hospital_data">Hospital Data</SelectItem>
                <SelectItem value="patient_flow">Patient Flow</SelectItem>
                <SelectItem value="bed_management">Bed Management</SelectItem>
                <SelectItem value="alerts">Alerts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Type-specific Configuration */}
        {renderTypeSpecificConfig()}

        {/* Advanced Settings */}
        <div className="space-y-4">
          <h4 className="text-foreground font-medium">Advanced Settings</h4>
          
          <div className="space-y-2">
            <Label htmlFor="refreshInterval" className="text-foreground">Refresh Interval</Label>
            <Select
              value={editedWidget.config.refreshInterval?.toString() || '30'}
              onValueChange={(value) => updateConfig('refreshInterval', parseInt(value))}
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

          <div className="flex items-center space-x-2">
            <Switch
              id="showDrillDown"
              checked={editedWidget.config.showDrillDown || false}
              onCheckedChange={(checked) => updateConfig('showDrillDown', checked)}
            />
            <Label htmlFor="showDrillDown" className="text-foreground">Enable Drill-down</Label>
          </div>
        </div>

        {/* Semantic Terms */}
        <div className="space-y-4">
          <h4 className="text-foreground font-medium">Semantic Terms</h4>
          <Textarea
            value={editedWidget.semanticTerms.join(', ')}
            onChange={(e) => setEditedWidget({ 
              ...editedWidget, 
              semanticTerms: e.target.value.split(',').map(term => term.trim()).filter(Boolean)
            })}
            placeholder="Enter semantic terms separated by commas"
            className="bg-background border-border text-foreground"
            rows={3}
          />
          <p className="text-sm text-muted-foreground">
            Add semantic terms to help with data interpretation and AI-powered insights
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WidgetConfigurationPanel;
