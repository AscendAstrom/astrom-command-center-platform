import { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid2X2 } from 'lucide-react';
import { DashboardWidget, WidgetType } from './dashboard-creator/types';
import { Dashboard } from './types';
import { toast } from 'sonner';
import { generateSampleData } from './dashboard-creator/dashboardUtils';
import DashboardManagementTab from './dashboard-creator/DashboardManagementTab';
import DashboardCreatorTab from './dashboard-creator/DashboardCreatorTab';

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

  const handleDeleteDashboard = (dashboardId: string) => {
    setDashboards(dashboards.filter(d => d.id !== dashboardId));
    toast.success('Dashboard deleted');
  };

  const handleEditDashboard = useCallback((dashboard: Dashboard) => {
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
  }, []);

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
            <DashboardManagementTab
              dashboards={dashboards}
              onCreateNew={() => setActiveBuilderTab('create')}
              onEditDashboard={handleEditDashboard}
              onDeleteDashboard={handleDeleteDashboard}
            />
          </TabsContent>

          {/* Create Dashboard Tab */}
          <TabsContent value="create" className="flex-1 flex flex-col">
            <DashboardCreatorTab
              dashboardName={dashboardName}
              setDashboardName={setDashboardName}
              widgets={widgets}
              setWidgets={setWidgets}
              selectedWidget={selectedWidget}
              setSelectedWidget={setSelectedWidget}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedDashboardCreator;
