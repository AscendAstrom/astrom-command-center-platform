
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Zap, TrendingUp, AlertTriangle, Activity } from 'lucide-react';
import RuleBuilder from './RuleBuilder';
import AIModelService from './AIModelService';
import SLABreachRadar from './SLABreachRadar';
import NLPAssistant from './NLPAssistant';
import SurgePredictor from './SurgePredictor';
import { FlowUserRole } from './types';

interface EnhancedRuleBuilderProps {
  userRole: FlowUserRole;
}

const EnhancedRuleBuilder = ({ userRole }: EnhancedRuleBuilderProps) => {
  const [activeTab, setActiveTab] = useState("ai-models");

  return (
    <div className="space-y-6">
      {/* AI-Powered Status Header */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-foreground">AI-Powered ASTRO-FLOW</CardTitle>
                <CardDescription className="text-lg">
                  Intelligent automation with real-time AI predictions and natural language control
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">94%</div>
                <div className="text-sm text-muted-foreground">AI Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">247</div>
                <div className="text-sm text-muted-foreground">Predictions Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">12</div>
                <div className="text-sm text-muted-foreground">Active AI Rules</div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-muted/50">
          <TabsTrigger value="ai-models" className="data-[state=active]:bg-purple-500/20">
            <Brain className="h-4 w-4 mr-2" />
            AI Models
          </TabsTrigger>
          <TabsTrigger value="sla-radar" className="data-[state=active]:bg-red-500/20">
            <AlertTriangle className="h-4 w-4 mr-2" />
            SLA Radar
          </TabsTrigger>
          <TabsTrigger value="surge-predictor" className="data-[state=active]:bg-blue-500/20">
            <TrendingUp className="h-4 w-4 mr-2" />
            Surge AI
          </TabsTrigger>
          <TabsTrigger value="nlp-assistant" className="data-[state=active]:bg-green-500/20">
            <Activity className="h-4 w-4 mr-2" />
            AI Assistant
          </TabsTrigger>
          <TabsTrigger value="rules" className="data-[state=active]:bg-orange-500/20">
            <Zap className="h-4 w-4 mr-2" />
            Rules Engine
          </TabsTrigger>
          <TabsTrigger value="automation" className="data-[state=active]:bg-cyan-500/20">
            <Brain className="h-4 w-4 mr-2" />
            Automation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-models">
          <AIModelService userRole={userRole} />
        </TabsContent>

        <TabsContent value="sla-radar">
          <SLABreachRadar userRole={userRole} />
        </TabsContent>

        <TabsContent value="surge-predictor">
          <SurgePredictor userRole={userRole} />
        </TabsContent>

        <TabsContent value="nlp-assistant">
          <NLPAssistant userRole={userRole} />
        </TabsContent>

        <TabsContent value="rules">
          <RuleBuilder userRole={userRole} />
        </TabsContent>

        <TabsContent value="automation">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Brain className="h-5 w-5 text-cyan-500" />
                AI Automation Workflows
              </CardTitle>
              <CardDescription>
                Automated actions triggered by AI predictions and real-time events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Active Automations</h3>
                  
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">SLA Breach Prevention</span>
                      <Badge className="bg-green-600">ACTIVE</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Auto-alerts staff when AI predicts SLA breach risk greater than 85%
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Triggered 23 times today • 89% success rate
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">Surge Response</span>
                      <Badge className="bg-blue-600">ACTIVE</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Pre-allocates resources when surge prediction confidence greater than 90%
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Triggered 7 times today • 94% accuracy
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">Patient Routing Optimizer</span>
                      <Badge className="bg-purple-600">ACTIVE</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      AI suggests optimal zone assignment based on capacity and wait times
                    </p>
                    <div className="text-xs text-muted-foreground">
                      156 recommendations today • 92% acceptance rate
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Workflow Performance</h3>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">94%</div>
                      <div className="text-sm text-muted-foreground">Overall Automation Success</div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400">247</div>
                      <div className="text-sm text-muted-foreground">Automated Actions Today</div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400">18min</div>
                      <div className="text-sm text-muted-foreground">Avg Response Time Saved</div>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    Configure New Automation
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

export default EnhancedRuleBuilder;
