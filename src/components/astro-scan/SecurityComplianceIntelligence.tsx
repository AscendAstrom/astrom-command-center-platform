import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Database,
  Globe,
  FileCheck,
  UserCheck,
  Zap
} from "lucide-react";

const SecurityComplianceIntelligence = () => {
  const [securityMetrics] = useState({
    overallSecurity: { score: 94.7, status: 'excellent', trend: 'improving' },
    threatDetection: { score: 98.2, status: 'optimal', trend: 'stable' },
    accessControl: { score: 91.3, status: 'good', trend: 'improving' },
    dataProtection: { score: 96.8, status: 'excellent', trend: 'stable' }
  });

  const [complianceStatus] = useState([
    { framework: 'HIPAA', status: 'compliant', score: 98, lastAudit: '2024-11-15', nextReview: '2025-02-15' },
    { framework: 'GDPR', status: 'compliant', score: 95, lastAudit: '2024-10-22', nextReview: '2025-01-22' },
    { framework: 'SOC 2 Type II', status: 'compliant', score: 97, lastAudit: '2024-09-18', nextReview: '2025-03-18' },
    { framework: 'ISO 27001', status: 'in-progress', score: 89, lastAudit: '2024-11-01', nextReview: '2024-12-15' }
  ]);

  const [securityAlerts] = useState([
    {
      severity: 'medium',
      type: 'Access Anomaly',
      description: 'Unusual login pattern detected for admin account - geographic variance',
      timestamp: '2 min ago',
      status: 'investigating'
    },
    {
      severity: 'low',
      type: 'Policy Update',
      description: 'New data retention policy requires implementation by Dec 15',
      timestamp: '15 min ago',
      status: 'acknowledged'
    },
    {
      severity: 'high',
      type: 'Compliance Alert',
      description: 'HIPAA audit preparation - documentation review required',
      timestamp: '1 hour ago',
      status: 'in-progress'
    }
  ]);

  const [privacyMetrics] = useState({
    dataMinimization: 94.2,
    consentManagement: 97.8,
    dataRetention: 91.5,
    anonymization: 96.3
  });

  const getSecurityStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'optimal': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'good': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'needs-attention': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'in-progress': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'non-compliant': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'medium': return <Eye className="h-4 w-4 text-yellow-400" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="font-medium text-sm">Overall Security</span>
            </div>
            <Badge variant="outline" className={getSecurityStatusColor(securityMetrics.overallSecurity.status)}>
              {securityMetrics.overallSecurity.status}
            </Badge>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-400">{securityMetrics.overallSecurity.score}%</div>
            <div className="text-xs text-muted-foreground">
              Trend: {securityMetrics.overallSecurity.trend}
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-400" />
              <span className="font-medium text-sm">Threat Detection</span>
            </div>
            <Badge variant="outline" className={getSecurityStatusColor(securityMetrics.threatDetection.status)}>
              {securityMetrics.threatDetection.status}
            </Badge>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-blue-400">{securityMetrics.threatDetection.score}%</div>
            <div className="text-xs text-muted-foreground">
              Trend: {securityMetrics.threatDetection.trend}
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-purple-400" />
              <span className="font-medium text-sm">Access Control</span>
            </div>
            <Badge variant="outline" className={getSecurityStatusColor(securityMetrics.accessControl.status)}>
              {securityMetrics.accessControl.status}
            </Badge>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-purple-400">{securityMetrics.accessControl.score}%</div>
            <div className="text-xs text-muted-foreground">
              Trend: {securityMetrics.accessControl.trend}
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-orange-400" />
              <span className="font-medium text-sm">Data Protection</span>
            </div>
            <Badge variant="outline" className={getSecurityStatusColor(securityMetrics.dataProtection.status)}>
              {securityMetrics.dataProtection.status}
            </Badge>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-orange-400">{securityMetrics.dataProtection.score}%</div>
            <div className="text-xs text-muted-foreground">
              Trend: {securityMetrics.dataProtection.trend}
            </div>
          </div>
        </Card>
      </div>

      {/* Compliance Status */}
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

      {/* Security Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              Security Alerts
            </CardTitle>
            <CardDescription>
              Real-time security monitoring and threat intelligence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {securityAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                  {getSeverityIcon(alert.severity)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{alert.type}</span>
                      <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                      <Badge variant="outline">
                        {alert.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
      </div>

      {/* Security Actions */}
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
    </div>
  );
};

export default SecurityComplianceIntelligence;
