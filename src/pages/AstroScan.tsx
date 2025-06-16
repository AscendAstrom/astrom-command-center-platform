
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Activity, Settings } from "lucide-react";
import { DataSourceWizard } from "@/components/astro-scan/DataSourceWizard";
import AstroScanHeader from "@/components/astro-scan/AstroScanHeader";
import SourcesTabContent from "@/components/astro-scan/SourcesTabContent";
import IngestionTabContent from "@/components/astro-scan/IngestionTabContent";
import MonitoringTabContent from "@/components/astro-scan/MonitoringTabContent";
import PhaseThreeSection from "@/components/astro-scan/sections/PhaseThreeSection";
import PhaseFourSection from "@/components/astro-scan/sections/PhaseFourSection";
import PhaseFiveSection from "@/components/astro-scan/sections/PhaseFiveSection";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { dataIntegrationService } from "@/services/dataIntegrationService";

const AstroScan = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "sources");
  const [dataSourceVersion, setDataSourceVersion] = useState(0);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    initializeSystem();
  }, []);

  const initializeSystem = async () => {
    setIsInitializing(true);
    try {
      await dataIntegrationService.initializeHospitalSystem();
    } catch (error) {
      console.error('System initialization failed:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleDataSourceAdded = () => {
    setIsWizardOpen(false);
    toast.success("Data source added successfully!");
    setDataSourceVersion(v => v + 1);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast.info(`Switched to ${value} module`);
  };

  return (
    <div className="h-full bg-background">
      <div className="h-full max-w-7xl mx-auto p-6 overflow-y-auto">
        <AstroScanHeader />

        {isInitializing && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              <span className="text-blue-700 dark:text-blue-300">Initializing hospital management system with real data...</span>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="sources" className="data-[state=active]:bg-primary/20">
              <Database className="h-4 w-4 mr-2" />
              Data Sources
            </TabsTrigger>
            <TabsTrigger value="ingestion" className="data-[state=active]:bg-astrom-green/20">
              <Activity className="h-4 w-4 mr-2" />
              Ingestion
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-astrom-purple/20">
              <Settings className="h-4 w-4 mr-2" />
              Monitoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sources" className="space-y-6">
            <SourcesTabContent
              dataSourceVersion={dataSourceVersion}
              onAddSourceClick={() => {
              setIsWizardOpen(true);
              toast.info("Opening data source wizard...");
            }} />
          </TabsContent>

          <TabsContent value="ingestion" className="space-y-6">
            <IngestionTabContent />
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <MonitoringTabContent />
            
            <div className="space-y-6 mt-8">
              <PhaseThreeSection />
              <PhaseFourSection />
              <PhaseFiveSection />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {isWizardOpen && (
        <DataSourceWizard 
          onClose={() => {
            setIsWizardOpen(false);
            toast.info("Data source wizard closed");
          }}
          onDataSourceAdded={handleDataSourceAdded}
        />
      )}
    </div>
  );
};

export default AstroScan;
