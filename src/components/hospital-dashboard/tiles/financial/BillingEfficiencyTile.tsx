
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt } from "lucide-react";

export const BillingEfficiencyTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Receipt className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <CardTitle className="text-lg">Billing Efficiency</CardTitle>
            <CardDescription>Revenue cycle metrics</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Billing analytics coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
