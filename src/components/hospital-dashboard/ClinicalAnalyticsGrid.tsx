
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";

const ClinicalAnalyticsGrid = () => {
  return (
    <Card>
      <CardContent className="p-12">
        <div className="text-center space-y-4">
          <Stethoscope className="h-16 w-16 mx-auto text-muted-foreground/30" />
          <h3 className="text-lg font-semibold text-muted-foreground">Clinical Analytics Unavailable</h3>
          <p className="text-muted-foreground/70">
            Clinical intelligence, patient monitoring, and outcome analytics will be available once hospital data is initialized.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicalAnalyticsGrid;
