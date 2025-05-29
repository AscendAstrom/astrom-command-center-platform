
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { Dashboard } from '../types';
import DashboardListCard from './DashboardListCard';

interface DashboardManagementTabProps {
  dashboards: Dashboard[];
  onCreateNew: () => void;
  onEditDashboard: (dashboard: Dashboard) => void;
  onDeleteDashboard: (dashboardId: string) => void;
}

const DashboardManagementTab = ({ 
  dashboards, 
  onCreateNew, 
  onEditDashboard, 
  onDeleteDashboard 
}: DashboardManagementTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Dashboard Management</h3>
          <p className="text-sm text-muted-foreground">Manage and edit existing dashboards across your organization</p>
        </div>
        <Button 
          onClick={onCreateNew} 
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Dashboard
        </Button>
      </div>

      <div className="grid gap-4">
        {dashboards.map((dashboard) => (
          <DashboardListCard
            key={dashboard.id}
            dashboard={dashboard}
            onEdit={onEditDashboard}
            onDelete={onDeleteDashboard}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardManagementTab;
