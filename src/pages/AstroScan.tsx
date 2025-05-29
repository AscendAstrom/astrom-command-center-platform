
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Activity, Settings } from "lucide-react";
import { DataSourceWizard } from "@/components/astro-scan/DataSourceWizard";
import AstroScanHeader from "@/components/astro-scan/AstroScanHeader";
import SourcesTabContent from "@/components/astro-scan/SourcesTabContent";
import IngestionTabContent from "@/components/astro-scan/IngestionTabContent";
import MonitoringTabContent from "@/components/astro-scan/MonitoringTabContent";
import PhaseFourSection from "@/components/astro-scan/sections/PhaseFourSection";
import PhaseFiveSection from "@/components/astro-scan/sections/PhaseFiveSection";
import { toast } from "sonner";

const AstroScan = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("sources");

  const handleDataSourceAdded = () => {
    setIsWizardOpen(false);
    toast.success("Data source added successfully!");
    // Refresh data sources list
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast.info(`Switched to ${value} module`);
  };

  return (
    <div className="h-full bg-background">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 xl:px-12 overflow-y-auto">
        <div className="pt-6">
          <AstroScanHeader />

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
              <SourcesTabContent onAddSourceClick={() => {
                setIsWizardOpen(true);
                toast.info("Opening data source wizard...");
              }} />
            </TabsContent>

            <TabsContent value="ingestion" className="space-y-6">
              <IngestionTabContent />
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-6">
              <MonitoringTabContent />
              
              {/* Enhanced Phase 4 & Phase 5 Sections */}
              <div className="space-y-6 mt-8">
                <PhaseFourSection />
                <PhaseFiveSection />
              </div>
            </TabsContent>
          </Tabs>
        </div>
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
