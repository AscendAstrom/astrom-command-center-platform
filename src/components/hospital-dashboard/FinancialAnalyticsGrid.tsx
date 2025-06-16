
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const FinancialAnalyticsGrid = () => {
  return (
    <Card>
      <CardContent className="p-12">
        <div className="text-center space-y-4">
          <DollarSign className="h-16 w-16 mx-auto text-muted-foreground/30" />
          <h3 className="text-lg font-semibold text-muted-foreground">Financial Analytics Unavailable</h3>
          <p className="text-muted-foreground/70">
            Revenue analytics, cost management, billing efficiency, and financial forecasting will be available once hospital data is initialized.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialAnalyticsGrid;
