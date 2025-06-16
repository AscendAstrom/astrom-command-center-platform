
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const AnalyticsDashboard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-blue-500" />
          Analytics Dashboard
        </CardTitle>
        <CardDescription>
          Comprehensive analytics and insights for hospital operations
        </CardDescription>
      </CardHeader>
      <CardContent className="p-12">
        <div className="text-center space-y-4">
          <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground/30" />
          <h3 className="text-lg font-semibold text-muted-foreground">Analytics Unavailable</h3>
          <p className="text-muted-foreground/70">
            Advanced analytics features will be available once hospital data is populated and the system is initialized.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsDashboard;
