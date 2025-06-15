
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnalyticsService, AnalyticsData } from '@/services/analytics';
import { Activity, TrendingUp, Clock } from 'lucide-react';
import { toast } from "sonner";
import DashboardOverviewTab from "@/components/dashboard/tabs/DashboardOverviewTab";
import DataPipelineTab from "@/components/dashboard/tabs/DataPipelineTab";
import ClinicalOperationsTab from "@/components/dashboard/tabs/ClinicalOperationsTab";
import { ClinicalDashboardWidget } from "@/components/clinical/ClinicalDashboardWidget";
import { useClinical } from "@/contexts/ClinicalContext";

const Dashboard = () => {
  const [data, setData] = useState<AnalyticsData>({
    overview: {
      totalPatients: 0,
      activeBeds: 0,
      pendingDischarges: 0,
      emergencyAdmissions: 0,
      avgWaitTime: 0,
      bedOccupancyRate: 0,
      patientSatisfactionScore: 0
    },
    dataPipeline: {
      activeSources: 0,
      processingSpeed: 0,
      errorRate: 0,
      dataQuality: 0,
      syncStatus: 'unknown'
    },
    clinicalOperations: {
      activeStaff: 0,
      scheduledProcedures: 0,
      resourceUtilization: 0,
      equipmentStatus: 'unknown'
    }
  });
  
  const [activeTab, setActiveTab] = useState("overview");
  const [isLive, setIsLive] = useState(false);
  const { metrics: clinicalMetrics } = useClinical();

  useEffect(() => {
    loadAnalytics();
    
    const interval = setInterval(() => {
      if (isLive) {
        loadAnalytics();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const loadAnalytics = async () => {
    try {
      const analyticsData = await AnalyticsService.getDashboardData();
      setData(analyticsData);
    } catch (error) {
      console.error('Failed to load analytics:', error);
      toast.error("Failed to load dashboard data");
    }
  };

  const toggleLiveMode = () => {
    setIsLive(!isLive);
    toast.success(isLive ? "Live mode disabled" : "Live mode enabled");
  };

  return (
    <div className="h-full bg-background">
      <div className="h-full max-w-7xl mx-auto p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive hospital operations and clinical overview
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-green-400 border-green-400">
              <Activity className="h-3 w-3 mr-1" />
              {clinicalMetrics.activePatientsCount} Active Patients
            </Badge>
            
            <Button
              variant={isLive ? "default" : "outline"}
              onClick={toggleLiveMode}
              className={isLive ? "bg-green-600 hover:bg-green-700" : ""}
            >
              <Clock className="h-4 w-4 mr-2" />
              {isLive ? "Live" : "Static"}
            </Button>
          </div>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.overview.totalPatients}</div>
              <Badge variant="secondary" className="mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last week
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Bed Occupancy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.overview.bedOccupancyRate}%</div>
              <Badge variant="secondary" className="mt-1">
                {data.overview.activeBeds} active beds
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Wait Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.overview.avgWaitTime}min</div>
              <Badge variant="secondary" className="mt-1">
                Emergency dept
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Quality Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clinicalMetrics.qualityScore}%</div>
              <Badge variant="secondary" className="mt-1">
                Clinical metrics
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Clinical Dashboard Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <ClinicalDashboardWidget />
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">System Health</CardTitle>
                <CardDescription>Real-time system and clinical monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-500">
                      {data.dataPipeline.activeSources}
                    </div>
                    <div className="text-sm text-muted-foreground">Data Sources</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-500">
                      {data.clinicalOperations.activeStaff}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Staff</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-500">
                      {Math.round(data.dataPipeline.dataQuality)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Data Quality</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Operations Overview</TabsTrigger>
            <TabsTrigger value="data-pipeline">Data Pipeline</TabsTrigger>
            <TabsTrigger value="clinical">Clinical Operations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardOverviewTab data={data} isLive={isLive} />
          </TabsContent>

          <TabsContent value="data-pipeline" className="space-y-6">
            <DataPipelineTab data={data} isLive={isLive} />
          </TabsContent>

          <TabsContent value="clinical" className="space-y-6">
            <ClinicalOperationsTab data={data} isLive={isLive} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
