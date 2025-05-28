
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";
import AIMetricsRolesManager from "@/components/astro-metrics/AIMetricsRolesManager";

const AIMetricsRolesSection = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-5 w-5 text-orange-400" />
        <h3 className="text-lg font-semibold text-foreground">AI Metrics & Analytics Roles</h3>
        <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">Performance Intelligence Active</Badge>
      </div>
      <p className="text-muted-foreground mb-6">
        Intelligent AI agents for automated KPI analysis, performance coaching, compliance monitoring,
        and anomaly detection with real-time metrics optimization and quality assurance.
      </p>

      <AIMetricsRolesManager />
    </div>
  );
};

export default AIMetricsRolesSection;
