
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scissors } from "lucide-react";

export const SurgicalOutcomesTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Scissors className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Surgical Outcomes</CardTitle>
              <CardDescription>OR performance metrics</CardDescription>
            </div>
          </div>
          <Badge variant="outline">Analytics</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Scissors className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Surgical analytics coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
