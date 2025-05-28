
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Building } from "lucide-react";
import { SecurityControl, ComplianceItem } from "./types";

export const GovernanceTab = () => {
  const securityControls: SecurityControl[] = [
    { name: 'Zero Trust Architecture', status: 'active', score: 98 },
    { name: 'Advanced Encryption', status: 'active', score: 100 },
    { name: 'Threat Detection', status: 'active', score: 94 },
    { name: 'Access Control', status: 'active', score: 97 }
  ];

  const complianceItems: ComplianceItem[] = [
    { name: 'HIPAA Compliance', status: 'compliant', lastAudit: '2024-01-15' },
    { name: 'MOH Saudi Standards', status: 'compliant', lastAudit: '2024-01-20' },
    { name: 'ISO 27001', status: 'compliant', lastAudit: '2024-01-10' },
    { name: 'GDPR Compliance', status: 'compliant', lastAudit: '2024-01-25' }
  ];

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-red-400" />
          Enterprise Governance & Compliance
        </CardTitle>
        <CardDescription>
          Advanced security, compliance, and audit management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Security Status
            </h4>
            {securityControls.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <span className="font-medium">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-400">{item.score}%</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Building className="h-4 w-4" />
              Compliance Framework
            </h4>
            {complianceItems.map((item, index) => (
              <div key={index} className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{item.name}</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                    {item.status}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  Last audit: {item.lastAudit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
