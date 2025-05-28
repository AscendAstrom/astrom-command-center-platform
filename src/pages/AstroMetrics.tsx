
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Target, 
  Bell, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  Hospital,
  Activity,
  CheckCircle
} from "lucide-react";
import MetricBuilder from "@/components/astro-metrics/MetricBuilder";
import KPIDictionary from "@/components/astro-metrics/KPIDictionary";
import SLAConfiguration from "@/components/astro-metrics/SLAConfiguration";
import AlertsManager from "@/components/astro-metrics/AlertsManager";
import AccessControl from "@/components/astro-metrics/AccessControl";
import { useUserRole } from "@/components/astro-bricks/hooks/useUserRole";
import BedManagementTable from "@/components/shared/BedManagementTable";
import { mockBedData, mockKPIs } from "@/data/mockBedData";

const AstroMetrics = () => {
  const { userRole, isLoading } = useUserRole();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-12 bg-muted rounded"></div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">ASTRO-METRICS</h1>
            <span className="text-sm text-orange-400 font-medium">KPI Definition & Quality Management</span>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Comprehensive metrics platform for defining KPIs, managing SLAs, and ensuring data quality across healthcare operations with automated alerting and compliance tracking.
          </p>
        </div>

        <Tabs defaultValue="kpi-builder" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50">
            <TabsTrigger value="kpi-builder" className="data-[state=active]:bg-orange-500/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              KPI Builder
            </TabsTrigger>
            <TabsTrigger value="dictionary" className="data-[state=active]:bg-blue-500/20">
              <Target className="h-4 w-4 mr-2" />
              KPI Dictionary
            </TabsTrigger>
            <TabsTrigger value="sla-config" className="data-[state=active]:bg-green-500/20">
              <Target className="h-4 w-4 mr-2" />
              SLA Configuration
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-red-500/20">
              <Bell className="h-4 w-4 mr-2" />
              Alerts Manager
            </TabsTrigger>
            <TabsTrigger value="access" className="data-[state=active]:bg-purple-500/20">
              <Shield className="h-4 w-4 mr-2" />
              Access Control
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kpi-builder" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-orange-400" />
                  KPI Builder & Definition
                </CardTitle>
                <CardDescription>
                  Create and manage key performance indicators with automated calculation logic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MetricBuilder userRole={userRole} />

                {/* Bed Management KPIs Example */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Hospital className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-foreground">Bed Management KPIs Example</h3>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Saudi Healthcare</Badge>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Key performance indicators for Saudi hospital bed management with MOH compliance metrics.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                    {mockKPIs.map((kpi) => (
                      <div key={kpi.id} className="p-4 bg-muted/50 rounded-lg border border-border/50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-medium text-foreground text-sm">{kpi.name}</div>
                          <div className={`flex items-center gap-1 ${
                            kpi.trend === 'up' ? 'text-green-400' : 
                            kpi.trend === 'down' ? 'text-red-400' : 
                            'text-yellow-400'
                          }`}>
                            <TrendingUp className="h-3 w-3" />
                            <span className="text-xs">{kpi.trend}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Current:</span>
                            <span className="text-foreground font-medium">{kpi.value} {kpi.unit}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Target:</span>
                            <span className="text-foreground">{kpi.target} {kpi.unit}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Hospital:</span>
                            <span className="text-foreground text-xs">{kpi.hospital}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <BedManagementTable data={mockBedData.slice(0, 2)} showArabicNames={false} showCompliance={true} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dictionary" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-400" />
                  KPI Dictionary & Registry
                </CardTitle>
                <CardDescription>
                  Centralized repository of all defined KPIs with versioning and approval workflow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <KPIDictionary userRole={userRole} />

                {/* Bed Management Dictionary Example */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Hospital className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-foreground">Bed Management KPI Dictionary Example</h3>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">MOH Standard</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Standardized KPI definitions for Saudi healthcare bed management aligned with MOH requirements.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
                        <div className="font-medium text-foreground mb-2">Bed Occupancy Rate</div>
                        <div className="text-sm text-muted-foreground mb-2">
                          <strong>Formula:</strong> (Occupied Beds / Planned Beds) × 100
                        </div>
                        <div className="text-xs text-muted-foreground">
                          MOH Standard metric for hospital capacity utilization
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Badge variant="outline" className="text-xs">Active</Badge>
                          <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                            Approved
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-lg border border-purple-500/20">
                        <div className="font-medium text-foreground mb-2">Gender Compliance Rate</div>
                        <div className="text-sm text-muted-foreground mb-2">
                          <strong>Formula:</strong> (Compliant Assignments / Total Assignments) × 100
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Cultural compliance metric for gender-segregated wards
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Badge variant="outline" className="text-xs">Active</Badge>
                          <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                            Approved
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 bg-muted/50 rounded-lg border border-orange-500/20">
                        <div className="font-medium text-foreground mb-2">Average Length of Stay</div>
                        <div className="text-sm text-muted-foreground mb-2">
                          <strong>Formula:</strong> SUM(Discharge Date - Admission Date) / Patient Count
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Efficiency metric for patient flow optimization
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Badge variant="outline" className="text-xs">Active</Badge>
                          <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                            Approved
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-lg border border-red-500/20">
                        <div className="font-medium text-foreground mb-2">Hajj Surge Capacity</div>
                        <div className="text-sm text-muted-foreground mb-2">
                          <strong>Formula:</strong> (Peak Capacity - Normal Capacity) / Normal Capacity × 100
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Special metric for Mecca hospitals during Hajj season
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Badge variant="outline" className="text-xs">Active</Badge>
                          <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                            Seasonal
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sla-config" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-400" />
                  SLA Configuration & Monitoring
                </CardTitle>
                <CardDescription>
                  Define service level agreements with automated breach detection and escalation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SLAConfiguration userRole={userRole} />

                {/* Bed Management SLA Example */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Hospital className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-foreground">Bed Management SLA Example</h3>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">MOH Compliance</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Service level agreements for Saudi hospital bed management with automated monitoring and escalation.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg border border-green-500/20">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Activity className="h-4 w-4 text-green-400" />
                        Bed Assignment SLA
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Target:</span>
                          <span className="text-foreground">≤ 15 minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current:</span>
                          <span className="text-green-400">12 minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Met
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg border border-yellow-500/20">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        Discharge Planning SLA
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Target:</span>
                          <span className="text-foreground">≤ 2 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current:</span>
                          <span className="text-yellow-400">2.3 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-xs">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Warning
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-400" />
                        Occupancy Rate SLA
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Target:</span>
                          <span className="text-foreground">≤ 85%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current:</span>
                          <span className="text-green-400">78%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Met
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Bell className="h-5 w-5 text-red-400" />
                  Alerts & Notification Management
                </CardTitle>
                <CardDescription>
                  Configure and manage automated alerts with escalation rules and notification channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertsManager userRole={userRole} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="access" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-400" />
                  Access Control & Permissions
                </CardTitle>
                <CardDescription>
                  Manage user roles and permissions for metrics access and data governance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AccessControl userRole={userRole} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AstroMetrics;
