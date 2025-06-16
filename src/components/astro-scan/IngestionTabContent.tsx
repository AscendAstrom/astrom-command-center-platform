
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { IngestionDashboard } from "@/components/astro-scan/IngestionDashboard";
import { AIPipelineGenerator } from "@/components/astro-scan/AIPipelineGenerator";
import AIRolesSection from "@/components/astro-scan/sections/AIRolesSection";
import PhaseThreeSection from "@/components/astro-scan/sections/PhaseThreeSection";
import IntelligentBedManagementSection from "@/components/astro-scan/sections/IntelligentBedManagementSection";
import AdvancedMonitoringSection from "@/components/astro-scan/sections/AdvancedMonitoringSection";
import PhaseFourSection from "@/components/astro-scan/sections/PhaseFourSection";
import ExecutiveCommandCenterSection from "@/components/astro-scan/sections/ExecutiveCommandCenterSection";
import AIDecisionEngineSection from "@/components/astro-scan/sections/AIDecisionEngineSection";

const IngestionTabContent = () => {
  return (
    <div className="space-y-6">
      {/* Phase 3 Integration Success Banner */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <div>
              <div className="font-semibold text-foreground">Phase 3: Cross-Module Integration Complete</div>
              <div className="text-sm text-muted-foreground">
                All AstroScan modules now connected with real hospital data and AI-powered intelligence
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            AI-Enhanced Data Ingestion
          </CardTitle>
          <CardDescription>
            Advanced AI-powered data ingestion with real-time quality monitoring, predictive analytics, and intelligent optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <IngestionDashboard />
        </CardContent>
      </Card>

      <AIPipelineGenerator />

      <AIRolesSection />

      <PhaseThreeSection />

      <IntelligentBedManagementSection />

      <AdvancedMonitoringSection />

      <PhaseFourSection />

      <ExecutiveCommandCenterSection />

      <AIDecisionEngineSection />
    </div>
  );
};

export default IngestionTabContent;
