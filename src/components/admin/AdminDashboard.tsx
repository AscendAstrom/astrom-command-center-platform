
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

const AdminDashboard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-6 w-6 text-gray-500" />
          Administration Panel
        </CardTitle>
        <CardDescription>
          System administration and configuration management
        </CardDescription>
      </CardHeader>
      <CardContent className="p-12">
        <div className="text-center space-y-4">
          <Settings className="h-16 w-16 mx-auto text-muted-foreground/30" />
          <h3 className="text-lg font-semibold text-muted-foreground">Administration Unavailable</h3>
          <p className="text-muted-foreground/70">
            Administrative tools and system configuration options will be available here once the system is initialized.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
