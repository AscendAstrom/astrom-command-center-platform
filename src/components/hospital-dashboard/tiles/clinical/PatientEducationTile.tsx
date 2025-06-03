
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, TrendingUp, Users, CheckCircle } from "lucide-react";

export const PatientEducationTile = () => {
  const emptyMetrics = {
    totalPatients: 0,
    engagementRate: 0,
    completionRate: 0,
    satisfactionScore: 0,
    materialsDelivered: 0,
    avgTimeSpent: 0
  };

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
          <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-50">
            <BookOpen className="h-3 w-3 mr-1" />
            No Data
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-cyan-600">{emptyMetrics.totalPatients}</div>
            <div className="text-xs text-muted-foreground">Patients Educated</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{emptyMetrics.satisfactionScore}</div>
            <div className="text-xs text-muted-foreground">Satisfaction /5</div>
          </div>
        </div>

        <div className="h-24 flex items-center justify-center bg-muted/20 rounded">
          <p className="text-muted-foreground text-sm">No education data available</p>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Education Topics</div>
          <div className="text-center py-4 text-muted-foreground text-sm">
            Connect your education systems to see engagement data
          </div>
        </div>

        <div className="bg-blue-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp className="h-3 w-3 text-blue-500" />
            <span className="font-semibold text-blue-600">System Status</span>
          </div>
          <div className="text-muted-foreground">
            Waiting for education platform connections
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
