
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Hospital, Activity, AlertTriangle, TrendingUp, CheckCircle } from "lucide-react";
import SLAConfiguration from "@/components/astro-metrics/SLAConfiguration";
import { UserRole } from "@/components/astro-bricks/types";

interface SLAConfigurationTabProps {
  userRole: UserRole | null;
}

const SLAConfigurationTab = ({ userRole }: SLAConfigurationTabProps) => {
  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-green-400" />
          SLA Configuration & Monitoring
        </CardTitle>
        <CardDescription>
          Define service level agreements with automated breach detection and escalation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SLAConfiguration userRole={userRole} />

        {/* Bed Management SLA Example */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Hospital className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold text-foreground">Bed Management SLA Example</h3>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">MOH Compliance</Badge>
          </div>
          <p className="text-muted-foreground mb-4">
            Service level agreements for Saudi hospital bed management with automated monitoring and escalation.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg border border-green-500/20">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-400" />
                Bed Assignment SLA
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target:</span>
                  <span className="text-foreground">≤ 15 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current:</span>
                  <span className="text-green-400">12 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Met
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg border border-yellow-500/20">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                Discharge Planning SLA
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target:</span>
                  <span className="text-foreground">≤ 2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current:</span>
                  <span className="text-yellow-400">2.3 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Warning
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                Occupancy Rate SLA
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target:</span>
                  <span className="text-foreground">≤ 85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current:</span>
                  <span className="text-green-400">78%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Met
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SLAConfigurationTab;
