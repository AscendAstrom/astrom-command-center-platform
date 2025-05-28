
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SLAConfiguration as SLAConfig, MetricsUserRole } from './types';
import SLACreateDialog from './SLACreateDialog';
import SLATable from './SLATable';

interface SLAConfigurationProps {
  userRole: MetricsUserRole | null;
}

const SLAConfiguration = ({ userRole }: SLAConfigurationProps) => {
  const [slaConfigs, setSlaConfigs] = useState<SLAConfig[]>([
    {
      id: '1',
      name: 'ED Wait Time SLA',
      description: 'Maximum wait time for emergency department patients',
      zoneId: 'zone_1',
      zoneName: 'Emergency Department',
      metricType: 'wait_time',
      threshold: 30,
      unit: 'minutes',
      timeWindow: 'real_time',
      alertEnabled: true,
      escalationRules: [
        {
          id: '1',
          delay: 5,
          delayUnit: 'minutes',
          recipients: [
            { type: 'email', address: 'ed-manager@hospital.com', name: 'ED Manager' }
          ],
          actions: [
            { type: 'notification', config: { message: 'SLA breach detected' } }
          ]
        }
      ],
      status: 'active',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'ICU Bed Utilization',
      description: 'ICU bed utilization threshold',
      zoneId: 'zone_2',
      zoneName: 'Intensive Care Unit',
      metricType: 'utilization',
      threshold: 85,
      unit: 'percentage',
      timeWindow: 'hourly',
      alertEnabled: true,
      escalationRules: [],
      status: 'active',
      createdAt: '2024-01-16T09:00:00Z',
      updatedAt: '2024-01-16T09:00:00Z'
    }
  ]);

  const canEdit = userRole === 'ADMIN' || userRole === 'ANALYST';

  const handleCreateSLA = (sla: SLAConfig) => {
    setSlaConfigs([...slaConfigs, sla]);
  };

  const toggleSLAStatus = (slaId: string) => {
    setSlaConfigs(slaConfigs.map(sla => 
      sla.id === slaId 
        ? { ...sla, status: sla.status === 'active' ? 'paused' : 'active' }
        : sla
    ));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">SLA Configuration</CardTitle>
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
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SLAConfiguration;
