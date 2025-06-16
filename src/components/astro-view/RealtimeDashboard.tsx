
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyticsService } from "@/services/analytics/mainAnalyticsService";
import { AnalyticsData } from "@/services/analytics/types";
import { DashboardHeader } from "./realtime-dashboard/DashboardHeader";
import { OverviewTab } from "./realtime-dashboard/OverviewTab";
import { BedsTab } from "./realtime-dashboard/BedsTab";
import { OperationsTab } from "./realtime-dashboard/OperationsTab";
import { FinancialTab } from "./realtime-dashboard/FinancialTab";
import { AlertsTab } from "./realtime-dashboard/AlertsTab";

const RealtimeDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const unsubscribe = analyticsService.subscribe((data) => {
      console.log('Received analytics data:', data);
      setAnalyticsData(data);
      setLastUpdate(new Date());
      setLoading(false);
    });

    // Start real-time updates
    const stopUpdates = analyticsService.startRealTimeUpdates();

    return () => {
      unsubscribe();
      stopUpdates();
    };
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      await analyticsService.refreshData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSystemHealth = () => {
    if (!analyticsData) return "Unknown";
    const occupancyRate = analyticsData.beds?.utilization || 0;
    if (occupancyRate > 90) return "High Load";
    if (occupancyRate > 75) return "Normal";
    return "Optimal";
  };

  return (
    <div className="space-y-6">
      <DashboardHeader loading={loading} onRefresh={refreshData} />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="beds">Bed Management</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab 
            loading={loading}
            analyticsData={analyticsData}
            lastUpdate={lastUpdate}
            getSystemHealth={getSystemHealth}
          />
        </TabsContent>

        <TabsContent value="beds" className="space-y-6">
          <BedsTab analyticsData={analyticsData} />
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <OperationsTab analyticsData={analyticsData} />
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <FinancialTab analyticsData={analyticsData} />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <AlertsTab analyticsData={analyticsData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealtimeDashboard;
