
import { useState } from "react";
import SecurityMetricsCards from "./security-compliance/SecurityMetricsCards";
import ComplianceStatusPanel from "./security-compliance/ComplianceStatusPanel";
import SecurityAlertsPanel from "./security-compliance/SecurityAlertsPanel";
import PrivacyAnalyticsPanel from "./security-compliance/PrivacyAnalyticsPanel";
import SecurityActionsPanel from "./security-compliance/SecurityActionsPanel";

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

  return (
    <div className="space-y-6">
      {/* Security Metrics Dashboard */}
      <SecurityMetricsCards securityMetrics={securityMetrics} />

      {/* Compliance Status */}
      <ComplianceStatusPanel complianceStatus={complianceStatus} />

      {/* Security Alerts and Privacy Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SecurityAlertsPanel securityAlerts={securityAlerts} />
        <PrivacyAnalyticsPanel privacyMetrics={privacyMetrics} />
      </div>

      {/* Security Actions */}
      <SecurityActionsPanel />
    </div>
  );
};

export default SecurityComplianceIntelligence;
