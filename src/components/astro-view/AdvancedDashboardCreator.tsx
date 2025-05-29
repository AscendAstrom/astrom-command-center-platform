
import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Save, Play, Grid2X2, Plus, Edit, Eye, Trash2, Users, Clock, Settings } from 'lucide-react';
import WidgetPalette from './dashboard-creator/WidgetPalette';
import PropertiesPanel from './dashboard-creator/PropertiesPanel';
import DashboardCanvas from './dashboard-creator/DashboardCanvas';
import { DashboardWidget, WidgetType } from './dashboard-creator/types';
import { Dashboard } from './types';
import { toast } from 'sonner';

const AdvancedDashboardCreator = () => {
  const [activeBuilderTab, setActiveBuilderTab] = useState('create');
  const [dashboards, setDashboards] = useState<Dashboard[]>([
    {
      id: '1',
      name: 'ED Operations Dashboard',
      description: 'Real-time emergency department metrics and patient flow tracking',
      targetAudience: 'ed_managers',
      widgets: [
        {
          id: 'widget-1',
          type: 'metric_card',
          title: 'Current Patients',
          position: { x: 0, y: 0, w: 3, h: 2 },
          config: { refreshInterval: 30, showDrillDown: true },
          semanticTerms: ['patient_count']
        },
        {
          id: 'widget-2',
          type: 'chart',
          title: 'Wait Times Trend',
          position: { x: 3, y: 0, w: 6, h: 4 },
          config: { refreshInterval: 60, chartType: 'line', showDrillDown: true },
          semanticTerms: ['wait_time', 'hourly_trend']
        }
      ],
      autoRefresh: 30,
      isPublic: true,
      createdBy: 'Dr. Sarah Johnson',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-20T14:30:00Z'
    },
    {
      id: '2',
      name: 'Executive Summary',
      description: 'High-level KPIs and performance indicators for leadership team',
      targetAudience: 'executives',
      widgets: [
        {
          id: 'widget-3',
          type: 'metric_card',
          title: 'Patient Satisfaction',
          position: { x: 0, y: 0, w: 3, h: 2 },
          config: { refreshInterval: 300, showDrillDown: false },
          semanticTerms: ['satisfaction_score']
        },
        {
          id: 'widget-4',
          type: 'chart',
          title: 'Revenue Trends',
          position: { x: 3, y: 0, w: 6, h: 3 },
          config: { refreshInterval: 300, chartType: 'bar', showDrillDown: true },
          semanticTerms: ['revenue', 'monthly_trend']
        },
        {
          id: 'widget-5',
          type: 'zone_tile',
          title: 'Department Status',
          position: { x: 9, y: 0, w: 3, h: 3 },
          config: { refreshInterval: 60, showDrillDown: true },
          semanticTerms: ['zone_status', 'occupancy']
        }
      ],
      autoRefresh: 60,
      isPublic: false,
      createdBy: 'Michael Chen',
      createdAt: '2024-01-16T09:00:00Z',
      updatedAt: '2024-01-22T11:15:00Z'
    },
    {
      id: '3',
      name: 'Staff Operations Board',
      description: 'Daily operational metrics for nursing and support staff',
      targetAudience: 'ops_staff',
      widgets: [
        {
          id: 'widget-6',
          type: 'patient_timer',
          title: 'Patient Queue',
          position: { x: 0, y: 0, w: 6, h: 4 },
          config: { refreshInterval: 15, showDrillDown: false },
          semanticTerms: ['patient_queue', 'wait_time']
        },
        {
          id: 'widget-7',
          type: 'metric_card',
          title: 'Staff Utilization',
          position: { x: 6, y: 0, w: 3, h: 2 },
          config: { refreshInterval: 60, showDrillDown: true },
          semanticTerms: ['staff_utilization']
        }
      ],
      autoRefresh: 15,
      isPublic: true,
      createdBy: 'Lisa Rodriguez',
      createdAt: '2024-01-18T08:00:00Z',
      updatedAt: '2024-01-21T16:45:00Z'
    },
    {
      id: '4',
      name: 'Quality Metrics Dashboard',
      description: 'Patient safety and quality indicators for compliance reporting',
      targetAudience: 'executives',
      widgets: [
        {
          id: 'widget-8',
          type: 'chart',
          title: 'Readmission Rates',
          position: { x: 0, y: 0, w: 6, h: 3 },
          config: { refreshInterval: 300, chartType: 'area', showDrillDown: true },
          semanticTerms: ['readmission_rate', 'quality_metric']
        },
        {
          id: 'widget-9',
          type: 'metric_card',
          title: 'Safety Score',
          position: { x: 6, y: 0, w: 3, h: 2 },
          config: { refreshInterval: 300, showDrillDown: false },
          semanticTerms: ['safety_score']
        }
      ],
      autoRefresh: 300,
      isPublic: false,
      createdBy: 'Dr. James Wilson',
      createdAt: '2024-01-19T13:30:00Z',
      updatedAt: '2024-01-23T09:20:00Z'
    }
  ]);

  // Creator state
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

  const handleDeleteDashboard = (dashboardId: string) => {
    setDashboards(dashboards.filter(d => d.id !== dashboardId));
    toast.success('Dashboard deleted');
  };

  const handleEditDashboard = (dashboard: Dashboard) => {
    setDashboardName(dashboard.name);
    // Convert dashboard widgets to creator widgets format
    const creatorWidgets: DashboardWidget[] = dashboard.widgets.map((w, index) => ({
      id: w.id,
      type: w.type as WidgetType,
      title: w.title,
      position: { x: (index % 3) * 320 + 20, y: Math.floor(index / 3) * 240 + 20 },
      size: { width: 300, height: 200 },
      config: {
        refreshInterval: w.config.refreshInterval || 30,
        showTitle: true,
        backgroundColor: '#ffffff',
        borderColor: '#e5e7eb'
      },
      data: generateSampleData(w.type as WidgetType)
    }));
    setWidgets(creatorWidgets);
    setActiveBuilderTab('create');
    toast.info(`Editing ${dashboard.name}`);
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

  const getAudienceIcon = (audience: string) => {
    switch (audience) {
      case 'ed_managers': return <Users className="h-4 w-4" />;
      case 'ops_staff': return <Settings className="h-4 w-4" />;
      case 'executives': return <Eye className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getAudienceColor = (audience: string) => {
    switch (audience) {
      case 'ed_managers': return 'bg-blue-600';
      case 'ops_staff': return 'bg-green-600';
      case 'executives': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getAudienceLabel = (audience: string) => {
    switch (audience) {
      case 'ed_managers': return 'ED Managers';
      case 'ops_staff': return 'Operations Staff';
      case 'executives': return 'Executives';
      default: return audience;
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
              <h1 className="text-xl font-semibold text-foreground">Dashboard Builder</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{dashboards.length} dashboards</span>
            <span>•</span>
            <span>{dashboards.reduce((acc, d) => acc + d.widgets.length, 0)} total widgets</span>
          </div>
        </div>
      </div>

      {/* Tabs for Manage vs Create */}
      <div className="flex-1 flex flex-col">
        <Tabs value={activeBuilderTab} onValueChange={setActiveBuilderTab} className="flex-1 flex flex-col">
          <TabsList className="mx-4 mt-4 w-fit">
            <TabsTrigger value="manage">Manage Dashboards</TabsTrigger>
            <TabsTrigger value="create">Create Dashboard</TabsTrigger>
          </TabsList>

          {/* Manage Dashboards Tab */}
          <TabsContent value="manage" className="flex-1 p-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Dashboard Management</h3>
                  <p className="text-sm text-muted-foreground">Manage and edit existing dashboards across your organization</p>
                </div>
                <Button 
                  onClick={() => setActiveBuilderTab('create')} 
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Dashboard
                </Button>
              </div>

              <div className="grid gap-4">
                {dashboards.map((dashboard) => (
                  <Card key={dashboard.id} className="bg-card border-border hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-foreground text-lg">{dashboard.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{dashboard.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getAudienceColor(dashboard.targetAudience)}>
                            {getAudienceIcon(dashboard.targetAudience)}
                            <span className="ml-1">
                              {getAudienceLabel(dashboard.targetAudience)}
                            </span>
                          </Badge>
                          {dashboard.isPublic && (
                            <Badge variant="outline" className="text-green-400 border-green-400">
                              Public
                            </Badge>
                          )}
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditDashboard(dashboard)}
                              className="text-cyan-400 hover:text-cyan-300"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDashboard(dashboard.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-blue-400" />
                          <span>Auto-refresh: {dashboard.autoRefresh}s</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Settings className="h-4 w-4 text-green-400" />
                          <span>{dashboard.widgets.length} widgets</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-purple-400" />
                          <span>Created by {dashboard.createdBy}</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Last updated {new Date(dashboard.updatedAt).toLocaleDateString()} at {new Date(dashboard.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Create Dashboard Tab */}
          <TabsContent value="create" className="flex-1 flex flex-col">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedDashboardCreator;
