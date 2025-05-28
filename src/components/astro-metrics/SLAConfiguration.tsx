
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { slaService } from '@/services/slaService';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { SLAConfiguration as SLAConfig, MetricsUserRole } from './types';
import SLACreateDialog from './SLACreateDialog';
import SLATable from './SLATable';
import type { Tables } from '@/integrations/supabase/types';

type SLA = Tables<'slas'>;

interface SLAConfigurationProps {
  userRole: MetricsUserRole | null;
}

const SLAConfiguration = ({ userRole }: SLAConfigurationProps) => {
  const { data: realtimeSLAs, loading } = useRealTimeData<SLA>({
    table: 'slas'
  });

  const [slaConfigs, setSlaConfigs] = useState<SLA[]>([]);

  useEffect(() => {
    setSlaConfigs(realtimeSLAs);
  }, [realtimeSLAs]);

  const canEdit = userRole === 'ADMIN' || userRole === 'ANALYST';

  const handleCreateSLA = async (slaData: any) => {
    try {
      const { error } = await slaService.create(slaData);
      if (error) throw error;
    } catch (error) {
      console.error('Error creating SLA:', error);
    }
  };

  const toggleSLAStatus = async (slaId: string) => {
    try {
      const { error } = await slaService.toggleActive(slaId);
      if (error) throw error;
    } catch (error) {
      console.error('Error toggling SLA status:', error);
    }
  };

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
          <SLATable 
            slaConfigs={slaConfigs}
            canEdit={canEdit}
            onToggleStatus={toggleSLAStatus}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SLAConfiguration;
