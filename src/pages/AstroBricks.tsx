
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Boxes, 
  GitBranch, 
  Settings, 
  Clock, 
  Database, 
  Zap,
  Hospital,
  Table,
  BarChart3,
  ArrowRight
} from "lucide-react";
import { DataMappingCanvas } from "@/components/astro-bricks/DataMappingCanvas";
import { SchemaVisualization } from "@/components/astro-bricks/SchemaVisualization";
import { DataPipelineManager } from "@/components/astro-bricks/DataPipelineManager";
import { TransformationRulesEditor } from "@/components/astro-bricks/TransformationRulesEditor";
import { TimestampTools } from "@/components/astro-bricks/TimestampTools";
import BedManagementTable from "@/components/shared/BedManagementTable";
import { mockBedData } from "@/data/mockBedData";

const AstroBricks = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Boxes className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">ASTRO-BRICKS</h1>
            <span className="text-sm text-purple-400 font-medium">Data Modeling & Transformation</span>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Advanced data modeling platform with dimensional modeling, ETL pipelines, and real-time transformation capabilities for healthcare data warehousing.
          </p>
        </div>

        <Tabs defaultValue="modeling" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50">
            <TabsTrigger value="modeling" className="data-[state=active]:bg-purple-500/20">
              <Database className="h-4 w-4 mr-2" />
              Data Modeling
            </TabsTrigger>
            <TabsTrigger value="transformations" className="data-[state=active]:bg-blue-500/20">
              <GitBranch className="h-4 w-4 mr-2" />
              Transformations
            </TabsTrigger>
            <TabsTrigger value="pipelines" className="data-[state=active]:bg-green-500/20">
              <Zap className="h-4 w-4 mr-2" />
              Pipelines
            </TabsTrigger>
            <TabsTrigger value="mapping" className="data-[state=active]:bg-orange-500/20">
              <GitBranch className="h-4 w-4 mr-2" />
              Field Mapping
            </TabsTrigger>
            <TabsTrigger value="timestamps" className="data-[state=active]:bg-cyan-500/20">
              <Clock className="h-4 w-4 mr-2" />
              Timestamps
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modeling" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Database className="h-5 w-5 text-purple-400" />
                  Data Modeling Workspace
                </CardTitle>
                <CardDescription>
                  Design dimensional models with fact and dimension tables for healthcare analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SchemaVisualization />

                {/* Bed Management Data Model Example */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Hospital className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-foreground">Bed Management Data Model Example</h3>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Saudi Healthcare</Badge>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Dimensional model design for Saudi hospital bed management with cultural and regulatory considerations.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Table className="h-5 w-5 text-blue-400" />
                        Fact Tables
                      </h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
                          <div className="font-medium text-foreground mb-2">fact_bed_status</div>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• bed_id, hospital_id, department_id</li>
                            <li>• occupied_beds, available_beds</li>
                            <li>• occupancy_rate, turnover_time</li>
                            <li>• gender_segregation_flag</li>
                            <li>• moh_compliance_status</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
                          <div className="font-medium text-foreground mb-2">fact_patient_flow</div>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• patient_id, bed_id, admission_time</li>
                            <li>• discharge_time, length_of_stay</li>
                            <li>• acuity_level, cultural_preferences</li>
                            <li>• family_room_requested</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-green-400" />
                        Dimension Tables
                      </h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-muted/50 rounded-lg border border-green-500/20">
                          <div className="font-medium text-foreground mb-2">dim_hospital</div>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• hospital_id, hospital_name</li>
                            <li>• arabic_name, city, region</li>
                            <li>• hospital_type (MOH, Private, NGHA)</li>
                            <li>• seha_cluster, bed_capacity</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg border border-green-500/20">
                          <div className="font-medium text-foreground mb-2">dim_department</div>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• department_id, department_name</li>
                            <li>• arabic_name, specialty_type</li>
                            <li>• gender_segregated, family_rooms</li>
                            <li>• prayer_room_available</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-purple-400" />
                      <span className="text-sm font-medium text-foreground">Data Flow:</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Raw Bed Data</span>
                      <ArrowRight className="h-3 w-3" />
                      <span>Transformation</span>
                      <ArrowRight className="h-3 w-3" />
                      <span>Fact/Dim Tables</span>
                      <ArrowRight className="h-3 w-3" />
                      <span>Analytics</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <BedManagementTable data={mockBedData.slice(0, 2)} showArabicNames={true} showCompliance={true} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transformations" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-blue-400" />
                  Transformation Rules Engine
                </CardTitle>
                <CardDescription>
                  Define and manage data transformation rules with visual rule builder
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TransformationRulesEditor />

                {/* Bed Management Transformations Example */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Hospital className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-foreground">Bed Management Transformations Example</h3>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Saudi Data Rules</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Specialized transformation rules for Saudi healthcare data including cultural validations and MOH compliance.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Cultural Transformation Rules</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted/50 rounded-lg border border-blue-500/20">
                          <div className="font-medium text-foreground text-sm mb-1">Gender Segregation Validation</div>
                          <div className="text-xs text-muted-foreground">
                            IF patient_gender = 'M' THEN ward_type MUST = 'Male' OR 'Mixed_ICU'
                          </div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg border border-green-500/20">
                          <div className="font-medium text-foreground text-sm mb-1">Family Room Priority</div>
                          <div className="text-xs text-muted-foreground">
                            IF family_request = TRUE THEN assign_priority = HIGH
                          </div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg border border-purple-500/20">
                          <div className="font-medium text-foreground text-sm mb-1">Prayer Time Scheduling</div>
                          <div className="text-xs text-muted-foreground">
                            BLOCK procedures DURING prayer_times (Fajr, Dhuhr, Asr, Maghrib, Isha)
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Compliance Transformations</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted/50 rounded-lg border border-orange-500/20">
                          <div className="font-medium text-foreground text-sm mb-1">MOH Reporting Format</div>
                          <div className="text-xs text-muted-foreground">
                            CONVERT bed_status TO moh_format WITH arabic_translations
                          </div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg border border-red-500/20">
                          <div className="font-medium text-foreground text-sm mb-1">Occupancy Rate Calculation</div>
                          <div className="text-xs text-muted-foreground">
                            occupancy_rate = (occupied_beds / planned_beds) * 100
                          </div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg border border-cyan-500/20">
                          <div className="font-medium text-foreground text-sm mb-1">Hajj Season Adjustment</div>
                          <div className="text-xs text-muted-foreground">
                            IF location = 'Mecca' AND hajj_season = TRUE THEN capacity_multiplier = 1.5
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pipelines" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-400" />
                  Data Pipeline Management
                </CardTitle>
                <CardDescription>
                  Orchestrate complex ETL/ELT pipelines with dependency management and monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataPipelineManager />

                {/* Bed Management Pipeline Example */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Hospital className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-foreground">Bed Management Pipeline Example</h3>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Real-time ETL</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    End-to-end pipeline for processing bed management data from Saudi hospitals with real-time updates and compliance checks.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Database className="h-4 w-4 text-blue-400" />
                      </div>
                      <div className="font-medium text-foreground text-sm">Extract</div>
                      <div className="text-xs text-muted-foreground">HL7/HIS Sources</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <GitBranch className="h-4 w-4 text-purple-400" />
                      </div>
                      <div className="font-medium text-foreground text-sm">Transform</div>
                      <div className="text-xs text-muted-foreground">Cultural Rules</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Settings className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="font-medium text-foreground text-sm">Validate</div>
                      <div className="text-xs text-muted-foreground">MOH Compliance</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Zap className="h-4 w-4 text-orange-400" />
                      </div>
                      <div className="font-medium text-foreground text-sm">Load</div>
                      <div className="text-xs text-muted-foreground">Data Warehouse</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Zap className="h-4 w-4 mr-2" />
                      Run Pipeline
                    </Button>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure Schedule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mapping" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-orange-400" />
                  Field Mapping Canvas
                </CardTitle>
                <CardDescription>
                  Visual mapping interface for source-to-target field relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataMappingCanvas />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timestamps" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Clock className="h-5 w-5 text-cyan-400" />
                  Timestamp Management
                </CardTitle>
                <CardDescription>
                  Handle timezone conversions and temporal data transformations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TimestampTools />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AstroBricks;
