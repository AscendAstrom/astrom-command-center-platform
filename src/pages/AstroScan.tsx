
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Database, Settings, Activity } from "lucide-react";
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
    <div className="p-6 space-y-6 bg-slate-950 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">ASTRO-SCAN</h1>
          <p className="text-slate-400">Healthcare Data Ingestion & Source Management</p>
        </div>
        <Button 
          onClick={() => setShowWizard(true)}
          className="bg-cyan-600 hover:bg-cyan-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Data Source
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-cyan-400" />
              <div>
                <p className="text-sm text-slate-400">Active Sources</p>
                <p className="text-xl font-bold text-white">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-slate-400">Records/Hour</p>
                <p className="text-xl font-bold text-white">2.4K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm text-slate-400">Health Score</p>
                <p className="text-xl font-bold text-white">98%</p>
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
