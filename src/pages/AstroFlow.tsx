
import { useState } from "react";
import { Plus, Play, Pause, Zap, Bell, TrendingUp, AlertTriangle, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RuleBuilder from "@/components/astro-flow/RuleBuilder";
import RulesList from "@/components/astro-flow/RulesList";
import RuleExecutions from "@/components/astro-flow/RuleExecutions";
import AlertSubscriptions from "@/components/astro-flow/AlertSubscriptions";

const AstroFlow = () => {
  const [isRuleBuilderOpen, setIsRuleBuilderOpen] = useState(false);

  const handleToggleRule = (ruleId: string) => {
    // Handle rule toggle logic
    console.log('Toggling rule:', ruleId);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-full animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg">
              <Workflow className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-display">
                ASTRO-FLOW
              </h1>
              <p className="text-muted-foreground text-xl font-medium mt-1">
                Automation & Workflow Management Platform
              </p>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={() => setIsRuleBuilderOpen(true)}
          className="gradient-bg-blue hover:shadow-xl hover-lift transition-all duration-300 px-8 py-4 text-base font-semibold"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Rule
        </Button>
      </div>

      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
          <TabsTrigger value="rules" className="data-[state=active]:bg-blue-500/20">Rules</TabsTrigger>
          <TabsTrigger value="executions" className="data-[state=active]:bg-blue-500/20">Executions</TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-blue-500/20">Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rules" className="space-y-4">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-400" />
                Automation Rules
              </CardTitle>
              <CardDescription>
                Manage and configure your automation rules and workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RulesList 
                rules={[]}
                selectedRule={null}
                onSelectRule={() => {}}
                onCreateRule={() => {}}
                onToggleRule={handleToggleRule}
                userRole="ADMIN"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="executions" className="space-y-4">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Play className="h-5 w-5 text-green-400" />
                Rule Executions
              </CardTitle>
              <CardDescription>
                Monitor rule execution history and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RuleExecutions userRole="ADMIN" />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-4">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-orange-400" />
                Alert Subscriptions
              </CardTitle>
              <CardDescription>
                Configure alerts and notifications for your workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AlertSubscriptions userRole="ADMIN" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Rule Builder Modal */}
      {isRuleBuilderOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/50">
          <div className="container flex items-center justify-center min-h-screen">
            <Card className="max-w-4xl w-full mx-auto my-24 bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Rule Builder</CardTitle>
                <CardDescription>Define the conditions and actions for your automation rule.</CardDescription>
              </CardHeader>
              <CardContent>
                <RuleBuilder userRole="ADMIN" />
                <div className="flex justify-end mt-4">
                  <Button onClick={() => setIsRuleBuilderOpen(false)} variant="outline">
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default AstroFlow;
