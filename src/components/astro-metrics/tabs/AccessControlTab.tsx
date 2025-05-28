
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import AccessControl from "@/components/astro-metrics/AccessControl";
import { UserRole } from "@/components/astro-bricks/types";

interface AccessControlTabProps {
  userRole: UserRole | null;
}

const AccessControlTab = ({ userRole }: AccessControlTabProps) => {
  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-5 w-5 text-purple-400" />
          Access Control & Permissions
        </CardTitle>
        <CardDescription>
          Manage user roles and permissions for metrics access and data governance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AccessControl userRole={userRole} />
      </CardContent>
    </Card>
  );
};

export default AccessControlTab;
