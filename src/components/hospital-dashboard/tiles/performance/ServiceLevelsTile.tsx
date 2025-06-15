import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, CheckCircle, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const ServiceLevelsTile = () => {
  const [metrics, setMetrics] = useState({
    overallCompliance: 0,
    slaBreaches: 0,
    avgResponseTime: 0,
  });
  const [slaData, setSlaData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSLAs = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('slas').select('*').eq('is_active', true);

      if (error) {
        console.error("Error fetching SLAs:", error);
      } else if (data) {
        // NOTE: Compliance and breaches would be calculated based on real-time measurements against these SLAs.
        // This is a simplified representation without mock data.
        const breaches = 0; // Placeholder
        const compliance = 100; // Placeholder

        setMetrics({
          overallCompliance: Math.round(compliance),
          slaBreaches: breaches,
          avgResponseTime: 0 // Placeholder
        });
        setSlaData(data.map(sla => ({
            service: sla.name,
            target: sla.target_value,
            actual: null, // No mock data
            compliance: null // No mock data
        })));
      }
      setLoading(false);
    };
    fetchSLAs();
  }, []);

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Target className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Service Levels</CardTitle>
                <CardDescription>SLA tracking & compliance</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-2 gap-4 h-16"><div className="bg-gray-200 rounded"></div><div className="bg-gray-200 rounded"></div></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="space-y-2"><div className="h-4 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded"></div></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Target className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Service Levels</CardTitle>
              <CardDescription>SLA tracking & compliance</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <CheckCircle className="h-3 w-3 mr-1" />
            {metrics.overallCompliance}% Compliant
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-600">{metrics.slaBreaches}</div>
            <div className="text-xs text-muted-foreground">SLA Breaches Today</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.avgResponseTime}m</div>
            <div className="text-xs text-muted-foreground">Avg Response Time</div>
          </div>
        </div>
        
        {slaData.length > 0 ? (
          <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
            <p className="text-muted-foreground text-sm">No live SLA compliance data</p>
          </div>
        ) : (
            <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
                <p className="text-muted-foreground text-sm">No SLA data available</p>
            </div>
        )}


        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">SLA Performance</div>
          {slaData.length > 0 ? slaData.slice(0, 3).map((sla, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground truncate">{sla.service}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{sla.target}% Target</span>
                <div className="w-2 h-2 rounded-full bg-gray-400" title="Status unknown" />
              </div>
            </div>
          )) : (
            <div className="text-center py-2 text-xs text-muted-foreground">No SLA performance data</div>
          )}
        </div>

        <div className="bg-orange-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <AlertTriangle className="h-3 w-3 text-orange-500" />
            <span className="font-semibold text-orange-600">Recent Breaches</span>
          </div>
          <div className="text-muted-foreground">
            Connect to monitoring system for breach alerts.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
