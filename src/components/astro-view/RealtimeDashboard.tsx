
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ViewUserRole, RefreshInterval, ExportFormat } from './types';
import { Play, Pause, Download, Filter, RefreshCw } from 'lucide-react';
import ZoneTileWidget from './widgets/ZoneTileWidget';
import PatientTimerWidget from './widgets/PatientTimerWidget';
import ChartWidget from './widgets/ChartWidget';
import MetricCardWidget from './widgets/MetricCardWidget';

interface RealtimeDashboardProps {
  userRole: ViewUserRole;
}

const RealtimeDashboard = ({ userRole }: RealtimeDashboardProps) => {
  const [autoRefresh, setAutoRefresh] = useState<RefreshInterval>(30);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedDashboard, setSelectedDashboard] = useState('ed_operations');

  useEffect(() => {
    if (!isRefreshing) return;

    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, autoRefresh * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, isRefreshing]);

  const handleExport = (format: ExportFormat) => {
    console.log(`Exporting dashboard as ${format}`);
    // Implementation would depend on the specific export library used
  };

  const dashboardOptions = [
    { value: 'ed_operations', label: 'ED Operations', audience: 'ed_managers' },
    { value: 'ops_summary', label: 'Operations Summary', audience: 'ops_staff' },
    { value: 'executive_overview', label: 'Executive Overview', audience: 'executives' }
  ];

  const canViewDashboard = (audience: string) => {
    // ADMIN and ANALYST can view all dashboards
    if (userRole === 'ADMIN' || userRole === 'ANALYST') return true;
    
    // VIEWER and DATA_ENGINEER can view non-executive dashboards
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
            onClick={() => setLastUpdated(new Date())}
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
      {selectedDashboard === 'ed_operations' && <EDOperationsDashboard />}
      {selectedDashboard === 'ops_summary' && <OperationsSummaryDashboard />}
      {selectedDashboard === 'executive_overview' && <ExecutiveOverviewDashboard />}
    </div>
  );
};

const EDOperationsDashboard = () => (
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    {/* Zone Tiles */}
    <div className="lg:col-span-2">
      <ZoneTileWidget />
    </div>
    
    {/* Patient Timers */}
    <div className="lg:col-span-2">
      <PatientTimerWidget />
    </div>

    {/* Metrics Row */}
    <MetricCardWidget title="Current Wait Time" value="23 min" trend="up" />
    <MetricCardWidget title="Bed Utilization" value="78%" trend="stable" />
    <MetricCardWidget title="Active Patients" value="142" trend="down" />
    <MetricCardWidget title="Staff on Duty" value="28" trend="stable" />

    {/* Charts */}
    <div className="lg:col-span-2">
      <ChartWidget title="Wait Times by Hour" type="bar" />
    </div>
    <div className="lg:col-span-2">
      <ChartWidget title="Patient Flow" type="line" />
    </div>
  </div>
);

const OperationsSummaryDashboard = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <MetricCardWidget title="Total Capacity" value="85%" trend="up" />
    <MetricCardWidget title="Average LOS" value="4.2 hrs" trend="down" />
    <MetricCardWidget title="Efficiency Score" value="92%" trend="up" />
    
    <div className="lg:col-span-3">
      <ChartWidget title="Departmental Performance" type="bar" />
    </div>
  </div>
);

const ExecutiveOverviewDashboard = () => (
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <MetricCardWidget title="Patient Satisfaction" value="4.8/5" trend="up" />
    <MetricCardWidget title="Revenue per Hour" value="$12.4K" trend="up" />
    <MetricCardWidget title="Cost per Patient" value="$284" trend="down" />
    <MetricCardWidget title="Quality Score" value="96%" trend="stable" />
    
    <div className="lg:col-span-2">
      <ChartWidget title="Monthly Trends" type="line" />
    </div>
    <div className="lg:col-span-2">
      <ChartWidget title="Department Comparison" type="pie" />
    </div>
  </div>
);

export default RealtimeDashboard;
