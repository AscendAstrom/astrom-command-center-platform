
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
        }
      ],
      autoRefresh: 30,
      isPublic: true,
      createdBy: 'Dr. Sarah Johnson',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-20T14:30:00Z'
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

      <div className="flex-1 flex flex-col">
        <Tabs value={activeBuilderTab} onValueChange={setActiveBuilderTab} className="flex-1 flex flex-col">
          <TabsList className="mx-4 mt-4 w-fit">
            <TabsTrigger value="manage">Manage Dashboards</TabsTrigger>
            <TabsTrigger value="create">Create Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="manage" className="flex-1 p-4">
            <DashboardManagementTab
              dashboards={dashboards}
              onCreateNew={() => setActiveBuilderTab('create')}
              onEditDashboard={handleEditDashboard}
              onDeleteDashboard={handleDeleteDashboard}
            />
          </TabsContent>

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
