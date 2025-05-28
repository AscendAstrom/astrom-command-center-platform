
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp } from "lucide-react";
import AdvancedMonitoringPanel from "@/components/astro-scan/AdvancedMonitoringPanel";
import DataQualityScoring from "@/components/astro-scan/DataQualityScoring";

const AdvancedMonitoringSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-orange-400" />
          <h3 className="text-lg font-semibold text-foreground">Advanced Monitoring</h3>
          <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">Enhanced</Badge>
        </div>
        <p className="text-muted-foreground mb-4">
          Intelligent alerting with SLA breach prediction and automated escalation workflows.
        </p>
        <AdvancedMonitoringPanel />
      </div>

      <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-foreground">Data Quality Intelligence</h3>
          <Badge className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">AI-Powered</Badge>
        </div>
        <p className="text-muted-foreground mb-4">
          Real-time data quality scoring with automated validation and enrichment processes.
        </p>
        <DataQualityScoring />
      </div>
    </div>
  );
};

export default AdvancedMonitoringSection;
