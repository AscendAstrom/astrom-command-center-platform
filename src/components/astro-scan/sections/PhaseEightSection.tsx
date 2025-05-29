
import { Badge } from "@/components/ui/badge";
import { Rocket, Zap } from "lucide-react";
import EnterpriseIntegrationHub from "@/components/astro-scan/enterprise-integration/EnterpriseIntegrationHub";

const PhaseEightSection = () => {
  const phase8Milestones = [
    { milestone: "Deep EHR Integration", status: "active", progress: 100 },
    { milestone: "Healthcare Standards Compliance", status: "active", progress: 98 },
    { milestone: "Enterprise API Gateway", status: "active", progress: 95 },
    { milestone: "Multi-Tenant Security", status: "active", progress: 97 },
    { milestone: "Regulatory Intelligence", status: "deploying", progress: 92 }
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
      {/* Phase 8 Header */}
      <div className="p-6 glass-card border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Rocket className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Phase 8: Enterprise Integration Mastery</h3>
          <Badge className="bg-astrom-green/10 text-astrom-green border-astrom-green/20">Phase 8 Active</Badge>
        </div>
        <p className="text-muted-foreground mb-6">
          Deep EHR integration with major healthcare systems, comprehensive standards compliance,
          enterprise-grade security, and intelligent regulatory monitoring for healthcare organizations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 glass-card border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-astrom-green" />
              <span className="font-semibold text-sm">Phase 8 Capabilities</span>
            </div>
            <div className="text-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-astrom-green rounded-full"></div>
                <span>Deep EHR Integration (Epic, Cerner, Allscripts)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-astrom-blue rounded-full"></div>
                <span>FHIR R4 & HL7 v2.x Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-astrom-purple rounded-full"></div>
                <span>AI-Powered Compliance Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-astrom-orange rounded-full"></div>
                <span>Enterprise Security & Governance</span>
              </div>
            </div>
          </div>

          <div className="p-4 glass-card border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="h-4 w-4 text-astrom-purple" />
              <span className="font-semibold text-sm">Integration Deployment Status</span>
            </div>
            <div className="space-y-2">
              {phase8Milestones.map((milestone, index) => (
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

      {/* Enterprise Integration Hub */}
      <EnterpriseIntegrationHub />
    </div>
  );
};

export default PhaseEightSection;
