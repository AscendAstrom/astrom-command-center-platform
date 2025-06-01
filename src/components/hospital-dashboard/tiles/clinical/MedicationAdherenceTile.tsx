
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const MedicationAdherenceTile = () => {
  const adherenceData = [
    { month: 'Jan', adherence: 85, doseMissed: 15 },
    { month: 'Feb', adherence: 87, doseMissed: 13 },
    { month: 'Mar', adherence: 89, doseMissed: 11 },
    { month: 'Apr', adherence: 91, doseMissed: 9 },
    { month: 'May', adherence: 88, doseMissed: 12 },
    { month: 'Jun', adherence: 93, doseMissed: 7 }
  ];

  const metrics = {
    overallAdherence: 89,
    criticalMeds: 96,
    missedDoses: 45,
    interventions: 12
  };

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
          <strong>Medication AI:</strong> Automated reminders improved adherence by 8% for chronic conditions.
        </div>
      </CardContent>
    </Card>
  );
};
