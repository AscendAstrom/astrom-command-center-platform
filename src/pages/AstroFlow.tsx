
import { useState } from "react";
import { Plus, Play, Pause, Zap, Bell, TrendingUp, AlertTriangle, Workflow, Eye, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnhancedRuleBuilder from "@/components/astro-flow/EnhancedRuleBuilder";
import RuleExecutions from "@/components/astro-flow/RuleExecutions";
import AlertSubscriptions from "@/components/astro-flow/AlertSubscriptions";

const AstroFlow = () => {
  const [isRuleBuilderOpen, setIsRuleBuilderOpen] = useState(false);

  const handleToggleRule = (ruleId: string) => {
    console.log('Toggling rule:', ruleId);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Workflow className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">ASTRO-FLOW</h1>
            <span className="text-sm text-pink-500 font-medium">AI-Powered Automation & Workflow Management</span>
            <div className="flex items-center gap-2 ml-4">
              <Brain className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-muted-foreground">Enhanced with AI Intelligence</span>
            </div>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            Create and manage AI-powered automated workflows with intelligent rule-based triggers, real-time predictions, 
            surge forecasting, and natural language control for seamless healthcare operations.
          </p>
        </div>

        <Tabs defaultValue="ai-automation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="ai-automation" className="data-[state=active]:bg-pink-500/20">
              <Brain className="h-4 w-4 mr-2" />
              AI Automation Hub
            </TabsTrigger>
            <TabsTrigger value="executions" className="data-[state=active]:bg-pink-500/20">
              Execution History
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-pink-500/20">
              Alert Configuration
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-automation" className="space-y-6">
            <EnhancedRuleBuilder userRole="ADMIN" />
          </TabsContent>
          
          <TabsContent value="executions" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Play className="h-5 w-5 text-green-500" />
                  Rule Executions & AI Performance
                </CardTitle>
                <CardDescription>
                  Monitor rule execution history, AI predictions accuracy, and automated workflow performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RuleExecutions userRole="ADMIN" />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-500" />
                  Smart Alert Subscriptions
                </CardTitle>
                <CardDescription>
                  Configure AI-driven alerts, notifications, and intelligent escalation workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertSubscriptions userRole="ADMIN" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Insights Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-foreground">
                <Brain className="h-5 w-5 text-purple-400" />
                AI Model Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SLA Breach Predictor</span>
                  <span className="text-green-400 font-bold">94.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Surge Forecaster</span>
                  <span className="text-green-400 font-bold">91.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ETTB Estimator</span>
                  <span className="text-green-400 font-bold">89.3%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-foreground">
                <Zap className="h-5 w-5 text-green-400" />
                Automation Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Actions Automated Today</span>
                  <span className="text-green-400 font-bold">247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Saved</span>
                  <span className="text-green-400 font-bold">4.2 hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SLA Breaches Prevented</span>
                  <span className="text-green-400 font-bold">18</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-foreground">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                Live AI Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">High Risk Zones</span>
                  <span className="text-red-400 font-bold">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Surge Predictions</span>
                  <span className="text-yellow-400 font-bold">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Anomalies Detected</span>
                  <span className="text-orange-400 font-bold">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AstroFlow;
