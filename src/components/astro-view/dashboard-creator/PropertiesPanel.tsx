
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { DashboardWidget } from './types';

interface PropertiesPanelProps {
  widget: DashboardWidget;
  onWidgetUpdate: (widget: DashboardWidget) => void;
}

const PropertiesPanel = ({ widget, onWidgetUpdate }: PropertiesPanelProps) => {
  const handlePropertyChange = (property: string, value: any) => {
    if (property.includes('.')) {
      const [parent, child] = property.split('.');
      onWidgetUpdate({
        ...widget,
        [parent]: {
          ...widget[parent as keyof DashboardWidget],
          [child]: value
        }
      });
    } else {
      onWidgetUpdate({
        ...widget,
        [property]: value
      });
    }
  };

  return (
    <Card className="h-full bg-card border-0 rounded-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-foreground">Properties</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 overflow-auto">
        {/* Basic Properties */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Title</Label>
          <Input
            value={widget.title}
            onChange={(e) => handlePropertyChange('title', e.target.value)}
            className="h-8"
          />
        </div>

        <Separator />

        {/* Position & Size */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Position & Size</Label>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">X</Label>
              <Input
                type="number"
                value={widget.position.x}
                onChange={(e) => handlePropertyChange('position', { 
                  ...widget.position, 
                  x: parseInt(e.target.value) || 0 
                })}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Y</Label>
              <Input
                type="number"
                value={widget.position.y}
                onChange={(e) => handlePropertyChange('position', { 
                  ...widget.position, 
                  y: parseInt(e.target.value) || 0 
                })}
                className="h-8"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Width</Label>
              <Input
                type="number"
                value={widget.size.width}
                onChange={(e) => handlePropertyChange('size', { 
                  ...widget.size, 
                  width: parseInt(e.target.value) || 100 
                })}
                className="h-8"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Height</Label>
              <Input
                type="number"
                value={widget.size.height}
                onChange={(e) => handlePropertyChange('size', { 
                  ...widget.size, 
                  height: parseInt(e.target.value) || 100 
                })}
                className="h-8"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Chart-specific properties */}
        {widget.type === 'chart' && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Chart Settings</Label>
            
            <div>
              <Label className="text-xs text-muted-foreground">Chart Type</Label>
              <Select 
                value={widget.config.chartType || 'bar'} 
                onValueChange={(value) => handlePropertyChange('config.chartType', value)}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Show Legend</Label>
              <Switch 
                checked={widget.config.showLegend || false}
                onCheckedChange={(checked) => handlePropertyChange('config.showLegend', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Show Grid</Label>
              <Switch 
                checked={widget.config.showGrid || false}
                onCheckedChange={(checked) => handlePropertyChange('config.showGrid', checked)}
              />
            </div>
          </div>
        )}

        <Separator />

        {/* General Settings */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">General</Label>
          
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Show Title</Label>
            <Switch 
              checked={widget.config.showTitle !== false}
              onCheckedChange={(checked) => handlePropertyChange('config.showTitle', checked)}
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Refresh Interval (seconds)</Label>
            <Select 
              value={widget.config.refreshInterval?.toString() || '30'} 
              onValueChange={(value) => handlePropertyChange('config.refreshInterval', parseInt(value))}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 seconds</SelectItem>
                <SelectItem value="30">30 seconds</SelectItem>
                <SelectItem value="60">1 minute</SelectItem>
                <SelectItem value="300">5 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertiesPanel;
