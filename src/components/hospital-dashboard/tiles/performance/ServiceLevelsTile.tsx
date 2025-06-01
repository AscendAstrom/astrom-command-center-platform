
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const ServiceLevelsTile = () => {
  const slaData = [
    { service: 'ED Wait Time', target: 30, actual: 28, compliance: 93.3 },
    { service: 'Lab Results', target: 45, actual: 42, compliance: 95.6 },
    { service: 'Radiology TAT', target: 60, actual: 58, compliance: 96.7 },
    { service: 'Discharge Time', target: 120, actual: 135, compliance: 87.5 },
    { service: 'Surgery Prep', target: 45, actual: 48, compliance: 89.2 }
  ];

  const complianceBreakdown = [
    { level: 'Exceeding', count: 12, percentage: 40 },
    { level: 'Meeting', count: 15, percentage: 50 },
    { level: 'Below', count: 3, percentage: 10 }
  ];

  const metrics = {
    overallCompliance: 92.5,
    slaBreaches: 8,
    avgResponseTime: 25.5,
    criticalSLAs: 30
  };

  const recentBreaches = [
    { service: 'Pharmacy Delivery', time: '2 hours ago', severity: 'Medium' },
    { service: 'Transport Services', time: '4 hours ago', severity: 'Low' },
    { service: 'Equipment Maintenance', time: '6 hours ago', severity: 'High' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      case 'Low': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Target className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Service Levels</CardTitle>
              <CardDescription>SLA tracking & compliance</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <CheckCircle className="h-3 w-3 mr-1" />
            {metrics.overallCompliance}% Compliant
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-600">{metrics.slaBreaches}</div>
            <div className="text-xs text-muted-foreground">SLA Breaches Today</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.avgResponseTime}m</div>
            <div className="text-xs text-muted-foreground">Avg Response Time</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={slaData.slice(0, 4)}>
              <XAxis dataKey="service" fontSize={8} />
              <YAxis hide />
              <Tooltip formatter={(value) => [`${value}%`, 'Compliance']} />
              <Bar 
                dataKey="compliance" 
                fill="#3b82f6"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">SLA Performance</div>
          {slaData.slice(0, 3).map((sla, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground truncate">{sla.service}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{sla.actual}m</span>
                <div className={`w-2 h-2 rounded-full ${
                  sla.compliance >= 95 ? 'bg-green-500' : 
                  sla.compliance >= 90 ? 'bg-orange-500' : 'bg-red-500'
                }`} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <AlertTriangle className="h-3 w-3 text-orange-500" />
            <span className="font-semibold text-orange-600">Recent Breaches</span>
          </div>
          <div className="text-muted-foreground">
            {recentBreaches[0].service} - {recentBreaches[0].time}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
