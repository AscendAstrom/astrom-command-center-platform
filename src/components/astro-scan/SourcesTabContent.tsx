
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, RefreshCw, Activity, AlertTriangle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from '@/integrations/supabase/client';
import { DataSourceList } from "./DataSourceList";
import { IngestionDashboard } from "./IngestionDashboard";
import MonitoringTabContent from "./MonitoringTabContent";
import { useDataSources } from "@/hooks/useDataSources";

interface SourcesTabContentProps {
  onAddDataSource?: () => void;
}

const SourcesTabContent = ({ onAddDataSource }: SourcesTabContentProps) => {
  const { dataSources, loading: dataSourcesLoading, refetch } = useDataSources();
  const [bedData, setBedData] = useState({
    total: 0,
    occupied: 0,
    available: 0,
    maintenance: 0,
    utilization: 0
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchBedData = async () => {
    try {
      setLoading(true);
      
      // Fetch beds with their department information
      const { data: beds, error: bedsError } = await supabase
        .from('beds')
        .select(`
          id,
          status,
          bed_number,
          room_number,
          departments!inner(id, name)
        `)
        .is('deleted_at', null);

      if (bedsError) {
        console.error('Error fetching beds:', bedsError);
        setBedData({
          total: 0,
          occupied: 0,
          available: 0,
          maintenance: 0,
          utilization: 0
        });
        return;
      }

      if (!beds || beds.length === 0) {
        console.log('No beds found in database');
        setBedData({
          total: 0,
          occupied: 0,
          available: 0,
          maintenance: 0,
          utilization: 0
        });
        return;
      }

      // Calculate bed statistics
      const total = beds.length;
      const occupied = beds.filter(bed => bed.status === 'OCCUPIED').length;
      const available = beds.filter(bed => bed.status === 'AVAILABLE').length;
      const maintenance = beds.filter(bed => bed.status === 'MAINTENANCE').length;
      const utilization = total > 0 ? Math.round((occupied / total) * 100) : 0;

      setBedData({
        total,
        occupied,
        available,
        maintenance,
        utilization
      });

      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error in fetchBedData:', error);
      setBedData({
        total: 0,
        occupied: 0,
        available: 0,
        maintenance: 0,
        utilization: 0
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBedData();

    // Set up real-time subscription for bed updates
    const channel = supabase
      .channel('bed-status-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'beds' },
        (payload) => {
          console.log('Bed status change detected:', payload);
          fetchBedData();
        }
      )
      .subscribe();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchBedData, 30000);

    return () => {
      channel.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600 border-red-200 bg-red-50';
    if (utilization >= 75) return 'text-orange-600 border-orange-200 bg-orange-50';
    return 'text-green-600 border-green-200 bg-green-50';
  };

  const getUtilizationIcon = (utilization: number) => {
    if (utilization >= 90) return <AlertTriangle className="h-4 w-4" />;
    if (utilization >= 75) return <Activity className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  const handleRefreshAll = () => {
    fetchBedData();
    refetch();
  };

  return (
    <div className="space-y-6">
      {/* Connected Bed Management Status */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Database className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-foreground">Connected Bed Management System</CardTitle>
                <CardDescription>Real-time bed occupancy and status monitoring</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live Connected
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshAll}
                disabled={loading || dataSourcesLoading}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${(loading || dataSourcesLoading) ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{loading ? '...' : bedData.total}</div>
              <div className="text-sm text-muted-foreground">Total Beds</div>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{loading ? '...' : bedData.occupied}</div>
              <div className="text-sm text-muted-foreground">Occupied</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{loading ? '...' : bedData.available}</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{loading ? '...' : bedData.maintenance}</div>
              <div className="text-sm text-muted-foreground">Maintenance</div>
            </div>
            <div className="text-center p-4 rounded-lg">
              <Badge variant="outline" className={getUtilizationColor(bedData.utilization)}>
                {getUtilizationIcon(bedData.utilization)}
                <span className="ml-1">{loading ? '...' : bedData.utilization}% Occupied</span>
              </Badge>
              <div className="text-sm text-muted-foreground mt-1">Utilization</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <div className="text-sm text-muted-foreground">
              <strong>System Status:</strong> Connected to live bed management database • 
              Last updated: {lastUpdate.toLocaleTimeString()} • 
              Real-time sync enabled
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Sources Management */}
      <Tabs defaultValue="sources" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="ingestion">Ingestion</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-4">
          <DataSourceList onAddDataSource={onAddDataSource} />
        </TabsContent>

        <TabsContent value="ingestion" className="space-y-4">
          <IngestionDashboard />
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <MonitoringTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SourcesTabContent;
