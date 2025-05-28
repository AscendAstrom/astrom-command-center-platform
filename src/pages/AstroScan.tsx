
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Database, Settings, Activity, Zap, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { DataSourceWizard } from "@/components/astro-scan/DataSourceWizard";
import { IngestionDashboard } from "@/components/astro-scan/IngestionDashboard";
import { DataSourceList } from "@/components/astro-scan/DataSourceList";

const AstroScan = () => {
  const [showWizard, setShowWizard] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleDataSourceAdded = () => {
    setShowWizard(false);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-full animate-fade-in">
      {/* Header Section - Enhanced */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 gradient-bg-blue rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg">
              <Database className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-astrom-blue via-astrom-purple to-astrom-blue bg-clip-text text-transparent font-display">
                ASTRO-SCAN
              </h1>
              <p className="text-muted-foreground text-xl font-medium mt-1">
                Healthcare Data Ingestion & Source Management
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-status-success border-status-success bg-status-success/10 px-6 py-3 text-sm font-medium">
            <CheckCircle className="h-4 w-4 mr-2" />
            All Systems Operational
          </Badge>
          <Button 
            onClick={() => setShowWizard(true)}
            className="gradient-bg-blue hover:shadow-xl hover-lift transition-all duration-300 px-8 py-4 text-base font-semibold"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Data Source
          </Button>
        </div>
      </div>

      {/* Overview Stats - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Sources</p>
                <p className="text-4xl font-bold text-foreground">12</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-status-success" />
                  <p className="text-sm text-status-success font-semibold">+2 this week</p>
                </div>
              </div>
              <div className="w-16 h-16 gradient-bg-blue rounded-2xl flex items-center justify-center shadow-lg">
                <Database className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Records/Hour</p>
                <p className="text-4xl font-bold text-foreground">2.4K</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-status-success" />
                  <p className="text-sm text-status-success font-semibold">+15% from last hour</p>
                </div>
              </div>
              <div className="w-16 h-16 gradient-bg-green rounded-2xl flex items-center justify-center shadow-lg">
                <Activity className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Health Score</p>
                <p className="text-4xl font-bold text-foreground">98%</p>
                <p className="text-sm text-astrom-blue font-semibold">Excellent performance</p>
              </div>
              <div className="w-16 h-16 gradient-bg-green rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Pending Issues</p>
                <p className="text-4xl font-bold text-foreground">2</p>
                <p className="text-sm text-status-warning font-semibold">Require attention</p>
              </div>
              <div className="w-16 h-16 gradient-bg-orange rounded-2xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Ingestion Dashboard */}
      <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <IngestionDashboard key={refreshTrigger} />
      </div>

      {/* Data Sources List */}
      <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <DataSourceList key={refreshTrigger} />
      </div>

      {/* Data Source Wizard Modal */}
      {showWizard && (
        <DataSourceWizard 
          onClose={() => setShowWizard(false)}
          onDataSourceAdded={handleDataSourceAdded}
        />
      )}
    </div>
  );
};

export default AstroScan;
