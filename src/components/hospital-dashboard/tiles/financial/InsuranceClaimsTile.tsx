
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Clock, AlertCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";

export const InsuranceClaimsTile = () => {
  const claimsStatusData = [
    { name: 'Approved', value: 1245, color: '#22c55e' },
    { name: 'Pending', value: 187, color: '#f59e0b' },
    { name: 'Denied', value: 43, color: '#ef4444' },
    { name: 'Under Review', value: 92, color: '#3b82f6' }
  ];

  const insurerData = [
    { insurer: 'Medicare', claims: 456, approval: 96.2 },
    { insurer: 'Medicaid', claims: 234, approval: 94.8 },
    { insurer: 'Blue Cross', claims: 289, approval: 91.5 },
    { insurer: 'Aetna', claims: 178, approval: 89.3 },
    { insurer: 'UnitedHealth', claims: 210, approval: 92.1 }
  ];

  const metrics = {
    totalClaims: 1567,
    approvalRate: 79.5,
    avgProcessingTime: 4.2,
    pendingValue: 2450000
  };

  const denialAnalysis = [
    { reason: 'Prior Authorization', count: 18, percentage: 41.9 },
    { reason: 'Coding Issues', count: 12, percentage: 27.9 },
    { reason: 'Medical Necessity', count: 8, percentage: 18.6 },
    { reason: 'Coverage Limits', count: 5, percentage: 11.6 }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <FileCheck className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Insurance Claims</CardTitle>
              <CardDescription>Claims processing status</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            {metrics.approvalRate}% Approved
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.totalClaims}</div>
            <div className="text-xs text-muted-foreground">Total Claims</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{metrics.avgProcessingTime}d</div>
            <div className="text-xs text-muted-foreground">Avg Processing Time</div>
          </div>
        </div>

        <div className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={claimsStatusData}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={35}
                dataKey="value"
              >
                {claimsStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {claimsStatusData.map((status) => (
            <div key={status.name} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: status.color }}
              />
              <span className="text-muted-foreground">{status.name}</span>
              <span className="font-semibold ml-auto">{status.value}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Top Insurers</div>
          {insurerData.slice(0, 3).map((insurer, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{insurer.insurer}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{insurer.claims}</span>
                <span className="font-medium">{insurer.approval}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <Clock className="h-3 w-3 text-orange-500" />
            <span className="font-semibold text-orange-600">Pending Value: ${(metrics.pendingValue / 1000000).toFixed(1)}M</span>
          </div>
          <div className="text-muted-foreground">
            {claimsStatusData[1].value} claims awaiting approval
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
