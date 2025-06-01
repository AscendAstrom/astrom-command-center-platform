
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";

export const ComplianceTrackingTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <CheckSquare className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <CardTitle className="text-lg">Compliance Tracking</CardTitle>
            <CardDescription>Regulatory compliance</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Compliance analytics coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
