
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield,
  FileCheck,
  AlertTriangle
} from "lucide-react";

const SecurityActionsPanel = () => {
  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-foreground">Security Command Actions</h4>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Security Audit
            </Button>
            <Button variant="outline" size="sm">
              <FileCheck className="h-4 w-4 mr-2" />
              Compliance Report
            </Button>
            <Button variant="outline" size="sm">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Threat Analysis
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityActionsPanel;
