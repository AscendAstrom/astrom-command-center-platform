
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Network, 
  Workflow, 
  Zap, 
  BarChart3, 
  Database,
  Activity,
  RefreshCw,
  ArrowRightLeft,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useCrossModuleIntegration } from "./hooks/useCrossModuleIntegration";

const CrossModuleIntegrationDashboard = () => {
  const {
    connections,
    crossModuleData,
    isIntegrating,
    integrationHealth,
    syncCrossModuleData,
    triggerWorkflowAutomation,
    connectPipelineToWorkflow,
    streamToDashboard
  } = useCrossModuleIntegration();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'disconnected': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'error': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getDataFlowIcon = (flow: string) => {
    switch (flow) {
      case 'bidirectional': return <ArrowRightLeft className="h-4 w-4" />;
      case 'inbound': return <Activity className="h-4 w-4 rotate-180" />;
      case 'outbound': return <Activity className="h-4 w-4" />;
      default: return <Network className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Integration Overview */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Network className="h-6 w-6 text-blue-400" />
            Cross-Module Integration Hub
            <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
              {connections.filter(c => c.status === 'connected').length} Connected
            </Badge>
          </CardTitle>
          <CardDescription>
            Seamless data orchestration across AstroFlow, AstroView, AstroBricks, and AstroMetrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{integrationHealth}%</div>
              <div className="text-xs text-muted-foreground">Integration Health</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{connections.length}</div>
              <div className="text-xs text-muted-foreground">Active Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {crossModuleData?.metrics.activeDataFlows || 0}
              </div>
              <div className="text-xs text-muted-foreground">Data Flows</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">
                {crossModuleData?.metrics.latency || 0}ms
              </div>
              <div className="text-xs text-muted-foreground">Avg Latency</div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Last sync: {connections[0]?.lastSync?.toLocaleTimeString() || 'Never'}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={syncCrossModuleData}
              disabled={isIntegrating}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isIntegrating ? 'animate-spin' : ''}`} />
              {isIntegrating ? 'Syncing...' : 'Sync Now'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="connections" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="connections">Module Connections</TabsTrigger>
          <TabsTrigger value="workflows">Workflow Integration</TabsTrigger>
          <TabsTrigger value="automation">Automation Sync</TabsTrigger>
          <TabsTrigger value="analytics">Analytics Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5 text-blue-400" />
                Module Connection Status
              </CardTitle>
              <CardDescription>
                Real-time status and health metrics for all connected modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connections.map((connection) => (
                  <div key={connection.moduleId} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-card rounded-lg">
                          {connection.moduleId === 'astro-flow' && <Zap className="h-5 w-5 text-purple-400" />}
                          {connection.moduleId === 'astro-view' && <BarChart3 className="h-5 w-5 text-blue-400" />}
                          {connection.moduleId === 'astro-bricks' && <Database className="h-5 w-5 text-green-400" />}
                          {connection.moduleId === 'astro-metrics' && <Activity className="h-5 w-5 text-orange-400" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{connection.moduleName}</h4>
                          <p className="text-sm text-muted-foreground">{connection.moduleId}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(connection.status)}>
                          {connection.status}
                        </Badge>
                        {getDataFlowIcon(connection.dataFlow)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm font-medium text-foreground">Health Score</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={connection.healthScore} className="flex-1 h-2" />
                          <span className="text-sm text-muted-foreground">{connection.healthScore}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Data Flow</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {connection.dataFlow.charAt(0).toUpperCase() + connection.dataFlow.slice(1)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Last Sync</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {connection.lastSync?.toLocaleTimeString() || 'Never'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5 text-purple-400" />
                Workflow Integration Controls
              </CardTitle>
              <CardDescription>
                Connect workflows with automation rules and data pipelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">FHIR Data Processing Workflow</h4>
                      <p className="text-sm text-muted-foreground">Active • Phase 4 of 6</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => connectPipelineToWorkflow('pipeline_1', 'workflow_1')}
                      >
                        Connect Pipeline
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => streamToDashboard('workflow_1', 'dashboard_1')}
                      >
                        Stream to Dashboard
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">AstroBricks Connected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">AstroView Streaming</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">AstroFlow Pending</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">Patient Analytics Pipeline</h4>
                      <p className="text-sm text-muted-foreground">Running • Real-time processing</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => triggerWorkflowAutomation('workflow_2', 'rule_1')}
                      >
                        Trigger Automation
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => streamToDashboard('workflow_2', 'dashboard_2')}
                      >
                        Update Dashboard
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">All Modules Connected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Auto-scaling Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Real-time Sync</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Automation Synchronization
              </CardTitle>
              <CardDescription>
                Monitor and control cross-module automation flows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-green-600">SLA Breach Prevention</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Automatically triggers workflow optimization when SLA thresholds are approached
                  </p>
                  <div className="text-xs text-green-600">
                    ✓ Connected to: Workflow Engine, Metrics Analytics, Alert System
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-blue-500" />
                    <span className="font-medium text-blue-600">Surge Prediction Response</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Auto-scales resources and adjusts workflows based on patient volume predictions
                  </p>
                  <div className="text-xs text-blue-600">
                    ✓ Connected to: Predictive Models, Resource Manager, Dashboard Updates
                  </div>
                </div>

                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Network className="h-5 w-5 text-purple-500" />
                    <span className="font-medium text-purple-600">Data Quality Monitoring</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Monitors pipeline data quality and triggers cleansing workflows automatically
                  </p>
                  <div className="text-xs text-purple-600">
                    ✓ Connected to: Data Pipelines, Quality Metrics, Workflow Triggers
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-400" />
                Analytics Data Flow
              </CardTitle>
              <CardDescription>
                Real-time analytics streaming and cross-module insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Active Data Streams</h3>
                  
                  <div className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">Workflow → Dashboard</span>
                      <Badge className="bg-green-500 text-white">LIVE</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Real-time workflow metrics streaming to executive dashboards
                    </div>
                  </div>

                  <div className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">Pipeline → Analytics</span>
                      <Badge className="bg-blue-500 text-white">ACTIVE</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Data pipeline metrics feeding into analytics engine
                    </div>
                  </div>

                  <div className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">Automation → Metrics</span>
                      <Badge className="bg-purple-500 text-white">STREAMING</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Automation execution data flowing to metrics collection
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Performance Metrics</h3>
                  
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">99.7%</div>
                      <div className="text-sm text-muted-foreground">Data Sync Accuracy</div>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500">1.2ms</div>
                      <div className="text-sm text-muted-foreground">Average Latency</div>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-500">156</div>
                      <div className="text-sm text-muted-foreground">Events/Second</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CrossModuleIntegrationDashboard;
