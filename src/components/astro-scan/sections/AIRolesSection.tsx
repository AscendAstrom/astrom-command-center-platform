
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";
import AIRolesManager from "@/components/astro-scan/AIRolesManager";

const AIRolesSection = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-foreground">AI Roles & Agent Management</h3>
        <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">AI Ecosystem Active</Badge>
      </div>
      <p className="text-muted-foreground mb-6">
        Intelligent AI agents for automated data ingestion, quality assurance, anomaly detection,
        and system integration with real-time performance monitoring and configuration management.
      </p>

      <AIRolesManager />
    </div>
  );
};

export default AIRolesSection;
