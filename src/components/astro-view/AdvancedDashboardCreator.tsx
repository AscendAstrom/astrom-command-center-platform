
import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Play, Grid2X2 } from 'lucide-react';
import WidgetPalette from './dashboard-creator/WidgetPalette';
import PropertiesPanel from './dashboard-creator/PropertiesPanel';
import { DashboardWidget, WidgetType } from './dashboard-creator/types';
import { toast } from 'sonner';

const AdvancedDashboardCreator = () => {
  const [dashboardName, setDashboardName] = useState('New Dashboard');
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<DashboardWidget | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleAddWidget = useCallback((type: WidgetType) => {
    const newWidget: DashboardWidget = {
      id: `widget-${Date.now()}`,
      type,
      title: `New ${type}`,
      position: { x: 50 + widgets.length * 20, y: 50 + widgets.length * 20 },
      size: { width: 300, height: 200 },
      config: {
        refreshInterval: 30,
        showTitle: true,
        backgroundColor: '#ffffff',
        borderColor: '#e5e7eb'
      },
      data: generateSampleData(type)
    };
    
    setWidgets(prev => [...prev, newWidget]);
    toast.success(`${type} widget added to dashboard`);
  }, [widgets.length]);

  const handleWidgetUpdate = useCallback((updatedWidget: DashboardWidget) => {
    setWidgets(prev => prev.map(w => w.id === updatedWidget.id ? updatedWidget : w));
    if (selectedWidget?.id === updatedWidget.id) {
      setSelectedWidget(updatedWidget);
    }
  }, [selectedWidget]);

  const handleWidgetDelete = useCallback((widgetId: string) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId));
    if (selectedWidget?.id === widgetId) {
      setSelectedWidget(null);
    }
    toast.success('Widget deleted');
  }, [selectedWidget]);

  const handleSaveDashboard = () => {
    const dashboardData = {
      name: dashboardName,
      widgets,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem(`dashboard-${Date.now()}`, JSON.stringify(dashboardData));
    toast.success('Dashboard saved successfully!');
  };

  const generateSampleData = (type: WidgetType) => {
    switch (type) {
      case 'chart':
        return [
          { name: 'Jan', value: 400 },
          { name: 'Feb', value: 300 },
          { name: 'Mar', value: 600 },
          { name: 'Apr', value: 800 },
          { name: 'May', value: 700 }
        ];
      case 'metric':
        return { value: 1250, label: 'Total Users', change: '+12%', trend: 'up' };
      case 'table':
        return [
          { id: 1, patient: 'John Doe', status: 'Active', room: 'A-101', time: '10:30' },
          { id: 2, patient: 'Jane Smith', status: 'Waiting', room: 'B-205', time: '11:15' },
          { id: 3, patient: 'Bob Johnson', status: 'Complete', room: 'C-301', time: '12:00' }
        ];
      case 'gauge':
        return { value: 75, max: 100, label: 'Capacity' };
      case 'text':
        return { content: 'Add your text content here...' };
      default:
        return [];
    }
  };

  const renderWidget = (widget: DashboardWidget) => {
    const WidgetChart = () => <div className="text-center p-4">Chart Widget</div>;
    const WidgetMetric = () => <div className="text-center p-4">Metric Widget</div>;
    const WidgetTable = () => <div className="text-center p-4">Table Widget</div>;
    const WidgetGauge = () => <div className="text-center p-4">Gauge Widget</div>;
    const WidgetText = () => <div className="text-center p-4">Text Widget</div>;

    switch (widget.type) {
      case 'chart':
        return <WidgetChart />;
      case 'metric':
        return <WidgetMetric />;
      case 'table':
        return <WidgetTable />;
      case 'gauge':
        return <WidgetGauge />;
      case 'text':
        return <WidgetText />;
      default:
        return <div className="text-muted-foreground">Unknown widget type</div>;
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Grid2X2 className="h-6 w-6 text-purple-400" />
              <h1 className="text-xl font-semibold text-foreground">Dashboard Creator</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Label htmlFor="dashboard-name" className="text-sm text-muted-foreground">Name:</Label>
              <Input
                id="dashboard-name"
                value={dashboardName}
                onChange={(e) => setDashboardName(e.target.value)}
                className="w-48 h-8"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={isPreviewMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Play className="h-4 w-4 mr-1" />
              {isPreviewMode ? 'Edit' : 'Preview'}
            </Button>
            
            <Button onClick={handleSaveDashboard} className="bg-purple-600 hover:bg-purple-700">
              <Save className="h-4 w-4 mr-1" />
              Save Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Widget Palette */}
        {!isPreviewMode && (
          <div className="w-64 border-r border-border bg-card">
            <WidgetPalette onAddWidget={handleAddWidget} />
          </div>
        )}

        {/* Canvas */}
        <div className="flex-1 relative bg-gray-50 dark:bg-gray-900/20 overflow-auto">
          {/* Grid Pattern */}
          {!isPreviewMode && (
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />
          )}

          {/* Widgets */}
          {widgets.map((widget) => (
            <div
              key={widget.id}
              className={`absolute cursor-pointer transition-all duration-200 ${
                selectedWidget?.id === widget.id && !isPreviewMode 
                  ? 'ring-2 ring-purple-400 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              style={{
                left: widget.position.x,
                top: widget.position.y,
                width: widget.size.width,
                height: widget.size.height,
                zIndex: selectedWidget?.id === widget.id ? 10 : 1
              }}
              onClick={() => !isPreviewMode && setSelectedWidget(widget)}
            >
              <Card 
                className="h-full"
                style={{
                  backgroundColor: widget.config.backgroundColor,
                  borderColor: widget.config.borderColor
                }}
              >
                {widget.config.showTitle && (
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-foreground flex items-center justify-between">
                      <span>{widget.title}</span>
                      {!isPreviewMode && selectedWidget?.id === widget.id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWidgetDelete(widget.id);
                          }}
                          className="h-6 w-6 p-0 text-red-400 hover:text-red-600"
                        >
                          ×
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                )}
                <CardContent className="p-3 h-full">
                  {renderWidget(widget)}
                </CardContent>
              </Card>
            </div>
          ))}

          {/* Empty State */}
          {widgets.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="text-lg font-medium mb-2">Your dashboard canvas is empty</div>
                <div className="text-sm">Click widgets in the palette to add them</div>
              </div>
            </div>
          )}
        </div>

        {/* Properties Panel */}
        {!isPreviewMode && selectedWidget && (
          <div className="w-80 border-l border-border bg-card">
            <PropertiesPanel
              widget={selectedWidget}
              onWidgetUpdate={handleWidgetUpdate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedDashboardCreator;
