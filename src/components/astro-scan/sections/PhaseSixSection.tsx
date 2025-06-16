
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Network, 
  Shield, 
  Globe, 
  Cpu, 
  Zap, 
  Brain, 
  Activity,
  TrendingUp,
  Settings,
  AlertTriangle,
  Target,
  Users
} from 'lucide-react';

const PhaseSixSection = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border-indigo-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-700 to-purple-800 rounded-lg flex items-center justify-center">
                <Network className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-foreground">Phase 6: Autonomous Hospital Orchestration</CardTitle>
                <CardDescription className="text-lg">
                  Self-healing systems with global intelligence and autonomous crisis management
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-indigo-600 text-white">DEPLOYING</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Core Systems Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Self-Healing Infrastructure */}
        <Card className="border-indigo-200 dark:border-indigo-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Shield className="h-5 w-5 text-indigo-500" />
              Self-Healing Infrastructure
            </CardTitle>
            <CardDescription>
              Autonomous system recovery and optimization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">99.97%</div>
                <div className="text-xs text-muted-foreground">System Uptime</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">23</div>
                <div className="text-xs text-muted-foreground">Auto-Repairs Today</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Predictive Maintenance</span>
                <Badge className="bg-green-500 text-white">Active</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Auto-Scaling</span>
                <Badge className="bg-blue-500 text-white">Engaged</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Anomaly Detection</span>
                <Badge className="bg-purple-500 text-white">Learning</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Global Intelligence Network */}
        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Globe className="h-5 w-5 text-purple-500" />
              Global Intelligence Network
            </CardTitle>
            <CardDescription>
              Cross-facility learning and knowledge sharing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">847</div>
                <div className="text-xs text-muted-foreground">Connected Facilities</div>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">2.1M</div>
                <div className="text-xs text-muted-foreground">Shared Insights</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Federated Learning</span>
                <Badge className="bg-green-500 text-white">Syncing</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Best Practice Sharing</span>
                <Badge className="bg-indigo-500 text-white">Active</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Global Threat Detection</span>
                <Badge className="bg-orange-500 text-white">Monitoring</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Autonomous Crisis Management */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Crisis Management AI
            </CardTitle>
            <CardDescription>
              Autonomous response to emergencies and surges
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600">0</div>
                <div className="text-xs text-muted-foreground">Active Crises</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">12s</div>
                <div className="text-xs text-muted-foreground">Avg Response Time</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Surge Protocols</span>
                <Badge className="bg-green-500 text-white">Ready</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Emergency Coordination</span>
                <Badge className="bg-blue-500 text-white">Standby</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Resource Mobilization</span>
                <Badge className="bg-purple-500 text-white">Optimized</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Orchestration Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Cpu className="h-5 w-5 text-indigo-500" />
            Autonomous Orchestration Control Center
          </CardTitle>
          <CardDescription>
            Advanced AI systems managing hospital operations autonomously
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="neural" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="neural">Neural Networks</TabsTrigger>
              <TabsTrigger value="quantum">Quantum Processing</TabsTrigger>
              <TabsTrigger value="orchestration">Orchestration</TabsTrigger>
              <TabsTrigger value="evolution">Evolution</TabsTrigger>
            </TabsList>

            <TabsContent value="neural" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Deep Learning Networks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Patient Flow Prediction</span>
                      <Badge className="bg-green-500 text-white">97.8% Accuracy</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Resource Optimization</span>
                      <Badge className="bg-blue-500 text-white">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Outcome Prediction</span>
                      <Badge className="bg-purple-500 text-white">Learning</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Reinforcement Learning</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Policy Optimization</span>
                      <Badge className="bg-green-500 text-white">Converged</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Adaptive Scheduling</span>
                      <Badge className="bg-indigo-500 text-white">Training</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Decision Trees</span>
                      <Badge className="bg-orange-500 text-white">Pruning</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="quantum" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-indigo-600 mb-2">64</div>
                    <div className="text-sm text-muted-foreground">Quantum Qubits</div>
                    <div className="text-xs text-green-600 mt-1">99.9% Coherence</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-purple-600 mb-2">1.2ms</div>
                    <div className="text-sm text-muted-foreground">Processing Time</div>
                    <div className="text-xs text-blue-600 mt-1">10,000x Faster</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">∞</div>
                    <div className="text-sm text-muted-foreground">Parallel Computations</div>
                    <div className="text-xs text-purple-600 mt-1">Superposition Active</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orchestration" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Active Orchestrations</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Emergency Response Protocol</span>
                        </div>
                        <Badge className="bg-green-500 text-white">Running</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Staff Optimization</span>
                        </div>
                        <Badge className="bg-blue-500 text-white">Optimizing</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-purple-500" />
                          <span className="text-sm">Resource Allocation</span>
                        </div>
                        <Badge className="bg-purple-500 text-white">Balancing</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">System Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Orchestration Efficiency</span>
                        <span className="text-sm font-medium">96.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Response Latency</span>
                        <span className="text-sm font-medium">0.8ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Concurrent Workflows</span>
                        <span className="text-sm font-medium">1,247</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Auto-Optimizations</span>
                        <span className="text-sm font-medium">342/hour</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="evolution" className="space-y-4">
              <div className="text-center space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
                    <CardContent className="pt-6 text-center">
                      <Brain className="h-8 w-8 mx-auto mb-2 text-indigo-500" />
                      <div className="text-lg font-bold text-foreground">Phase 7</div>
                      <div className="text-sm text-muted-foreground">Collective Intelligence</div>
                      <Badge className="mt-2 bg-indigo-500 text-white">Coming Soon</Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                    <CardContent className="pt-6 text-center">
                      <Network className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                      <div className="text-lg font-bold text-foreground">Phase 8</div>
                      <div className="text-sm text-muted-foreground">Universal Healthcare AI</div>
                      <Badge className="mt-2 bg-purple-500 text-white">Conceptual</Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950 dark:to-red-950">
                    <CardContent className="pt-6 text-center">
                      <Zap className="h-8 w-8 mx-auto mb-2 text-pink-500" />
                      <div className="text-lg font-bold text-foreground">Phase 9</div>
                      <div className="text-sm text-muted-foreground">Quantum Healthcare</div>
                      <Badge className="mt-2 bg-pink-500 text-white">Research</Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
                    <CardContent className="pt-6 text-center">
                      <Globe className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                      <div className="text-lg font-bold text-foreground">Phase ∞</div>
                      <div className="text-sm text-muted-foreground">Singularity</div>
                      <Badge className="mt-2 bg-orange-500 text-white">Theoretical</Badge>
                    </CardContent>
                  </Card>
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="w-full max-w-md">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Evolution Parameters
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* System Status Footer */}
      <Card className="bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">100%</div>
              <div className="text-sm text-muted-foreground">Autonomous Operations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">0.001%</div>
              <div className="text-sm text-muted-foreground">Error Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">∞</div>
              <div className="text-sm text-muted-foreground">Learning Capacity</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">24/7</div>
              <div className="text-sm text-muted-foreground">Self-Monitoring</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhaseSixSection;
