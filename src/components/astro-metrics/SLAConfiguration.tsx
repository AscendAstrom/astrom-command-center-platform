
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SLAConfiguration as SLAConfig, MetricsUserRole } from './types';
import SLACreateDialog from './SLACreateDialog';
import SLATable from './SLATable';
import { useSLAConfigs } from '@/hooks/useSLAConfigs';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

interface SLAConfigurationProps {
  userRole: MetricsUserRole | null;
}

const SLAConfiguration = ({ userRole }: SLAConfigurationProps) => {
  const { slaConfigs, isLoading, error, createSlaMutation, updateSlaStatusMutation } = useSLAConfigs();

  const canEdit = userRole === 'ADMIN' || userRole === 'ANALYST';

  const handleCreateSLA = (sla: SLAConfig) => {
    createSlaMutation.mutate(sla);
  };

  const toggleSLAStatus = (slaId: string) => {
    const sla = slaConfigs.find(s => s.id === slaId);
    if (sla) {
      const newStatus = sla.status === 'active' ? 'paused' : 'active';
      updateSlaStatusMutation.mutate({ slaId, status: newStatus });
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-2 mt-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load SLA configurations: {error instanceof Error ? error.message : 'Unknown error'}
          </AlertDescription>
        </Alert>
      );
    }
    
    return (
        <SLATable 
          slaConfigs={slaConfigs}
          canEdit={canEdit}
          onToggleStatus={toggleSLAStatus}
        />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">SLA Configuration</CardTitle>
              <CardDescription>Configure service level agreements and thresholds per zone</CardDescription>
            </div>
            <SLACreateDialog onCreateSLA={handleCreateSLA} canEdit={canEdit} />
          </div>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default SLAConfiguration;
