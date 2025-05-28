
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
      case 'active': return 'bg-astrom-green/10 text-astrom-green border-astrom-green/20';
      case 'deploying': return 'bg-astrom-blue/10 text-astrom-blue border-astrom-blue/20';
      case 'design': return 'bg-astrom-purple/10 text-astrom-purple border-astrom-purple/20';
      case 'research': return 'bg-astrom-orange/10 text-astrom-orange border-astrom-orange/20';
      case 'concept': return 'bg-muted/50 text-muted-foreground border-border';
      default: return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Phase 5 Header */}
      <div className="p-6 glass-card border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Phase 5: Global Health Intelligence Network</h3>
          <Badge className="bg-astrom-green/10 text-astrom-green border-astrom-green/20">Phase 5 Active</Badge>
        </div>
        <p className="text-muted-foreground mb-6">
          Worldwide healthcare intelligence orchestration with multi-national compliance,
          cross-border data sharing, global health emergency response, and universal healthcare AI governance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 glass-card border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="h-4 w-4 text-astrom-green" />
              <span className="font-semibold text-sm">Phase 5 Capabilities</span>
            </div>
            <div className="text-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-astrom-green rounded-full"></div>
                <span>Global Health Command Center</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-astrom-blue rounded-full"></div>
                <span>International Compliance Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-astrom-purple rounded-full"></div>
                <span>Universal Healthcare Translation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-astrom-orange rounded-full"></div>
                <span>Pandemic Early Warning System</span>
              </div>
            </div>
          </div>

          <div className="p-4 glass-card border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-astrom-purple" />
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
                      className="bg-gradient-to-r from-primary to-astrom-purple h-1 rounded-full transition-all duration-300" 
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
