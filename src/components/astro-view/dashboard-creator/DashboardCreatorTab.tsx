
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Save, Play, Edit } from 'lucide-react';
import { DashboardWidget, WidgetType } from './types';
import WidgetPalette from './WidgetPalette';
import PropertiesPanel from './PropertiesPanel';
import DashboardCanvas from './DashboardCanvas';
import { createNewWidget } from './dashboardUtils';
import { toast } from 'sonner';

interface DashboardCreatorTabProps {
  dashboardName: string;
  setDashboardName: (name: string) => void;
  widgets: DashboardWidget[];
  setWidgets: (widgets: DashboardWidget[]) => void;
  selectedWidget: DashboardWidget | null;
  setSelectedWidget: (widget: DashboardWidget | null) => void;
}

const DashboardCreatorTab = ({
  dashboardName,
  setDashboardName,
  widgets,
  setWidgets,
  selectedWidget,
  setSelectedWidget
}: DashboardCreatorTabProps) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleAddWidget = (type: WidgetType) => {
    const newWidget = createNewWidget(type, widgets.length);
    setWidgets([...widgets, newWidget]);
    toast.success(`${type} widget added to dashboard`);
  };

  const handleWidgetUpdate = (updatedWidget: DashboardWidget) => {
    setWidgets(widgets.map(w => w.id === updatedWidget.id ? updatedWidget : w));
    if (selectedWidget?.id === updatedWidget.id) {
      setSelectedWidget(updatedWidget);
    }
  };

  const handleWidgetDelete = (widgetId: string) => {
    setWidgets(widgets.filter(w => w.id !== widgetId));
    if (selectedWidget?.id === widgetId) {
      setSelectedWidget(null);
    }
    toast.success('Widget deleted');
  };

  const handleSaveDashboard = () => {
    const dashboardData = {
      name: dashboardName,
      widgets,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem(`dashboard-${Date.now()}`, JSON.stringify(dashboardData));
    toast.success('Dashboard saved successfully!');
  };

  return (
    <>
      {/* Creator Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="dashboard-name" className="text-sm text-muted-foreground">Name:</Label>
              <Input
                id="dashboard-name"
                value={dashboardName}
                onChange={(e) => setDashboardName(e.target.value)}
                className="w-48 h-8"
                placeholder="Enter dashboard name"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={isPreviewMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              {isPreviewMode ? <Edit className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
              {isPreviewMode ? 'Edit' : 'Preview'}
            </Button>
            
            <Button onClick={handleSaveDashboard} className="bg-purple-600 hover:bg-purple-700">
              <Save className="h-4 w-4 mr-1" />
              Save Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Creator Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Widget Palette */}
        {!isPreviewMode && (
          <div className="w-64 border-r border-border bg-card">
            <WidgetPalette onAddWidget={handleAddWidget} />
          </div>
        )}

        {/* Canvas */}
        <div className="flex-1">
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
    </>
  );
};

export default DashboardCreatorTab;
