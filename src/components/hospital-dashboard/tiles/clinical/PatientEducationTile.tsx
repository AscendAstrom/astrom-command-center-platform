
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Users, CheckCircle } from "lucide-react";
import { usePatientEducationData } from "@/hooks/usePatientEducationData";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

export const PatientEducationTile = () => {
  const { data, isLoading } = usePatientEducationData();

  if (isLoading || !data) {
    return (
      <Card className="h-full">
        <CardHeader><Skeleton className="h-5 w-2/5" /></CardHeader>
        <CardContent><Skeleton className="h-48 w-full" /></CardContent>
      </Card>
    );
  }

  const { materialsDelivered, engagementRate, topTopics } = data;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <GraduationCap className="h-5 w-5 text-cyan-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Patient Education</CardTitle>
              <CardDescription>Education effectiveness</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-cyan-600 border-cyan-200 bg-cyan-50">
            <BookOpen className="h-3 w-3 mr-1" />
            {materialsDelivered} Materials Delivered
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-cyan-600">{engagementRate}%</div>
            <div className="text-xs text-muted-foreground">Engagement Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{topTopics[0]?.count || 0}</div>
            <div className="text-xs text-muted-foreground">Top Topic Views</div>
          </div>
        </div>
        
        <Progress value={engagementRate} className="h-2" indicatorClassName="bg-cyan-500" />

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Top Education Topics</div>
          {topTopics.length > 0 ? (
            topTopics.map(topic => (
              <div key={topic.topic} className="flex items-center justify-between text-xs p-1.5 rounded bg-muted/30">
                <span className="font-medium truncate">{topic.topic}</span>
                <span className="text-muted-foreground font-semibold">{topic.count} views</span>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No education data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
