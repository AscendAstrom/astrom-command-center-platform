
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

const QualityAnalyticsGrid = () => {
  return (
    <Card>
      <CardContent className="p-12">
        <div className="text-center space-y-4">
          <Shield className="h-16 w-16 mx-auto text-muted-foreground/30" />
          <h3 className="text-lg font-semibold text-muted-foreground">Quality Analytics Unavailable</h3>
          <p className="text-muted-foreground/70">
            Quality metrics, compliance tracking, risk management, and improvement initiatives will be available once hospital data is initialized.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QualityAnalyticsGrid;
