
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import AIFlowRolesManager from "@/components/astro-flow/AIRolesManager";

const AIFlowRolesSection = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg border border-pink-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-5 w-5 text-pink-400" />
        <h3 className="text-lg font-semibold text-foreground">AI Flow & Automation Roles</h3>
        <Badge className="bg-pink-500/10 text-pink-600 border-pink-500/20">Workflow Intelligence Active</Badge>
      </div>
      <p className="text-muted-foreground mb-6">
        Intelligent AI agents for automated workflow optimization, staff allocation, patient routing,
        and real-time performance monitoring with predictive analytics and escalation management.
      </p>

      <AIFlowRolesManager />
    </div>
  );
};

export default AIFlowRolesSection;
