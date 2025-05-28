
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const AIRolesConfigurationTab = () => {
  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground">Global AI Configuration</CardTitle>
        <CardDescription>Configure AI agent behavior and thresholds</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Performance Thresholds</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Minimum Accuracy</span>
                  <Badge variant="outline">85%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Alert Threshold</span>
                  <Badge variant="outline">3 failures</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Auto-retrain Trigger</span>
                  <Badge variant="outline">Weekly</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">System Integration</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">OpenAI Integration</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Auto-escalation</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Learning Mode</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Save Configuration
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRolesConfigurationTab;
