
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { useQualityImprovementInitiativesData } from "@/hooks/useQualityImprovementInitiativesData";
import { Skeleton } from "@/components/ui/skeleton";

export const QualityImprovementTile = () => {
  const { data, isLoading } = useQualityImprovementInitiativesData();

  if (isLoading || !data) {
    return (
      <Card className="h-full">
        <CardHeader><Skeleton className="h-5 w-3/5" /></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  const { activeProjects, completedProjects, initiatives } = data;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Target className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Quality Improvement</CardTitle>
              <CardDescription>Continuous improvement tracking</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="h-3 w-3 mr-1" />
            {completedProjects} Completed
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-green-600">{completedProjects}</div>
            <div className="text-xs text-muted-foreground">Completed Projects</div>
          </div>
          <div>
            <div className="text-xl font-bold text-blue-600">{activeProjects}</div>
            <div className="text-xs text-muted-foreground">Active Initiatives</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Active Initiatives</div>
          {initiatives.filter(i => i.status === 'IN_PROGRESS').slice(0, 2).map((initiative) => (
            <div key={initiative.name} className="flex items-start gap-2 text-xs p-1.5 rounded bg-muted/30">
              <Clock className="h-3 w-3 mt-0.5 text-blue-500" />
              <div>
                <div className="font-medium">{initiative.name}</div>
                <div className="text-muted-foreground">Owner: {initiative.owner_name}</div>
              </div>
            </div>
          ))}
          {initiatives.filter(i => i.status === 'IN_PROGRESS').length === 0 && (
             <div className="text-center py-2 text-xs text-muted-foreground">No active initiatives</div>
          )}
        </div>

        <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
          Connect to quality management systems for live initiative tracking.
        </div>
      </CardContent>
    </Card>
  );
};
