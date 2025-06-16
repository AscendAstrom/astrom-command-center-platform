
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Clock } from "lucide-react";

const AdvancedMonitoringPanel = () => {
  return (
    <div className="space-y-4">
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            SLA Monitoring Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 space-y-3">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground/30" />
            <h3 className="text-sm font-semibold text-muted-foreground">No SLA Monitoring Active</h3>
            <p className="text-xs text-muted-foreground/70 max-w-sm mx-auto">
              Configure data sources and set up SLA thresholds to begin monitoring service levels
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            Alert Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                <span className="text-sm text-muted-foreground">Active Alerts</span>
              </div>
              <Badge variant="outline" className="text-muted-foreground">0</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                <span className="text-sm text-muted-foreground">SLA Breaches</span>
              </div>
              <Badge variant="outline" className="text-muted-foreground">0</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Response Time</span>
              </div>
              <Badge variant="outline" className="text-muted-foreground">--</Badge>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="w-full mt-4" disabled>
            Configure Monitoring
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedMonitoringPanel;
