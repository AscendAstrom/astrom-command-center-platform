
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Clock } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useInsuranceClaimsData } from "@/hooks/useInsuranceClaimsData";
import { Skeleton } from "@/components/ui/skeleton";

const STATUS_COLORS: { [key: string]: string } = {
  APPROVED: '#22c55e',
  PENDING: '#f59e0b',
  DENIED: '#ef4444',
  SUBMITTED: '#3b82f6',
  APPEALED: '#a855f7',
  PAID: '#10b981'
};

export const InsuranceClaimsTile = () => {
  const { data: claimsData, isLoading } = useInsuranceClaimsData();

  if (isLoading || !claimsData) {
    return <Card className="h-full"><CardHeader><Skeleton className="h-5 w-2/5" /></CardHeader><CardContent><Skeleton className="h-48 w-full" /></CardContent></Card>
  }

  const { totalClaims, approvalRate, avgProcessingTime, claimsStatusData, topInsurers, lastUpdated } = claimsData;

  const claimsPieData = claimsStatusData.map(status => ({
    ...status,
    name: status.name.charAt(0).toUpperCase() + status.name.slice(1).toLowerCase(),
    color: STATUS_COLORS[status.name] || '#6b7280'
  }));

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <FileCheck className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Insurance Claims</CardTitle>
              <CardDescription>Last 30 days. Updated: {lastUpdated}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            {approvalRate}% Approved
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{totalClaims}</div>
            <div className="text-xs text-muted-foreground">Total Claims</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{avgProcessingTime}d</div>
            <div className="text-xs text-muted-foreground">Avg Processing Time</div>
          </div>
        </div>

        <div className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={claimsPieData}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={35}
                dataKey="value"
              >
                {claimsPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} claims`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {claimsPieData.map((status) => (
            <div key={status.name} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: status.color }}
              />
              <span className="text-muted-foreground">{status.name}</span>
              <span className="font-semibold ml-auto">{status.value}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Top Insurers by Volume</div>
          {topInsurers.map((insurer, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{insurer.insurer}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{insurer.claims} claims</span>
                <span className="font-medium">{insurer.approval.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
