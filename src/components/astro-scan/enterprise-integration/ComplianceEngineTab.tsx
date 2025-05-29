
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, Brain, FileCheck, AlertTriangle, CheckCircle, Zap } from "lucide-react";
import { toast } from "sonner";

interface ComplianceFramework {
  name: string;
  status: 'compliant' | 'warning' | 'violation';
  score: number;
  lastAudit: string;
  requirements: number;
  met: number;
}

export const ComplianceEngineTab = () => {
  const [isScanning, setIsScanning] = useState(false);
  
  const [complianceFrameworks, setComplianceFrameworks] = useState<ComplianceFramework[]>([
    { name: 'MOH Saudi Standards', status: 'compliant', score: 98, lastAudit: '2024-01-15', requirements: 247, met: 242 },
    { name: 'JCI Accreditation', status: 'compliant', score: 96, lastAudit: '2024-01-10', requirements: 189, met: 181 },
    { name: 'CBAHI Standards', status: 'warning', score: 89, lastAudit: '2024-01-20', requirements: 156, met: 139 },
    { name: 'HIPAA Compliance', status: 'compliant', score: 99, lastAudit: '2024-01-25', requirements: 78, met: 77 },
    { name: 'ISO 27001', status: 'compliant', score: 97, lastAudit: '2024-01-18', requirements: 114, met: 111 },
    { name: 'GDPR Compliance', status: 'compliant', score: 94, lastAudit: '2024-01-22', requirements: 99, met: 93 }
  ]);

  const handleSmartCompliance = () => {
    setIsScanning(true);
    toast.info("AI Compliance Engine is analyzing all systems...");
    
    setTimeout(() => {
      setComplianceFrameworks(prev => 
        prev.map(framework => ({
          ...framework,
          score: Math.min(100, framework.score + Math.floor(Math.random() * 3) + 1),
          met: Math.min(framework.requirements, framework.met + Math.floor(Math.random() * 2) + 1),
          status: framework.score > 95 ? 'compliant' : framework.score > 85 ? 'warning' : 'violation'
        }))
      );
      setIsScanning(false);
      toast.success("AI Compliance scan completed with recommendations");
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'warning': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'violation': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4" />;
      case 'warning': case 'violation': return <AlertTriangle className="h-4 w-4" />;
      default: return <FileCheck className="h-4 w-4" />;
    }
  };

  const overallScore = Math.round(complianceFrameworks.reduce((acc, f) => acc + f.score, 0) / complianceFrameworks.length);

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-400" />
              AI-Powered Compliance Engine
            </CardTitle>
            <CardDescription>
              Intelligent regulatory compliance with automated monitoring and reporting
            </CardDescription>
          </div>
          <Button
            variant="outline"
            onClick={handleSmartCompliance}
            disabled={isScanning}
            className="bg-gradient-to-r from-red-600/10 to-orange-600/10"
          >
            {isScanning ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-pulse" />
                Scanning...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Smart Compliance Scan
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <div className="text-2xl font-bold text-red-400">{overallScore}%</div>
            <div className="text-xs text-muted-foreground">Overall Compliance</div>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">
              {complianceFrameworks.filter(f => f.status === 'compliant').length}
            </div>
            <div className="text-xs text-muted-foreground">Frameworks Compliant</div>
          </div>
          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div className="text-2xl font-bold text-yellow-400">
              {complianceFrameworks.filter(f => f.status === 'warning').length}
            </div>
            <div className="text-xs text-muted-foreground">Frameworks at Risk</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">24/7</div>
            <div className="text-xs text-muted-foreground">Continuous Monitoring</div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Regulatory Frameworks Status</h4>
          {complianceFrameworks.map((framework, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(framework.status)}
                  <span className="font-medium">{framework.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{framework.score}%</span>
                  <Badge variant="outline" className={getStatusColor(framework.status)}>
                    {framework.status}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div className="text-xs text-muted-foreground">
                  Requirements Met: {framework.met}/{framework.requirements}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last Audit: {framework.lastAudit}
                </div>
                <div className="text-xs text-muted-foreground">
                  Next Review: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              </div>
              
              <Progress value={framework.score} className="h-2" />
              
              {framework.status === 'warning' && (
                <div className="mt-2 p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
                  <div className="text-xs text-yellow-600 font-medium">
                    Action Required: {framework.requirements - framework.met} requirements need attention
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
          <h4 className="font-semibold text-foreground mb-2">AI Compliance Intelligence</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-400" />
                <span>Predictive Compliance Monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-blue-400" />
                <span>Automated Evidence Collection</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <span>Real-time Risk Assessment</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Continuous Control Testing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-cyan-400" />
                <span>Smart Remediation Suggestions</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-orange-400" />
                <span>Automated Report Generation</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
