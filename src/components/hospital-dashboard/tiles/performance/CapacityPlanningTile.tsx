
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export const CapacityPlanningTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-500/10 rounded-lg">
            <Calendar className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <CardTitle className="text-lg">Capacity Planning</CardTitle>
            <CardDescription>Future planning</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Capacity analytics coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
