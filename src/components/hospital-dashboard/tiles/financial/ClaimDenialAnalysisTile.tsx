
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileX, BarChartHorizontalBig } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useClaimDenialData } from "@/hooks/useClaimDenialData";

export const ClaimDenialAnalysisTile = () => {
  const { data, isLoading } = useClaimDenialData();

  if (isLoading || !data) {
    return (
      <Card className="h-full">
        <CardHeader><Skeleton className="h-5 w-3/5" /></CardHeader>
        <CardContent><Skeleton className="h-40 w-full" /></CardContent>
      </Card>
    );
  }

  const { totalDenials, topDenialReason, denialsByReason } = data;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <FileX className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Claim Denial Analysis</CardTitle>
              <CardDescription>Top denial reasons in last 30d</CardDescription>
            </div>
          </div>
          <Badge variant="destructive" className="text-sm">
            {totalDenials} Denials
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-center p-2 rounded-lg bg-muted/40">
          <div className="text-xs text-muted-foreground">Top Reason</div>
          <div className="font-semibold text-red-600">{topDenialReason}</div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
            <BarChartHorizontalBig className="h-3 w-3" />
            Breakdown by Reason
          </div>
          {denialsByReason.slice(0, 4).map((reason) => (
            <div key={reason.name} className="flex items-center justify-between text-xs">
              <span className="font-medium truncate capitalize">{reason.name.toLowerCase()}</span>
              <span className="font-semibold text-muted-foreground">{reason.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
