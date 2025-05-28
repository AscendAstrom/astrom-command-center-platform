
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";
import PredictiveAnalyticsDashboard from "@/components/astro-scan/PredictiveAnalyticsDashboard";

const PhaseThreeSection = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-foreground">Phase 3: Advanced Analytics & Intelligence</h3>
        <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">Phase 3 Active</Badge>
      </div>
      <p className="text-muted-foreground mb-6">
        Advanced predictive analytics, intelligent monitoring, and machine learning-powered insights 
        for proactive healthcare data management.
      </p>

      <PredictiveAnalyticsDashboard />
    </div>
  );
};

export default PhaseThreeSection;
