
import { Badge } from "@/components/ui/badge";
import { Building2, Zap } from "lucide-react";
import EnterpriseIntegrationHub from "@/components/astro-scan/EnterpriseIntegrationHub";
import AdvancedEcosystemOrchestration from "@/components/astro-scan/AdvancedEcosystemOrchestration";

const PhaseFourSection = () => {
  return (
    <div className="space-y-6">
      {/* Enhanced Phase 4 */}
      <div className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg border border-amber-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-foreground">Phase 4: Enterprise Integration & Ecosystem Orchestration</h3>
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Phase 4 Enhanced</Badge>
        </div>
        <p className="text-muted-foreground mb-6">
          Enterprise-grade integration hub with advanced workflow automation, multi-system data federation,
          AI-powered decision engines, and next-generation healthcare ecosystem management.
        </p>

        <EnterpriseIntegrationHub />
      </div>

      {/* Advanced Ecosystem Orchestration */}
      <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-foreground">Advanced Ecosystem Orchestration</h3>
          <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">Phase 4.1 Active</Badge>
        </div>
        <p className="text-muted-foreground mb-6">
          Next-generation orchestration with autonomous healing, predictive optimization, 
          federated learning networks, and intelligent ecosystem management.
        </p>

        <AdvancedEcosystemOrchestration />
      </div>
    </div>
  );
};

export default PhaseFourSection;
