
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataSourceList } from "./DataSourceList";
import { IngestionDashboard } from "./IngestionDashboard";
import MonitoringTabContent from "./MonitoringTabContent";
import { useDataSources } from "@/hooks/useDataSources";
import { BedManagementStatusCard } from "./components/BedManagementStatusCard";
import { useBedData } from "./hooks/useBedData";

interface SourcesTabContentProps {
  onAddDataSource?: () => void;
}

const SourcesTabContent = ({ onAddDataSource }: SourcesTabContentProps) => {
  const { refetch } = useDataSources();
  const { bedData, loading, lastUpdate, fetchBedData } = useBedData();

  const handleRefreshAll = () => {
    fetchBedData();
    refetch();
  };

  return (
    <div className="space-y-6">
      <BedManagementStatusCard
        bedData={bedData}
        loading={loading}
        lastUpdate={lastUpdate}
        onRefresh={handleRefreshAll}
      />

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
