
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataMappingCanvas } from '@/components/astro-bricks/DataMappingCanvas';
import { TransformationRulesEditor } from '@/components/astro-bricks/TransformationRulesEditor';
import { SchemaVisualization } from '@/components/astro-bricks/SchemaVisualization';
import { DataPipelineManager } from '@/components/astro-bricks/DataPipelineManager';
import { TimestampTools } from '@/components/astro-bricks/TimestampTools';
import { useUserRole } from '@/components/astro-bricks/hooks/useUserRole';
import { Shield, Database, Workflow, Timer, Eye } from 'lucide-react';

const AstroBricks = () => {
  const { userRole, isLoading } = useUserRole();
  const isReadOnly = userRole === 'ANALYST';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Database className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">ASTRO-BRICKS</h1>
            <span className="text-sm text-purple-500 font-medium">Data Normalization & Modeling</span>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Normalize and model healthcare data with drag-and-drop mapping, transformation rules, and schema visualization.
          </p>
          {isReadOnly && (
            <div className="flex items-center gap-2 mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <Eye className="h-4 w-4 text-amber-500" />
              <span className="text-amber-500 text-sm">Read-only mode: You have view access only</span>
            </div>
          )}
        </div>

        <Tabs defaultValue="mapping" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50">
            <TabsTrigger value="mapping" className="data-[state=active]:bg-purple-500/20">
              Data Mapping
            </TabsTrigger>
            <TabsTrigger value="transformation">
              Transformation Rules
            </TabsTrigger>
            <TabsTrigger value="schema">
              Schema Visualization
            </TabsTrigger>
            <TabsTrigger value="pipelines">
              Data Pipelines
            </TabsTrigger>
            <TabsTrigger value="tools">
              Data Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mapping" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-purple-500" />
                  Data Mapping Canvas
                </CardTitle>
                <CardDescription>
                  Drag and drop to map source data to target schemas (dim_zone, dim_patient, fact_ed_inbound)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataMappingCanvas readOnly={isReadOnly} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transformation" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  Transformation Rules Editor
                </CardTitle>
                <CardDescription>
                  Create and edit transformation rules using SQL or visual logic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TransformationRulesEditor readOnly={isReadOnly} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schema" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Schema Visualization
                </CardTitle>
                <CardDescription>
                  Visualize fact and dimension table relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SchemaVisualization />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pipelines" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-cyan-500" />
                  Data Pipeline Manager
                </CardTitle>
                <CardDescription>
                  Manage saveable data pipelines with version history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataPipelineManager readOnly={isReadOnly} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Timer className="h-5 w-5 text-orange-500" />
                  Data Cleaning Tools
                </CardTitle>
                <CardDescription>
                  Timestamp cleaning functions and duplicate resolution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TimestampTools readOnly={isReadOnly} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AstroBricks;
