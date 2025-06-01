
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingDown, Shield } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const RiskManagementTile = () => {
  const riskTrendData = [
    { month: 'Jan', highRisk: 12, mediumRisk: 28, lowRisk: 45 },
    { month: 'Feb', highRisk: 8, mediumRisk: 32, lowRisk: 52 },
    { month: 'Mar', highRisk: 6, mediumRisk: 24, lowRisk: 58 },
    { month: 'Apr', highRisk: 9, mediumRisk: 29, lowRisk: 48 },
    { month: 'May', highRisk: 5, mediumRisk: 22, lowRisk: 61 },
    { month: 'Jun', highRisk: 4, mediumRisk: 18, lowRisk: 67 }
  ];

  const activeRisks = [
    { category: 'Patient Safety', level: 'High', count: 4, trend: 'decreasing' },
    { category: 'Operational', level: 'Medium', count: 18, trend: 'stable' },
    { category: 'Financial', level: 'Low', count: 23, trend: 'improving' },
    { category: 'Regulatory', level: 'Medium', count: 12, trend: 'improving' }
  ];

  const metrics = {
    totalRisks: 89,
    highRiskItems: 4,
    riskReduction: 15,
    mitigatedThisMonth: 8
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Risk Management</CardTitle>
              <CardDescription>Risk assessment & mitigation</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingDown className="h-3 w-3 mr-1" />
            -{metrics.riskReduction}% Risks
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-red-600">{metrics.highRiskItems}</div>
            <div className="text-xs text-muted-foreground">High Risk Items</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-600">{metrics.mitigatedThisMonth}</div>
            <div className="text-xs text-muted-foreground">Mitigated This Month</div>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={riskTrendData}>
              <XAxis dataKey="month" fontSize={10} />
              <YAxis hide />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="highRisk" 
                stackId="1"
                stroke="#ef4444" 
                fill="#ef444420"
                name="High Risk"
              />
              <Area 
                type="monotone" 
                dataKey="mediumRisk" 
                stackId="1"
                stroke="#f59e0b" 
                fill="#f59e0b20"
                name="Medium Risk"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Active Risk Categories</div>
          {activeRisks.slice(0, 3).map((risk, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{risk.category}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{risk.count}</span>
                <Badge variant="outline" className={getRiskColor(risk.level)}>
                  {risk.level}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground bg-red-50 p-2 rounded">
          <strong>Risk Alert:</strong> 2 high-priority patient safety items require immediate attention.
        </div>
      </CardContent>
    </Card>
  );
};
