
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const ComplianceTrackingTile = () => {
  const complianceData = [
    { standard: 'HIPAA', compliance: 98, target: 100 },
    { standard: 'Joint Commission', compliance: 94, target: 95 },
    { standard: 'CMS', compliance: 92, target: 90 },
    { standard: 'OSHA', compliance: 96, target: 95 },
    { standard: 'FDA', compliance: 89, target: 90 }
  ];

  const recentAudits = [
    { name: 'Medication Safety', status: 'Passed', date: '2024-05-15' },
    { name: 'Infection Control', status: 'Pending', date: '2024-05-20' },
    { name: 'Documentation', status: 'Action Required', date: '2024-05-10' }
  ];

  const metrics = {
    overallCompliance: 94,
    upcomingAudits: 3,
    actionItems: 7,
    daysToNext: 12
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Passed': return 'text-green-600 bg-green-50 border-green-200';
      case 'Pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Action Required': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Compliance Tracking</CardTitle>
              <CardDescription>Regulatory compliance status</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            {metrics.overallCompliance}% Compliant
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-orange-600">{metrics.upcomingAudits}</div>
            <div className="text-xs text-muted-foreground">Upcoming Audits</div>
          </div>
          <div>
            <div className="text-xl font-bold text-red-600">{metrics.actionItems}</div>
            <div className="text-xs text-muted-foreground">Action Items</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={complianceData.slice(0, 4)}>
              <XAxis dataKey="standard" fontSize={10} />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="compliance" fill="#3b82f6" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Recent Audits</div>
          {recentAudits.map((audit, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{audit.name}</span>
              <Badge variant="outline" className={getStatusColor(audit.status)}>
                {audit.status}
              </Badge>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <Clock className="h-3 w-3 text-blue-500" />
            <span className="font-semibold text-blue-600">Next Audit: {metrics.daysToNext} days</span>
          </div>
          <div className="text-muted-foreground">
            Joint Commission follow-up scheduled
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
