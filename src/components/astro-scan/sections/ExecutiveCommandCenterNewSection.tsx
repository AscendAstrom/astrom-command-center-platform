
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
import ExecutiveCommandCenterNew from "@/components/astro-scan/ExecutiveCommandCenterNew";

const ExecutiveCommandCenterNewSection = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Crown className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-foreground">Phase 3C: Executive Command Center</h3>
        <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Strategic Intelligence</Badge>
      </div>
      <p className="text-muted-foreground mb-6">
        C-Suite strategic dashboard with AI-powered forecasting, risk management intelligence,
        and performance optimization engine for enterprise-wide decision making.
      </p>

      <ExecutiveCommandCenterNew />
    </div>
  );
};

export default ExecutiveCommandCenterNewSection;
