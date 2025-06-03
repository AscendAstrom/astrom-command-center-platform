
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ViewUserRole, RefreshInterval, ExportFormat } from './types';
import { Play, Pause, Download, RefreshCw } from 'lucide-react';
import ZoneTileWidget from './widgets/ZoneTileWidget';
import PatientTimerWidget from './widgets/PatientTimerWidget';
import ChartWidget from './widgets/ChartWidget';
import MetricCardWidget from './widgets/MetricCardWidget';
import { supabase } from "@/integrations/supabase/client";

interface RealtimeDashboardProps {
  userRole: ViewUserRole;
}

const RealtimeDashboard = ({ userRole }: RealtimeDashboardProps) => {
  const [autoRefresh, setAutoRefresh] = useState<RefreshInterval>(30);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedDashboard, setSelectedDashboard] = useState('ed_operations');
  const [metrics, setMetrics] = useState({
    waitTime: 0,
    bedUtilization: 0,
    activePatients: 0,
    staffOnDuty: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isRefreshing) return;

    const interval = setInterval(() => {
      setLastUpdated(new Date());
      fetchMetrics();
    }, autoRefresh * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, isRefreshing]);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const [
        { data: waitTimes },
        { data: beds },
        { data: activePatients },
        { data: staff }
      ] = await Promise.all([
        supabase.from('wait_times').select('total_wait_minutes').is('discharge_time', null),
        supabase.from('beds').select('status'),
        supabase.from('patients').select('id').eq('status', 'ACTIVE'),
        supabase.from('staff').select('id').eq('is_active', true)
      ]);

      // Calculate average wait time
      const avgWaitTime = waitTimes && waitTimes.length > 0 
        ? Math.round(waitTimes.reduce((sum, w) => sum + (w.total_wait_minutes || 0), 0) / waitTimes.length)
        : 0;

      // Calculate bed utilization
      const totalBeds = beds?.length || 0;
      const occupiedBeds = beds?.filter(b => b.status === 'OCCUPIED').length || 0;
      const bedUtilization = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

      setMetrics({
        waitTime: avgWaitTime,
        bedUtilization,
        activePatients: activePatients?.length || 0,
        staffOnDuty: staff?.length || 0
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
      setMetrics({
        waitTime: 0,
        bedUtilization: 0,
        activePatients: 0,
        staffOnDuty: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format: ExportFormat) => {
    console.log(`Exporting dashboard as ${format}`);
  };

  const dashboardOptions = [
    { value: 'ed_operations', label: 'ED Operations', audience: 'ed_managers' },
    { value: 'ops_summary', label: 'Operations Summary', audience: 'ops_staff' },
    { value: 'executive_overview', label: 'Executive Overview', audience: 'executives' }
  ];

  const canViewDashboard = (audience: string) => {
    if (userRole === 'ADMIN' || userRole === 'ANALYST') return true;
    if (userRole === 'VIEWER' || userRole === 'DATA_ENGINEER') {
      return audience !== 'executives';
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Dashboard</label>
            <Select value={selectedDashboard} onValueChange={setSelectedDashboard}>
              <SelectTrigger className="w-48 bg-background border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                {dashboardOptions
                  .filter(option => canViewDashboard(option.audience))
                  .map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Auto Refresh</label>
            <Select 
              value={autoRefresh.toString()} 
              onValueChange={(value) => setAutoRefresh(parseInt(value) as RefreshInterval)}
            >
              <SelectTrigger className="w-32 bg-background border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="15">15s</SelectItem>
                <SelectItem value="30">30s</SelectItem>
                <SelectItem value="60">1m</SelectItem>
                <SelectItem value="300">5m</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRefreshing(!isRefreshing)}
            className="border-border text-foreground"
          >
            {isRefreshing ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isRefreshing ? 'Pause' : 'Resume'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setLastUpdated(new Date());
              fetchMetrics();
            }}
            className="border-border text-foreground"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh Now
          </Button>

          <Select onValueChange={(value: ExportFormat) => handleExport(value)}>
            <SelectTrigger className="w-32 bg-background border-border text-foreground">
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              <SelectItem value="pdf">
                <Download className="h-4 w-4 mr-1 inline" />
                PDF
              </SelectItem>
              <SelectItem value="csv">
                <Download className="h-4 w-4 mr-1 inline" />
                CSV
              </SelectItem>
              <SelectItem value="png">
                <Download className="h-4 w-4 mr-1 inline" />
                PNG
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between p-3 bg-card rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm text-foreground">
              {isRefreshing ? 'Live' : 'Paused'}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
        <Badge variant="outline" className="text-purple-400 border-purple-400">
          {dashboardOptions.find(d => d.value === selectedDashboard)?.label}
        </Badge>
      </div>

      {/* Dashboard Content */}
      {selectedDashboard === 'ed_operations' && (
        <EDOperationsDashboard metrics={metrics} loading={loading} />
      )}
      {selectedDashboard === 'ops_summary' && (
        <OperationsSummaryDashboard metrics={metrics} loading={loading} />
      )}
      {selectedDashboard === 'executive_overview' && (
        <ExecutiveOverviewDashboard metrics={metrics} loading={loading} />
      )}
    </div>
  );
};

const EDOperationsDashboard = ({ metrics, loading }: { metrics: any; loading: boolean }) => (
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <div className="lg:col-span-2">
      <ZoneTileWidget />
    </div>
    
    <div className="lg:col-span-2">
      <PatientTimerWidget />
    </div>

    <MetricCardWidget 
      title="Current Wait Time" 
      value={`${metrics.waitTime} min`} 
      trend="stable"
      loading={loading}
    />
    <MetricCardWidget 
      title="Bed Utilization" 
      value={`${metrics.bedUtilization}%`} 
      trend="stable"
      loading={loading}
    />
    <MetricCardWidget 
      title="Active Patients" 
      value={metrics.activePatients} 
      trend="stable"
      loading={loading}
    />
    <MetricCardWidget 
      title="Staff on Duty" 
      value={metrics.staffOnDuty} 
      trend="stable"
      loading={loading}
    />

    <div className="lg:col-span-2">
      <ChartWidget title="Wait Times by Hour" type="bar" />
    </div>
    <div className="lg:col-span-2">
      <ChartWidget title="Patient Flow" type="line" />
    </div>
  </div>
);

const OperationsSummaryDashboard = ({ metrics, loading }: { metrics: any; loading: boolean }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <MetricCardWidget 
      title="Total Capacity" 
      value={`${metrics.bedUtilization}%`} 
      trend="stable"
      loading={loading}
    />
    <MetricCardWidget 
      title="Average Wait" 
      value={`${metrics.waitTime} min`} 
      trend="stable"
      loading={loading}
    />
    <MetricCardWidget 
      title="Active Staff" 
      value={metrics.staffOnDuty} 
      trend="stable"
      loading={loading}
    />
    
    <div className="lg:col-span-3">
      <ChartWidget title="Departmental Performance" type="bar" />
    </div>
  </div>
);

const ExecutiveOverviewDashboard = ({ metrics, loading }: { metrics: any; loading: boolean }) => (
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <MetricCardWidget 
      title="Patient Satisfaction" 
      value="--" 
      trend="stable"
      loading={loading}
    />
    <MetricCardWidget 
      title="Revenue per Hour" 
      value="--" 
      trend="stable"
      loading={loading}
    />
    <MetricCardWidget 
      title="Cost per Patient" 
      value="--" 
      trend="stable"
      loading={loading}
    />
    <MetricCardWidget 
      title="Quality Score" 
      value="--" 
      trend="stable"
      loading={loading}
    />
    
    <div className="lg:col-span-2">
      <ChartWidget title="Monthly Trends" type="line" />
    </div>
    <div className="lg:col-span-2">
      <ChartWidget title="Department Comparison" type="pie" />
    </div>
  </div>
);

export default RealtimeDashboard;
