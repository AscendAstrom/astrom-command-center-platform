
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useRiskData } from "@/hooks/useRiskData";
import { Skeleton } from "@/components/ui/skeleton";

export const RiskManagementTile = () => {
  const { data, isLoading } = useRiskData();
  
  if (isLoading || !data) {
    return (
      <Card className="h-full">
        <CardHeader><Skeleton className="h-5 w-3/5" /></CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    )
  }

  const { openRisks, highOrCritical, risks } = data;

  const riskLevelCounts = risks.reduce((acc, risk) => {
    acc[risk.risk_level] = (acc[risk.risk_level] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const chartData = [
    { name: 'Low', count: riskLevelCounts['LOW'] || 0 },
    { name: 'Medium', count: riskLevelCounts['MEDIUM'] || 0 },
    { name: 'High', count: riskLevelCounts['HIGH'] || 0 },
    { name: 'Critical', count: riskLevelCounts['CRITICAL'] || 0 },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Risk Management</CardTitle>
              <CardDescription>Operational & clinical risks</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
            {highOrCritical} High/Critical
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600">{openRisks}</div>
          <div className="text-xs text-muted-foreground">Open Risk Incidents</div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: -10 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} fontSize={12} width={50} />
              <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} />
              <Bar dataKey="count" fill="#fb923c" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="text-xs text-muted-foreground bg-orange-50 p-2 rounded">
          <TrendingDown className="h-3 w-3 inline mr-1 text-orange-600" />
          AI risk prediction models are active and monitoring for new threats.
        </div>
      </CardContent>
    </Card>
  );
};
