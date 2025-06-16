
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, BarChart3, Settings, Brain } from "lucide-react";
import HospitalDashboard from "@/components/hospital-dashboard/HospitalDashboard";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AISummaryPanel from "@/components/analytics/AISummaryPanel";
import { dataPopulationService } from "@/services/dataPopulationService";
import EmptyStateMessage from "@/components/hospital-dashboard/EmptyStateMessage";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("hospital");
  const [dataStatus, setDataStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkDataStatus();
  }, []);

  const checkDataStatus = async () => {
    try {
      setIsLoading(true);
      const status = await dataPopulationService.checkDataStatus();
      setDataStatus(status);
    } catch (error) {
      console.error('Error checking data status:', error);
      setDataStatus({ isEmpty: true, isPopulated: false });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Show empty state if no data exists
  if (dataStatus?.isEmpty) {
    return <EmptyStateMessage />;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hospital Management Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time monitoring and management of hospital operations
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hospital" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Hospital Operations
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="ai-summary" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Administration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hospital" className="space-y-6">
          <HospitalDashboard />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="ai-summary" className="space-y-6">
          <AISummaryPanel />
        </TabsContent>

        <TabsContent value="admin" className="space-y-6">
          <AdminDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
