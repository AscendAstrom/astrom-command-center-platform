
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
import PhaseFourAdvancedSection from "@/components/astro-scan/sections/PhaseFourAdvancedSection";
import PhaseFiveSection from "@/components/astro-scan/sections/PhaseFiveSection";
import PhaseFiveAdvancedSection from "@/components/astro-scan/sections/PhaseFiveAdvancedSection";
import PhaseSixSection from "@/components/astro-scan/sections/PhaseSixSection";
import IntegratedSystemOverview from "@/components/astro-scan/IntegratedSystemOverview";
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
      // Initialize hospital system with cross-module integration
      await dataIntegrationService.initializeHospitalSystem();
      
      // Initialize cross-module integration for Phase 3
      const { integratedDataService } = await import('@/services/integratedDataService');
      await integratedDataService.initializeFullSystemIntegration();
      
      toast.success('Phase 6 Autonomous Hospital Orchestration System Activated!');
    } catch (error) {
      console.error('System initialization failed:', error);
      toast.error('System initialization failed');
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
          <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
              <span className="text-indigo-700 dark:text-indigo-300">
                Initializing Phase 6 Autonomous Hospital Orchestration with self-healing systems and global intelligence...
              </span>
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
              }} 
            />
          </TabsContent>

          <TabsContent value="ingestion" className="space-y-6">
            <IngestionTabContent />
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <MonitoringTabContent />
            
            {/* Add Integrated System Overview */}
            <div className="mt-8">
              <IntegratedSystemOverview />
            </div>
            
            <div className="space-y-6 mt-8">
              <PhaseThreeSection />
              <PhaseFourAdvancedSection />
              <PhaseFourSection />
              <PhaseFiveSection />
              <PhaseFiveAdvancedSection />
              <PhaseSixSection />
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
