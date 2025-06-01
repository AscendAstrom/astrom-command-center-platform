
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Shield } from "lucide-react";

export const SLAComplianceTile = () => {
  const departments = [
    { name: 'ER', compliance: 92, breaches: 2, status: 'good' },
    { name: 'ICU', compliance: 78, breaches: 5, status: 'warning' },
    { name: 'Surgery', compliance: 95, breaches: 1, status: 'good' },
    { name: 'General', compliance: 88, breaches: 3, status: 'good' },
    { name: 'Pediatrics', compliance: 85, breaches: 4, status: 'warning' },
    { name: 'Cardiology', compliance: 97, breaches: 0, status: 'excellent' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-green-400';
      case 'warning': return 'bg-orange-400';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const overallCompliance = Math.round(departments.reduce((acc, dept) => acc + dept.compliance, 0) / departments.length);
  const totalBreaches = departments.reduce((acc, dept) => acc + dept.breaches, 0);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Target className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-lg">SLA Compliance Heatmap</CardTitle>
              <CardDescription>Department performance tracking</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <Shield className="h-3 w-3 mr-1" />
            {overallCompliance}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{overallCompliance}%</div>
            <div className="text-xs text-muted-foreground">SLA Met</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{totalBreaches}</div>
            <div className="text-xs text-muted-foreground">Breaches</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Department Heatmap</div>
          <div className="grid grid-cols-3 gap-1">
            {departments.map((dept) => (
              <div 
                key={dept.name}
                className="relative p-2 rounded text-center text-white text-xs font-medium"
                style={{ 
                  backgroundColor: dept.compliance >= 95 ? '#22c55e' : 
                                  dept.compliance >= 85 ? '#eab308' : 
                                  dept.compliance >= 70 ? '#f97316' : '#ef4444'
                }}
              >
                <div className="font-bold">{dept.name}</div>
                <div className="text-xs opacity-90">{dept.compliance}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded"></div>
            <span>95%+</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded"></div>
            <span>85-94%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-orange-500 rounded"></div>
            <span>70-84%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded"></div>
            <span>&lt;70%</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-green-50 p-2 rounded">
          <strong>SLA Sentinel:</strong> ICU response time trending down. Auto-escalation in 15 min.
        </div>
      </CardContent>
    </Card>
  );
};
