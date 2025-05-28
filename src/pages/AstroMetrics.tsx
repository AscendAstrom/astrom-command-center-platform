import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  BarChart3, 
  Shield, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  CheckCircle,
  Workflow,
  Activity,
  FileText,
  Hospital
} from "lucide-react";
import MetricBuilder from "@/components/astro-metrics/MetricBuilder";
import SLAConfiguration from "@/components/astro-metrics/SLAConfiguration";
import KPIDictionary from "@/components/astro-metrics/KPIDictionary";
import AlertsManager from "@/components/astro-metrics/AlertsManager";
import AccessControl from "@/components/astro-metrics/AccessControl";
import BedManagementTable from "@/components/shared/BedManagementTable";
import { useUserRole } from "@/components/astro-bricks/hooks/useUserRole";
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

  // Default to ANALYST if userRole is null
  const effectiveUserRole = userRole || 'ANALYST';

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">ASTRO-METRICS</h1>
            <span className="text-sm text-green-400 font-medium">KPI Definition & Quality Assurance</span>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Define key performance indicators, configure SLA rules, and ensure data quality compliance for healthcare analytics.
          </p>
        </div>

        <Tabs defaultValue="workflow" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-muted/50">
            <TabsTrigger value="workflow" className="data-[state=active]:bg-green-500/20">
              <Workflow className="h-4 w-4 mr-2" />
              Quality & KPI Workflow
            </TabsTrigger>
            <TabsTrigger value="bedkpis" className="data-[state=active]:bg-blue-500/20">
              <Hospital className="h-4 w-4 mr-2" />
              Bed Management KPIs
            </TabsTrigger>
            <TabsTrigger value="metrics">Metric Builder</TabsTrigger>
            <TabsTrigger value="sla">SLA Configuration</TabsTrigger>
            <TabsTrigger value="kpi">KPI Dictionary</TabsTrigger>
            <TabsTrigger value="alerts">Alert Management</TabsTrigger>
            <TabsTrigger value="governance">Data Governance</TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-400" />
                  Quality Checks & KPI Definition Workflow
                </CardTitle>
                <CardDescription>
                  End-to-end workflow for validating SLA rules, configuring performance metrics, and enforcing governance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">SLA Validation & Rules</h3>
                    <p className="text-muted-foreground">
                      Validate service level agreement rules, configure metrics like average wait time and breach count, 
                      and enforce governance rules for data quality and compliance across all healthcare operations.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">Average Wait Time</p>
                          <p className="text-muted-foreground text-sm">Patient waiting time KPIs</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">SLA Breach Count</p>
                          <p className="text-muted-foreground text-sm">Service level violations tracking</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">Performance Trends</p>
                          <p className="text-muted-foreground text-sm">Historical performance analysis</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">Compliance Metrics</p>
                          <p className="text-muted-foreground text-sm">Regulatory compliance tracking</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Data Governance & Quality</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted/50 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="text-foreground font-medium">Quality Assurance</span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Automated data quality checks, completeness validation, and accuracy monitoring
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-blue-400" />
                          <span className="text-foreground font-medium">Compliance Rules</span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          HIPAA, HL7, and healthcare-specific compliance rule enforcement
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="h-5 w-5 text-purple-400" />
                          <span className="text-foreground font-medium">Real-time Monitoring</span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Live monitoring of KPI performance and automated alert generation
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Target className="h-4 w-4 mr-2" />
                        Define New KPI
                      </Button>
                      <Button variant="outline" className="w-full">
                        Configure SLA Rules
                      </Button>
                      <Button variant="outline" className="w-full">
                        Quality Dashboard
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bedkpis" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Hospital className="h-5 w-5 text-blue-400" />
                  Bed Management KPI Dashboard - Saudi Hospitals
                </CardTitle>
                <CardDescription>
                  Comprehensive bed management performance indicators with MOH compliance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                  {mockKPIs.map((kpi) => (
                    <div key={kpi.id} className="p-4 bg-muted/50 rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground text-sm">{kpi.name}</h4>
                        <Badge variant={kpi.trend === 'up' ? 'default' : kpi.trend === 'down' ? 'destructive' : 'secondary'}>
                          {kpi.trend === 'up' ? '↗' : kpi.trend === 'down' ? '↘' : '→'}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-foreground">{kpi.value}</span>
                          <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Target: {kpi.target}{kpi.unit}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {kpi.hospital} - {kpi.department}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Current Bed Status & Performance</h3>
                    <BedManagementTable data={mockBedData} showArabicNames={true} showCompliance={true} />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">SLA & Quality Metrics</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <Clock className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-foreground font-medium">Average Bed Turnover</p>
                            <p className="text-muted-foreground text-sm">Target: ≤ 4 hours</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-foreground">3.8h</p>
                            <Badge variant="default" className="text-xs">On Target</Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                            <BarChart3 className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-foreground font-medium">Occupancy Rate</p>
                            <p className="text-muted-foreground text-sm">Target: 85-90%</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-foreground">91%</p>
                            <Badge variant="secondary" className="text-xs">Above Target</Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-foreground font-medium">Discharge Efficiency</p>
                            <p className="text-muted-foreground text-sm">Target: ≥ 90%</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-foreground">94%</p>
                            <Badge variant="default" className="text-xs">Excellent</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">MOH Compliance & Governance</h3>
                      <div className="space-y-3">
                        <div className="p-4 bg-muted/50 rounded-lg border border-green-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                            <span className="text-foreground font-medium">MOH Bed Reporting</span>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            All facilities reporting hourly bed status to Ministry of Health dashboard
                          </p>
                          <Badge variant="default" className="mt-2">100% Compliant</Badge>
                        </div>
                        
                        <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-5 w-5 text-blue-400" />
                            <span className="text-foreground font-medium">Data Privacy (PDPL)</span>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            Patient data anonymization and PDPL compliance validation
                          </p>
                          <Badge variant="default" className="mt-2">Validated</Badge>
                        </div>
                        
                        <div className="p-4 bg-muted/50 rounded-lg border border-purple-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Activity className="h-5 w-5 text-purple-400" />
                            <span className="text-foreground font-medium">Hajj Preparedness</span>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            Surge capacity metrics for Hajj season (Mecca hospitals)
                          </p>
                          <Badge variant="secondary" className="mt-2">Ready</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Target className="h-4 w-4 mr-2" />
                      Generate MOH Compliance Report
                    </Button>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" className="w-full">
                        Configure Bed KPIs
                      </Button>
                      <Button variant="outline" className="w-full">
                        Set Alert Thresholds
                      </Button>
                      <Button variant="outline" className="w-full">
                        Export to MOH
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-400" />
                  Metric Builder
                </CardTitle>
                <CardDescription>
                  Create and configure custom healthcare performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MetricBuilder userRole={effectiveUserRole} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sla" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-400" />
                  SLA Configuration
                </CardTitle>
                <CardDescription>
                  Define and manage service level agreements for healthcare operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SLAConfiguration userRole={effectiveUserRole} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kpi" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-400" />
                  KPI Dictionary
                </CardTitle>
                <CardDescription>
                  Centralized repository of key performance indicators and their definitions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <KPIDictionary userRole={effectiveUserRole} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-green-400" />
                  Alert Management
                </CardTitle>
                <CardDescription>
                  Configure and manage performance alerts and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertsManager userRole={effectiveUserRole} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  Data Governance & Access Control
                </CardTitle>
                <CardDescription>
                  Manage data access permissions and governance policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AccessControl userRole={effectiveUserRole} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AstroMetrics;
