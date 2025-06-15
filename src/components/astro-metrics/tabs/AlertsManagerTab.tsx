
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import AlertsManager from "@/components/astro-metrics/AlertsManager";
import { MetricsUserRole } from "@/components/astro-metrics/types";

interface AlertsManagerTabProps {
  userRole: MetricsUserRole | null;
}

const AlertsManagerTab = ({ userRole }: AlertsManagerTabProps) => {
  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Bell className="h-5 w-5 text-red-400" />
          Alerts & Notification Management
        </CardTitle>
        <CardDescription>
          Configure and manage automated alerts with escalation rules and notification channels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertsManager userRole={userRole} />
      </CardContent>
    </Card>
  );
};

export default AlertsManagerTab;
