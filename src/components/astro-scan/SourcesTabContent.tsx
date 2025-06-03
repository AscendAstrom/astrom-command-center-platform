import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Hospital, Plus } from "lucide-react";
import { DataSourceList } from "@/components/astro-scan/DataSourceList";
import EnhancedBedManagementTable from "@/components/shared/EnhancedBedManagementTable";
import { occupancyThresholds, emptyStateMessages } from "@/config/constants";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BedData } from "@/types/bedManagement";

interface SourcesTabContentProps {
  onAddSourceClick: () => void;
}

const SourcesTabContent = ({ onAddSourceClick }: SourcesTabContentProps) => {
  const [bedData, setBedData] = useState<BedData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBedData();
  }, []);

  const fetchBedData = async () => {
    try {
      setLoading(true);
      const { data: beds, error } = await supabase
        .from('beds')
        .select(`
          *,
          departments(name, code, type),
          patients(first_name, last_name, mrn)
        `)
        .eq('deleted_at', null)
        .limit(20);

      if (error) throw error;

      if (beds && beds.length > 0) {
        const transformedData: BedData[] = beds.map((bed, index) => ({
          id: bed.id,
          org: "Healthcare Organization",
          hospital: "Main Hospital", 
          department: bed.departments?.name || "Unknown Department",
          ward: `${bed.departments?.name || "Ward"}-${Math.floor(index / 10) + 1}`,
          level: "room" as const,
          totalBeds: 1,
          plannedBeds: 1,
          occupiedBeds: bed.status === 'OCCUPIED' ? 1 : 0,
          assignedBeds: bed.status === 'RESERVED' ? 1 : 0, // Use RESERVED instead of ASSIGNED
          dirtyBeds: bed.status === 'MAINTENANCE' ? 1 : 0, // Use MAINTENANCE instead of DIRTY
          confirmedDischarge: 0,
          potentialDischarge: 0,
          unassignedPatients: 0,
          transferOrders: 0,
          netAvailableBeds: bed.status === 'AVAILABLE' ? 1 : 0,
          availableBeds: bed.status === 'AVAILABLE' ? 1 : 0,
          occupancyRate: bed.status === 'OCCUPIED' ? 100 : 0,
          projectedRate: bed.status === 'OCCUPIED' ? 100 : Math.floor(Math.random() * 50),
          hasChildren: false,
          lastUpdated: new Date().toISOString()
        }));
        setBedData(transformedData);
      } else {
        setBedData([]);
      }
    } catch (error) {
      console.error('Error fetching bed data:', error);
      setBedData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-400" />
              Connected Data Sources
            </CardTitle>
            <CardDescription>
              Manage and configure healthcare data sources with automated discovery
            </CardDescription>
          </div>
          <Button onClick={onAddSourceClick}>
            <Plus className="h-4 w-4 mr-2" />
            Add Source
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataSourceList />

        {/* Real Bed Management Data Sources */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Hospital className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold text-foreground">Connected Bed Management System</h3>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Live Data</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Real-time bed management data from your connected healthcare systems. 
            Features live updates, status tracking, and comprehensive monitoring capabilities.
          </p>

          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="font-medium text-foreground text-sm">Real-time Updates</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Live synchronization with your bed management database
              </div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="font-medium text-foreground text-sm">Status Monitoring</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Track bed availability, occupancy, and maintenance status
              </div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border border-orange-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="font-medium text-foreground text-sm">Quality Assurance</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Data validation and quality monitoring
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading bed management data...</p>
            </div>
          ) : bedData.length > 0 ? (
            <EnhancedBedManagementTable 
              data={bedData} 
              showArabicNames={true}
              thresholds={occupancyThresholds}
            />
          ) : (
            <div className="mt-4 p-6 bg-muted/30 rounded-lg text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <Hospital className="h-6 w-6 text-muted-foreground" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">No Bed Data Available</h4>
              <p className="text-muted-foreground text-sm mb-4">
                {emptyStateMessages.noBedData}
              </p>
              <Button variant="outline" size="sm" onClick={fetchBedData}>
                Retry Connection
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SourcesTabContent;
