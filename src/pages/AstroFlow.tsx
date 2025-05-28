
import { useState } from "react";
import { Plus, Play, Pause, Zap, Bell, TrendingUp, AlertTriangle, Workflow, Eye } from "lucide-react";
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
    console.log('Toggling rule:', ruleId);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Workflow className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">ASTRO-FLOW</h1>
            <span className="text-sm text-pink-400 font-medium">Automation & Workflow Management</span>
          </div>
          <p className="text-slate-400 max-w-2xl">
            Create and manage automated workflows with rule-based triggers and intelligent data processing pipelines.
          </p>
        </div>

        <Tabs defaultValue="rules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
            <TabsTrigger value="rules" className="data-[state=active]:bg-pink-500/20">
              Rules Management
            </TabsTrigger>
            <TabsTrigger value="executions" className="data-[state=active]:bg-pink-500/20">
              Execution History
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-pink-500/20">
              Alert Configuration
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="rules" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Zap className="h-5 w-5 text-pink-400" />
                      Automation Rules
                    </CardTitle>
                    <CardDescription>
                      Manage and configure your automation rules and workflows
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setIsRuleBuilderOpen(true)}
                    className="bg-pink-600 hover:bg-pink-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Rule
                  </Button>
                </div>
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
          
          <TabsContent value="executions" className="space-y-6">
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
          
          <TabsContent value="alerts" className="space-y-6">
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
    </div>
  );
};

export default AstroFlow;
