
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, ShieldAlert, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useComplianceData } from "@/hooks/useComplianceData";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const ComplianceAreaItem = ({ area }: { area: { name: string; status: string; regulation: string; } }) => (
  <div className="flex justify-between items-center text-xs p-1.5 rounded bg-muted/30">
    <div>
      <span className="font-medium">{area.name}</span>
      <span className="text-muted-foreground ml-2">{area.regulation}</span>
    </div>
    <Badge variant={area.status === 'COMPLIANT' ? 'success' : 'warning'}>{area.status}</Badge>
  </div>
);


export const ComplianceTrackingTile = () => {
  const { data, isLoading } = useComplianceData();

  if (isLoading || !data) {
    return (
      <Card className="h-full">
        <CardHeader><Skeleton className="h-5 w-3/5" /></CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    )
  }

  const { totalAreas, atRisk, compliant, areas } = data;
  const complianceRate = totalAreas > 0 ? (compliant / totalAreas) * 100 : 0;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <ClipboardCheck className="h-5 w-5 text-indigo-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Compliance Tracking</CardTitle>
              <CardDescription>Regulatory adherence</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={atRisk > 0 ? "text-orange-600 border-orange-200 bg-orange-50" : "text-green-600 border-green-200 bg-green-50"}>
            <ShieldAlert className="h-3 w-3 mr-1" />
            {atRisk} At-Risk
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col flex-1">
        <div className="text-center">
          <div className="text-3xl font-bold text-indigo-600">{complianceRate.toFixed(0)}%</div>
          <div className="text-xs text-muted-foreground">Overall Compliance Rate</div>
        </div>

        <Progress value={complianceRate} className="h-2" indicatorClassName="bg-indigo-500" />

        <div className="space-y-2 flex-1">
          <div className="flex justify-between items-center">
            <div className="text-xs font-semibold text-muted-foreground">Key Areas</div>
            {areas.length > 2 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" size="sm" className="text-xs h-auto p-0">View All</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>All Compliance Areas</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2 pr-4">
                      {areas.map((area, i) => (
                        <ComplianceAreaItem key={i} area={area} />
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            )}
          </div>
          {areas.slice(0, 2).map((area, i) => (
            <ComplianceAreaItem key={i} area={area} />
          ))}
        </div>

        <div className="text-xs text-muted-foreground bg-indigo-50 p-2 rounded mt-auto">
          <TrendingUp className="h-3 w-3 inline mr-1 text-indigo-600" />
          Compliance checks are running automatically.
        </div>
      </CardContent>
    </Card>
  );
};
