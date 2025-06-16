
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, CheckCircle, Activity, Network } from "lucide-react";

const AutomationSyncTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          Automation Synchronization
        </CardTitle>
        <CardDescription>
          Monitor and control cross-module automation flows
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium text-green-600">SLA Breach Prevention</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Automatically triggers workflow optimization when SLA thresholds are approached
            </p>
            <div className="text-xs text-green-600">
              ✓ Connected to: Workflow Engine, Metrics Analytics, Alert System
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-blue-600">Surge Prediction Response</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Auto-scales resources and adjusts workflows based on patient volume predictions
            </p>
            <div className="text-xs text-blue-600">
              ✓ Connected to: Predictive Models, Resource Manager, Dashboard Updates
            </div>
          </div>

          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Network className="h-5 w-5 text-purple-500" />
              <span className="font-medium text-purple-600">Data Quality Monitoring</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Monitors pipeline data quality and triggers cleansing workflows automatically
            </p>
            <div className="text-xs text-purple-600">
              ✓ Connected to: Data Pipelines, Quality Metrics, Workflow Triggers
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationSyncTab;
