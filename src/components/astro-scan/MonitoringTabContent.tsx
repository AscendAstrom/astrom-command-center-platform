
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Hospital, Brain, Shield, Zap, TrendingUp } from "lucide-react";
import AdvancedMonitoringPanel from "@/components/astro-scan/AdvancedMonitoringPanel";
import { supabase } from "@/integrations/supabase/client";
import { emptyStateMessages } from "@/config/constants";

const MonitoringTabContent = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    aiAccuracy: 0,
    predictionsToday: 0,
    activeSources: 0,
    dataQuality: 100
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemMetrics();
  }, []);

  const fetchSystemMetrics = async () => {
    try {
      setLoading(true);
      
      // Fetch real metrics from various sources
      const [
        { data: dataSources },
        { data: metricsSnapshots },
        { data: qualityScores }
      ] = await Promise.all([
        supabase.from('data_sources').select('id, status').eq('status', 'CONNECTED'),
        supabase.from('metrics_snapshots').select('*').order('created_at', { ascending: false }).limit(10),
        supabase.from('data_quality_scores').select('overall_score').order('evaluation_date', { ascending: false }).limit(1)
      ]);

      // Calculate real metrics
      const activeSources = dataSources?.length || 0;
      const latestQuality = qualityScores?.[0]?.overall_score || 100;
      
      setSystemMetrics({
        aiAccuracy: 0, // Will be calculated from real AI performance data when available
        predictionsToday: 0, // Will be calculated from real prediction logs when available
        activeSources,
        dataQuality: latestQuality
      });
    } catch (error) {
      console.error('Error fetching system metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
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
                <Shield className="h-5 w-5 text-astrom-green" />
                Intelligent SLA Monitoring
              </h3>
              <AdvancedMonitoringPanel />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Brain className="h-5 w-5 text-astrom-purple" />
                AI Alert Engine
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg border border-astrom-purple/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">Predictive Breach Detection</span>
                    <Badge className="bg-astrom-purple/10 text-astrom-purple border-astrom-purple/20">Ready</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Configure AI models to forecast SLA breaches</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-astrom-blue/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">Adaptive Thresholds</span>
                    <Badge className="bg-astrom-blue/10 text-astrom-blue border-astrom-blue/20">Standby</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Machine learning will adjust alert sensitivity</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-astrom-green/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">Auto-Resolution</span>
                    <Badge className="bg-astrom-green/10 text-astrom-green border-astrom-green/20">Ready</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Automated remediation ready for configuration</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Bed Management Monitoring */}
          <div className="mt-8 p-6 bg-gradient-to-r from-astrom-green/10 to-astrom-blue/10 rounded-lg border border-astrom-green/20">
            <div className="flex items-center gap-2 mb-4">
              <Hospital className="h-5 w-5 text-astrom-green" />
              <h3 className="text-lg font-semibold text-foreground">Phase 3: Intelligent Bed Management Monitoring</h3>
              <Badge className="bg-astrom-green/10 text-astrom-green border-astrom-green/20">Ready</Badge>
            </div>
            <p className="text-muted-foreground mb-4">
              Advanced monitoring ready for AI-powered capacity prediction, cultural compliance validation, 
              and automated resource optimization for Saudi healthcare requirements.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Brain className="h-4 w-4 text-astrom-purple" />
                  Predictive Monitoring
                </h4>
                <div className="p-3 bg-muted/50 rounded-lg border border-astrom-purple/20">
                  <div className="font-medium text-foreground text-sm mb-1">Surge Prediction</div>
                  <div className="text-xs text-muted-foreground">
                    Ready to forecast bed demand spikes with real data
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg border border-astrom-blue/20">
                  <div className="font-medium text-foreground text-sm mb-1">Capacity Optimization</div>
                  <div className="text-xs text-muted-foreground">
                    ML algorithms ready for bed allocation optimization
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4 text-astrom-blue" />
                  Enhanced Compliance
                </h4>
                <div className="p-3 bg-muted/50 rounded-lg border border-astrom-blue/20">
                  <div className="font-medium text-foreground text-sm mb-1">Cultural AI Validation</div>
                  <div className="text-xs text-muted-foreground">
                    Ready to ensure gender segregation compliance
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg border border-astrom-orange/20">
                  <div className="font-medium text-foreground text-sm mb-1">MOH Reporting Intelligence</div>
                  <div className="text-xs text-muted-foreground">
                    Ready for automated regulatory compliance monitoring
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4 text-astrom-orange" />
                  Automated Actions
                </h4>
                <div className="p-3 bg-muted/50 rounded-lg border border-astrom-orange/20">
                  <div className="font-medium text-foreground text-sm mb-1">Smart Escalation</div>
                  <div className="text-xs text-muted-foreground">
                    Ready for context-aware alert routing
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg border border-astrom-green/20">
                  <div className="font-medium text-foreground text-sm mb-1">Resource Pre-allocation</div>
                  <div className="text-xs text-muted-foreground">
                    Ready for proactive staff and equipment allocation
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Configure Analytics
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Setup AI Models
              </Button>
              <div className="text-sm text-muted-foreground">
                {loading ? (
                  "Loading system metrics..."
                ) : (
                  <>
                    Active Sources: <span className="font-medium text-astrom-blue">{systemMetrics.activeSources}</span> | 
                    Data Quality: <span className="font-medium text-astrom-green">{systemMetrics.dataQuality}%</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringTabContent;
