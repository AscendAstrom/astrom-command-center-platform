
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Shield, Activity, TrendingUp, Settings, Eye, AlertTriangle } from "lucide-react";

interface PhaseFourSectionProps {
  onNavigate?: (path: string) => void;
  onTabNavigate?: (path: string, tab?: string) => void;
}

const PhaseFourSection = ({ onNavigate, onTabNavigate }: PhaseFourSectionProps) => {
  return (
    <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Brain className="h-6 w-6 text-cyan-400" />
              Phase 4: AI Decision Engine & Executive Command
            </CardTitle>
            <CardDescription className="text-lg">
              Advanced AI orchestration with executive-level insights and autonomous decision-making
            </CardDescription>
          </div>
          <Badge className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20 text-sm px-3 py-1">
            Advanced AI
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-card/50 rounded-lg border border-blue-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-5 w-5 text-blue-400" />
              <h4 className="font-semibold text-foreground">AI Decision Engine</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Autonomous decision-making with predictive analytics and real-time optimization
            </p>
            <div className="space-y-2">
              <Button size="sm" className="w-full" onClick={() => onNavigate?.('/ai-ecosystem')}>
                <Brain className="h-4 w-4 mr-2" />
                Launch AI Console
              </Button>
              <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate?.('/astro-flow')}>
                <Activity className="h-4 w-4 mr-2" />
                Workflow Rules
              </Button>
            </div>
          </div>

          <div className="p-4 bg-card/50 rounded-lg border border-green-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-green-400" />
              <h4 className="font-semibold text-foreground">Executive Command</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              High-level strategic insights and performance monitoring for leadership
            </p>
            <div className="space-y-2">
              <Button size="sm" className="w-full" onClick={() => onNavigate?.('/dashboard')}>
                <Eye className="h-4 w-4 mr-2" />
                Executive Dashboard
              </Button>
              <Button variant="outline" size="sm" className="w-full" onClick={() => onTabNavigate?.('/astro-metrics', 'kpi-builder')}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Strategic KPIs
              </Button>
            </div>
          </div>

          <div className="p-4 bg-card/50 rounded-lg border border-purple-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="h-5 w-5 text-purple-400" />
              <h4 className="font-semibold text-foreground">Security & Compliance</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Advanced security monitoring and regulatory compliance management
            </p>
            <div className="space-y-2">
              <Button size="sm" className="w-full" onClick={() => onNavigate?.('/admin')}>
                <Shield className="h-4 w-4 mr-2" />
                Security Center
              </Button>
              <Button variant="outline" size="sm" className="w-full" onClick={() => onTabNavigate?.('/astro-metrics', 'alerts')}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Alert Management
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
          <h4 className="font-semibold text-foreground mb-2">🎯 Advanced Capabilities</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Predictive patient flow optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Automated resource allocation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Real-time risk assessment</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>Executive intelligence reports</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>Autonomous workflow orchestration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span>Advanced security intelligence</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseFourSection;
