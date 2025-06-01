
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, TrendingUp, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const ProcessOptimizationTile = () => {
  const optimizationData = [
    { week: 'W1', efficiency: 78, automation: 45, timesSaved: 2.3 },
    { week: 'W2', efficiency: 82, automation: 52, timesSaved: 3.1 },
    { week: 'W3', efficiency: 85, automation: 58, timesSaved: 4.2 },
    { week: 'W4', efficiency: 88, automation: 63, timesSaved: 5.1 }
  ];

  const processes = [
    { name: 'Patient Admission', efficiency: 92, timeSaved: '18 min', status: 'Optimized' },
    { name: 'Discharge Planning', efficiency: 87, timeSaved: '25 min', status: 'In Progress' },
    { name: 'Lab Results', efficiency: 94, timeSaved: '12 min', status: 'Optimized' },
    { name: 'Medication Orders', efficiency: 89, timeSaved: '15 min', status: 'In Progress' }
  ];

  const metrics = {
    overallEfficiency: 89,
    automatedProcesses: 24,
    timeSavedToday: 156,
    costSavings: 45000
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Optimized': return 'text-green-600 bg-green-50';
      case 'In Progress': return 'text-blue-600 bg-blue-50';
      case 'Needs Attention': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Settings className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Process Optimization</CardTitle>
              <CardDescription>Workflow efficiency tracking</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            +{metrics.overallEfficiency - 78}% Efficiency
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-blue-600">{metrics.timeSavedToday}</div>
            <div className="text-xs text-muted-foreground">Minutes Saved Today</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-600">{metrics.automatedProcesses}</div>
            <div className="text-xs text-muted-foreground">Automated Processes</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={optimizationData}>
              <XAxis dataKey="week" fontSize={10} />
              <YAxis hide />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="efficiency" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Efficiency %"
              />
              <Line 
                type="monotone" 
                dataKey="automation" 
                stroke="#22c55e" 
                strokeWidth={2}
                name="Automation %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Process Status</div>
          {processes.slice(0, 3).map((process, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground truncate">{process.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{process.timeSaved}</span>
                <Badge variant="outline" className={getStatusColor(process.status)}>
                  {process.efficiency}%
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
          <strong>Savings:</strong> ${metrics.costSavings.toLocaleString()} saved this month through process optimization.
        </div>
      </CardContent>
    </Card>
  );
};
