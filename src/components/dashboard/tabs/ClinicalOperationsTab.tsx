
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsData } from '@/services/analytics';
import { Stethoscope, Users, Calendar, Activity, Settings, CheckCircle } from 'lucide-react';
import RealtimeBarChart from '../charts/RealtimeBarChart';
import RealtimePieChart from '../charts/RealtimePieChart';

interface ClinicalOperationsTabProps {
  data: AnalyticsData;
  isLive: boolean;
}

const ClinicalOperationsTab = ({ data, isLive }: ClinicalOperationsTabProps) => {
  const { clinicalOperations } = data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-400 border-green-400';
      case 'warning': return 'text-yellow-400 border-yellow-400';
      case 'critical': return 'text-red-400 border-red-400';
      default: return 'text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-blue-400" />
          Clinical Operations
          {isLive && (
            <Badge variant="outline" className="text-green-400 border-green-400 animate-pulse">
              Live
            </Badge>
          )}
        </h3>
        
        <Badge variant="outline" className={getStatusColor(clinicalOperations.equipmentStatus)}>
          <CheckCircle className="h-3 w-3 mr-1" />
          Equipment {clinicalOperations.equipmentStatus}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {clinicalOperations.activeStaff}
                </p>
                <p className="text-sm text-muted-foreground">Active Staff</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                <Calendar className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {clinicalOperations.scheduledProcedures}
                </p>
                <p className="text-sm text-muted-foreground">Scheduled Procedures</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/30">
                <Activity className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {clinicalOperations.resourceUtilization}%
                </p>
                <p className="text-sm text-muted-foreground">Resource Utilization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/30">
                <Settings className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {clinicalOperations.avgProcedureTime}m
                </p>
                <p className="text-sm text-muted-foreground">Avg Procedure Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              Staff Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RealtimeBarChart
              data={data.chartData.staffAllocation}
              dataKeys={['value']}
              colors={['#3b82f6']}
              height={200}
            />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-400" />
              Resource Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RealtimePieChart
              data={data.chartData.staffAllocation}
              dataKey="value"
              nameKey="category"
              colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444']}
              height={200}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClinicalOperationsTab;
