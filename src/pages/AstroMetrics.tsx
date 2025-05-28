
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, BarChart3, Target, TrendingUp, AlertTriangle, Activity, CheckCircle } from "lucide-react";
import { MetricBuilder } from "@/components/astro-metrics/MetricBuilder";
import { KPIDictionary } from "@/components/astro-metrics/KPIDictionary";
import { SLAConfiguration } from "@/components/astro-metrics/SLAConfiguration";
import { AlertsManager } from "@/components/astro-metrics/AlertsManager";

const AstroMetrics = () => {
  const [showMetricBuilder, setShowMetricBuilder] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleMetricAdded = () => {
    setShowMetricBuilder(false);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-full animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 gradient-bg-blue rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-astrom-blue via-astrom-purple to-astrom-blue bg-clip-text text-transparent font-display">
                ASTRO-METRICS
              </h1>
              <p className="text-xl text-muted-foreground font-medium mt-1">
                Performance Analytics & KPI Management
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-status-success border-status-success bg-status-success/10 px-6 py-3 text-sm font-medium">
            <CheckCircle className="h-4 w-4 mr-2" />
            Metrics Active
          </Badge>
          <Button 
            onClick={() => setShowMetricBuilder(true)}
            className="gradient-bg-blue hover:shadow-xl hover-lift transition-all duration-300 px-8 py-4 text-base font-semibold"
          >
            <Plus className="h-5 w-5 mr-2" />
            Build Metric
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active KPIs</p>
                <p className="text-4xl font-bold text-foreground">24</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-status-success" />
                  <p className="text-sm text-status-success font-semibold">+4 this month</p>
                </div>
              </div>
              <div className="w-12 h-12 gradient-bg-blue rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">SLA Targets</p>
                <p className="text-4xl font-bold text-foreground">8</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-status-success" />
                  <p className="text-sm text-status-success font-semibold">All on track</p>
                </div>
              </div>
              <div className="w-12 h-12 gradient-bg-green rounded-xl flex items-center justify-center shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Data Quality</p>
                <p className="text-4xl font-bold text-foreground">96.8%</p>
                <p className="text-sm text-astrom-blue font-semibold">High quality data</p>
              </div>
              <div className="w-12 h-12 gradient-bg-green rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Alert Thresholds</p>
                <p className="text-4xl font-bold text-foreground">3</p>
                <p className="text-sm text-status-warning font-semibold">Need review</p>
              </div>
              <div className="w-12 h-12 gradient-bg-orange rounded-xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* KPI Dictionary */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <KPIDictionary key={refreshTrigger} />
        </div>

        {/* SLA Configuration */}
        <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <SLAConfiguration />
        </div>
      </div>

      {/* Alerts Manager */}
      <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <AlertsManager />
      </div>

      {/* Metric Builder Modal */}
      {showMetricBuilder && (
        <MetricBuilder 
          onClose={() => setShowMetricBuilder(false)}
          onMetricAdded={handleMetricAdded}
        />
      )}
    </div>
  );
};

export default AstroMetrics;
