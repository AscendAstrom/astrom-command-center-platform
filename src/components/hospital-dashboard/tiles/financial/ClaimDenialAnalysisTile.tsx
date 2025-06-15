
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileX, BarChartHorizontalBig } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useClaimDenialData } from "@/hooks/useClaimDenialData";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const ClaimDenialAnalysisTile = () => {
  const [days, setDays] = useState(30);
  const { data, isLoading } = useClaimDenialData(days);

  const timeRanges = [
    { label: '7d', value: 7 },
    { label: '30d', value: 30 },
    { label: '90d', value: 90 },
  ];

  if (isLoading || !data) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <FileX className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Claim Denial Analysis</CardTitle>
                <CardDescription>Top denial reasons</CardDescription>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 flex-1">
          <Skeleton className="h-12 w-full" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const { totalDenials, topDenialReason, denialsByReason } = data;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <FileX className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Claim Denial Analysis</CardTitle>
              <CardDescription>Top denial reasons</CardDescription>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="destructive" className="text-sm">
              {totalDenials} Denials
            </Badge>
            <div className="flex items-center gap-1 bg-muted p-0.5 rounded-md">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setDays(range.value)}
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-sm transition-colors",
                    days === range.value
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-background/50"
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 flex-1">
        <div className="text-center p-2 rounded-lg bg-muted/40">
          <div className="text-xs text-muted-foreground">Top Reason</div>
          <div className="font-semibold text-red-600 truncate" title={topDenialReason}>{topDenialReason}</div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
            <BarChartHorizontalBig className="h-3 w-3" />
            Breakdown by Reason
          </div>
          {denialsByReason.slice(0, 4).map((reason) => (
            <div key={reason.name} className="flex items-center justify-between text-xs">
              <span className="font-medium truncate capitalize" title={reason.name}>{reason.name.toLowerCase()}</span>
              <span className="font-semibold text-muted-foreground">{reason.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
