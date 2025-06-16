
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";

interface AnalyticsFlowTabProps {
  crossModuleData: any;
}

const AnalyticsFlowTab = ({ crossModuleData }: AnalyticsFlowTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-orange-400" />
          Analytics Data Flow
        </CardTitle>
        <CardDescription>
          Real-time analytics streaming and cross-module insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Active Data Streams</h3>
            
            <div className="p-3 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">Workflow → Dashboard</span>
                <Badge className="bg-green-500 text-white">LIVE</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Real-time workflow metrics streaming to executive dashboards
              </div>
            </div>

            <div className="p-3 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">Pipeline → Analytics</span>
                <Badge className="bg-blue-500 text-white">ACTIVE</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Data pipeline metrics feeding into analytics engine
              </div>
            </div>

            <div className="p-3 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">Automation → Metrics</span>
                <Badge className="bg-purple-500 text-white">STREAMING</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Automation execution data flowing to metrics collection
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Performance Metrics</h3>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {crossModuleData?.astroMetrics?.slaCompliance || 95}%
                </div>
                <div className="text-sm text-muted-foreground">SLA Compliance</div>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {crossModuleData?.astroScan?.dataQuality || 98}%
                </div>
                <div className="text-sm text-muted-foreground">Data Quality Score</div>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">
                  {crossModuleData?.astroFlow?.workflowExecutions || 45}
                </div>
                <div className="text-sm text-muted-foreground">Active Executions</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsFlowTab;
