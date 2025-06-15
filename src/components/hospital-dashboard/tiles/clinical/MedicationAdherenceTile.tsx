
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const MedicationAdherenceTile = () => {
  const [metrics, setMetrics] = useState({
    overallAdherence: 0,
    criticalMeds: 0,
    missedDoses: 0,
    interventions: 0
  });
  const [adherenceData, setAdherenceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement data fetching from a medication adherence table when available.
    // For now, we will just show the empty state.
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Pill className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Medication Adherence</CardTitle>
                <CardDescription>Patient compliance tracking</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
            <div className="h-24 bg-gray-200 rounded"></div>
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
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Pill className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Medication Adherence</CardTitle>
              <CardDescription>Patient compliance tracking</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {metrics.missedDoses} Missed
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{metrics.overallAdherence}%</div>
            <div className="text-xs text-muted-foreground">Overall Adherence</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.criticalMeds}%</div>
            <div className="text-xs text-muted-foreground">Critical Meds</div>
          </div>
        </div>

        {adherenceData.length > 0 ? (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={adherenceData}>
                <XAxis dataKey="month" fontSize={10} />
                <YAxis hide />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="adherence" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  name="Adherence %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
            <p className="text-muted-foreground text-sm">No adherence data available</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-orange-50 p-2 rounded text-center">
            <div className="font-bold text-orange-600">{metrics.missedDoses}</div>
            <div className="text-xs text-muted-foreground">Missed Doses</div>
          </div>
          <div className="bg-blue-50 p-2 rounded text-center">
            <div className="font-bold text-blue-600">{metrics.interventions}</div>
            <div className="text-xs text-muted-foreground">Interventions</div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
          <strong>Medication AI:</strong> Connect to pharmacy systems for adherence tracking.
        </div>
      </CardContent>
    </Card>
  );
};
