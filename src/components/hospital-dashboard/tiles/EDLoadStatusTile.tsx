
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Users } from "lucide-react";

export const EDLoadStatusTile = () => {
  const metrics = {
    queueCount: 14,
    avgWaitTime: 42,
    triageLevel: {
      level1: 2,  // Critical
      level2: 4,  // Urgent  
      level3: 5,  // Less urgent
      level4: 3   // Non-urgent
    }
  };

  const getStatusLevel = (waitTime: number) => {
    if (waitTime > 60) return { level: 'red', text: 'Critical', color: 'bg-red-100 text-red-700' };
    if (waitTime > 30) return { level: 'orange', text: 'Warning', color: 'bg-orange-100 text-orange-700' };
    return { level: 'green', text: 'Normal', color: 'bg-green-100 text-green-700' };
  };

  const status = getStatusLevel(metrics.avgWaitTime);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">ED Load Status</CardTitle>
              <CardDescription>Emergency department monitoring</CardDescription>
            </div>
          </div>
          <Badge className={status.color}>
            {status.text}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Queue Count</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">{metrics.queueCount}</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Avg Wait</span>
            </div>
            <div className="text-3xl font-bold text-orange-600">{metrics.avgWaitTime}m</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Triage Breakdown</div>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center p-2 bg-red-50 rounded">
              <div className="text-lg font-bold text-red-600">{metrics.triageLevel.level1}</div>
              <div className="text-xs text-red-600">Critical</div>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded">
              <div className="text-lg font-bold text-orange-600">{metrics.triageLevel.level2}</div>
              <div className="text-xs text-orange-600">Urgent</div>
            </div>
            <div className="text-center p-2 bg-yellow-50 rounded">
              <div className="text-lg font-bold text-yellow-600">{metrics.triageLevel.level3}</div>
              <div className="text-xs text-yellow-600">Less Urgent</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded">
              <div className="text-lg font-bold text-green-600">{metrics.triageLevel.level4}</div>
              <div className="text-xs text-green-600">Non-urgent</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge variant="outline" className={`flex-1 justify-center ${
            metrics.avgWaitTime > 60 ? 'border-red-200 text-red-600' : 
            metrics.avgWaitTime > 30 ? 'border-orange-200 text-orange-600' : 
            'border-green-200 text-green-600'
          }`}>
            {status.text} Load
          </Badge>
        </div>

        <div className="text-xs text-muted-foreground bg-orange-50 p-2 rounded">
          <strong>Bottleneck Resolver:</strong> Room 3 discharge will reduce wait time by 8 minutes.
        </div>
      </CardContent>
    </Card>
  );
};
