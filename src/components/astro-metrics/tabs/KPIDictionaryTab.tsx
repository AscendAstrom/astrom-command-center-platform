
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Hospital } from "lucide-react";
import KPIDictionary from "@/components/astro-metrics/KPIDictionary";
import { MetricsUserRole } from "@/components/astro-metrics/types";

interface KPIDictionaryTabProps {
  userRole: MetricsUserRole | null;
}

const KPIDictionaryTab = ({ userRole }: KPIDictionaryTabProps) => {
  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-400" />
          KPI Dictionary & Registry
        </CardTitle>
        <CardDescription>
          Centralized repository of all defined KPIs with versioning and approval workflow
        </CardDescription>
      </CardHeader>
      <CardContent>
        <KPIDictionary userRole={userRole} />

        {/* Bed Management Dictionary Example */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Hospital className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold text-foreground">Bed Management KPI Dictionary Example</h3>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">MOH Standard</Badge>
          </div>
          <p className="text-muted-foreground mb-4">
            Standardized KPI definitions for Saudi healthcare bed management aligned with MOH requirements.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-4 bg-muted/50 rounded-lg border border-blue-500/20">
                <div className="font-medium text-foreground mb-2">Bed Occupancy Rate</div>
                <div className="text-sm text-muted-foreground mb-2">
                  <strong>Formula:</strong> (Occupied Beds / Planned Beds) × 100
                </div>
                <div className="text-xs text-muted-foreground">
                  MOH Standard metric for hospital capacity utilization
                </div>
                <div className="mt-2 flex gap-2">
                  <Badge variant="outline" className="text-xs">Active</Badge>
                  <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                    Approved
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg border border-purple-500/20">
                <div className="font-medium text-foreground mb-2">Gender Compliance Rate</div>
                <div className="text-sm text-muted-foreground mb-2">
                  <strong>Formula:</strong> (Compliant Assignments / Total Assignments) × 100
                </div>
                <div className="text-xs text-muted-foreground">
                  Cultural compliance metric for gender-segregated wards
                </div>
                <div className="mt-2 flex gap-2">
                  <Badge variant="outline" className="text-xs">Active</Badge>
                  <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                    Approved
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-muted/50 rounded-lg border border-orange-500/20">
                <div className="font-medium text-foreground mb-2">Average Length of Stay</div>
                <div className="text-sm text-muted-foreground mb-2">
                  <strong>Formula:</strong> SUM(Discharge Date - Admission Date) / Patient Count
                </div>
                <div className="text-xs text-muted-foreground">
                  Efficiency metric for patient flow optimization
                </div>
                <div className="mt-2 flex gap-2">
                  <Badge variant="outline" className="text-xs">Active</Badge>
                  <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                    Approved
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg border border-red-500/20">
                <div className="font-medium text-foreground mb-2">Hajj Surge Capacity</div>
                <div className="text-sm text-muted-foreground mb-2">
                  <strong>Formula:</strong> (Peak Capacity - Normal Capacity) / Normal Capacity × 100
                </div>
                <div className="text-xs text-muted-foreground">
                  Special metric for Mecca hospitals during Hajj season
                </div>
                <div className="mt-2 flex gap-2">
                  <Badge variant="outline" className="text-xs">Active</Badge>
                  <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                    Seasonal
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPIDictionaryTab;
