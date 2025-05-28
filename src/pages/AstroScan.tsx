
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Database, Settings, Activity, Zap, AlertTriangle, CheckCircle } from "lucide-react";
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
    <div className="p-6 space-y-6 bg-background min-h-full">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-astrom-blue to-astrom-blue-dark rounded-xl flex items-center justify-center">
              <Database className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">ASTRO-SCAN</h1>
              <p className="text-muted-foreground">Healthcare Data Ingestion & Source Management</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-status-success border-status-success">
            <CheckCircle className="h-3 w-3 mr-1" />
            All Systems Operational
          </Badge>
          <Button 
            onClick={() => setShowWizard(true)}
            className="bg-gradient-to-r from-astrom-blue to-astrom-blue-dark hover:from-astrom-blue-dark hover:to-astrom-blue shadow-lg transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Data Source
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="surface-elevated border-border hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Active Sources</p>
                <p className="text-3xl font-bold text-foreground">12</p>
                <p className="text-xs text-status-success">+2 this week</p>
              </div>
              <div className="w-12 h-12 bg-astrom-blue/10 rounded-xl flex items-center justify-center">
                <Database className="h-6 w-6 text-astrom-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Records/Hour</p>
                <p className="text-3xl font-bold text-foreground">2.4K</p>
                <p className="text-xs text-status-success">+15% from last hour</p>
              </div>
              <div className="w-12 h-12 bg-astrom-green/10 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-astrom-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Health Score</p>
                <p className="text-3xl font-bold text-foreground">98%</p>
                <p className="text-xs text-status-info">Excellent performance</p>
              </div>
              <div className="w-12 h-12 bg-astrom-green/10 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-astrom-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Pending Issues</p>
                <p className="text-3xl font-bold text-foreground">2</p>
                <p className="text-xs text-status-warning">Require attention</p>
              </div>
              <div className="w-12 h-12 bg-astrom-orange/10 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-astrom-orange" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Ingestion Dashboard */}
      <IngestionDashboard key={refreshTrigger} />

      {/* Data Sources List */}
      <DataSourceList key={refreshTrigger} />

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
