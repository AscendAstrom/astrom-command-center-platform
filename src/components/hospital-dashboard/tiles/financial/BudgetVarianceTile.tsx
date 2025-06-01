
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export const BudgetVarianceTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-500/10 rounded-lg">
            <Calculator className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <CardTitle className="text-lg">Budget Variance</CardTitle>
            <CardDescription>Budget vs actual</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Budget analytics coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
