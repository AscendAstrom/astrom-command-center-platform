
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Hospital, Plus } from "lucide-react";
import { DataSourceList } from "@/components/astro-scan/DataSourceList";
import EnhancedBedManagementTable from "@/components/shared/EnhancedBedManagementTable";
import { mockHierarchicalBedData, occupancyThresholds } from "@/data/mockHierarchicalBedData";

interface SourcesTabContentProps {
  onAddSourceClick: () => void;
}

const SourcesTabContent = ({ onAddSourceClick }: SourcesTabContentProps) => {
  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-400" />
              Connected Data Sources
            </CardTitle>
            <CardDescription>
              Manage and configure healthcare data sources with automated discovery
            </CardDescription>
          </div>
          <Button onClick={onAddSourceClick}>
            <Plus className="h-4 w-4 mr-2" />
            Add Source
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataSourceList />

        {/* Enhanced Bed Management Data Sources Example */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Hospital className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold text-foreground">Epic 3.1 - Hospital Bed Management System</h3>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Hierarchical View</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Comprehensive bed occupancy management with drill-down capabilities from organization to ward level. 
            Features real-time tooltips, visual indicators, and Saudi healthcare compliance monitoring.
          </p>

          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="font-medium text-foreground text-sm">Hierarchical Navigation</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Drill-down from Organization → Hospital → Department → Ward levels
              </div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="font-medium text-foreground text-sm">Enhanced Tooltips</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Patient details, bed status, and discharge information on hover
              </div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border border-orange-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="font-medium text-foreground text-sm">Visual Indicators</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Color-coded occupancy thresholds with status icons
              </div>
            </div>
          </div>

          <EnhancedBedManagementTable 
            data={mockHierarchicalBedData} 
            showArabicNames={true}
            thresholds={occupancyThresholds}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SourcesTabContent;
