
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";

export const ProfitabilityTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <PieChart className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <CardTitle className="text-lg">Profitability</CardTitle>
            <CardDescription>Margin analysis</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Profitability analytics coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
