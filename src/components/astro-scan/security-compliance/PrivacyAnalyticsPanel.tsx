
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UserCheck } from "lucide-react";

interface PrivacyMetrics {
  dataMinimization: number;
  consentManagement: number;
  dataRetention: number;
  anonymization: number;
}

interface PrivacyAnalyticsPanelProps {
  privacyMetrics: PrivacyMetrics;
}

const PrivacyAnalyticsPanel = ({ privacyMetrics }: PrivacyAnalyticsPanelProps) => {
  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-purple-400" />
          Privacy Analytics
        </CardTitle>
        <CardDescription>
          Privacy-preserving analytics and data governance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Data Minimization</span>
              <span className="text-sm text-muted-foreground">{privacyMetrics.dataMinimization}%</span>
            </div>
            <Progress value={privacyMetrics.dataMinimization} className="h-2" />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Consent Management</span>
              <span className="text-sm text-muted-foreground">{privacyMetrics.consentManagement}%</span>
            </div>
            <Progress value={privacyMetrics.consentManagement} className="h-2" />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Data Retention</span>
              <span className="text-sm text-muted-foreground">{privacyMetrics.dataRetention}%</span>
            </div>
            <Progress value={privacyMetrics.dataRetention} className="h-2" />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Anonymization</span>
              <span className="text-sm text-muted-foreground">{privacyMetrics.anonymization}%</span>
            </div>
            <Progress value={privacyMetrics.anonymization} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacyAnalyticsPanel;
