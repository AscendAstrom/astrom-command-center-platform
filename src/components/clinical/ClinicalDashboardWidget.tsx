
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useClinical } from '@/contexts/ClinicalContext';
import { 
  Heart, 
  AlertTriangle, 
  Users, 
  TrendingUp,
  Activity,
  Bed
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ClinicalDashboardWidget = () => {
  const { metrics, alerts, isLoading } = useClinical();
  const navigate = useNavigate();
  const criticalAlerts = alerts.filter(a => a.type === 'critical' && !a.acknowledged);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Clinical Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Clinical Overview
          </div>
          {criticalAlerts.length > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {criticalAlerts.length} Critical
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Active Patients</span>
            </div>
            <p className="text-2xl font-bold">{metrics.activePatientsCount}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Occupancy</span>
            </div>
            <p className="text-2xl font-bold">{metrics.occupancyRate}%</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-muted-foreground">Avg LOS</span>
            </div>
            <p className="text-2xl font-bold">{metrics.avgLengthOfStay}d</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-muted-foreground">Quality Score</span>
            </div>
            <p className="text-2xl font-bold">{metrics.qualityScore}%</p>
          </div>
        </div>

        {criticalAlerts.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-red-600">Critical Alerts</h4>
            {criticalAlerts.slice(0, 2).map((alert) => (
              <div key={alert.id} className="flex items-start gap-2 p-2 bg-red-50 rounded text-sm">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-red-800">{alert.message}</span>
              </div>
            ))}
          </div>
        )}

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate('/clinical-records')}
        >
          View Clinical Records
        </Button>
      </CardContent>
    </Card>
  );
};
