
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Clock, TrendingUp, Zap } from "lucide-react";
import { Sankey } from "recharts";

export const WorkflowAnalyticsTile = () => {
  const workflowMetrics = [
    { process: 'Patient Registration', avgTime: 8.5, target: 10, efficiency: 94 },
    { process: 'Triage Assessment', avgTime: 12.2, target: 15, efficiency: 92 },
    { process: 'Clinical Consultation', avgTime: 28.5, target: 30, efficiency: 89 },
    { process: 'Diagnostic Tests', avgTime: 45.3, target: 50, efficiency: 87 },
    { process: 'Treatment Planning', avgTime: 18.7, target: 20, efficiency: 91 },
    { process: 'Discharge Process', avgTime: 22.1, target: 25, efficiency: 88 }
  ];

  const bottleneckAnalysis = [
    { step: 'Lab Results Wait', delay: 15.2, impact: 'High', frequency: 78 },
    { step: 'Bed Assignment', delay: 8.7, impact: 'Medium', frequency: 45 },
    { step: 'Physician Availability', delay: 12.3, impact: 'High', frequency: 62 },
    { step: 'Equipment Setup', delay: 6.8, impact: 'Low', frequency: 32 }
  ];

  const processImprovements = [
    { improvement: 'Automated Lab Ordering', timeSaved: 8.5, implementation: 'Completed' },
    { improvement: 'Digital Bed Management', timeSaved: 5.2, implementation: 'In Progress' },
    { improvement: 'Mobile Physician Alerts', timeSaved: 7.1, implementation: 'Planning' },
    { improvement: 'Pre-Registration System', timeSaved: 3.8, implementation: 'Completed' }
  ];

  const metrics = {
    avgPatientFlowTime: 135,
    workflowEfficiency: 90,
    automationLevel: 67,
    improvementOpportunities: 8
  };

  const departmentFlows = [
    { dept: 'Emergency', throughput: 156, avgTime: 185, efficiency: 88 },
    { dept: 'Surgery', throughput: 89, avgTime: 245, efficiency: 92 },
    { dept: 'Radiology', throughput: 234, avgTime: 35, efficiency: 94 },
    { dept: 'Laboratory', throughput: 445, avgTime: 28, efficiency: 89 }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getImplementationColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-50';
      case 'In Progress': return 'text-blue-600 bg-blue-50';
      case 'Planning': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <GitBranch className="h-5 w-5 text-indigo-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Workflow Analytics</CardTitle>
              <CardDescription>Process flow optimization</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            {metrics.workflowEfficiency}% Efficient
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-indigo-600">{metrics.avgPatientFlowTime}m</div>
            <div className="text-xs text-muted-foreground">Avg Flow Time</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{metrics.automationLevel}%</div>
            <div className="text-xs text-muted-foreground">Automation Level</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Process Performance</div>
          {workflowMetrics.slice(0, 3).map((process, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground truncate">{process.process}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{process.avgTime}m</span>
                <div className={`w-2 h-2 rounded-full ${
                  process.avgTime <= process.target ? 'bg-green-500' : 'bg-orange-500'
                }`} />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Active Bottlenecks</div>
          {bottleneckAnalysis.slice(0, 2).map((bottleneck, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground truncate">{bottleneck.step}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">+{bottleneck.delay}m</span>
                <Badge variant="outline" className={getImpactColor(bottleneck.impact)}>
                  {bottleneck.impact}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-indigo-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <Zap className="h-3 w-3 text-indigo-500" />
            <span className="font-semibold text-indigo-600">Process Optimization</span>
          </div>
          <div className="text-muted-foreground">
            {processImprovements[0].improvement}: -{processImprovements[0].timeSaved}min saved per patient
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
