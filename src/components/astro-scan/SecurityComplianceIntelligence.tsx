
import { useState, useEffect } from "react";
import SecurityMetricsCards from "./security-compliance/SecurityMetricsCards";
import ComplianceStatusPanel from "./security-compliance/ComplianceStatusPanel";
import SecurityAlertsPanel from "./security-compliance/SecurityAlertsPanel";
import PrivacyAnalyticsPanel from "./security-compliance/PrivacyAnalyticsPanel";
import SecurityActionsPanel from "./security-compliance/SecurityActionsPanel";
import { supabase } from "@/integrations/supabase/client";

const SecurityComplianceIntelligence = () => {
  const [securityMetrics, setSecurityMetrics] = useState({
    overallSecurity: { score: 0, status: 'unknown', trend: 'stable' },
    threatDetection: { score: 0, status: 'unknown', trend: 'stable' },
    accessControl: { score: 0, status: 'unknown', trend: 'stable' },
    dataProtection: { score: 0, status: 'unknown', trend: 'stable' }
  });

  const [complianceStatus, setComplianceStatus] = useState<any[]>([]);
  const [securityAlerts, setSecurityAlerts] = useState<any[]>([]);
  const [privacyMetrics, setPrivacyMetrics] = useState({
    dataMinimization: 0,
    consentManagement: 0,
    dataRetention: 0,
    anonymization: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSecurityData = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('alerts')
            .select('*')
            .in('source_type', ['SECURITY', 'COMPLIANCE'])
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching security alerts:", error);
        } else if (data) {
            const formattedAlerts = data.map(alert => ({
                severity: alert.severity?.toLowerCase() || 'low',
                type: alert.title,
                description: alert.message,
                timestamp: new Date(alert.created_at).toLocaleTimeString(),
                status: alert.status?.toLowerCase()
            }));
            setSecurityAlerts(formattedAlerts);
        }
        // TODO: Fetch other security and compliance metrics from respective tables.
        setLoading(false);
    }
    fetchSecurityData();
  }, []);

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
