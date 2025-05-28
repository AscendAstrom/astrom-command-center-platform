
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import EnterpriseIntegrationHub from "@/components/astro-scan/EnterpriseIntegrationHub";

const PhaseFourSection = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg border border-amber-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="h-5 w-5 text-amber-400" />
        <h3 className="text-lg font-semibold text-foreground">Phase 4: Enterprise Integration & Ecosystem Orchestration</h3>
        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Phase 4 Active</Badge>
      </div>
      <p className="text-muted-foreground mb-6">
        Enterprise-grade integration hub with advanced workflow automation, multi-system data federation,
        and AI-powered decision engines for comprehensive healthcare ecosystem management.
      </p>

      <EnterpriseIntegrationHub />
    </div>
  );
};

export default PhaseFourSection;
