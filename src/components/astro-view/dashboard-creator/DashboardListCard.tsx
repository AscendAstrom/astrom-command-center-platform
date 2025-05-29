
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Users, Clock, Settings, Eye } from 'lucide-react';
import { Dashboard } from '../types';

interface DashboardListCardProps {
  dashboard: Dashboard;
  onEdit: (dashboard: Dashboard) => void;
  onDelete: (dashboardId: string) => void;
}

const DashboardListCard = ({ dashboard, onEdit, onDelete }: DashboardListCardProps) => {
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
    <Card className="bg-card border-border hover:shadow-md transition-shadow">
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
                onClick={() => onEdit(dashboard)}
                className="text-cyan-400 hover:text-cyan-300"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(dashboard.id)}
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
  );
};

export default DashboardListCard;
