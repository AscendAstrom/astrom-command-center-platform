
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Hospital } from "lucide-react";

const MonitoringTabContent = () => {
  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-purple-400" />
          Source Monitoring & Alerts
        </CardTitle>
        <CardDescription>
          Configure monitoring rules and automated alerts for data sources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Active Monitors</h3>
            <div className="space-y-3">
              <div className="p-4 bg-muted/50 rounded-lg border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">Data Freshness</span>
                  <Badge className="bg-green-500/10 text-green-600">Active</Badge>
                </div>
                <div className="text-sm text-muted-foreground">Alert if data greater than 15 minutes old</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">Quality Threshold</span>
                  <Badge className="bg-blue-500/10 text-blue-600">Active</Badge>
                </div>
                <div className="text-sm text-muted-foreground">Alert if quality less than 95%</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
            <div className="space-y-3">
              <div className="p-4 bg-muted/50 rounded-lg border border-orange-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground text-sm">KFSH Connection</span>
                  <span className="text-xs text-muted-foreground">2m ago</span>
                </div>
                <div className="text-xs text-muted-foreground">Temporary connection timeout - Auto-resolved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bed Management Monitoring Example */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Hospital className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold text-foreground">Bed Management Monitoring Rules</h3>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Cultural Compliance</Badge>
          </div>
          <p className="text-muted-foreground mb-4">
            Specialized monitoring for Saudi healthcare requirements including gender segregation compliance and MOH reporting standards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Cultural Compliance Monitors</h4>
              <div className="p-3 bg-muted/50 rounded-lg border border-blue-500/20">
                <div className="font-medium text-foreground text-sm mb-1">Gender Segregation Check</div>
                <div className="text-xs text-muted-foreground">
                  Alerts on mixed-gender ward assignments outside ICU
                </div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg border border-green-500/20">
                <div className="font-medium text-foreground text-sm mb-1">Family Room Availability</div>
                <div className="text-xs text-muted-foreground">
                  Monitors family room requests vs availability
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Regulatory Compliance</h4>
              <div className="p-3 bg-muted/50 rounded-lg border border-orange-500/20">
                <div className="font-medium text-foreground text-sm mb-1">MOH Reporting Deadline</div>
                <div className="text-xs text-muted-foreground">
                  Daily reporting requirements to Ministry of Health
                </div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg border border-purple-500/20">
                <div className="font-medium text-foreground text-sm mb-1">Capacity Utilization</div>
                <div className="text-xs text-muted-foreground">
                  Alerts on overcapacity or underutilization
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonitoringTabContent;
