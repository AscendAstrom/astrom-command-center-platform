
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import SecurityComplianceIntelligence from "@/components/astro-scan/SecurityComplianceIntelligence";

const SecurityComplianceSection = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-red-400" />
        <h3 className="text-lg font-semibold text-foreground">Phase 3D: Security & Compliance Intelligence</h3>
        <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Enterprise Security</Badge>
      </div>
      <p className="text-muted-foreground mb-6">
        AI-powered security monitoring, privacy-preserving analytics, automated audit intelligence,
        and comprehensive data governance management for enterprise compliance.
      </p>

      <SecurityComplianceIntelligence />
    </div>
  );
};

export default SecurityComplianceSection;
