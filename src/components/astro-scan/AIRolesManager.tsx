
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Bot, Shield, Eye, Settings, Activity, TrendingUp } from 'lucide-react';

interface AIRole {
  id: string;
  name: string;
  description: string;
  category: string;
  module: string;
  isActive: boolean;
  skills: string[];
  performance: {
    accuracy: number;
    recommendations: number;
    successRate: number;
  };
}

const AIRolesManager = () => {
  const [roles, setRoles] = useState<AIRole[]>([
    {
      id: 'source-agent',
      name: 'Source Agent',
      description: 'Detects, validates, and recommends data sources (HL7, FHIR, CSV, APIs)',
      category: 'Data Ingestion',
      module: 'ASTRO-SCAN',
      isActive: true,
      skills: ['Schema parsing', 'Source health check', 'Data volume estimation'],
      performance: { accuracy: 94, recommendations: 127, successRate: 92 }
    },
    {
      id: 'data-drift-detector',
      name: 'Data Drift Detector',
      description: 'Monitors for structural data changes that could affect model accuracy',
      category: 'QA Agent',
      module: 'ASTRO-SCAN',
      isActive: true,
      skills: ['Schema comparison', 'Data versioning', 'Change detection'],
      performance: { accuracy: 96, recommendations: 45, successRate: 98 }
    },
    {
      id: 'anomaly-guardian',
      name: 'Anomaly Guardian',
      description: 'Detects unusual trends or outliers in data ingestion and KPI performance',
      category: 'QA/Monitoring',
      module: 'ASTRO-SCAN',
      isActive: true,
      skills: ['Isolation Forest', 'Z-score anomaly detection', 'Pattern recognition'],
      performance: { accuracy: 89, recommendations: 234, successRate: 85 }
    },
    {
      id: 'fhir-mapper',
      name: 'FHIR Mapper Agent',
      description: 'Auto-parses and maps external FHIR feeds into local schema and KPIs',
      category: 'Integration',
      module: 'ASTRO-SCAN',
      isActive: false,
      skills: ['FHIR spec parsing', 'Mapping tables', 'Schema translation'],
      performance: { accuracy: 91, recommendations: 67, successRate: 88 }
    }
  ]);

  const toggleRole = (roleId: string) => {
    setRoles(roles.map(role => 
      role.id === roleId ? { ...role, isActive: !role.isActive } : role
    ));
  };

  const categories = [...new Set(roles.map(role => role.category))];
  const activeRoles = roles.filter(role => role.isActive);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-foreground">{roles.length}</div>
                <div className="text-sm text-muted-foreground">Total AI Roles</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-400" />
              <div>
                <div className="text-lg font-bold text-foreground">{activeRoles.length}</div>
                <div className="text-sm text-muted-foreground">Active Agents</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-foreground">
                  {Math.round(activeRoles.reduce((sum, role) => sum + role.performance.accuracy, 0) / activeRoles.length)}%
                </div>
                <div className="text-sm text-muted-foreground">Avg Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-orange-400" />
              <div>
                <div className="text-lg font-bold text-foreground">
                  {activeRoles.reduce((sum, role) => sum + role.performance.recommendations, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Recommendations Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="roles" className="data-[state=active]:bg-blue-500/20">
            <Brain className="h-4 w-4 mr-2" />
            AI Roles
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-green-500/20">
            <TrendingUp className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="configuration" className="data-[state=active]:bg-purple-500/20">
            <Settings className="h-4 w-4 mr-2" />
            Configuration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          {categories.map(category => (
            <Card key={category} className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-400" />
                  {category}
                </CardTitle>
                <CardDescription>
                  AI agents for {category.toLowerCase()} operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roles.filter(role => role.category === category).map(role => (
                    <div key={role.id} className="p-4 border border-border rounded-lg bg-muted/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Bot className="h-5 w-5 text-blue-400" />
                          <div>
                            <h4 className="font-semibold text-foreground">{role.name}</h4>
                            <p className="text-sm text-muted-foreground">{role.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge 
                            className={role.isActive 
                              ? "bg-green-500/10 text-green-600 border-green-500/20" 
                              : "bg-gray-500/10 text-gray-600 border-gray-500/20"
                            }
                          >
                            {role.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                          <Switch
                            checked={role.isActive}
                            onCheckedChange={() => toggleRole(role.id)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-2">Skills</h5>
                          <div className="flex flex-wrap gap-1">
                            {role.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-2">Performance</h5>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="text-center">
                              <div className="font-semibold text-green-400">{role.performance.accuracy}%</div>
                              <div className="text-muted-foreground">Accuracy</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-blue-400">{role.performance.recommendations}</div>
                              <div className="text-muted-foreground">Suggestions</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-purple-400">{role.performance.successRate}%</div>
                              <div className="text-muted-foreground">Success</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground">AI Performance Analytics</CardTitle>
              <CardDescription>Real-time performance metrics for all active AI agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeRoles.map(role => (
                  <div key={role.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{role.name}</h4>
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                        {role.performance.accuracy}% Accuracy
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-muted/50 p-2 rounded">
                        <div className="font-medium text-foreground">{role.performance.recommendations}</div>
                        <div className="text-muted-foreground">Recommendations</div>
                      </div>
                      <div className="bg-muted/50 p-2 rounded">
                        <div className="font-medium text-foreground">{role.performance.successRate}%</div>
                        <div className="text-muted-foreground">Success Rate</div>
                      </div>
                      <div className="bg-muted/50 p-2 rounded">
                        <div className="font-medium text-foreground">24/7</div>
                        <div className="text-muted-foreground">Uptime</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Global AI Configuration</CardTitle>
              <CardDescription>Configure AI agent behavior and thresholds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Performance Thresholds</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Minimum Accuracy</span>
                        <Badge variant="outline">85%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Alert Threshold</span>
                        <Badge variant="outline">3 failures</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Auto-retrain Trigger</span>
                        <Badge variant="outline">Weekly</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">System Integration</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">OpenAI Integration</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Auto-escalation</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Learning Mode</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Save Configuration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIRolesManager;
