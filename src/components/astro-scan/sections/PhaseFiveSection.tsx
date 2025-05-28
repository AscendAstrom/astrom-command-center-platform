
import { Badge } from "@/components/ui/badge";
import { Globe, Rocket } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PhaseFiveSection = () => {
  const phase5Milestones = [
    { milestone: "Global Network Architecture", status: "planning", progress: 15 },
    { milestone: "Multi-National Compliance Framework", status: "design", progress: 8 },
    { milestone: "Cross-Border Data Sovereignty", status: "research", progress: 5 },
    { milestone: "International AI Governance", status: "concept", progress: 3 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'design': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'research': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'concept': return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-foreground">Phase 5: Global Health Intelligence Network</h3>
        <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">Phase 5 Preparation</Badge>
      </div>
      <p className="text-muted-foreground mb-6">
        Conceptual framework for worldwide healthcare intelligence orchestration with multi-national compliance,
        cross-border data sharing, global health emergency response, and universal healthcare AI governance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Rocket className="h-4 w-4 text-purple-400" />
              Phase 5 Vision
            </CardTitle>
            <CardDescription className="text-xs">
              Revolutionary global healthcare intelligence platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Universal Healthcare AI Governance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Cross-Border Health Data Federation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Global Pandemic Response Coordination</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>Multi-Language Healthcare Intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>International Regulatory Harmonization</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sm">Development Roadmap</CardTitle>
            <CardDescription className="text-xs">
              Current preparation milestones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
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
                    className="bg-purple-400 h-1 rounded-full transition-all duration-300" 
                    style={{ width: `${milestone.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground text-right">{milestone.progress}%</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-foreground text-sm">Phase 5 Preparation Status</h4>
          <Button variant="outline" size="sm" disabled>
            <Globe className="h-3 w-3 mr-1" />
            In Conceptual Phase
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Phase 5 represents the ultimate evolution of healthcare intelligence - a globally coordinated, 
          AI-powered ecosystem that transcends borders while respecting sovereignty. Currently in early 
          conceptual development as Phase 4 capabilities mature.
        </p>
      </div>
    </div>
  );
};

export default PhaseFiveSection;
