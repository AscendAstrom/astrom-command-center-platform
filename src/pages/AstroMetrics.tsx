
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Settings, AlertTriangle, Users, Plus, TrendingUp } from "lucide-react";
import { useUserRole } from '@/components/astro-bricks/hooks/useUserRole';
import KPIDictionary from '@/components/astro-metrics/KPIDictionary';
import MetricBuilder from '@/components/astro-metrics/MetricBuilder';
import SLAConfiguration from '@/components/astro-metrics/SLAConfiguration';
import AlertsManager from '@/components/astro-metrics/AlertsManager';
import AccessControl from '@/components/astro-metrics/AccessControl';

const AstroMetrics = () => {
  const { userRole, isLoading } = useUserRole();
  const [activeTab, setActiveTab] = useState('dictionary');

  const mockMetrics = [
    { name: 'Avg Wait Time', value: '12.5 min', trend: 'up', status: 'warning' },
    { name: 'SLA Breaches', value: '3', trend: 'down', status: 'critical' },
    { name: 'Throughput', value: '245/hr', trend: 'up', status: 'good' },
    { name: 'Bed Utilization', value: '87%', trend: 'stable', status: 'good' },
  ];

  if (isLoading) {
    return (
      <div className="p-6 bg-slate-950 min-h-full flex items-center justify-center">
        <div className="text-cyan-400">Loading ASTRO-METRICS...</div>
      </div>
    );
  }

  const canManage = userRole === 'ADMIN' || userRole === 'DATA_ENGINEER';
  const canEdit = userRole === 'ADMIN' || userRole === 'ANALYST' || userRole === 'DATA_ENGINEER';

  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-cyan-400" />
            ASTRO-METRICS
          </h1>
          <p className="text-slate-400">KPI Engine & SLA Metrics Management</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-cyan-400 border-cyan-400">
            {userRole} Access
          </Badge>
          {canEdit && (
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <Plus className="h-4 w-4 mr-2" />
              New KPI
            </Button>
          )}
        </div>
      </div>

      {/* Quick Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockMetrics.map((metric, index) => (
          <Card key={index} className="bg-slate-900 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{metric.name}</p>
                  <p className="text-xl font-bold text-white">{metric.value}</p>
                </div>
                <div className={`flex items-center gap-1 ${
                  metric.status === 'critical' ? 'text-red-400' :
                  metric.status === 'warning' ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  <TrendingUp className="h-4 w-4" />
                  <Badge variant={metric.status === 'critical' ? 'destructive' : 'outline'}>
                    {metric.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-slate-900 border-slate-800">
          <TabsTrigger value="dictionary" className="data-[state=active]:bg-cyan-600">
            KPI Dictionary
          </TabsTrigger>
          <TabsTrigger value="builder" className="data-[state=active]:bg-cyan-600">
            Metric Builder
          </TabsTrigger>
          <TabsTrigger value="sla" className="data-[state=active]:bg-cyan-600">
            SLA Config
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-cyan-600">
            Alerts
          </TabsTrigger>
          {canManage && (
            <TabsTrigger value="access" className="data-[state=active]:bg-cyan-600">
              Access Control
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="dictionary" className="space-y-4">
          <KPIDictionary userRole={userRole} />
        </TabsContent>

        <TabsContent value="builder" className="space-y-4">
          <MetricBuilder userRole={userRole} />
        </TabsContent>

        <TabsContent value="sla" className="space-y-4">
          <SLAConfiguration userRole={userRole} />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <AlertsManager userRole={userRole} />
        </TabsContent>

        {canManage && (
          <TabsContent value="access" className="space-y-4">
            <AccessControl userRole={userRole} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default AstroMetrics;
