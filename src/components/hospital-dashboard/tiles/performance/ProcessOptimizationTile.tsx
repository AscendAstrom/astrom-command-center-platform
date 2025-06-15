
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useProcessOptimizationData } from "@/hooks/useProcessOptimizationData";
import { Skeleton } from "@/components/ui/skeleton";

export const ProcessOptimizationTile = () => {
  const { data: metrics, isLoading } = useProcessOptimizationData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Optimized': return 'text-green-600 bg-green-50 border-green-200';
      case 'In Progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Needs Attention': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (isLoading || !metrics) {
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
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-16 rounded" />
              <Skeleton className="h-16 rounded" />
            </div>
            <Skeleton className="h-24 rounded" />
            <Skeleton className="h-24 rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const { automatedProcesses, timeSavedToday, overallEfficiency, costSavings, optimizationData, processes } = metrics;
  const efficiencyGain = overallEfficiency - 78;

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
            {efficiencyGain >= 0 ? '+' : ''}{efficiencyGain}% Efficiency
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-blue-600">{timeSavedToday}</div>
            <div className="text-xs text-muted-foreground">Minutes Saved Today</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-600">{automatedProcesses}</div>
            <div className="text-xs text-muted-foreground">Automated Processes</div>
          </div>
        </div>

        {optimizationData.length > 0 ? (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={optimizationData}>
                <XAxis dataKey="week" fontSize={10} />
                <YAxis hide />
                <Tooltip formatter={(value, name) => [typeof value === 'number' ? `${value.toFixed(1)}` : value, name]}/>
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
        ) : (
          <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
            <p className="text-muted-foreground text-sm">No optimization data available</p>
          </div>
        )}

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
          <strong>Savings:</strong> ${costSavings.toLocaleString()} saved this month through process optimization.
        </div>
      </CardContent>
    </Card>
  );
};
