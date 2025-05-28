
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Hospital, Brain, Shield, Zap, TrendingUp } from "lucide-react";
import AdvancedMonitoringPanel from "@/components/astro-scan/AdvancedMonitoringPanel";

const MonitoringTabContent = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-400" />
            Advanced Monitoring & Intelligence
          </CardTitle>
          <CardDescription>
            Phase 3: AI-powered monitoring with predictive alerts and automated responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                Intelligent SLA Monitoring
              </h3>
              <AdvancedMonitoringPanel />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-400" />
                AI Alert Engine
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">Predictive Breach Detection</span>
                    <Badge className="bg-purple-500/10 text-purple-600">AI-Powered</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Forecasts SLA breaches 30-60 minutes in advance</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">Adaptive Thresholds</span>
                    <Badge className="bg-blue-500/10 text-blue-600">Learning</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Machine learning adjusts alert sensitivity</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-green-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">Auto-Resolution</span>
                    <Badge className="bg-green-500/10 text-green-600">Active</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Automated remediation for common issues</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Bed Management Monitoring */}
          <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Hospital className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-semibold text-foreground">Phase 3: Intelligent Bed Management Monitoring</h3>
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Enhanced</Badge>
            </div>
            <p className="text-muted-foreground mb-4">
              Advanced monitoring with AI-powered capacity prediction, cultural compliance validation, 
              and automated resource optimization for Saudi healthcare requirements.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-400" />
                  Predictive Monitoring
                </h4>
                <div className="p-3 bg-muted/50 rounded-lg border border-purple-500/20">
                  <div className="font-medium text-foreground text-sm mb-1">Surge Prediction</div>
                  <div className="text-xs text-muted-foreground">
                    AI forecasts bed demand spikes 2-6 hours ahead
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg border border-blue-500/20">
                  <div className="font-medium text-foreground text-sm mb-1">Capacity Optimization</div>
                  <div className="text-xs text-muted-foreground">
                    ML algorithms optimize bed allocation efficiency
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4 text-cyan-400" />
                  Enhanced Compliance
                </h4>
                <div className="p-3 bg-muted/50 rounded-lg border border-cyan-500/20">
                  <div className="font-medium text-foreground text-sm mb-1">Cultural AI Validation</div>
                  <div className="text-xs text-muted-foreground">
                    AI ensures gender segregation compliance
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg border border-orange-500/20">
                  <div className="font-medium text-foreground text-sm mb-1">MOH Reporting Intelligence</div>
                  <div className="text-xs text-muted-foreground">
                    Automated regulatory compliance monitoring
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  Automated Actions
                </h4>
                <div className="p-3 bg-muted/50 rounded-lg border border-yellow-500/20">
                  <div className="font-medium text-foreground text-sm mb-1">Smart Escalation</div>
                  <div className="text-xs text-muted-foreground">
                    Context-aware alert routing to right teams
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg border border-green-500/20">
                  <div className="font-medium text-foreground text-sm mb-1">Resource Pre-allocation</div>
                  <div className="text-xs text-muted-foreground">
                    Proactive staff and equipment allocation
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                View Analytics
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configure AI
              </Button>
              <div className="text-sm text-muted-foreground">
                AI Accuracy: <span className="font-medium text-green-400">94.7%</span> | 
                Predictions Today: <span className="font-medium text-blue-400">247</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringTabContent;
