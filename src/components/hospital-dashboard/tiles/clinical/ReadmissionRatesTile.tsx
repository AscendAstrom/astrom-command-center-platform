
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw } from "lucide-react";

export const ReadmissionRatesTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <RotateCcw className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Readmission Rates</CardTitle>
              <CardDescription>30-day readmissions</CardDescription>
            </div>
          </div>
          <Badge variant="outline">Tracking</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <RotateCcw className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Readmission analytics coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
