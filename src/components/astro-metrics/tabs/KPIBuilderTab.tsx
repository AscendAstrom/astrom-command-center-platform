
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Hospital, TrendingUp } from "lucide-react";
import MetricBuilder from "@/components/astro-metrics/MetricBuilder";
import BedManagementTable from "@/components/shared/BedManagementTable";
import { UserRole } from "@/components/astro-bricks/types";

interface KPIBuilderTabProps {
  userRole: UserRole | null;
}

const KPIBuilderTab = ({ userRole }: KPIBuilderTabProps) => {
  // Empty bed data and KPIs since mock data was removed
  const emptyBedData: any[] = [];
  const emptyKPIs = [
    {
      id: "bed-occupancy",
      name: "Bed Occupancy Rate",
      value: 0,
      unit: "%",
      target: 85,
      trend: "up" as const,
      hospital: "No Data"
    },
    {
      id: "avg-los",
      name: "Average Length of Stay",
      value: 0,
      unit: "days",
      target: 4.5,
      trend: "down" as const,
      hospital: "No Data"
    },
    {
      id: "discharge-efficiency",
      name: "Discharge Efficiency",
      value: 0,
      unit: "%",
      target: 90,
      trend: "stable" as const,
      hospital: "No Data"
    }
  ];

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-orange-400" />
          KPI Builder & Definition
        </CardTitle>
        <CardDescription>
          Create and manage key performance indicators with automated calculation logic
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MetricBuilder userRole={userRole} />

        {/* Bed Management KPIs Example */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Hospital className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold text-foreground">Bed Management KPIs Example</h3>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Saudi Healthcare</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Key performance indicators for Saudi hospital bed management with MOH compliance metrics.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {emptyKPIs.map((kpi) => (
              <div key={kpi.id} className="p-4 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium text-foreground text-sm">{kpi.name}</div>
                  <div className={`flex items-center gap-1 ${
                    kpi.trend === 'up' ? 'text-green-400' : 
                    kpi.trend === 'down' ? 'text-red-400' : 
                    'text-yellow-400'
                  }`}>
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-xs">{kpi.trend}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current:</span>
                    <span className="text-foreground font-medium">{kpi.value} {kpi.unit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Target:</span>
                    <span className="text-foreground">{kpi.target} {kpi.unit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Hospital:</span>
                    <span className="text-foreground text-xs">{kpi.hospital}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <BedManagementTable data={emptyBedData} showArabicNames={false} showCompliance={true} />
          
          <div className="mt-4 p-3 bg-muted/30 rounded-lg text-center">
            <p className="text-muted-foreground text-sm">No bed data available. Connect your data sources to see real-time KPI data.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPIBuilderTab;
