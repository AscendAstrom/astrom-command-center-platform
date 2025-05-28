
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Radar, 
  Database, 
  FileSearch, 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Hospital,
  Wifi,
  Server
} from "lucide-react";
import { DataSourceList } from "@/components/astro-scan/DataSourceList";
import { DataSourceWizard } from "@/components/astro-scan/DataSourceWizard";
import { IngestionDashboard } from "@/components/astro-scan/IngestionDashboard";
import BedManagementTable from "@/components/shared/BedManagementTable";
import { mockBedData, mockDataSources } from "@/data/mockBedData";

const AstroScan = () => {
  const [activeWizard, setActiveWizard] = useState(false);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Radar className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">ASTRO-SCAN</h1>
            <span className="text-sm text-blue-400 font-medium">Data Source Discovery & Ingestion</span>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Intelligent data source discovery, automated ingestion pipelines, and real-time monitoring for healthcare data integration.
          </p>
        </div>

        <Tabs defaultValue="sources" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="sources" className="data-[state=active]:bg-blue-500/20">
              <Database className="h-4 w-4 mr-2" />
              Data Sources
            </TabsTrigger>
            <TabsTrigger value="ingestion" className="data-[state=active]:bg-green-500/20">
              <Activity className="h-4 w-4 mr-2" />
              Ingestion
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-purple-500/20">
              <FileSearch className="h-4 w-4 mr-2" />
              Monitoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sources" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-400" />
                  Data Source Management
                </CardTitle>
                <CardDescription>
                  Configure and monitor healthcare data sources including HL7, EMS, HIS, and ETOC systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataSourceList />
                
                {/* Bed Management Data Sources Example */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Hospital className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-foreground">Saudi Hospital Data Sources Example</h3>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Live Demo</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Real-time bed management data feeds from major Saudi healthcare facilities.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                    {mockDataSources.map((source) => (
                      <div key={source.id} className="p-4 bg-muted/50 rounded-lg border border-border/50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${source.status === 'active' ? 'bg-green-400' : 'bg-red-400'}`} />
                            <span className="font-medium text-foreground">{source.name}</span>
                          </div>
                          <Badge variant={source.status === 'active' ? 'default' : 'destructive'}>
                            {source.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Hospital:</span>
                            <span className="text-foreground">{source.hospital}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Type:</span>
                            <span className="text-foreground">{source.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Records/Hour:</span>
                            <span className="text-foreground">{source.recordsPerHour.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Last Sync:</span>
                            <span className="text-foreground">
                              {new Date(source.lastSync).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Wifi className="h-4 w-4 mr-2" />
                      Test All Connections
                    </Button>
                    <Button variant="outline">
                      <Server className="h-4 w-4 mr-2" />
                      Configure Sources
                    </Button>
                  </div>
                </div>

                <div className="mt-6">
                  <Button 
                    onClick={() => setActiveWizard(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Database className="h-4 w-4 mr-2" />
                    Add New Data Source
                  </Button>
                </div>
              </CardContent>
            </Card>

            {activeWizard && (
              <DataSourceWizard onClose={() => setActiveWizard(false)} />
            )}
          </TabsContent>

          <TabsContent value="ingestion" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-400" />
                  Data Ingestion Pipeline
                </CardTitle>
                <CardDescription>
                  Real-time data ingestion with automated quality checks and transformation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <IngestionDashboard />

                {/* Bed Management Ingestion Example */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Hospital className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-foreground">Bed Management Ingestion Example</h3>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Real-time Stream</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Live ingestion of bed status data from Saudi hospitals with automated validation and enrichment.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">98.5%</div>
                      <div className="text-sm text-muted-foreground">Data Quality Score</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">1,247</div>
                      <div className="text-sm text-muted-foreground">Records/Hour</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-400">15ms</div>
                      <div className="text-sm text-muted-foreground">Avg Latency</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-400">99.9%</div>
                      <div className="text-sm text-muted-foreground">Uptime</div>
                    </div>
                  </div>

                  <BedManagementTable data={mockBedData.slice(0, 2)} showArabicNames={false} showCompliance={false} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <FileSearch className="h-5 w-5 text-purple-400" />
                  Data Quality Monitoring
                </CardTitle>
                <CardDescription>
                  Continuous monitoring of data quality, completeness, and consistency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Quality Metrics</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Data Completeness</span>
                        <span className="text-sm font-medium text-foreground">97.8%</span>
                      </div>
                      <Progress value={97.8} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Schema Validation</span>
                        <span className="text-sm font-medium text-foreground">99.2%</span>
                      </div>
                      <Progress value={99.2} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Timeliness</span>
                        <span className="text-sm font-medium text-foreground">95.1%</span>
                      </div>
                      <Progress value={95.1} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">Late Data Detection</div>
                          <div className="text-xs text-muted-foreground">ICU data delayed by 15 minutes</div>
                        </div>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">Quality Check Passed</div>
                          <div className="text-xs text-muted-foreground">All bed status records validated</div>
                        </div>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bed Management Monitoring Example */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Hospital className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-foreground">Bed Management Monitoring Example</h3>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Saudi Healthcare</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Specialized monitoring for bed management data quality including MOH compliance checks and cultural validation.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg border border-green-500/20">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        MOH Compliance
                      </h4>
                      <div className="text-2xl font-bold text-green-400 mb-1">100%</div>
                      <p className="text-sm text-muted-foreground">All reports submitted on time</p>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-400" />
                        Gender Segregation
                      </h4>
                      <div className="text-2xl font-bold text-blue-400 mb-1">Valid</div>
                      <p className="text-sm text-muted-foreground">All assignments comply</p>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg border border-purple-500/20">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Database className="h-4 w-4 text-purple-400" />
                        Data Freshness
                      </h4>
                      <div className="text-2xl font-bold text-purple-400 mb-1">&lt; 2min</div>
                      <p className="text-sm text-muted-foreground">Real-time updates</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AstroScan;
