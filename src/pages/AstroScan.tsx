
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

const AstroScan = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handleDataSourceAdded = () => {
    setIsWizardOpen(false);
    // Refresh data sources list
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <AstroScanHeader />

        <Tabs defaultValue="sources" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="sources" className="data-[state=active]:bg-blue-500/20">
              <Database className="h-4 w-4 mr-2" />
              Data Sources
            </TabsTrigger>
            <TabsTrigger value="ingestion" className="data-[state=active]:bg-green-500/20">
              <Activity className="h-4 w-4 mr-2" />
              Ingestion
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-purple-500/20">
              <Settings className="h-4 w-4 mr-2" />
              Monitoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sources" className="space-y-6">
            <SourcesTabContent onAddSourceClick={() => setIsWizardOpen(true)} />
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

      {isWizardOpen && (
        <DataSourceWizard 
          onClose={() => setIsWizardOpen(false)}
          onDataSourceAdded={handleDataSourceAdded}
        />
      )}
    </div>
  );
};

export default AstroScan;
