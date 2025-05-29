
import { Zap } from "lucide-react";

const AstroFlowHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">ASTRO-FLOW</h1>
        <span className="text-sm text-pink-400 font-medium">AI Automation & Workflow Intelligence</span>
      </div>
      <p className="text-muted-foreground max-w-2xl">
        Intelligent automation platform with AI-powered monitoring, predictive analytics, and workflow management.
      </p>
    </div>
  );
};

export default AstroFlowHeader;
