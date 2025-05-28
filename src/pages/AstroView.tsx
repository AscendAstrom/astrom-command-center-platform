
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Monitor, Eye, TrendingUp, Activity, CheckCircle, BarChart3 } from "lucide-react";
import { DashboardBuilder } from "@/components/astro-view/DashboardBuilder";
import { DashboardManager } from "@/components/astro-view/DashboardManager";
import { RealtimeDashboard } from "@/components/astro-view/RealtimeDashboard";
import { SemanticLayerBuilder } from "@/components/astro-view/SemanticLayerBuilder";

const AstroView = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleDashboardAdded = () => {
    setShowBuilder(false);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-full animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 gradient-bg-blue rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg">
              <Monitor className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-astrom-blue via-astrom-purple to-astrom-blue bg-clip-text text-transparent font-display">
                ASTRO-VIEW
              </h1>
              <p className="text-xl text-muted-foreground font-medium mt-1">
                Visual Analytics & Dashboard Platform
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-status-success border-status-success bg-status-success/10 px-6 py-3 text-sm font-medium">
            <CheckCircle className="h-4 w-4 mr-2" />
            Dashboards Live
          </Badge>
          <Button 
            onClick={() => setShowBuilder(true)}
            className="gradient-bg-blue hover:shadow-xl hover-lift transition-all duration-300 px-8 py-4 text-base font-semibold"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Dashboard
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Dashboards</p>
                <p className="text-4xl font-bold text-foreground">12</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-status-success" />
                  <p className="text-sm text-status-success font-semibold">+2 this week</p>
                </div>
              </div>
              <div className="w-12 h-12 gradient-bg-blue rounded-xl flex items-center justify-center shadow-lg">
                <Monitor className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Views</p>
                <p className="text-4xl font-bold text-foreground">8.4K</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-status-success" />
                  <p className="text-sm text-status-success font-semibold">+24% this month</p>
                </div>
              </div>
              <div className="w-12 h-12 gradient-bg-green rounded-xl flex items-center justify-center shadow-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Real-time Widgets</p>
                <p className="text-4xl font-bold text-foreground">47</p>
                <p className="text-sm text-astrom-blue font-semibold">Live data streaming</p>
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
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Data Sources</p>
                <p className="text-4xl font-bold text-foreground">6</p>
                <p className="text-sm text-status-success font-semibold">All connected</p>
              </div>
              <div className="w-12 h-12 gradient-bg-purple rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Dashboard Manager */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <DashboardManager key={refreshTrigger} />
        </div>

        {/* Real-time Dashboard */}
        <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <RealtimeDashboard />
        </div>
      </div>

      {/* Semantic Layer Builder */}
      <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <SemanticLayerBuilder />
      </div>

      {/* Dashboard Builder Modal */}
      {showBuilder && (
        <DashboardBuilder 
          onClose={() => setShowBuilder(false)}
          onDashboardAdded={handleDashboardAdded}
        />
      )}
    </div>
  );
};

export default AstroView;
