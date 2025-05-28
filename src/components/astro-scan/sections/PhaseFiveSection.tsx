
import { Badge } from "@/components/ui/badge";
import { Globe, Rocket } from "lucide-react";
import GlobalHealthCommandCenter from "@/components/astro-scan/GlobalHealthCommandCenter";

const PhaseFiveSection = () => {
  const phase5Milestones = [
    { milestone: "Global Network Architecture", status: "active", progress: 100 },
    { milestone: "Multi-National Compliance Framework", status: "active", progress: 95 },
    { milestone: "Cross-Border Data Sovereignty", status: "active", progress: 88 },
    { milestone: "International AI Governance", status: "deploying", progress: 92 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'deploying': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'design': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'research': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'concept': return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Phase 5 Header */}
      <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-foreground">Phase 5: Global Health Intelligence Network</h3>
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Phase 5 Active</Badge>
        </div>
        <p className="text-muted-foreground mb-6">
          Worldwide healthcare intelligence orchestration with multi-national compliance,
          cross-border data sharing, global health emergency response, and universal healthcare AI governance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="h-4 w-4 text-green-400" />
              <span className="font-semibold text-sm">Phase 5 Capabilities</span>
            </div>
            <div className="text-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Global Health Command Center</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>International Compliance Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Universal Healthcare Translation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>Pandemic Early Warning System</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-purple-400" />
              <span className="font-semibold text-sm">Global Deployment Status</span>
            </div>
            <div className="space-y-2">
              {phase5Milestones.map((milestone, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{milestone.milestone}</span>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(milestone.status)}`}>
                      {milestone.status}
                    </Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-purple-400 h-1 rounded-full transition-all duration-300" 
                      style={{ width: `${milestone.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground text-right">{milestone.progress}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global Health Command Center */}
      <GlobalHealthCommandCenter />
    </div>
  );
};

export default PhaseFiveSection;
