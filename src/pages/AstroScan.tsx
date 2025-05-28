
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Scan, 
  Database, 
  Activity, 
  Settings, 
  Hospital,
  Plus,
  ArrowRight
} from "lucide-react";
import DataSourceList from "@/components/astro-scan/DataSourceList";
import { DataSourceWizard } from "@/components/astro-scan/DataSourceWizard";
import IngestionDashboard from "@/components/astro-scan/IngestionDashboard";
import BedManagementTable from "@/components/shared/BedManagementTable";
import { mockBedData } from "@/data/mockBedData";

const AstroScan = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handleDataSourceAdded = () => {
    setIsWizardOpen(false);
    // Refresh data sources list
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Scan className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">ASTRO-SCAN</h1>
            <span className="text-sm text-blue-400 font-medium">Data Ingestion & Sources</span>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Comprehensive data ingestion platform with real-time monitoring, automated validation, and intelligent source management for healthcare data systems.
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
              <Settings className="h-4 w-4 mr-2" />
              Monitoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sources" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <Database className="h-5 w-5 text-blue-400" />
                      Connected Data Sources
                    </CardTitle>
                    <CardDescription>
                      Manage and configure healthcare data sources with automated discovery
                    </CardDescription>
                  </div>
                  <Button onClick={() => setIsWizardOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Source
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <DataSourceList />

                {/* Bed Management Data Sources Example */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Hospital className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-foreground">Saudi Hospital Bed Management Sources</h3>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Live Demo</Badge>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Real-time data sources from major Saudi hospitals including KAMC, KFSH, and regional MOH facilities.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="font-medium text-foreground text-sm">KAMC Riyadh</span>
                      </div>
                      <div className="text-xs text-muted-foreground">HL7 FHIR • Real-time • 450 beds</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="font-medium text-foreground text-sm">KFSH Dammam</span>
                      </div>
                      <div className="text-xs text-muted-foreground">REST API • 15min sync • 320 beds</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span className="font-medium text-foreground text-sm">MOH Jeddah</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Database • Hourly • 280 beds</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border/50 mb-4">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium text-foreground">Data Flow:</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Hospital HIS</span>
                      <ArrowRight className="h-3 w-3" />
                      <span>ASTRO-SCAN</span>
                      <ArrowRight className="h-3 w-3" />
                      <span>Data Warehouse</span>
                    </div>
                  </div>

                  <BedManagementTable data={mockBedData.slice(0, 3)} showArabicNames={true} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ingestion" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-400" />
                  Data Ingestion Dashboard
                </CardTitle>
                <CardDescription>
                  Monitor real-time data ingestion with quality metrics and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <IngestionDashboard />

                {/* Bed Management Ingestion Example */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Hospital className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-foreground">Real-time Bed Status Ingestion</h3>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Live Pipeline</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Continuous ingestion of bed occupancy, patient flow, and compliance data from Saudi healthcare facilities.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="p-3 bg-muted/50 rounded-lg text-center">
                      <div className="text-lg font-bold text-green-400">98.7%</div>
                      <div className="text-xs text-muted-foreground">Data Quality</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-center">
                      <div className="text-lg font-bold text-blue-400">2.3s</div>
                      <div className="text-xs text-muted-foreground">Avg Latency</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-center">
                      <div className="text-lg font-bold text-purple-400">1,250</div>
                      <div className="text-xs text-muted-foreground">Records/min</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-center">
                      <div className="text-lg font-bold text-orange-400">99.9%</div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                    </div>
                  </div>

                  <BedManagementTable data={mockBedData.slice(3, 5)} showCompliance={true} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-400" />
                  Source Monitoring & Alerts
                </CardTitle>
                <CardDescription>
                  Configure monitoring rules and automated alerts for data sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Active Monitors</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted/50 rounded-lg border border-green-500/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">Data Freshness</span>
                          <Badge className="bg-green-500/10 text-green-600">Active</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Alert if data > 15 minutes old</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">Quality Threshold</span>
                          <Badge className="bg-blue-500/10 text-blue-600">Active</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Alert if quality < 95%</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted/50 rounded-lg border border-orange-500/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground text-sm">KFSH Connection</span>
                          <span className="text-xs text-muted-foreground">2m ago</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Temporary connection timeout - Auto-resolved</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bed Management Monitoring Example */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Hospital className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-foreground">Bed Management Monitoring Rules</h3>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Cultural Compliance</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Specialized monitoring for Saudi healthcare requirements including gender segregation compliance and MOH reporting standards.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Cultural Compliance Monitors</h4>
                      <div className="p-3 bg-muted/50 rounded-lg border border-blue-500/20">
                        <div className="font-medium text-foreground text-sm mb-1">Gender Segregation Check</div>
                        <div className="text-xs text-muted-foreground">
                          Alerts on mixed-gender ward assignments outside ICU
                        </div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg border border-green-500/20">
                        <div className="font-medium text-foreground text-sm mb-1">Family Room Availability</div>
                        <div className="text-xs text-muted-foreground">
                          Monitors family room requests vs availability
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Regulatory Compliance</h4>
                      <div className="p-3 bg-muted/50 rounded-lg border border-orange-500/20">
                        <div className="font-medium text-foreground text-sm mb-1">MOH Reporting Deadline</div>
                        <div className="text-xs text-muted-foreground">
                          Daily reporting requirements to Ministry of Health
                        </div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg border border-purple-500/20">
                        <div className="font-medium text-foreground text-sm mb-1">Capacity Utilization</div>
                        <div className="text-xs text-muted-foreground">
                          Alerts on overcapacity or underutilization
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {isWizardOpen && (
        <DataSourceWizard 
          onClose={() => setIsWizardOpen(false)}
          onDataSourceAdded={handleDataSourceAdded}
        />
      )}
    </div>
  );
};

export default AstroScan;
