
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Activity,
  Brain,
  AlertCircle,
  CheckCircle,
  Target,
  BarChart3
} from "lucide-react";

const ExecutiveCommandCenter = () => {
  const [kpiMetrics] = useState({
    revenue: { current: 24.7, target: 25.0, trend: 'up', change: 12.3 },
    patientSatisfaction: { current: 4.8, target: 4.7, trend: 'up', change: 3.2 },
    operationalEfficiency: { current: 94.2, target: 92.0, trend: 'up', change: 8.7 },
    costPerPatient: { current: 284, target: 300, trend: 'down', change: -5.3 },
    qualityScore: { current: 96.8, target: 95.0, trend: 'up', change: 2.1 },
    staffUtilization: { current: 87.3, target: 85.0, trend: 'up', change: 4.8 }
  });

  const [strategicInitiatives] = useState([
    { name: 'Digital Transformation', progress: 78, status: 'on-track', impact: 'High' },
    { name: 'Cost Optimization Program', progress: 92, status: 'ahead', impact: 'High' },
    { name: 'Patient Experience Enhancement', progress: 65, status: 'at-risk', impact: 'Medium' },
    { name: 'Staff Development Initiative', progress: 85, status: 'on-track', impact: 'Medium' }
  ]);

  const [operationalAlerts] = useState([
    { type: 'critical', message: 'ED capacity approaching 95% at Main Campus', time: '5 min ago' },
    { type: 'warning', message: 'OR scheduling conflicts detected for tomorrow', time: '12 min ago' },
    { type: 'info', message: 'Monthly quality metrics exceeded targets', time: '1 hour ago' }
  ]);

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <TrendingUp className="h-4 w-4 text-green-400" /> : 
           <TrendingDown className="h-4 w-4 text-red-400" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'on-track': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'at-risk': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'behind': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertCircle className="h-4 w-4 text-red-400" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-400" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Executive KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              <span className="font-medium text-sm">Revenue (M$)</span>
            </div>
            {getTrendIcon(kpiMetrics.revenue.trend)}
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-400">${kpiMetrics.revenue.current}M</div>
            <div className="text-xs text-muted-foreground">
              Target: ${kpiMetrics.revenue.target}M ({kpiMetrics.revenue.change > 0 ? '+' : ''}{kpiMetrics.revenue.change}%)
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              <span className="font-medium text-sm">Patient Satisfaction</span>
            </div>
            {getTrendIcon(kpiMetrics.patientSatisfaction.trend)}
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-blue-400">{kpiMetrics.patientSatisfaction.current}/5</div>
            <div className="text-xs text-muted-foreground">
              Target: {kpiMetrics.patientSatisfaction.target}/5 (+{kpiMetrics.patientSatisfaction.change}%)
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-400" />
              <span className="font-medium text-sm">Operational Efficiency</span>
            </div>
            {getTrendIcon(kpiMetrics.operationalEfficiency.trend)}
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-purple-400">{kpiMetrics.operationalEfficiency.current}%</div>
            <div className="text-xs text-muted-foreground">
              Target: {kpiMetrics.operationalEfficiency.target}% (+{kpiMetrics.operationalEfficiency.change}%)
            </div>
          </div>
        </Card>
      </div>

      {/* Strategic Initiatives */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-400" />
            Strategic Initiatives Progress
          </CardTitle>
          <CardDescription>
            Real-time tracking of enterprise strategic goals and initiatives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {strategicInitiatives.map((initiative, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{initiative.name}</span>
                    <Badge variant="outline" className={getStatusColor(initiative.status)}>
                      {initiative.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Impact: {initiative.impact}</span>
                    <span className="text-sm font-medium">{initiative.progress}%</span>
                  </div>
                </div>
                <Progress value={initiative.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Operational Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-cyan-400" />
              AI-Powered Insights
            </CardTitle>
            <CardDescription>
              Machine learning-driven recommendations and predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <h4 className="font-medium text-cyan-400 mb-2">Predictive Alert</h4>
                <p className="text-sm text-muted-foreground">
                  AI models predict 15% increase in ED volume this weekend. Recommend 
                  activating surge protocols and scheduling additional staff.
                </p>
              </div>
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <h4 className="font-medium text-green-400 mb-2">Optimization Opportunity</h4>
                <p className="text-sm text-muted-foreground">
                  Resource allocation can be optimized to reduce patient wait times by 
                  12% with minimal cost impact. Auto-implementation available.
                </p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <h4 className="font-medium text-purple-400 mb-2">Quality Insight</h4>
                <p className="text-sm text-muted-foreground">
                  Patient satisfaction scores show strong correlation with staff scheduling 
                  patterns. Recommend schedule optimization for peak satisfaction periods.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-orange-400" />
              Real-Time Operational Alerts
            </CardTitle>
            <CardDescription>
              Critical system notifications and escalations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {operationalAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                View All Alerts
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Configure Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Executive Actions</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Brain className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" size="sm">
                <Target className="h-4 w-4 mr-2" />
                Strategy Review
              </Button>
              <Button variant="outline" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                System Overview
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveCommandCenter;
