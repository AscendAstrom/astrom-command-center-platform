
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Activity, Settings, Workflow, Zap } from "lucide-react";
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
import PhaseSevenSection from "@/components/astro-scan/sections/PhaseSevenSection";
import IntegratedSystemOverview from "@/components/astro-scan/IntegratedSystemOverview";
import WorkflowOrchestrator from "@/components/workflow/WorkflowOrchestrator";
import EnhancedAutomationPanel from "@/components/workflow/EnhancedAutomationPanel";
import { useWorkflowIntegration } from "@/components/workflow/hooks/useWorkflowIntegration";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const AstroScan = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "sources");
  const { initializeWorkflow } = useWorkflowIntegration();

  const handleDataSourceAdded = async () => {
    setIsWizardOpen(false);
    
    // Initialize AI workflow for the new data source with mock data
    try {
      const mockSourceId = `source_${Date.now()}`;
      const mockSourceName = `Data Source ${new Date().toLocaleTimeString()}`;
      await initializeWorkflow(mockSourceId, mockSourceName);
      console.log(`AI workflow initialized for ${mockSourceName}`);
    } catch (error) {
      console.error('Failed to initialize AI workflow:', error);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleAddDataSource = () => {
    setIsWizardOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="h-full bg-background">
        <div className="h-full max-w-7xl mx-auto p-6 overflow-y-auto">
          <AstroScanHeader />

          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-muted/50">
              <TabsTrigger value="sources" className="data-[state=active]:bg-primary/20">
                <Database className="h-4 w-4 mr-2" />
                Data Sources
              </TabsTrigger>
              <TabsTrigger value="workflow" className="data-[state=active]:bg-purple-500/20">
                <Workflow className="h-4 w-4 mr-2" />
                AI Workflow
              </TabsTrigger>
              <TabsTrigger value="automation" className="data-[state=active]:bg-blue-500/20">
                <Zap className="h-4 w-4 mr-2" />
                Smart Automation
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
              <SourcesTabContent onAddDataSource={handleAddDataSource} />
            </TabsContent>

            <TabsContent value="workflow" className="space-y-6">
              <WorkflowOrchestrator />
            </TabsContent>

            <TabsContent value="automation" className="space-y-6">
              <EnhancedAutomationPanel />
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
                <PhaseSevenSection />
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
    </DashboardLayout>
  );
};

export default AstroScan;
