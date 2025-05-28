
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Globe, 
  Workflow, 
  Shield, 
  Database, 
  Brain,
  Building,
  Network,
  Lock,
  CheckCircle,
  AlertTriangle,
  Activity
} from "lucide-react";

interface IntegrationStatus {
  name: string;
  type: string;
  status: 'connected' | 'syncing' | 'error' | 'maintenance';
  uptime: number;
  throughput: string;
  lastSync: string;
}

interface ComplianceFramework {
  name: string;
  status: 'compliant' | 'warning' | 'violation';
  lastAudit: string;
  score: number;
}

const EnterpriseIntegrationHub = () => {
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([
    { name: 'Epic EMR', type: 'EHR', status: 'connected', uptime: 99.9, throughput: '2.3K/min', lastSync: '2 min ago' },
    { name: 'Cerner PowerChart', type: 'EHR', status: 'connected', uptime: 98.7, throughput: '1.8K/min', lastSync: '1 min ago' },
    { name: 'AllScripts', type: 'EHR', status: 'maintenance', uptime: 95.2, throughput: '0.5K/min', lastSync: '15 min ago' },
    { name: 'FHIR R4 Gateway', type: 'Standard', status: 'connected', uptime: 99.5, throughput: '3.1K/min', lastSync: '30 sec ago' },
    { name: 'HL7 Interface', type: 'Standard', status: 'connected', uptime: 97.8, throughput: '1.2K/min', lastSync: '1 min ago' },
    { name: 'DICOM Services', type: 'Imaging', status: 'syncing', uptime: 98.1, throughput: '0.8K/min', lastSync: '5 min ago' }
  ]);

  const [complianceFrameworks, setComplianceFrameworks] = useState<ComplianceFramework[]>([
    { name: 'MOH Saudi Standards', status: 'compliant', lastAudit: '2024-01-15', score: 98 },
    { name: 'JCI Accreditation', status: 'compliant', lastAudit: '2024-01-10', score: 96 },
    { name: 'CBAHI Standards', status: 'warning', lastAudit: '2024-01-20', score: 89 },
    { name: 'HIPAA Compliance', status: 'compliant', lastAudit: '2024-01-25', score: 99 },
    { name: 'ISO 27001', status: 'compliant', lastAudit: '2024-01-18', score: 97 }
  ]);

  const [metrics, setMetrics] = useState({
    totalApiCalls: 2400000,
    avgResponseTime: 125,
    errorRate: 0.02,
    activeEndpoints: 186,
    rateLimitHits: 23,
    securityScore: 96
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': case 'compliant': 
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'syncing': case 'warning': 
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'error': case 'violation': 
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'maintenance': 
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': case 'compliant': return <CheckCircle className="h-4 w-4" />;
      case 'syncing': case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': case 'violation': return <AlertTriangle className="h-4 w-4" />;
      case 'maintenance': return <Activity className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalApiCalls: prev.totalApiCalls + Math.floor(Math.random() * 50),
        avgResponseTime: Math.max(100, Math.min(200, prev.avgResponseTime + (Math.random() - 0.5) * 20)),
        errorRate: Math.max(0, Math.min(0.1, prev.errorRate + (Math.random() - 0.5) * 0.01))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Platform Overview */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Globe className="h-6 w-6 text-purple-400" />
            Enterprise Integration Hub
            <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">Phase 3B</Badge>
          </CardTitle>
          <CardDescription>
            Deep EHR integration, healthcare standards compliance, and enterprise-grade connectivity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{(metrics.totalApiCalls / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-muted-foreground">API Calls (24h)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{metrics.avgResponseTime}ms</div>
              <div className="text-xs text-muted-foreground">Avg Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{metrics.errorRate.toFixed(3)}%</div>
              <div className="text-xs text-muted-foreground">Error Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{metrics.activeEndpoints}</div>
              <div className="text-xs text-muted-foreground">Endpoints</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{metrics.rateLimitHits}</div>
              <div className="text-xs text-muted-foreground">Rate Limits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{metrics.securityScore}%</div>
              <div className="text-xs text-muted-foreground">Security Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="integrations">
            <Network className="h-4 w-4 mr-2" />
            EHR Integrations
          </TabsTrigger>
          <TabsTrigger value="standards">
            <Database className="h-4 w-4 mr-2" />
            Standards
          </TabsTrigger>
          <TabsTrigger value="compliance">
            <Shield className="h-4 w-4 mr-2" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-400" />
                Deep EHR Integration
              </CardTitle>
              <CardDescription>Native connectivity with major EHR systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {integrations.map((integration, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(integration.status)}
                      <span className="font-medium text-sm text-foreground">{integration.name}</span>
                      <Badge variant="outline" className="text-xs bg-muted/50">
                        {integration.type}
                      </Badge>
                    </div>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(integration.status)}`}>
                      {integration.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                    <div>Uptime: {integration.uptime}%</div>
                    <div>Throughput: {integration.throughput}</div>
                    <div>Last Sync: {integration.lastSync}</div>
                  </div>
                  <Progress value={integration.uptime} className="h-1" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standards" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Database className="h-5 w-5 text-green-400" />
                Healthcare Standards Compliance
              </CardTitle>
              <CardDescription>FHIR R4, HL7, DICOM intelligent validation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <h4 className="font-medium text-foreground">FHIR R4</h4>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Fast Healthcare Interoperability Resources
                  </div>
                  <div className="text-xs text-green-400">99.7% Compliance</div>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <h4 className="font-medium text-foreground">HL7 v2.x</h4>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Health Level Seven messaging
                  </div>
                  <div className="text-xs text-blue-400">98.2% Compliance</div>
                </div>
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-purple-400" />
                    <h4 className="font-medium text-foreground">DICOM</h4>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Digital Imaging and Communications
                  </div>
                  <div className="text-xs text-purple-400">97.8% Compliance</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-400" />
                Regulatory Intelligence
              </CardTitle>
              <CardDescription>Automated compliance with MOH, JCI, CBAHI standards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {complianceFrameworks.map((framework, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(framework.status)}
                      <span className="font-medium text-sm text-foreground">{framework.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{framework.score}%</span>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(framework.status)}`}>
                        {framework.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last audit: {framework.lastAudit}
                  </div>
                  <Progress value={framework.score} className="h-1 mt-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Lock className="h-5 w-5 text-orange-400" />
                Multi-Tenant Security Architecture
              </CardTitle>
              <CardDescription>Enterprise-grade security for hospital networks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Security Controls</h4>
                  {[
                    { name: 'Zero Trust Architecture', status: 'active', score: 98 },
                    { name: 'End-to-End Encryption', status: 'active', score: 100 },
                    { name: 'Multi-Factor Authentication', status: 'active', score: 96 },
                    { name: 'Role-Based Access Control', status: 'active', score: 99 }
                  ].map((control, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border border-border rounded">
                      <span className="text-sm font-medium">{control.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-green-400">{control.score}%</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Threat Detection</h4>
                  {[
                    { name: 'Behavioral Analytics', alerts: 0, status: 'monitoring' },
                    { name: 'Anomaly Detection', alerts: 2, status: 'investigating' },
                    { name: 'Network Security', alerts: 0, status: 'secure' },
                    { name: 'Data Loss Prevention', alerts: 1, status: 'resolved' }
                  ].map((threat, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border border-border rounded">
                      <span className="text-sm font-medium">{threat.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{threat.alerts} alerts</span>
                        <Badge variant="outline" className="text-xs">
                          {threat.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseIntegrationHub;
