
import { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Play, Settings, Grid2X2, BarChart3, PieChart, TrendingUp, Activity } from 'lucide-react';
import DashboardCanvas from './dashboard-creator/DashboardCanvas';
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
      position: { x: 50, y: 50 },
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
  }, []);

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
        return { value: 1250, label: 'Total Users', change: '+12%' };
      case 'table':
        return [
          { id: 1, name: 'Patient A', status: 'Active', time: '10:30' },
          { id: 2, name: 'Patient B', status: 'Waiting', time: '11:15' },
          { id: 3, name: 'Patient C', status: 'Complete', time: '12:00' }
        ];
      default:
        return [];
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
          <div className="flex-1 relative">
            <DashboardCanvas
              widgets={widgets}
              selectedWidget={selectedWidget}
              onWidgetSelect={setSelectedWidget}
              onWidgetUpdate={handleWidgetUpdate}
              onWidgetDelete={handleWidgetDelete}
              isPreviewMode={isPreviewMode}
            />
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
    </DndProvider>
  );
};

export default AdvancedDashboardCreator;
