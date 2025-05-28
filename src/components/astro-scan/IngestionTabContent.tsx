
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Hospital } from "lucide-react";
import { IngestionDashboard } from "@/components/astro-scan/IngestionDashboard";
import EnhancedBedManagementTable from "@/components/shared/EnhancedBedManagementTable";
import { mockHierarchicalBedData, occupancyThresholds } from "@/data/mockHierarchicalBedData";

const IngestionTabContent = () => {
  return (
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

        {/* Enhanced Bed Management Ingestion Example */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Hospital className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold text-foreground">Real-time Hierarchical Bed Data Ingestion</h3>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Live Pipeline</Badge>
          </div>
          <p className="text-muted-foreground mb-4">
            Real-time ingestion of hierarchical bed data with patient flow tracking, 
            room-level details, and automated compliance validation for Saudi healthcare standards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-muted/50 rounded-lg text-center">
              <div className="text-lg font-bold text-green-400">98.7%</div>
              <div className="text-xs text-muted-foreground">Data Quality</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-400">2.3s</div>
              <div className="text-xs text-muted-foreground">Avg Latency</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg text-center">
              <div className="text-lg font-bold text-purple-400">1,250</div>
              <div className="text-xs text-muted-foreground">Records/min</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg text-center">
              <div className="text-lg font-bold text-orange-400">99.9%</div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </div>
          </div>

          <EnhancedBedManagementTable 
            data={mockHierarchicalBedData.filter(item => item.level === 'ward')} 
            showCompliance={true}
            thresholds={occupancyThresholds}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default IngestionTabContent;
