
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FlowUserRole } from '@/components/astro-flow/types';
import RuleBuilder from '@/components/astro-flow/RuleBuilder';
import RuleExecutions from '@/components/astro-flow/RuleExecutions';
import AlertSubscriptions from '@/components/astro-flow/AlertSubscriptions';
import DailySummaries from '@/components/astro-flow/DailySummaries';
import SurgePredictor from '@/components/astro-flow/SurgePredictor';
import { Activity, Zap, Brain, TrendingUp, Settings, Bell } from 'lucide-react';

const AstroFlow = () => {
  const [userRole] = useState<FlowUserRole>('ADMIN'); // Mock user role

  const canConfigureRules = userRole === 'ADMIN';
  const canSubscribeToAlerts = userRole === 'ADMIN' || userRole === 'OPS_MANAGER';
  const canViewSummaries = userRole === 'ADMIN' || userRole === 'EXEC' || userRole === 'OPS_MANAGER';

  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="h-6 w-6 text-cyan-400" />
            ASTRO-FLOW
          </h1>
          <p className="text-slate-400">Intelligent automation and predictive triggers</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            {userRole.replace('_', ' ')}
          </Badge>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-cyan-400" />
              <div>
                <p className="text-sm text-slate-400">Active Rules</p>
                <p className="text-xl font-bold text-white">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm text-slate-400">AI Predictions</p>
                <p className="text-xl font-bold text-white">156</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-slate-400">Success Rate</p>
                <p className="text-xl font-bold text-white">97.8%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-sm text-slate-400">Daily Alerts</p>
                <p className="text-xl font-bold text-white">42</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rules" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          {canConfigureRules && (
            <TabsTrigger value="rules" className="data-[state=active]:bg-cyan-600">
              <Settings className="h-4 w-4 mr-2" />
              Rule Builder
            </TabsTrigger>
          )}
          <TabsTrigger value="executions" className="data-[state=active]:bg-cyan-600">
            <Activity className="h-4 w-4 mr-2" />
            Executions
          </TabsTrigger>
          {canSubscribeToAlerts && (
            <TabsTrigger value="subscriptions" className="data-[state=active]:bg-cyan-600">
              <Bell className="h-4 w-4 mr-2" />
              Alert Subscriptions
            </TabsTrigger>
          )}
          <TabsTrigger value="surge" className="data-[state=active]:bg-cyan-600">
            <Brain className="h-4 w-4 mr-2" />
            Surge Predictor
          </TabsTrigger>
          {canViewSummaries && (
            <TabsTrigger value="summaries" className="data-[state=active]:bg-cyan-600">
              <TrendingUp className="h-4 w-4 mr-2" />
              Daily Summaries
            </TabsTrigger>
          )}
        </TabsList>

        {canConfigureRules && (
          <TabsContent value="rules">
            <RuleBuilder userRole={userRole} />
          </TabsContent>
        )}

        <TabsContent value="executions">
          <RuleExecutions userRole={userRole} />
        </TabsContent>

        {canSubscribeToAlerts && (
          <TabsContent value="subscriptions">
            <AlertSubscriptions userRole={userRole} />
          </TabsContent>
        )}

        <TabsContent value="surge">
          <SurgePredictor userRole={userRole} />
        </TabsContent>

        {canViewSummaries && (
          <TabsContent value="summaries">
            <DailySummaries userRole={userRole} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default AstroFlow;
