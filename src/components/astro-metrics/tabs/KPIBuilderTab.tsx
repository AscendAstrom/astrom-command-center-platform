
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Hospital, TrendingUp } from "lucide-react";
import MetricBuilder from "@/components/astro-metrics/MetricBuilder";
import BedManagementTable from "@/components/shared/BedManagementTable";
import { UserRole } from "@/components/astro-bricks/types";
import { emptyStateMessages } from "@/config/constants";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface KPIBuilderTabProps {
  userRole: UserRole | null;
}

const KPIBuilderTab = ({ userRole }: KPIBuilderTabProps) => {
  const [bedData, setBedData] = useState<any[]>([]);
  const [kpis, setKpis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRealData();
  }, []);

  const fetchRealData = async () => {
    try {
      setLoading(true);
      
      // Fetch real KPIs from database
      const { data: kpiData, error: kpiError } = await supabase
        .from('kpis')
        .select('*')
        .limit(3);

      if (kpiError) throw kpiError;

      // Fetch real bed data
      const { data: beds, error: bedError } = await supabase
        .from('beds')
        .select('*, departments(name)')
        .eq('deleted_at', null)
        .limit(10);

      if (bedError) throw bedError;

      setKpis(kpiData || []);
      setBedData(beds || []);
    } catch (error) {
      console.error('Error fetching real data:', error);
      setKpis([]);
      setBedData([]);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Real Bed Management KPIs */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Hospital className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold text-foreground">Real-time Bed Management KPIs</h3>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Live Data</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Key performance indicators from your connected bed management system with real-time calculations.
          </p>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading KPI data...</p>
            </div>
          ) : kpis.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="p-4 bg-muted/50 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium text-foreground text-sm">{kpi.name}</div>
                    <div className="flex items-center gap-1 text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs">live</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Target:</span>
                      <span className="text-foreground font-medium">{kpi.target_value || 'N/A'} {kpi.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="text-foreground">{kpi.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Formula:</span>
                      <span className="text-foreground text-xs font-mono">{kpi.formula}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 mb-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-muted-foreground" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">No KPIs Configured</h4>
              <p className="text-muted-foreground text-sm">Create your first KPI using the builder above</p>
            </div>
          )}

          {bedData.length > 0 ? (
            <BedManagementTable data={bedData} showArabicNames={false} showCompliance={true} />
          ) : (
            <div className="mt-4 p-3 bg-muted/30 rounded-lg text-center">
              <p className="text-muted-foreground text-sm">{emptyStateMessages.noBedData}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KPIBuilderTab;
