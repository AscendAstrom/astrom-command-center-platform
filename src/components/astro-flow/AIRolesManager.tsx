
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Zap, Users, AlertTriangle, TrendingUp, Activity, Settings, Shield } from 'lucide-react';

interface AIFlowRole {
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

const AIFlowRolesManager = () => {
  const [roles, setRoles] = useState<AIFlowRole[]>([
    {
      id: 'routing-strategist',
      name: 'Routing Strategist',
      description: 'Recommends optimal patient routing based on bay availability, SLA risk, and staff levels',
      category: 'Optimization',
      module: 'ASTRO-FLOW',
      isActive: true,
      skills: ['Reinforcement learning', 'Dynamic path optimization', 'Capacity analysis'],
      performance: { accuracy: 92, recommendations: 156, successRate: 88 }
    },
    {
      id: 'flow-optimizer',
      name: 'Flow Optimizer',
      description: 'Real-time operational optimization for load redistribution and resource allocation',
      category: 'Optimization',
      module: 'ASTRO-FLOW',
      isActive: true,
      skills: ['Queue theory', 'Load balancing', 'Contextual routing'],
      performance: { accuracy: 89, recommendations: 203, successRate: 91 }
    },
    {
      id: 'staff-load-balancer',
      name: 'Staff Load Balancer',
      description: 'Workforce allocation optimization analyzing staff-to-patient ratios by zone',
      category: 'Workforce',
      module: 'ASTRO-FLOW',
      isActive: true,
      skills: ['Predictive load modeling', 'Staffing thresholds', 'Shift optimization'],
      performance: { accuracy: 94, recommendations: 78, successRate: 93 }
    },
    {
      id: 'delay-escalator',
      name: 'Delay Escalator',
      description: 'Automated escalation system for bottlenecks and SLA breach prevention',
      category: 'Response Engine',
      module: 'ASTRO-FLOW',
      isActive: true,
      skills: ['SLA matrix scanning', 'Protocol escalation logic', 'Automated response'],
      performance: { accuracy: 96, recommendations: 45, successRate: 98 }
    },
    {
      id: 'sla-sentinel',
      name: 'SLA Sentinel',
      description: 'Monitors incoming patient data for breach risks using classification models',
      category: 'Risk Prediction',
      module: 'ASTRO-FLOW',
      isActive: true,
      skills: ['Real-time scoring', 'Dynamic risk categorization', 'Breach prediction'],
      performance: { accuracy: 91, recommendations: 234, successRate: 87 }
    },
    {
      id: 'surge-forecaster',
      name: 'Surge Forecaster',
      description: 'Predicts patient influx and zone overloading up to 12 hours in advance',
      category: 'Time Series',
      module: 'ASTRO-FLOW',
      isActive: false,
      skills: ['Prophet/LSTM models', 'Capacity trend modeling', 'Demand forecasting'],
      performance: { accuracy: 85, recommendations: 67, successRate: 82 }
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
        <Card className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-pink-400" />
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
              <Zap className="h-5 w-5 text-orange-400" />
              <div>
                <div className="text-lg font-bold text-foreground">
                  {activeRoles.reduce((sum, role) => sum + role.performance.recommendations, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Actions Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="roles" className="data-[state=active]:bg-pink-500/20">
            <Bot className="h-4 w-4 mr-2" />
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
                  <Shield className="h-5 w-5 text-pink-400" />
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
                          <Bot className="h-5 w-5 text-pink-400" />
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
                              <div className="text-muted-foreground">Actions</div>
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
                        <div className="text-muted-foreground">Actions</div>
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
              <CardDescription>Configure AI agent behavior and automation thresholds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Automation Thresholds</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Routing Confidence</span>
                        <Badge variant="outline">≥ 85%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Escalation Trigger</span>
                        <Badge variant="outline">2 breaches</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Staff Rebalance</span>
                        <Badge variant="outline">Auto</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">System Integration</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Real-time Processing</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Auto-optimization</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Predictive Mode</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button className="bg-pink-600 hover:bg-pink-700">
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

export default AIFlowRolesManager;
