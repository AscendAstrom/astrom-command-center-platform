
import { Card, CardContent } from "@/components/ui/card";
import { Hospital } from "lucide-react";

const HospitalDashboard = () => {
  return (
    <Card>
      <CardContent className="p-12">
        <div className="text-center space-y-4">
          <Hospital className="h-16 w-16 mx-auto text-muted-foreground/30" />
          <h3 className="text-lg font-semibold text-muted-foreground">Hospital Operations Unavailable</h3>
          <p className="text-muted-foreground/70">
            Hospital operational data, clinical analytics, financial metrics, and performance indicators will be available once the system is initialized with data.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HospitalDashboard;
