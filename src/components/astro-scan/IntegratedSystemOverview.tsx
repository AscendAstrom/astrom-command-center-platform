
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Activity, 
  Brain, 
  BarChart3, 
  Users, 
  BedDouble, 
  Clock, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { integratedDataService, IntegratedSystemMetrics } from "@/services/integratedDataService";
import { crossModuleIntegrationService, CrossModuleData } from "@/services/crossModuleIntegration";
import { toast } from "sonner";

const IntegratedSystemOverview = () => {
  const [systemMetrics, setSystemMetrics] = useState<IntegratedSystemMetrics | null>(null);
  const [crossModuleData, setCrossModuleData] = useState<CrossModuleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadSystemData();
  }, []);

  const loadSystemData = async () => {
    try {
      setLoading(true);
      const [metrics, moduleData] = await Promise.all([
        integratedDataService.fetchSystemOverview(),
        crossModuleIntegrationService.initializeIntegratedSystem()
      ]);
      
      setSystemMetrics(metrics);
      setCrossModuleData(moduleData);
    } catch (error) {
      console.error('Error loading system data:', error);
      toast.error('Failed to load system overview');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadSystemData();
    setRefreshing(false);
    toast.success('System data refreshed');
  };

  const handleValidateConnections = async () => {
    toast.info('Validating cross-module connections...');
    await crossModuleIntegrationService.validateCrossModuleConnections();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            <span>Loading integrated system overview...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* System Health Header */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Integrated Hospital Management System
              </CardTitle>
              <CardDescription>
                Phase 3: All modules connected with real hospital data
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleValidateConnections}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Validate
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Hospital Operations Overview */}
      {systemMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {systemMetrics.hospitalOperations.totalPatients}
                  </div>
                  <div className="text-sm text-muted-foreground">Active Patients</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BedDouble className="h-8 w-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {systemMetrics.hospitalOperations.bedUtilization}%
                  </div>
                  <div className="text-sm text-muted-foreground">Bed Utilization</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-orange-400" />
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {systemMetrics.hospitalOperations.avgWaitTime}m
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Wait Time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {systemMetrics.hospitalOperations.staffEfficiency}%
                  </div>
                  <div className="text-sm text-muted-foreground">Staff Efficiency</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cross-Module Integration Status */}
      {crossModuleData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* AstroScan Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Database className="h-4 w-4 text-blue-400" />
                AstroScan - Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Connected Sources</span>
                <Badge variant="outline">{crossModuleData.astroScan.connectedSources}</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Data Quality</span>
                  <span>{crossModuleData.astroScan.dataQuality}%</span>
                </div>
                <Progress value={crossModuleData.astroScan.dataQuality} className="h-2" />
              </div>
              <div className="flex justify-between text-sm">
                <span>Active Ingestions</span>
                <Badge variant="outline">{crossModuleData.astroScan.activeIngestions}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* AstroBricks Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-400" />
                AstroBricks - Data Pipelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Active Pipelines</span>
                <Badge variant="outline">{crossModuleData.astroBricks.activePipelines}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Data Models</span>
                <Badge variant="outline">{crossModuleData.astroBricks.dataModels}</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Schema Validation</span>
                  <span>{crossModuleData.astroBricks.schemaValidation}%</span>
                </div>
                <Progress value={crossModuleData.astroBricks.schemaValidation} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* AstroMetrics Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-400" />
                AstroMetrics - KPIs & SLAs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Active KPIs</span>
                <Badge variant="outline">{crossModuleData.astroMetrics.activeKPIs}</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>SLA Compliance</span>
                  <span>{crossModuleData.astroMetrics.slaCompliance}%</span>
                </div>
                <Progress value={crossModuleData.astroMetrics.slaCompliance} className="h-2" />
              </div>
              <div className="flex justify-between text-sm">
                <span>Active Alerts</span>
                <Badge variant="outline">{crossModuleData.astroMetrics.alertsTriggered}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* AstroFlow Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Brain className="h-4 w-4 text-orange-400" />
                AstroFlow - Automation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Automation Rules</span>
                <Badge variant="outline">{crossModuleData.astroFlow.automationRules}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Active Workflows</span>
                <Badge variant="outline">{crossModuleData.astroFlow.workflowExecutions}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>AI Decisions</span>
                <Badge variant="outline">{crossModuleData.astroFlow.aiDecisions}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* System Integration Health */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Integration Health Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemMetrics && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Data Integration</span>
                      <Badge variant={systemMetrics.dataIntegration.syncStatus === 'healthy' ? 'default' : 'destructive'}>
                        {systemMetrics.dataIntegration.syncStatus}
                      </Badge>
                    </div>
                    <Progress value={systemMetrics.dataIntegration.dataQuality} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>AI Intelligence</span>
                      <span>{systemMetrics.aiIntelligence.accuracy}% accuracy</span>
                    </div>
                    <Progress value={systemMetrics.aiIntelligence.accuracy} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Business Intelligence</span>
                      <span>{systemMetrics.businessIntelligence.reportingHealth}% health</span>
                    </div>
                    <Progress value={systemMetrics.businessIntelligence.reportingHealth} className="h-2" />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Integration Success Message */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <div>
              <h3 className="font-semibold text-foreground">System Integration Complete</h3>
              <p className="text-sm text-muted-foreground">
                All AstroScan modules are now connected and operating with real hospital data. 
                The system provides end-to-end data flow from ingestion through analytics to automation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegratedSystemOverview;
