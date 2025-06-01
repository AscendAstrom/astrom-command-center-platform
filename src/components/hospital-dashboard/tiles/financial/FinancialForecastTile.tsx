
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export const FinancialForecastTile = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <TrendingUp className="h-5 w-5 text-cyan-500" />
          </div>
          <div>
            <CardTitle className="text-lg">Financial Forecast</CardTitle>
            <CardDescription>Predictive analytics</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Forecast analytics coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
};
