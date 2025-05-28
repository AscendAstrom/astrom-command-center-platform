
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";
import AIDecisionEngine from "@/components/astro-scan/AIDecisionEngine";

const AIDecisionEngineSection = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-lg border border-indigo-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-5 w-5 text-indigo-400" />
        <h3 className="text-lg font-semibold text-foreground">Epic 4.2: AI-Powered Decision Engine</h3>
        <Badge className="bg-indigo-500/10 text-indigo-600 border-indigo-500/20">Neural Network Active</Badge>
      </div>
      <p className="text-muted-foreground mb-6">
        Advanced machine learning models for automated decision making, policy enforcement,
        intelligent resource allocation, and predictive anomaly detection across the enterprise.
      </p>

      <AIDecisionEngine />
    </div>
  );
};

export default AIDecisionEngineSection;
