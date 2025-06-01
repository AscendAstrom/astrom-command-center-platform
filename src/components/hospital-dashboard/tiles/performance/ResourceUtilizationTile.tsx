
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const ResourceUtilizationTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <BarChart3 className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <CardTitle className="text-lg">Resource Utilization</CardTitle>
            <CardDescription>Capacity management</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Resource analytics coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
