
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Activity, Heart, Stethoscope } from "lucide-react";

const ClinicalAnalyticsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            Clinical Intelligence
          </CardTitle>
          <CardDescription>
            AI-powered clinical decision support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">AI Recommendations</span>
              <Badge variant="secondary">Ready</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Clinical Protocols</span>
              <Badge variant="secondary">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            Patient Monitoring
          </CardTitle>
          <CardDescription>
            Real-time patient status tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Vital Signs Monitoring</span>
              <Badge variant="secondary">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Alert System</span>
              <Badge variant="secondary">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Clinical Outcomes
          </CardTitle>
          <CardDescription>
            Patient outcome tracking and analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Outcome Analytics</span>
              <Badge variant="secondary">Available</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Quality Metrics</span>
              <Badge variant="secondary">Tracking</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicalAnalyticsGrid;
