
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useMedicationAdherenceData } from "@/hooks/useMedicationAdherenceData";
import { Skeleton } from "@/components/ui/skeleton";

export const MedicationAdherenceTile = () => {
  const { data: metrics, isLoading } = useMedicationAdherenceData();

  if (isLoading || !metrics) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4"><Skeleton className="h-12" /><Skeleton className="h-12" /></div>
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </CardContent>
      </Card>
    );
  }

  const { overallAdherence, criticalMedsAdherence, missedDoses, interventions, adherenceHistory } = metrics;

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
          {missedDoses > 0 && (
            <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {missedDoses} Missed MTD
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{overallAdherence}%</div>
            <div className="text-xs text-muted-foreground">Overall Adherence</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{criticalMedsAdherence}%</div>
            <div className="text-xs text-muted-foreground">Critical Meds</div>
          </div>
        </div>

        {adherenceHistory.length > 0 ? (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={adherenceHistory} margin={{ top: 5, right: 10, left: -20, bottom: -10 }}>
                <XAxis dataKey="month" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Adherence']} />
                <Line 
                  type="monotone" 
                  dataKey="adherence" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  name="Adherence %"
                  dot={false}
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
            <div className="font-bold text-orange-600">{missedDoses}</div>
            <div className="text-xs text-muted-foreground">Missed Doses MTD</div>
          </div>
          <div className="bg-blue-50 p-2 rounded text-center">
            <div className="font-bold text-blue-600">{interventions}</div>
            <div className="text-xs text-muted-foreground">Interventions MTD</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
