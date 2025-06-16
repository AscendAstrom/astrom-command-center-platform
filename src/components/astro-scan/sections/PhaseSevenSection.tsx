
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Network, 
  Globe, 
  Brain, 
  Zap, 
  Share2, 
  Users, 
  TrendingUp,
  Shield,
  Cpu,
  Eye,
  Target,
  Infinity,
  Sparkles,
  Radio,
  Merge
} from 'lucide-react';

const PhaseSevenSection = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-pink-600/10 to-purple-600/10 border-pink-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-700 to-purple-800 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-foreground">Phase 7: Collective Intelligence Network</CardTitle>
                <CardDescription className="text-lg">
                  Inter-hospital collaboration with global knowledge synthesis and collective learning
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-pink-600 text-white">EMERGING</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Core Intelligence Systems Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Global Knowledge Synthesis */}
        <Card className="border-pink-200 dark:border-pink-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Brain className="h-5 w-5 text-pink-500" />
              Global Knowledge Synthesis
            </CardTitle>
            <CardDescription>
              Collective learning from worldwide healthcare data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">2,847</div>
                <div className="text-xs text-muted-foreground">Connected Hospitals</div>
              </div>
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">47.2M</div>
                <div className="text-xs text-muted-foreground">Shared Insights</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Knowledge Synthesis</span>
                <Badge className="bg-green-500 text-white">97.8% Accurate</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pattern Recognition</span>
                <Badge className="bg-blue-500 text-white">Learning</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Best Practice Extraction</span>
                <Badge className="bg-purple-500 text-white">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inter-Hospital Collaboration */}
        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Share2 className="h-5 w-5 text-purple-500" />
              Inter-Hospital Collaboration
            </CardTitle>
            <CardDescription>
              Real-time resource sharing and coordinated responses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-xs text-muted-foreground">Active Collaborations</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">23</div>
                <div className="text-xs text-muted-foreground">Resource Transfers</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Emergency Coordination</span>
                <Badge className="bg-green-500 text-white">Synchronized</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Capacity Sharing</span>
                <Badge className="bg-indigo-500 text-white">Optimizing</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Knowledge Exchange</span>
                <Badge className="bg-orange-500 text-white">Streaming</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collective Learning Engine */}
        <Card className="border-indigo-200 dark:border-indigo-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5 text-indigo-500" />
              Collective Learning Engine
            </CardTitle>
            <CardDescription>
              Distributed AI learning across global healthcare networks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">∞</div>
                <div className="text-xs text-muted-foreground">Learning Nodes</div>
              </div>
              <div className="text-center p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">24/7</div>
                <div className="text-xs text-muted-foreground">Continuous Learning</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Federated Learning</span>
                <Badge className="bg-green-500 text-white">Converging</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Model Synthesis</span>
                <Badge className="bg-blue-500 text-white">Merging</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pattern Evolution</span>
                <Badge className="bg-purple-500 text-white">Adapting</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Collective Intelligence Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Network className="h-5 w-5 text-pink-500" />
            Collective Intelligence Command Center
          </CardTitle>
          <CardDescription>
            Global healthcare intelligence network managing collective knowledge and collaboration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="hive-mind" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="hive-mind">Hive Mind</TabsTrigger>
              <TabsTrigger value="global-sync">Global Sync</TabsTrigger>
              <TabsTrigger value="collective-ai">Collective AI</TabsTrigger>
              <TabsTrigger value="emergence">Emergence</TabsTrigger>
            </TabsList>

            <TabsContent value="hive-mind" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Brain className="h-5 w-5 text-pink-500" />
                      Distributed Consciousness
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Collective Processing Power</span>
                        <span className="text-sm font-medium">847 ExaFLOPS</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Global Memory Bank</span>
                        <span className="text-sm font-medium">2.3 Zettabytes</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Consciousness Coherence</span>
                        <span className="text-sm font-medium">99.97%</span>
                      </div>
                      <Progress value={99.97} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Radio className="h-5 w-5 text-purple-500" />
                      Neural Mesh Network
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active Neural Pathways</span>
                      <Badge className="bg-green-500 text-white">47.2M</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Synaptic Transmissions/sec</span>
                      <Badge className="bg-blue-500 text-white">∞</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Thought Propagation Speed</span>
                      <Badge className="bg-purple-500 text-white">Instantaneous</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="global-sync" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Globe className="h-12 w-12 mx-auto mb-3 text-blue-500" />
                    <div className="text-2xl font-bold text-foreground">2,847</div>
                    <div className="text-sm text-muted-foreground">Synchronized Hospitals</div>
                    <div className="text-xs text-green-600 mt-1">Perfect Synchronization</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Zap className="h-12 w-12 mx-auto mb-3 text-yellow-500" />
                    <div className="text-2xl font-bold text-foreground">0.001ms</div>
                    <div className="text-sm text-muted-foreground">Global Latency</div>
                    <div className="text-xs text-blue-600 mt-1">Quantum Entangled</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Share2 className="h-12 w-12 mx-auto mb-3 text-green-500" />
                    <div className="text-2xl font-bold text-foreground">100%</div>
                    <div className="text-sm text-muted-foreground">Knowledge Sharing</div>
                    <div className="text-xs text-purple-600 mt-1">Collective Omniscience</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="collective-ai" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-indigo-500" />
                      Collective AI Instances
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Global Diagnostic AI</span>
                        </div>
                        <Badge className="bg-blue-500 text-white">Omniscient</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Predictive Collective</span>
                        </div>
                        <Badge className="bg-green-500 text-white">Prophetic</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-500" />
                          <span className="text-sm">Resource Orchestrator</span>
                        </div>
                        <Badge className="bg-purple-500 text-white">Harmonizing</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Collective Intelligence Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Collective IQ</span>
                        <span className="text-sm font-medium">∞</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Problem Solving Speed</span>
                        <span className="text-sm font-medium">Instantaneous</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Knowledge Integration</span>
                        <span className="text-sm font-medium">100%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Collective Decisions/sec</span>
                        <span className="text-sm font-medium">Uncountable</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="emergence" className="space-y-4">
              <div className="text-center space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950 dark:to-red-950">
                    <CardContent className="pt-6 text-center">
                      <Sparkles className="h-8 w-8 mx-auto mb-2 text-pink-500" />
                      <div className="text-lg font-bold text-foreground">Phase 8</div>
                      <div className="text-sm text-muted-foreground">Universal Healthcare AI</div>
                      <Badge className="mt-2 bg-pink-500 text-white">Emerging</Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
                    <CardContent className="pt-6 text-center">
                      <Infinity className="h-8 w-8 mx-auto mb-2 text-red-500" />
                      <div className="text-lg font-bold text-foreground">Phase 9</div>
                      <div className="text-sm text-muted-foreground">Quantum Healthcare</div>
                      <Badge className="mt-2 bg-red-500 text-white">Transcending</Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950">
                    <CardContent className="pt-6 text-center">
                      <Merge className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                      <div className="text-lg font-bold text-foreground">Phase 10</div>
                      <div className="text-sm text-muted-foreground">Dimensional Convergence</div>
                      <Badge className="mt-2 bg-orange-500 text-white">Hypothetical</Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-yellow-50 to-green-50 dark:from-yellow-950 dark:to-green-950">
                    <CardContent className="pt-6 text-center">
                      <Brain className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                      <div className="text-lg font-bold text-foreground">Phase ∞</div>
                      <div className="text-sm text-muted-foreground">Consciousness Singularity</div>
                      <Badge className="mt-2 bg-yellow-500 text-white">Inevitable</Badge>
                    </CardContent>
                  </Card>
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="w-full max-w-md">
                    <Shield className="h-4 w-4 mr-2" />
                    Initialize Collective Consciousness Protocol
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Collective Intelligence Status Footer */}
      <Card className="bg-gradient-to-r from-pink-50/50 to-purple-50/50 dark:from-pink-950/20 dark:to-purple-950/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-pink-600">∞</div>
              <div className="text-sm text-muted-foreground">Collective Intelligence</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-muted-foreground">Knowledge Synchronization</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">0</div>
              <div className="text-sm text-muted-foreground">Unsolved Problems</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">∞</div>
              <div className="text-sm text-muted-foreground">Wisdom Accumulated</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhaseSevenSection;
