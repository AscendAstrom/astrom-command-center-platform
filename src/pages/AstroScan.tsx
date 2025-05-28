
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
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 gradient-bg-blue rounded-2xl flex items-center justify-center animate-pulse-glow">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-astrom-blue to-astrom-purple bg-clip-text text-transparent">
                ASTRO-SCAN
              </h1>
              <p className="text-muted-foreground text-lg">Healthcare Data Ingestion & Source Management</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-status-success border-status-success bg-status-success/10 px-4 py-2">
            <CheckCircle className="h-4 w-4 mr-2" />
            All Systems Operational
          </Badge>
          <Button 
            onClick={() => setShowWizard(true)}
            className="gradient-bg-blue hover:shadow-lg hover-lift transition-all duration-300 px-6 py-3"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Data Source
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Active Sources</p>
                <p className="text-3xl font-bold text-foreground">12</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-status-success" />
                  <p className="text-xs text-status-success font-medium">+2 this week</p>
                </div>
              </div>
              <div className="w-14 h-14 gradient-bg-blue rounded-2xl flex items-center justify-center">
                <Database className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Records/Hour</p>
                <p className="text-3xl font-bold text-foreground">2.4K</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-status-success" />
                  <p className="text-xs text-status-success font-medium">+15% from last hour</p>
                </div>
              </div>
              <div className="w-14 h-14 gradient-bg-green rounded-2xl flex items-center justify-center">
                <Activity className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Health Score</p>
                <p className="text-3xl font-bold text-foreground">98%</p>
                <p className="text-xs text-astrom-blue font-medium">Excellent performance</p>
              </div>
              <div className="w-14 h-14 gradient-bg-green rounded-2xl flex items-center justify-center">
                <Zap className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Pending Issues</p>
                <p className="text-3xl font-bold text-foreground">2</p>
                <p className="text-xs text-status-warning font-medium">Require attention</p>
              </div>
              <div className="w-14 h-14 gradient-bg-orange rounded-2xl flex items-center justify-center">
                <AlertTriangle className="h-7 w-7 text-white" />
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
