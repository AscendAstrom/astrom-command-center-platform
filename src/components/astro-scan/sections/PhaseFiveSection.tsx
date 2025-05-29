
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Network, Globe, Brain, Activity, Settings, TrendingUp, Eye } from "lucide-react";
import AIRolesManager from "../AIRolesManager";

interface PhaseFiveSectionProps {
  onNavigate?: (path: string) => void;
  onTabNavigate?: (path: string, tab?: string) => void;
}

const PhaseFiveSection = ({ onNavigate, onTabNavigate }: PhaseFiveSectionProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Zap className="h-6 w-6 text-pink-400" />
                Phase 5: Advanced Orchestration & Global Network
              </CardTitle>
              <CardDescription className="text-lg">
                Enterprise-scale AI orchestration with global healthcare network integration
              </CardDescription>
            </div>
            <Badge className="bg-pink-500/10 text-pink-600 border-pink-500/20 text-sm px-3 py-1">
              Enterprise Scale
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Button variant="outline" onClick={() => onNavigate?.('/ai-ecosystem')}>
              <Brain className="h-4 w-4 mr-2" />
              AI Ecosystem Hub
            </Button>
            <Button variant="outline" onClick={() => onNavigate?.('/astro-flow')}>
              <Activity className="h-4 w-4 mr-2" />
              Workflow Engine
            </Button>
            <Button variant="outline" onClick={() => onTabNavigate?.('/astro-metrics', 'sla-configuration')}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Global SLA Config
            </Button>
            <Button variant="outline" onClick={() => onNavigate?.('/dashboard')}>
              <Eye className="h-4 w-4 mr-2" />
              Network Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 bg-card/50 rounded-lg border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Network className="h-5 w-5 text-cyan-400" />
                <h4 className="font-semibold text-foreground">Federated Learning</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Privacy-preserving collaborative AI across healthcare networks
              </p>
              <Button size="sm" className="w-full" onClick={() => onNavigate?.('/ai-ecosystem')}>
                <Network className="h-4 w-4 mr-2" />
                Manage Federation
              </Button>
            </div>

            <div className="p-4 bg-card/50 rounded-lg border border-purple-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-5 w-5 text-purple-400" />
                <h4 className="font-semibold text-foreground">Global Health Network</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                International healthcare data exchange and coordination
              </p>
              <Button size="sm" className="w-full" onClick={() => onNavigate?.('/admin')}>
                <Globe className="h-4 w-4 mr-2" />
                Network Console
              </Button>
            </div>

            <div className="p-4 bg-card/50 rounded-lg border border-orange-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="h-5 w-5 text-orange-400" />
                <h4 className="font-semibold text-foreground">Enterprise Integration</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Advanced API gateway and enterprise system integration
              </p>
              <Button size="sm" className="w-full" onClick={() => onNavigate?.('/settings')}>
                <Settings className="h-4 w-4 mr-2" />
                Integration Hub
              </Button>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
            <h4 className="font-semibold text-foreground mb-2">🚀 Next-Generation Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Quantum-enhanced optimization algorithms</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Global health intelligence networks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Autonomous healing systems</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Multi-dimensional predictive modeling</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Interplanetary health data synchronization</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Universal healthcare protocol adaptation</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Roles Management Section */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Brain className="h-6 w-6 text-cyan-400" />
                AI Roles Management System
              </CardTitle>
              <CardDescription>
                Configure and monitor intelligent AI agents for automated healthcare operations
              </CardDescription>
            </div>
            <Button onClick={() => onNavigate?.('/ai-ecosystem')}>
              <Settings className="h-4 w-4 mr-2" />
              Advanced AI Management
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <AIRolesManager />
        </CardContent>
      </Card>
    </div>
  );
};

export default PhaseFiveSection;
