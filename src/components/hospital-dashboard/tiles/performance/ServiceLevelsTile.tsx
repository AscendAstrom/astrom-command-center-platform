
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

export const ServiceLevelsTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <Target className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <CardTitle className="text-lg">Service Levels</CardTitle>
            <CardDescription>SLA tracking</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Service analytics coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
