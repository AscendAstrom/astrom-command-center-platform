
import { useState } from "react";
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
  Lock
} from "lucide-react";

const EnterpriseIntegrationHub = () => {
  const [activeIntegrations] = useState([
    { name: 'Epic MyChart', status: 'active', uptime: 99.9, throughput: '2.3K/min' },
    { name: 'Cerner PowerChart', status: 'active', uptime: 98.7, throughput: '1.8K/min' },
    { name: 'Allscripts', status: 'maintenance', uptime: 95.2, throughput: '0.5K/min' },
    { name: 'Oracle Health', status: 'active', uptime: 99.5, throughput: '1.2K/min' },
    { name: 'MEDITECH', status: 'active', uptime: 97.8, throughput: '0.9K/min' }
  ]);

  const [workflowMetrics] = useState({
    activeWorkflows: 247,
    completedToday: 1542,
    averageProcessingTime: '2.3s',
    automationRate: 94.2
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'maintenance': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'error': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="api-gateway" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="api-gateway">
            <Globe className="h-4 w-4 mr-2" />
            API Gateway
          </TabsTrigger>
          <TabsTrigger value="workflows">
            <Workflow className="h-4 w-4 mr-2" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="governance">
            <Shield className="h-4 w-4 mr-2" />
            Governance
          </TabsTrigger>
          <TabsTrigger value="federation">
            <Database className="h-4 w-4 mr-2" />
            Data Federation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api-gateway" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5 text-blue-400" />
                Enterprise API Gateway
              </CardTitle>
              <CardDescription>
                Centralized API management with enterprise security and monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total API Calls (24h)</span>
                    <span className="text-lg font-bold text-blue-400">2.4M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average Response Time</span>
                    <span className="text-lg font-bold text-green-400">125ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Error Rate</span>
                    <span className="text-lg font-bold text-orange-400">0.02%</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Endpoints</span>
                    <span className="text-lg font-bold text-purple-400">186</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Rate Limit Hits</span>
                    <span className="text-lg font-bold text-yellow-400">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Webhooks</span>
                    <span className="text-lg font-bold text-cyan-400">42</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Active Integrations</h4>
                {activeIntegrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        integration.status === 'active' ? 'bg-green-400' :
                        integration.status === 'maintenance' ? 'bg-yellow-400' : 'bg-red-400'
                      }`} />
                      <span className="font-medium">{integration.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Uptime</div>
                        <div className="text-sm font-medium">{integration.uptime}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Throughput</div>
                        <div className="text-sm font-medium">{integration.throughput}</div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5 text-purple-400" />
                Advanced Workflow Automation
              </CardTitle>
              <CardDescription>
                AI-powered workflow orchestration and optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400">{workflowMetrics.activeWorkflows}</div>
                  <div className="text-xs text-muted-foreground">Active Workflows</div>
                </div>
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400">{workflowMetrics.completedToday}</div>
                  <div className="text-xs text-muted-foreground">Completed Today</div>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">{workflowMetrics.averageProcessingTime}</div>
                  <div className="text-xs text-muted-foreground">Avg Processing</div>
                </div>
                <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <div className="text-2xl font-bold text-orange-400">{workflowMetrics.automationRate}%</div>
                  <div className="text-xs text-muted-foreground">Automation Rate</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">Workflow Performance</h4>
                  <Button variant="outline" size="sm">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Optimize
                  </Button>
                </div>
                
                {[
                  { name: 'Patient Registration Flow', completion: 98, efficiency: 'Excellent' },
                  { name: 'Discharge Processing', completion: 92, efficiency: 'Good' },
                  { name: 'Lab Result Distribution', completion: 85, efficiency: 'Fair' },
                  { name: 'Insurance Verification', completion: 76, efficiency: 'Needs Optimization' }
                ].map((workflow, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{workflow.name}</span>
                      <span className="text-sm text-muted-foreground">{workflow.efficiency}</span>
                    </div>
                    <Progress value={workflow.completion} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">{workflow.completion}% completion rate</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-400" />
                Enterprise Governance & Compliance
              </CardTitle>
              <CardDescription>
                Advanced security, compliance, and audit management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Security Status
                  </h4>
                  {[
                    { name: 'Zero Trust Architecture', status: 'active', score: 98 },
                    { name: 'Advanced Encryption', status: 'active', score: 100 },
                    { name: 'Threat Detection', status: 'active', score: 94 },
                    { name: 'Access Control', status: 'active', score: 97 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <span className="font-medium">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-400">{item.score}%</span>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Compliance Framework
                  </h4>
                  {[
                    { name: 'HIPAA Compliance', status: 'compliant', lastAudit: '2024-01-15' },
                    { name: 'MOH Saudi Standards', status: 'compliant', lastAudit: '2024-01-20' },
                    { name: 'ISO 27001', status: 'compliant', lastAudit: '2024-01-10' },
                    { name: 'GDPR Compliance', status: 'compliant', lastAudit: '2024-01-25' }
                  ].map((item, index) => (
                    <div key={index} className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{item.name}</span>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                          {item.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Last audit: {item.lastAudit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="federation" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-cyan-400" />
                Multi-System Data Federation
              </CardTitle>
              <CardDescription>
                Real-time data synchronization across healthcare ecosystems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <div className="text-2xl font-bold text-cyan-400">12</div>
                  <div className="text-xs text-muted-foreground">Connected Facilities</div>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">847TB</div>
                  <div className="text-xs text-muted-foreground">Federated Data</div>
                </div>
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400">99.8%</div>
                  <div className="text-xs text-muted-foreground">Sync Accuracy</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Data Federation Status</h4>
                {[
                  { facility: 'King Fahd Medical City', systems: 'Epic, Cerner', status: 'synced', latency: '45ms' },
                  { facility: 'National Guard Hospital', systems: 'Allscripts, MEDITECH', status: 'synced', latency: '62ms' },
                  { facility: 'Prince Sultan Hospital', systems: 'Epic, Oracle Health', status: 'syncing', latency: '128ms' },
                  { facility: 'Al-Noor Specialist Hospital', systems: 'Cerner, Custom EHR', status: 'synced', latency: '38ms' }
                ].map((item, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium">{item.facility}</div>
                        <div className="text-sm text-muted-foreground">{item.systems}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={
                          item.status === 'synced' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                          'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                        }>
                          {item.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          Latency: {item.latency}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseIntegrationHub;
