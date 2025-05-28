
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Hospital } from "lucide-react";
import { IngestionDashboard } from "@/components/astro-scan/IngestionDashboard";
import RealTimeBedManagementTable from "@/components/astro-scan/RealTimeBedManagementTable";

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

      {/* Enhanced Real-time Bed Management */}
      <div className="p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Hospital className="h-5 w-5 text-green-400" />
          <h3 className="text-lg font-semibold text-foreground">Epic 3.1: Real-time Hierarchical Bed Management</h3>
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Phase 2 Complete</Badge>
        </div>
        <p className="text-muted-foreground mb-6">
          Advanced real-time bed management system with configurable refresh intervals, 
          data quality monitoring, and enterprise-grade performance optimization.
        </p>

        <RealTimeBedManagementTable />
      </div>
    </div>
  );
};

export default IngestionTabContent;
