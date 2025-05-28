import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Database, Settings, Activity, Zap, AlertTriangle, CheckCircle, TrendingUp, Eye, Workflow, Hospital } from "lucide-react";
import { DataSourceWizard } from "@/components/astro-scan/DataSourceWizard";
import { IngestionDashboard } from "@/components/astro-scan/IngestionDashboard";
import { DataSourceList } from "@/components/astro-scan/DataSourceList";
import BedManagementTable from "@/components/shared/BedManagementTable";
import { mockBedData, mockDataSources } from "@/data/mockBedData";

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

        <Tabs defaultValue="workflow" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50">
            <TabsTrigger value="workflow" className="data-[state=active]:bg-cyan-500/20">
              <Workflow className="h-4 w-4 mr-2" />
              Source Mapping Workflow
            </TabsTrigger>
            <TabsTrigger value="bedmgmt" className="data-[state=active]:bg-green-500/20">
              <Hospital className="h-4 w-4 mr-2" />
              Bed Management Demo
            </TabsTrigger>
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

          <TabsContent value="workflow" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-cyan-400" />
                  Source Mapping + Ingestion Setup Workflow
                </CardTitle>
                <CardDescription>
                  End-to-end workflow for mapping and configuring EMS, ETOC, HL7, and triage data sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Data Source Configuration</h3>
                    <p className="text-slate-300">
                      Map and configure healthcare data sources including EMS feeds, ETOC systems, HL7 gateways, and triage platforms. 
                      Choose between real-time streaming and batch processing modes, preview schemas, and validate data quality.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Database className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">EMS Data Feeds</p>
                          <p className="text-slate-400 text-sm">Emergency Medical Services real-time data</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <Activity className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">ETOC Systems</p>
                          <p className="text-slate-400 text-sm">Emergency Department Operations Center</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Zap className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">HL7 Gateway</p>
                          <p className="text-slate-400 text-sm">Health Level 7 message processing</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                          <Eye className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Triage Platforms</p>
                          <p className="text-slate-400 text-sm">Patient triage and prioritization systems</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Ingestion Modes & Processing</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-slate-800/50 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="text-white font-medium">Real-time Streaming</span>
                        </div>
                        <p className="text-slate-300 text-sm">
                          Live data ingestion with sub-second latency for critical healthcare operations
                        </p>
                      </div>
                      
                      <div className="p-4 bg-slate-800/50 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Database className="h-5 w-5 text-blue-400" />
                          <span className="text-white font-medium">Batch Processing</span>
                        </div>
                        <p className="text-slate-300 text-sm">
                          Scheduled bulk data processing for historical analysis and reporting
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        onClick={() => setShowWizard(true)}
                        className="w-full bg-cyan-600 hover:bg-cyan-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Configure New Source
                      </Button>
                      <Button variant="outline" className="w-full border-slate-600 text-slate-200 hover:bg-slate-800">
                        Preview Schema Mapping
                      </Button>
                      <Button variant="outline" className="w-full border-slate-600 text-slate-200 hover:bg-slate-800">
                        Validate Data Quality
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bedmgmt" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Hospital className="h-5 w-5 text-green-400" />
                  Saudi Hospital Bed Management - Data Source Mapping
                </CardTitle>
                <CardDescription>
                  Live demonstration of bed management data ingestion from Saudi healthcare facilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {mockDataSources.map((source) => (
                    <div key={source.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{source.name}</h4>
                        <Badge variant={source.status === 'active' ? 'default' : 'destructive'}>
                          {source.status}
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-sm mb-2">{source.hospital}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="text-blue-400 border-blue-400">
                          {source.type}
                        </Badge>
                        <span className="text-slate-300">{source.recordsPerHour}/hr</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-800/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Real-time Bed Status Data</h3>
                  <BedManagementTable data={mockBedData} showArabicNames={true} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Data Source Configuration</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Database className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">HL7 FHIR Gateway</p>
                          <p className="text-slate-400 text-sm">Real-time bed status messages</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <Activity className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Hospital Information System</p>
                          <p className="text-slate-400 text-sm">Patient admissions and discharges</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Zap className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">EMS Integration</p>
                          <p className="text-slate-400 text-sm">Emergency department arrivals</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Saudi Healthcare Context</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-800/50 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-white font-medium">MOH Compliance</span>
                        </div>
                        <p className="text-slate-300 text-sm">Ministry of Health reporting standards</p>
                      </div>
                      
                      <div className="p-3 bg-slate-800/50 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Database className="h-4 w-4 text-blue-400" />
                          <span className="text-white font-medium">Seha Cluster Integration</span>
                        </div>
                        <p className="text-slate-300 text-sm">Regional health cluster data sharing</p>
                      </div>
                      
                      <div className="p-3 bg-slate-800/50 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="h-4 w-4 text-purple-400" />
                          <span className="text-white font-medium">Hajj Season Preparation</span>
                        </div>
                        <p className="text-slate-300 text-sm">Surge capacity planning and monitoring</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={() => setShowWizard(true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Bed Management Source
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800">
                    Simulate Data Flow
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800">
                    Export Schema
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
