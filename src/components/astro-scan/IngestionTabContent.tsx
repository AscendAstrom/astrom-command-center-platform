
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle } from "lucide-react";
import { IngestionDashboard } from "@/components/astro-scan/IngestionDashboard";
import { AIPipelineGenerator } from "@/components/astro-scan/AIPipelineGenerator";

const IngestionTabContent = () => {
  return (
    <div className="space-y-6">
      {/* Empty State Banner */}
      <Card className="bg-gradient-to-r from-muted/50 to-muted/30 border-muted-foreground/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-semibold text-muted-foreground">Data Ingestion Not Active</div>
              <div className="text-sm text-muted-foreground/70">
                Configure data sources to begin AI-enhanced ingestion and cross-module integration
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            AI-Enhanced Data Ingestion
          </CardTitle>
          <CardDescription>
            Advanced AI-powered data ingestion with real-time quality monitoring, predictive analytics, and intelligent optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <IngestionDashboard />
        </CardContent>
      </Card>

      <AIPipelineGenerator />
    </div>
  );
};

export default IngestionTabContent;
