
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
import ExecutiveCommandCenter from "@/components/astro-scan/ExecutiveCommandCenter";

const ExecutiveCommandCenterSection = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Crown className="h-5 w-5 text-emerald-400" />
        <h3 className="text-lg font-semibold text-foreground">Epic 4.1: Executive Command Center</h3>
        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">C-Suite Dashboard</Badge>
      </div>
      <p className="text-muted-foreground mb-6">
        Strategic dashboards with predictive business intelligence, real-time operational oversight,
        and AI-powered executive insights for enterprise-wide decision making.
      </p>

      <ExecutiveCommandCenter />
    </div>
  );
};

export default ExecutiveCommandCenterSection;
