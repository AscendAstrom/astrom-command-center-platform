
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Plus, 
  Play, 
  Pause, 
  Brain, 
  Bell, 
  Clock,
  TrendingUp,
  AlertTriangle,
  MessageSquare
} from "lucide-react";

const automationRules = [
  {
    id: 1,
    name: 'High Wait Time Alert',
    description: 'Notify managers when wait time exceeds 45 minutes',
    trigger: 'Wait time > 45 min',
    action: 'Send Slack alert to ED managers',
    status: 'active',
    executions: 47,
    success: 98,
    icon: Clock,
  },
  {
    id: 2,
    name: 'Capacity Overflow Prediction',
    description: 'Predict and alert for capacity issues 2 hours ahead',
    trigger: 'ML prediction model',
    action: 'Alert + suggest bed allocation',
    status: 'active',
    executions: 23,
    success: 91,
    icon: Brain,
  },
  {
    id: 3,
    name: 'Patient SLA Breach',
    description: 'Alert when patients breach service level agreements',
    trigger: 'SLA timer expires',
    action: 'Multi-channel notification',
    status: 'active',
    executions: 156,
    success: 99,
    icon: AlertTriangle,
  },
  {
    id: 4,
    name: 'Surge Staffing Alert',
    description: 'Auto-suggest staffing adjustments during patient surges',
    trigger: 'Patient influx > threshold',
    action: 'Send staffing recommendations',
    status: 'paused',
    executions: 12,
    success: 83,
    icon: TrendingUp,
  },
];

const recentExecutions = [
  {
    id: 1,
    rule: 'High Wait Time Alert',
    timestamp: '2 min ago',
    result: 'success',
    details: 'Alert sent to 3 managers - Zone B wait time: 52 min',
  },
  {
    id: 2,
    rule: 'Patient SLA Breach',
    timestamp: '8 min ago',
    result: 'success',
    details: 'SMS sent to nurse station - Patient #4721 exceeded 90min target',
  },
  {
    id: 3,
    rule: 'Capacity Overflow Prediction',
    timestamp: '15 min ago',
    result: 'success',
    details: 'Predicted 95% capacity at 3PM - Suggested opening overflow unit',
  },
  {
    id: 4,
    rule: 'High Wait Time Alert',
    timestamp: '22 min ago',
    result: 'failed',
    details: 'Failed to send Slack notification - Connection timeout',
  },
];

const Automation = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 border-green-400';
      case 'paused':
        return 'text-yellow-400 border-yellow-400';
      case 'disabled':
        return 'text-slate-400 border-slate-400';
      default:
        return 'text-slate-400 border-slate-400';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Automation & AI Engine</h1>
          <p className="text-slate-400">Intelligent automation rules and predictive alerts</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Rule
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-cyan-400" />
              <div>
                <p className="text-sm text-slate-400">Active Rules</p>
                <p className="text-xl font-bold text-white">12</p>
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
                <p className="text-xl font-bold text-white">847</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-slate-400">Alerts Sent</p>
                <p className="text-xl font-bold text-white">1,247</p>
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
                <p className="text-xl font-bold text-white">96.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Automation Rules */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Automation Rules</CardTitle>
            <CardDescription>Configure and manage your automation workflows</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {automationRules.map((rule) => {
              const Icon = rule.icon;
              return (
                <div key={rule.id} className="p-4 rounded-lg border border-slate-800 bg-slate-800/30">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-slate-700 p-2 rounded-lg">
                        <Icon className="h-4 w-4 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{rule.name}</h3>
                        <p className="text-sm text-slate-400 mt-1">{rule.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={rule.status === 'active'} />
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        {rule.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Trigger:</span>
                      <span className="text-slate-300">{rule.trigger}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Action:</span>
                      <span className="text-slate-300">{rule.action}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700">
                    <Badge variant="outline" className={getStatusColor(rule.status)}>
                      {rule.status.charAt(0).toUpperCase() + rule.status.slice(1)}
                    </Badge>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>{rule.executions} executions</span>
                      <span className="text-green-400">{rule.success}% success</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Executions */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Executions</CardTitle>
            <CardDescription>Latest automation rule executions and results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentExecutions.map((execution) => (
              <div key={execution.id} className="p-3 rounded-lg border border-slate-800 bg-slate-800/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">{execution.rule}</h4>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={execution.result === 'success' ? 'text-green-400 border-green-400' : 'text-red-400 border-red-400'}
                    >
                      {execution.result}
                    </Badge>
                    <span className="text-xs text-slate-400">{execution.timestamp}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400">{execution.details}</p>
              </div>
            ))}
            
            <div className="text-center pt-2">
              <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                View All Executions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            AI-Powered Insights & Predictions
          </CardTitle>
          <CardDescription>Machine learning models and predictive analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Patient Flow Prediction</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Next 2 hours</span>
                  <span className="text-cyan-400">+15 patients</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-slate-400">
                  Confidence: 91% - Based on historical patterns and current trends
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-white">Capacity Alert</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Risk Level</span>
                  <span className="text-yellow-400">Medium</span>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-xs text-slate-400">
                  Predicted overflow at 3:30 PM - Consider activating backup units
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-white">Staff Optimization</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Efficiency</span>
                  <span className="text-green-400">Optimal</span>
                </div>
                <Progress value={88} className="h-2" />
                <p className="text-xs text-slate-400">
                  Current staffing levels are optimal for predicted patient load
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Automation;
