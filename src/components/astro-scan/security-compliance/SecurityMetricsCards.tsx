
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Eye, 
  Lock, 
  Database
} from "lucide-react";

interface SecurityMetric {
  score: number;
  status: string;
  trend: string;
}

interface SecurityMetrics {
  overallSecurity: SecurityMetric;
  threatDetection: SecurityMetric;
  accessControl: SecurityMetric;
  dataProtection: SecurityMetric;
}

interface SecurityMetricsCardsProps {
  securityMetrics: SecurityMetrics;
}

const SecurityMetricsCards = ({ securityMetrics }: SecurityMetricsCardsProps) => {
  const getSecurityStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'optimal': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'good': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'needs-attention': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
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
  );
};

export default SecurityMetricsCards;
