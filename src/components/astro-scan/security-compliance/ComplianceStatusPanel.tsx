
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileCheck } from "lucide-react";

interface ComplianceFramework {
  framework: string;
  status: string;
  score: number;
  lastAudit: string;
  nextReview: string;
}

interface ComplianceStatusPanelProps {
  complianceStatus: ComplianceFramework[];
}

const ComplianceStatusPanel = ({ complianceStatus }: ComplianceStatusPanelProps) => {
  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'in-progress': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'non-compliant': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-blue-400" />
          Compliance Framework Status
        </CardTitle>
        <CardDescription>
          Real-time compliance monitoring and audit intelligence
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complianceStatus.map((compliance, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-medium">{compliance.framework}</span>
                  <Badge variant="outline" className={getComplianceStatusColor(compliance.status)}>
                    {compliance.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-foreground">{compliance.score}%</span>
                  <div className="text-xs text-muted-foreground">Compliance Score</div>
                </div>
              </div>
              <Progress value={compliance.score} className="h-2 mb-2" />
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Last Audit: {compliance.lastAudit}</div>
                <div>Next Review: {compliance.nextReview}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceStatusPanel;
