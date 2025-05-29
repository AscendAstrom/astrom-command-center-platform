
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, TrendingUp, Users, DollarSign, Clock, 
  Shield, Brain, Zap, AlertTriangle, CheckCircle 
} from 'lucide-react';
import AdvancedMetricWidget from './widgets/AdvancedMetricWidget';
import InteractiveChartWidget from './widgets/InteractiveChartWidget';

interface ExecutiveDashboardProps {
  userRole: string;
}

const ExecutiveDashboard = ({ userRole }: ExecutiveDashboardProps) => {
  const [activeTimeframe, setActiveTimeframe] = useState('today');
  const [kpiData, setKpiData] = useState({
    patientSatisfaction: { value: 4.8, target: 4.5, trend: 'up', change: 2.3 },
    operationalEfficiency: { value: 94, target: 90, trend: 'up', change: 5.2 },
    revenuePerHour: { value: 12400, target: 11000, trend: 'up', change: 8.7 },
    costPerPatient: { value: 284, target: 300, trend: 'down', change: -3.1 },
    qualityScore: { value: 96, target: 95, trend: 'stable', change: 0.5 },
    staffUtilization: { value: 87, target: 85, trend: 'up', change: 2.8 }
  });

  const [systemHealth, setSystemHealth] = useState({
    aiModelsActive: 8,
    dataSourcesConnected: 24,
    automationRulesRunning: 156,
    alertsResolved: 47,
    uptime: 99.97
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setKpiData(prev => ({
        ...prev,
        revenuePerHour: {
          ...prev.revenuePerHour,
          value: prev.revenuePerHour.value + Math.floor(Math.random() * 100) - 50
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDrillDown = (metric: string) => {
    console.log(`Drilling down into ${metric} analytics`);
  };

  return (
    <div className="space-y-6">
      {/* Executive Header */}
      <Card className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-purple-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-600">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-foreground">Executive Command Center</CardTitle>
                <p className="text-muted-foreground">Real-time strategic oversight and performance analytics</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className="bg-green-600">Live</Badge>
              <Badge variant="outline" className="border-purple-400 text-purple-400">
                {userRole.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTimeframe} onValueChange={setActiveTimeframe} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
          <TabsTrigger value="quarter">This Quarter</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTimeframe} className="space-y-6">
          {/* Strategic KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AdvancedMetricWidget
              title="Patient Satisfaction"
              value={kpiData.patientSatisfaction.value}
              target={kpiData.patientSatisfaction.target}
              trend={kpiData.patientSatisfaction.trend as any}
              trendPercentage={kpiData.patientSatisfaction.change}
              status="normal"
              unit="/5"
              subtitle="Average rating across all departments"
              onDrillDown={() => handleDrillDown('patient-satisfaction')}
            />

            <AdvancedMetricWidget
              title="Operational Efficiency"
              value={kpiData.operationalEfficiency.value}
              target={kpiData.operationalEfficiency.target}
              trend={kpiData.operationalEfficiency.trend as any}
              trendPercentage={kpiData.operationalEfficiency.change}
              status="normal"
              unit="%"
              subtitle="Overall system performance score"
              showProgress={true}
              progressValue={kpiData.operationalEfficiency.value}
              onDrillDown={() => handleDrillDown('operational-efficiency')}
            />

            <AdvancedMetricWidget
              title="Revenue per Hour"
              value={kpiData.revenuePerHour.value}
              target={kpiData.revenuePerHour.target}
              trend={kpiData.revenuePerHour.trend as any}
              trendPercentage={kpiData.revenuePerHour.change}
              status="normal"
              unit="$"
              subtitle="Real-time revenue generation"
              onDrillDown={() => handleDrillDown('revenue')}
            />

            <AdvancedMetricWidget
              title="Cost per Patient"
              value={kpiData.costPerPatient.value}
              target={kpiData.costPerPatient.target}
              trend={kpiData.costPerPatient.trend as any}
              trendPercentage={kpiData.costPerPatient.change}
              status="normal"
              unit="$"
              subtitle="Average treatment cost"
              onDrillDown={() => handleDrillDown('costs')}
            />

            <AdvancedMetricWidget
              title="Quality Score"
              value={kpiData.qualityScore.value}
              target={kpiData.qualityScore.target}
              trend={kpiData.qualityScore.trend as any}
              trendPercentage={kpiData.qualityScore.change}
              status="normal"
              unit="%"
              subtitle="Clinical quality metrics"
              showProgress={true}
              progressValue={kpiData.qualityScore.value}
              onDrillDown={() => handleDrillDown('quality')}
            />

            <AdvancedMetricWidget
              title="Staff Utilization"
              value={kpiData.staffUtilization.value}
              target={kpiData.staffUtilization.target}
              trend={kpiData.staffUtilization.trend as any}
              trendPercentage={kpiData.staffUtilization.change}
              status={kpiData.staffUtilization.value > 90 ? 'warning' : 'normal'}
              unit="%"
              subtitle="Current staffing efficiency"
              showProgress={true}
              progressValue={kpiData.staffUtilization.value}
              onDrillDown={() => handleDrillDown('staffing')}
            />
          </div>

          {/* Strategic Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InteractiveChartWidget
              title="Revenue Trends"
              type="line"
              timeRange="24h"
              onDrillDown={() => handleDrillDown('revenue-trends')}
            />

            <InteractiveChartWidget
              title="Department Performance"
              type="bar"
              timeRange="24h"
              onDrillDown={() => handleDrillDown('department-performance')}
            />

            <InteractiveChartWidget
              title="Resource Allocation"
              type="pie"
              timeRange="24h"
              onDrillDown={() => handleDrillDown('resource-allocation')}
            />

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-400" />
                  AI System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">AI Models</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="font-medium text-foreground">{systemHealth.aiModelsActive}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Data Sources</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="font-medium text-foreground">{systemHealth.dataSourcesConnected}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Automation Rules</span>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-400" />
                      <span className="font-medium text-foreground">{systemHealth.automationRulesRunning}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Alerts Resolved</span>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-purple-400" />
                      <span className="font-medium text-foreground">{systemHealth.alertsResolved}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">System Uptime</span>
                    <span className="text-lg font-bold text-green-400">{systemHealth.uptime}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Strategic Actions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Strategic Actions & Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-auto flex flex-col items-start p-4 bg-blue-600 hover:bg-blue-700">
                  <TrendingUp className="h-5 w-5 mb-2" />
                  <span className="font-medium">Performance Review</span>
                  <span className="text-xs opacity-80">Analyze departmental metrics</span>
                </Button>

                <Button className="h-auto flex flex-col items-start p-4 bg-purple-600 hover:bg-purple-700">
                  <Users className="h-5 w-5 mb-2" />
                  <span className="font-medium">Resource Planning</span>
                  <span className="text-xs opacity-80">Optimize staff allocation</span>
                </Button>

                <Button className="h-auto flex flex-col items-start p-4 bg-green-600 hover:bg-green-700">
                  <DollarSign className="h-5 w-5 mb-2" />
                  <span className="font-medium">Financial Analysis</span>
                  <span className="text-xs opacity-80">Review revenue streams</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExecutiveDashboard;
