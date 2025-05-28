
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AIRole } from './types';

interface AIRolesPerformanceTabProps {
  activeRoles: AIRole[];
}

const AIRolesPerformanceTab = ({ activeRoles }: AIRolesPerformanceTabProps) => {
  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground">AI Performance Analytics</CardTitle>
        <CardDescription>Real-time performance metrics for all active AI agents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeRoles.map(role => (
            <div key={role.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">{role.name}</h4>
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                  {role.performance.accuracy}% Accuracy
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-muted/50 p-2 rounded">
                  <div className="font-medium text-foreground">{role.performance.recommendations}</div>
                  <div className="text-muted-foreground">Recommendations</div>
                </div>
                <div className="bg-muted/50 p-2 rounded">
                  <div className="font-medium text-foreground">{role.performance.successRate}%</div>
                  <div className="text-muted-foreground">Success Rate</div>
                </div>
                <div className="bg-muted/50 p-2 rounded">
                  <div className="font-medium text-foreground">24/7</div>
                  <div className="text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRolesPerformanceTab;
