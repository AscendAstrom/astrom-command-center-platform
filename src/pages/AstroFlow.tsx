
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Workflow, AlertTriangle, CheckCircle, TrendingUp, Zap } from "lucide-react";
import { RuleBuilder } from "@/components/astro-flow/RuleBuilder";
import { RulesList } from "@/components/astro-flow/RulesList";
import { RuleExecutions } from "@/components/astro-flow/RuleExecutions";
import { AlertSubscriptions } from "@/components/astro-flow/AlertSubscriptions";

const AstroFlow = () => {
  const [showRuleBuilder, setShowRuleBuilder] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRuleAdded = () => {
    setShowRuleBuilder(false);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-full animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 gradient-bg-blue rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg">
              <Workflow className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-astrom-blue via-astrom-purple to-astrom-blue bg-clip-text text-transparent font-display">
                ASTRO-FLOW
              </h1>
              <p className="text-xl text-muted-foreground font-medium mt-1">
                Intelligent Workflow & Rule Engine
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-status-success border-status-success bg-status-success/10 px-6 py-3 text-sm font-medium">
            <CheckCircle className="h-4 w-4 mr-2" />
            Engine Running
          </Badge>
          <Button 
            onClick={() => setShowRuleBuilder(true)}
            className="gradient-bg-blue hover:shadow-xl hover-lift transition-all duration-300 px-8 py-4 text-base font-semibold"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Rule
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Rules</p>
                <p className="text-4xl font-bold text-foreground">18</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-status-success" />
                  <p className="text-sm text-status-success font-semibold">+3 this week</p>
                </div>
              </div>
              <div className="w-12 h-12 gradient-bg-blue rounded-xl flex items-center justify-center shadow-lg">
                <Workflow className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Executions/Hour</p>
                <p className="text-4xl font-bold text-foreground">1.2K</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-status-success" />
                  <p className="text-sm text-status-success font-semibold">+8% from last hour</p>
                </div>
              </div>
              <div className="w-12 h-12 gradient-bg-green rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Success Rate</p>
                <p className="text-4xl font-bold text-foreground">99.7%</p>
                <p className="text-sm text-astrom-blue font-semibold">Excellent performance</p>
              </div>
              <div className="w-12 h-12 gradient-bg-green rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Failed Rules</p>
                <p className="text-4xl font-bold text-foreground">2</p>
                <p className="text-sm text-status-warning font-semibold">Require attention</p>
              </div>
              <div className="w-12 h-12 gradient-bg-orange rounded-xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Rules List */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <RulesList key={refreshTrigger} />
        </div>

        {/* Recent Executions */}
        <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <RuleExecutions />
        </div>
      </div>

      {/* Alert Subscriptions */}
      <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <AlertSubscriptions />
      </div>

      {/* Rule Builder Modal */}
      {showRuleBuilder && (
        <RuleBuilder 
          onClose={() => setShowRuleBuilder(false)}
          onRuleAdded={handleRuleAdded}
        />
      )}
    </div>
  );
};

export default AstroFlow;
