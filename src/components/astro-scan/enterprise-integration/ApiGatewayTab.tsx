
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network } from "lucide-react";
import { IntegrationStatus } from "./types";
import { getStatusColor } from "./utils";

interface ApiGatewayTabProps {
  activeIntegrations: IntegrationStatus[];
}

export const ApiGatewayTab = ({ activeIntegrations }: ApiGatewayTabProps) => {
  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5 text-blue-400" />
          Enterprise API Gateway
        </CardTitle>
        <CardDescription>
          Centralized API management with enterprise security and monitoring
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total API Calls (24h)</span>
              <span className="text-lg font-bold text-blue-400">2.4M</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Average Response Time</span>
              <span className="text-lg font-bold text-green-400">125ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Error Rate</span>
              <span className="text-lg font-bold text-orange-400">0.02%</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active Endpoints</span>
              <span className="text-lg font-bold text-purple-400">186</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Rate Limit Hits</span>
              <span className="text-lg font-bold text-yellow-400">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active Webhooks</span>
              <span className="text-lg font-bold text-cyan-400">42</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Active Integrations</h4>
          {activeIntegrations.map((integration, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  integration.status === 'active' ? 'bg-green-400' :
                  integration.status === 'maintenance' ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
                <span className="font-medium">{integration.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Uptime</div>
                  <div className="text-sm font-medium">{integration.uptime}%</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Throughput</div>
                  <div className="text-sm font-medium">{integration.throughput}</div>
                </div>
                <Badge variant="outline" className={getStatusColor(integration.status)}>
                  {integration.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
