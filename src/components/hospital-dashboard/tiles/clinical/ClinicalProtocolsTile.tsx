
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export const ClinicalProtocolsTile = () => {
  const complianceData = [
    { week: 'W1', sepsis: 94.2, vte: 96.8, handHygiene: 89.5, medication: 92.1 },
    { week: 'W2', sepsis: 95.1, vte: 95.9, handHygiene: 91.2, medication: 93.4 },
    { week: 'W3', sepsis: 96.3, vte: 97.2, handHygiene: 92.8, medication: 94.6 },
    { week: 'W4', sepsis: 97.1, vte: 98.1, handHygiene: 94.1, medication: 95.2 }
  ];

  const protocolTypes = [
    { protocol: 'Sepsis Bundle', compliance: 97.1, cases: 145, target: 95.0 },
    { protocol: 'VTE Prevention', compliance: 98.1, cases: 234, target: 95.0 },
    { protocol: 'Hand Hygiene', compliance: 94.1, cases: 1248, target: 90.0 },
    { protocol: 'Medication Safety', compliance: 95.2, cases: 567, target: 95.0 },
    { protocol: 'Fall Prevention', compliance: 92.8, cases: 189, target: 90.0 }
  ];

  const complianceDistribution = [
    { name: 'Excellent (95-100%)', value: 68, color: '#22c55e' },
    { name: 'Good (90-94%)', value: 24, color: '#3b82f6' },
    { name: 'Fair (85-89%)', value: 6, color: '#f59e0b' },
    { name: 'Poor (<85%)', value: 2, color: '#ef4444' }
  ];

  const metrics = {
    overallCompliance: 95.8,
    totalProtocols: 24,
    auditedCases: 2383,
    nonCompliantCases: 98,
    improvementTrend: 3.2,
    activeAlerts: 5
  };

  const recentAudits = [
    { protocol: 'Sepsis Bundle', department: 'ICU', compliance: 98.5, auditor: 'QI Team' },
    { protocol: 'Hand Hygiene', department: 'Med/Surg', compliance: 91.2, auditor: 'Infection Control' },
    { protocol: 'VTE Prevention', department: 'Ortho', compliance: 96.8, auditor: 'Clinical Lead' }
  ];

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return 'text-green-600 bg-green-50';
    if (compliance >= 90) return 'text-blue-600 bg-blue-50';
    if (compliance >= 85) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <FileText className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Clinical Protocols</CardTitle>
              <CardDescription>Protocol compliance</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <CheckCircle className="h-3 w-3 mr-1" />
            {metrics.overallCompliance}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{metrics.totalProtocols}</div>
            <div className="text-xs text-muted-foreground">Active Protocols</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{metrics.auditedCases}</div>
            <div className="text-xs text-muted-foreground">Cases Audited</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={complianceData}>
              <XAxis dataKey="week" fontSize={10} />
              <YAxis hide />
              <Tooltip formatter={(value) => [`${typeof value === 'number' ? value.toFixed(1) : 0}%`, 'Compliance']} />
              <Area 
                type="monotone" 
                dataKey="sepsis" 
                stackId="1"
                stroke="#8b5cf6" 
                fill="#8b5cf620"
                name="Sepsis"
              />
              <Area 
                type="monotone" 
                dataKey="vte" 
                stackId="2"
                stroke="#06b6d4" 
                fill="#06b6d420"
                name="VTE"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Protocol Performance</div>
          {protocolTypes.slice(0, 3).map((protocol, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{protocol.protocol}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{protocol.cases}</span>
                <div className="w-8 h-1.5 bg-gray-200 rounded">
                  <div 
                    className="h-full bg-purple-500 rounded" 
                    style={{ width: `${protocol.compliance}%` }}
                  />
                </div>
                <Badge variant="outline" className={getComplianceColor(protocol.compliance)}>
                  {protocol.compliance}%
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp className="h-3 w-3 text-blue-500" />
            <span className="font-semibold text-blue-600">Compliance Trend</span>
          </div>
          <div className="text-muted-foreground">
            +{metrics.improvementTrend}% improvement over last quarter. {metrics.activeAlerts} protocols need attention.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
