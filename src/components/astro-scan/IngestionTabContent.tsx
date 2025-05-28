
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Hospital, Brain, TrendingUp, Shield } from "lucide-react";
import { IngestionDashboard } from "@/components/astro-scan/IngestionDashboard";
import RealTimeBedManagementTable from "@/components/astro-scan/RealTimeBedManagementTable";
import PredictiveAnalyticsDashboard from "@/components/astro-scan/PredictiveAnalyticsDashboard";
import AdvancedMonitoringPanel from "@/components/astro-scan/AdvancedMonitoringPanel";
import DataQualityScoring from "@/components/astro-scan/DataQualityScoring";

const IngestionTabContent = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-card/80 border-border backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-400" />
            Data Ingestion Dashboard
          </CardTitle>
          <CardDescription>
            Monitor real-time data ingestion with quality metrics and alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <IngestionDashboard />
        </CardContent>
      </Card>

      {/* Phase 3: Predictive Analytics */}
      <div className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-foreground">Phase 3: Advanced Analytics & Intelligence</h3>
          <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">Phase 3 Active</Badge>
        </div>
        <p className="text-muted-foreground mb-6">
          Advanced predictive analytics, intelligent monitoring, and machine learning-powered insights 
          for proactive healthcare data management.
        </p>

        <PredictiveAnalyticsDashboard />
      </div>

      {/* Enhanced Real-time Bed Management */}
      <div className="p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Hospital className="h-5 w-5 text-green-400" />
          <h3 className="text-lg font-semibold text-foreground">Epic 3.2: Intelligent Bed Management</h3>
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Phase 3 Enhanced</Badge>
        </div>
        <p className="text-muted-foreground mb-6">
          AI-powered bed management with predictive occupancy forecasting, automated capacity planning,
          and intelligent resource allocation algorithms.
        </p>

        <RealTimeBedManagementTable />
      </div>

      {/* Advanced Monitoring & Data Quality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-foreground">Advanced Monitoring</h3>
            <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">Enhanced</Badge>
          </div>
          <p className="text-muted-foreground mb-4">
            Intelligent alerting with SLA breach prediction and automated escalation workflows.
          </p>
          <AdvancedMonitoringPanel />
        </div>

        <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-foreground">Data Quality Intelligence</h3>
            <Badge className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">AI-Powered</Badge>
          </div>
          <p className="text-muted-foreground mb-4">
            Real-time data quality scoring with automated validation and enrichment processes.
          </p>
          <DataQualityScoring />
        </div>
      </div>
    </div>
  );
};

export default IngestionTabContent;
