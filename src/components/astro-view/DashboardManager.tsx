
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dashboard, ViewUserRole } from './types';
import { Plus, Edit, Eye, Trash2, Users, Clock, Settings } from 'lucide-react';
import DashboardBuilder from './DashboardBuilder';

interface DashboardManagerProps {
  userRole: ViewUserRole;
}

const DashboardManager = ({ userRole }: DashboardManagerProps) => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([
    {
      id: '1',
      name: 'ED Operations Dashboard',
      description: 'Real-time emergency department metrics and patient flow',
      targetAudience: 'ed_managers',
      widgets: [],
      autoRefresh: 30,
      isPublic: true,
      createdBy: 'admin',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'Executive Summary',
      description: 'High-level KPIs and performance indicators',
      targetAudience: 'executives',
      widgets: [],
      autoRefresh: 60,
      isPublic: false,
      createdBy: 'analyst',
      createdAt: '2024-01-16T09:00:00Z',
      updatedAt: '2024-01-16T09:00:00Z'
    }
  ]);

  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);

  const canEdit = userRole === 'ADMIN' || userRole === 'ANALYST';

  const handleCreateDashboard = () => {
    const newDashboard: Dashboard = {
      id: '',
      name: 'New Dashboard',
      description: '',
      targetAudience: 'ops_staff',
      widgets: [],
      autoRefresh: 30,
      isPublic: false,
      createdBy: userRole.toLowerCase(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSelectedDashboard(newDashboard);
    setIsBuilding(true);
  };

  const handleEditDashboard = (dashboard: Dashboard) => {
    setSelectedDashboard(dashboard);
    setIsBuilding(true);
  };

  const handleSaveDashboard = (dashboard: Dashboard) => {
    if (dashboard.id === '') {
      const newDashboard = { ...dashboard, id: Date.now().toString() };
      setDashboards([...dashboards, newDashboard]);
    } else {
      setDashboards(dashboards.map(d => d.id === dashboard.id ? dashboard : d));
    }
    setIsBuilding(false);
    setSelectedDashboard(null);
  };

  const handleDeleteDashboard = (dashboardId: string) => {
    setDashboards(dashboards.filter(d => d.id !== dashboardId));
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

  if (isBuilding && selectedDashboard) {
    return (
      <DashboardBuilder
        dashboard={selectedDashboard}
        onSave={handleSaveDashboard}
        onCancel={() => {
          setIsBuilding(false);
          setSelectedDashboard(null);
        }}
        userRole={userRole}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Dashboard Management</h3>
          <p className="text-sm text-slate-400">Create and manage custom dashboards</p>
        </div>
        {canEdit && (
          <Button onClick={handleCreateDashboard} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Dashboard
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {dashboards.map((dashboard) => (
          <Card key={dashboard.id} className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-white text-lg">{dashboard.name}</CardTitle>
                  <CardDescription>{dashboard.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getAudienceColor(dashboard.targetAudience)}>
                    {getAudienceIcon(dashboard.targetAudience)}
                    <span className="ml-1 capitalize">
                      {dashboard.targetAudience.replace('_', ' ')}
                    </span>
                  </Badge>
                  {dashboard.isPublic && (
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      Public
                    </Badge>
                  )}
                  {canEdit && (
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
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span>Auto-refresh: {dashboard.autoRefresh}s</span>
                </div>
                <div className="flex items-center gap-1">
                  <Settings className="h-4 w-4 text-green-400" />
                  <span>{dashboard.widgets.length} widgets</span>
                </div>
              </div>
              <div className="text-xs text-slate-500">
                Created by {dashboard.createdBy} • Last updated {new Date(dashboard.updatedAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardManager;
