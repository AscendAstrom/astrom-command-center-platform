
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Database, Settings, Activity, Zap, AlertTriangle, CheckCircle, TrendingUp, Eye } from "lucide-react";
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
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Database className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">ASTRO-SCAN</h1>
            <span className="text-sm text-blue-400 font-medium">Data Ingestion & Source Management</span>
          </div>
          <p className="text-slate-400 max-w-2xl">
            Connect and manage data sources with automated ingestion pipelines and real-time monitoring capabilities.
          </p>
        </div>

        <Tabs defaultValue="sources" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
            <TabsTrigger value="sources" className="data-[state=active]:bg-blue-500/20">
              Data Sources
            </TabsTrigger>
            <TabsTrigger value="ingestion">
              Real-time Ingestion
            </TabsTrigger>
            <TabsTrigger value="monitoring">
              System Monitoring
            </TabsTrigger>
            <TabsTrigger value="configuration">
              Configuration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sources" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Database className="h-5 w-5 text-blue-400" />
                      Data Sources Manager
                    </CardTitle>
                    <CardDescription>
                      Manage and configure your data source connections
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setShowWizard(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Source
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <DataSourceList key={refreshTrigger} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ingestion" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-400" />
                  Real-time Ingestion Dashboard
                </CardTitle>
                <CardDescription>
                  Monitor live data ingestion streams and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <IngestionDashboard key={refreshTrigger} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  System Health Monitoring
                </CardTitle>
                <CardDescription>
                  Monitor system performance, health metrics, and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Active Sources</p>
                          <p className="text-3xl font-bold text-white">12</p>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-400" />
                            <p className="text-sm text-green-400 font-semibold">+2 this week</p>
                          </div>
                        </div>
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Database className="h-7 w-7 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Records/Hour</p>
                          <p className="text-3xl font-bold text-white">2.4K</p>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-400" />
                            <p className="text-sm text-green-400 font-semibold">+15% from last hour</p>
                          </div>
                        </div>
                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Activity className="h-7 w-7 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Health Score</p>
                          <p className="text-3xl font-bold text-white">98%</p>
                          <p className="text-sm text-blue-400 font-semibold">Excellent performance</p>
                        </div>
                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Zap className="h-7 w-7 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Pending Issues</p>
                          <p className="text-3xl font-bold text-white">2</p>
                          <p className="text-sm text-orange-400 font-semibold">Require attention</p>
                        </div>
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <AlertTriangle className="h-7 w-7 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-400" />
                  System Configuration
                </CardTitle>
                <CardDescription>
                  Configure system settings and data source parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-300">Configuration settings will be available here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Data Source Wizard Modal */}
        {showWizard && (
          <DataSourceWizard 
            onClose={() => setShowWizard(false)}
            onDataSourceAdded={handleDataSourceAdded}
          />
        )}
      </div>
    </div>
  );
};

export default AstroScan;
