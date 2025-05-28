
import { useState } from "react";
import { Plus, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RuleBuilder from "@/components/astro-flow/RuleBuilder";
import RulesList from "@/components/astro-flow/RulesList";
import RuleExecutions from "@/components/astro-flow/RuleExecutions";
import AlertSubscriptions from "@/components/astro-flow/AlertSubscriptions";

const AstroFlow = () => {
  const [isRuleBuilderOpen, setIsRuleBuilderOpen] = useState(false);

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Astro Flow</h2>
          <p className="text-muted-foreground">Automate tasks and workflows with intelligent rules.</p>
        </div>
        <Button onClick={() => setIsRuleBuilderOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Rule
        </Button>
      </div>

      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rules">Rules</TabsTrigger>
          <TabsTrigger value="executions">Executions</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="rules" className="space-y-4">
          <RulesList 
            rules={[]} 
            selectedRule={null} 
            onSelectRule={() => {}} 
            onCreateRule={() => setIsRuleBuilderOpen(true)}
            onEditRule={() => {}}
          />
        </TabsContent>
        <TabsContent value="executions" className="space-y-4">
          <RuleExecutions userRole="admin" />
        </TabsContent>
        <TabsContent value="alerts" className="space-y-4">
          <AlertSubscriptions userRole="admin" />
        </TabsContent>
      </Tabs>

      {/* Rule Builder Modal */}
      {isRuleBuilderOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/50">
          <div className="container flex items-center justify-center min-h-screen">
            <Card className="max-w-4xl w-full mx-auto my-24">
              <CardHeader>
                <CardTitle>Rule Builder</CardTitle>
                <CardDescription>Define the conditions and actions for your automation rule.</CardDescription>
              </CardHeader>
              <CardContent>
                <RuleBuilder 
                  onSave={() => setIsRuleBuilderOpen(false)}
                  onCancel={() => setIsRuleBuilderOpen(false)}
                  userRole="admin"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default AstroFlow;
