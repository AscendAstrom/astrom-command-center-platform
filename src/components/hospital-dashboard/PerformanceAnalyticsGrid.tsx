
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const PerformanceAnalyticsGrid = () => {
  return (
    <Card>
      <CardContent className="p-12">
        <div className="text-center space-y-4">
          <TrendingUp className="h-16 w-16 mx-auto text-muted-foreground/30" />
          <h3 className="text-lg font-semibold text-muted-foreground">Performance Analytics Unavailable</h3>
          <p className="text-muted-foreground/70">
            Throughput analytics, efficiency metrics, resource utilization, and benchmarking will be available once hospital data is initialized.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceAnalyticsGrid;
