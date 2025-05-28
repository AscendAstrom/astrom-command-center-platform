
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, AlertCircle, Globe } from "lucide-react";

export const InternationalComplianceTab = () => {
  const complianceMetrics = {
    globalCompliance: 98.7,
    activeRegulations: 127,
    auditsPassed: 234,
    jurisdictions: 47
  };

  const regulatoryFrameworks = [
    { region: "European Union", framework: "GDPR + MDR", status: "compliant", score: 99.2 },
    { region: "United States", framework: "HIPAA + FDA", status: "compliant", score: 98.8 },
    { region: "Canada", framework: "PIPEDA + Health Canada", status: "compliant", score: 97.5 },
    { region: "Australia", framework: "Privacy Act + TGA", status: "compliant", score: 98.1 },
    { region: "Japan", framework: "APPI + PMDA", status: "compliant", score: 96.9 },
    { region: "Singapore", framework: "PDPA + HSA", status: "reviewing", score: 94.3 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'reviewing': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'updating': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-400" />
          International Compliance Engine
        </CardTitle>
        <CardDescription>
          Multi-national regulatory compliance with automated monitoring and harmonization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{complianceMetrics.globalCompliance}%</div>
            <div className="text-xs text-muted-foreground">Global Compliance</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{complianceMetrics.activeRegulations}</div>
            <div className="text-xs text-muted-foreground">Active Regulations</div>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">{complianceMetrics.auditsPassed}</div>
            <div className="text-xs text-muted-foreground">Audits Passed</div>
          </div>
          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <div className="text-2xl font-bold text-cyan-400">{complianceMetrics.jurisdictions}</div>
            <div className="text-xs text-muted-foreground">Jurisdictions</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Regulatory Frameworks</h4>
            <Button variant="outline" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              Full Report
            </Button>
          </div>
          
          {regulatoryFrameworks.map((framework, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {framework.status === 'compliant' ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-400" />
                  )}
                  <span className="font-medium">{framework.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-green-400">{framework.score}%</span>
                  <Badge variant="outline" className={getStatusColor(framework.status)}>
                    {framework.status}
                  </Badge>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Framework</div>
                <div className="font-medium">{framework.framework}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <h4 className="font-semibold text-foreground mb-2">Compliance Automation Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Real-time regulatory monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Automated compliance reporting</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Cross-border audit trails</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>International standard harmonization</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
