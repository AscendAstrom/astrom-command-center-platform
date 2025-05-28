import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Layers, 
  Database, 
  Code, 
  GitBranch, 
  Clock, 
  Users, 
  Settings,
  Workflow,
  Wrench,
  Table,
  Boxes
} from "lucide-react";
import { DataMappingCanvas } from "@/components/astro-bricks/DataMappingCanvas";
import { SchemaVisualization } from "@/components/astro-bricks/SchemaVisualization";
import { TransformationRulesEditor } from "@/components/astro-bricks/TransformationRulesEditor";
import { TimestampTools } from "@/components/astro-bricks/TimestampTools";
import { DataPipelineManager } from "@/components/astro-bricks/DataPipelineManager";

const AstroBricks = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">ASTRO-BRICKS</h1>
            <span className="text-sm text-orange-400 font-medium">Data Modeling & Transformation</span>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Build and manage data models, transformations, and dimensional structures for healthcare analytics.
          </p>
        </div>

        <Tabs defaultValue="workflow" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted/50">
            <TabsTrigger value="workflow" className="data-[state=active]:bg-orange-500/20">
              <Workflow className="h-4 w-4 mr-2" />
              Modeling Workflow
            </TabsTrigger>
            <TabsTrigger value="mapping">Data Mapping</TabsTrigger>
            <TabsTrigger value="schema">Schema Design</TabsTrigger>
            <TabsTrigger value="transformation">Transformations</TabsTrigger>
            <TabsTrigger value="timestamp">Timestamp Tools</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline Management</TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-orange-400" />
                  Normalization, Modeling & Transformation Workflow
                </CardTitle>
                <CardDescription>
                  End-to-end workflow for cleaning, unifying data formats, and defining dimensional models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Data Normalization & Cleaning</h3>
                    <p className="text-muted-foreground">
                      Clean and unify data formats from multiple healthcare systems. Standardize field names, 
                      data types, and apply business rules for consistent data quality across all sources.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Database className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">Data Quality Rules</p>
                          <p className="text-muted-foreground text-sm">Validation and cleansing rules</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <Code className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">Field Standardization</p>
                          <p className="text-muted-foreground text-sm">Normalize field names and formats</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                          <GitBranch className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">Business Logic</p>
                          <p className="text-muted-foreground text-sm">Apply healthcare-specific rules</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Dimensional Modeling</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted/50 rounded-lg border border-orange-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Table className="h-5 w-5 text-orange-400" />
                          <span className="text-foreground font-medium">Fact Tables</span>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>• <code className="bg-background px-1 rounded">fact_ed_inbound</code> - Emergency department arrivals</p>
                          <p>• <code className="bg-background px-1 rounded">fact_patient_flow</code> - Patient movement events</p>
                          <p>• <code className="bg-background px-1 rounded">fact_sla_metrics</code> - Service level agreements</p>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Boxes className="h-5 w-5 text-blue-400" />
                          <span className="text-foreground font-medium">Dimension Tables</span>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>• <code className="bg-background px-1 rounded">dim_patient</code> - Patient master data</p>
                          <p>• <code className="bg-background px-1 rounded">dim_location</code> - Hospital zones and beds</p>
                          <p>• <code className="bg-background px-1 rounded">dim_time</code> - Time dimension for analysis</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">
                        <Layers className="h-4 w-4 mr-2" />
                        Configure Data Models
                      </Button>
                      <Button variant="outline" className="w-full">
                        View Transformation Rules
                      </Button>
                      <Button variant="outline" className="w-full">
                        Apply KPI Logic
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mapping" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-orange-400" />
                  Data Mapping Canvas
                </CardTitle>
                <CardDescription>
                  Visual data mapping interface for healthcare data sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataMappingCanvas />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schema" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-orange-400" />
                  Schema Visualization
                </CardTitle>
                <CardDescription>
                  Interactive schema design and relationship mapping
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SchemaVisualization />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transformation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-orange-400" />
                  Transformation Rules
                </CardTitle>
                <CardDescription>
                  Define and manage data transformation logic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TransformationRulesEditor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timestamp" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-400" />
                  Timestamp Management
                </CardTitle>
                <CardDescription>
                  Healthcare-specific timestamp handling and timezone management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TimestampTools />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-orange-400" />
                  Data Pipeline Management
                </CardTitle>
                <CardDescription>
                  Monitor and manage data transformation pipelines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataPipelineManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AstroBricks;
