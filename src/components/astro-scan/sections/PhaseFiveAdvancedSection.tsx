
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Target, TrendingUp, Activity, AlertTriangle } from 'lucide-react';
import PredictiveInsightsPanel from '@/components/analytics/PredictiveInsightsPanel';

const PhaseFiveAdvancedSection = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border-purple-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-foreground">Phase 5: Advanced AI Intelligence</CardTitle>
                <CardDescription className="text-lg">
                  Autonomous decision-making with predictive analytics and real-time optimization
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-purple-500 text-white">ACTIVE</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* AI Capabilities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Predictive Analytics */}
        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              Predictive Analytics Engine
            </CardTitle>
            <CardDescription>
              Real-time surge prediction and capacity forecasting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">94%</div>
                <div className="text-xs text-muted-foreground">Prediction Accuracy</div>
              </div>
              <div className="text-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">247</div>
                <div className="text-xs text-muted-foreground">Active Predictions</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Surge Detection</span>
                <Badge className="bg-green-500 text-white">Active</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Capacity Optimization</span>
                <Badge className="bg-green-500 text-white">Active</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Resource Allocation AI</span>
                <Badge className="bg-green-500 text-white">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Autonomous Decision Engine */}
        <Card className="border-indigo-200 dark:border-indigo-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Zap className="h-5 w-5 text-indigo-500" />
              Autonomous Decision Engine
            </CardTitle>
            <CardDescription>
              AI-powered automated responses and workflow optimization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">156</div>
                <div className="text-xs text-muted-foreground">Decisions/Hour</div>
              </div>
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Auto Staff Allocation</span>
                <Badge className="bg-blue-500 text-white">Running</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Smart Bed Assignment</span>
                <Badge className="bg-blue-500 text-white">Running</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Workflow Optimization</span>
                <Badge className="bg-blue-500 text-white">Running</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Insights Panel */}
      <div className="col-span-full">
        <PredictiveInsightsPanel />
      </div>

      {/* AI Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-8 w-8 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-foreground">18min</div>
            <div className="text-sm text-muted-foreground">Avg Response Time Saved</div>
            <div className="text-xs text-green-600 mt-1">↓ 23% from last month</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-foreground">2,847</div>
            <div className="text-sm text-muted-foreground">AI Decisions Today</div>
            <div className="text-xs text-blue-600 mt-1">↑ 12% efficiency gain</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-foreground">4</div>
            <div className="text-sm text-muted-foreground">Critical Alerts Prevented</div>
            <div className="text-xs text-orange-600 mt-1">In last 24 hours</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PhaseFiveAdvancedSection;
