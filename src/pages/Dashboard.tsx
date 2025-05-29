
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  BarChart3, 
  Database, 
  Heart, 
  Users, 
  Clock,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import EmergencyDepartmentTab from "@/components/dashboard/tabs/EmergencyDepartmentTab";
import ClinicalOperationsTab from "@/components/dashboard/tabs/ClinicalOperationsTab";
import BusinessAnalyticsTab from "@/components/dashboard/tabs/BusinessAnalyticsTab";
import DataPipelineTab from "@/components/dashboard/tabs/DataPipelineTab";
import SystemHealthTab from "@/components/dashboard/tabs/SystemHealthTab";
import AIMetricsTab from "@/components/dashboard/tabs/AIMetricsTab";
import { toast } from "sonner";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("emergency");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast.info(`Switched to ${value} dashboard`);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    toast.info("Refreshing dashboard data...");
    
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Dashboard data refreshed successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Operations Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Real-time operational intelligence for healthcare excellence
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
              <Activity className="h-3 w-3 mr-1" />
              System Operational
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                <p className="text-3xl font-bold text-foreground">247</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from yesterday
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Wait Time</p>
                <p className="text-3xl font-bold text-foreground">18m</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  -5m from target
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bed Occupancy</p>
                <p className="text-3xl font-bold text-foreground">89%</p>
                <p className="text-xs text-orange-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Near capacity
                </p>
              </div>
              <Heart className="h-8 w-8 text-red-400" />
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data Quality</p>
                <p className="text-3xl font-bold text-foreground">94%</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Excellent
                </p>
              </div>
              <Database className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted/50">
            <TabsTrigger value="emergency" className="data-[state=active]:bg-red-500/20">
              <Heart className="h-4 w-4 mr-2" />
              Emergency Dept
            </TabsTrigger>
            <TabsTrigger value="clinical" className="data-[state=active]:bg-blue-500/20">
              <Users className="h-4 w-4 mr-2" />
              Clinical Ops
            </TabsTrigger>
            <TabsTrigger value="business" className="data-[state=active]:bg-green-500/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              Business Analytics
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="data-[state=active]:bg-purple-500/20">
              <Database className="h-4 w-4 mr-2" />
              Data Pipeline
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-orange-500/20">
              <Activity className="h-4 w-4 mr-2" />
              System Health
            </TabsTrigger>
            <TabsTrigger value="ai-metrics" className="data-[state=active]:bg-pink-500/20">
              <TrendingUp className="h-4 w-4 mr-2" />
              AI Metrics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emergency" className="space-y-6">
            <EmergencyDepartmentTab />
          </TabsContent>

          <TabsContent value="clinical" className="space-y-6">
            <ClinicalOperationsTab />
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            <BusinessAnalyticsTab />
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-6">
            <DataPipelineTab />
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <SystemHealthTab />
          </TabsContent>

          <TabsContent value="ai-metrics" className="space-y-6">
            <AIMetricsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
