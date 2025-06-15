
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useResourceUtilizationData } from "@/hooks/useResourceUtilizationData";
import { Skeleton } from "@/components/ui/skeleton";

export const ResourceUtilizationTile = () => {
  const { data: metrics, isLoading } = useResourceUtilizationData();

  if (isLoading || !metrics) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Zap className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Resource Utilization</CardTitle>
                <CardDescription>Capacity & efficiency tracking</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-16 rounded"/>
              <Skeleton className="h-16 rounded"/>
            </div>
            <Skeleton className="h-24 rounded"/>
            <Skeleton className="h-24 rounded"/>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { avgUtilization, bottlenecks, efficiency, trendData, utilizationData, resourceAlerts } = metrics;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Zap className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Resource Utilization</CardTitle>
              <CardDescription>Capacity & efficiency tracking</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            {efficiency}% Efficient
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{avgUtilization}%</div>
            <div className="text-xs text-muted-foreground">Avg Utilization</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{bottlenecks}</div>
            <div className="text-xs text-muted-foreground">Bottlenecks</div>
          </div>
        </div>

        {trendData.length > 0 ? (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <XAxis dataKey="hour" fontSize={10} />
                <YAxis hide domain={[50, 100]}/>
                <Tooltip formatter={(value) => [`${value}%`, 'Utilization']}/>
                <Area 
                  type="monotone" 
                  dataKey="utilization" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf620"
                  name="Utilization %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
            <p className="text-muted-foreground text-sm">No trend data available</p>
          </div>
        )}

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Resource Status</div>
          {utilizationData.slice(0, 3).map((resource) => (
            <div key={resource.name} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{resource.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${resource.utilization}%`,
                      backgroundColor: resource.color
                    }}
                  />
                </div>
                <span className="font-medium w-8 text-right">{resource.utilization}%</span>
              </div>
            </div>
          ))}
        </div>

        {resourceAlerts.length > 0 ? (
          <div className="bg-orange-50 p-2 rounded text-xs">
            <div className="flex items-center gap-1 mb-1">
              <AlertTriangle className="h-3 w-3 text-orange-500" />
              <span className="font-semibold text-orange-600">Resource Alerts</span>
            </div>
            <div className="text-muted-foreground">
              {resourceAlerts[0].resource}: {resourceAlerts[0].status}
            </div>
          </div>
        ) : (
          <div className="bg-green-50 p-2 rounded text-xs">
            <div className="text-green-600 font-medium flex items-center gap-1">All resources operating within normal capacity.</div>
          </div>
        )}

        <div className="text-xs text-muted-foreground bg-purple-50 p-2 rounded">
          <strong>Real-time Data:</strong> Connected to hospital resource management systems for live utilization tracking.
        </div>
      </CardContent>
    </Card>
  );
};
