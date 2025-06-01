
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, CheckCircle, AlertTriangle } from "lucide-react";
import { ProgressChart } from "recharts";

export const AccreditationTile = () => {
  const accreditations = [
    { 
      name: 'Joint Commission', 
      status: 'Accredited', 
      expiry: '2025-06-15', 
      score: 96,
      lastReview: '2024-06-15'
    },
    { 
      name: 'CMS Certification', 
      status: 'Certified', 
      expiry: '2025-03-20', 
      score: 94,
      lastReview: '2024-03-20'
    },
    { 
      name: 'ISO 9001', 
      status: 'Certified', 
      expiry: '2024-12-10', 
      score: 92,
      lastReview: '2023-12-10'
    },
    { 
      name: 'AAAHC', 
      status: 'Accredited', 
      expiry: '2025-09-30', 
      score: 98,
      lastReview: '2024-09-30'
    }
  ];

  const upcomingActivities = [
    { activity: 'Mock Survey - Joint Commission', date: '2024-12-15', type: 'Preparation' },
    { activity: 'ISO 9001 Renewal Application', date: '2024-11-01', type: 'Renewal' },
    { activity: 'CMS Quality Reporting', date: '2024-12-31', type: 'Reporting' }
  ];

  const metrics = {
    totalAccreditations: 4,
    activeCompliance: 97,
    daysToExpiry: 45,
    upcomingActivities: 3
  };

  const complianceAreas = [
    { area: 'Patient Safety', compliance: 98, target: 95 },
    { area: 'Quality Management', compliance: 96, target: 90 },
    { area: 'Infection Control', compliance: 94, target: 92 },
    { area: 'Medication Management', compliance: 97, target: 95 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accredited':
      case 'Certified': return 'text-green-600 bg-green-50';
      case 'Under Review': return 'text-blue-600 bg-blue-50';
      case 'Pending': return 'text-orange-600 bg-orange-50';
      case 'Expired': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Accreditation</CardTitle>
              <CardDescription>Standards compliance & certifications</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <CheckCircle className="h-3 w-3 mr-1" />
            {metrics.totalAccreditations} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{metrics.activeCompliance}%</div>
            <div className="text-xs text-muted-foreground">Overall Compliance</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{metrics.daysToExpiry}</div>
            <div className="text-xs text-muted-foreground">Days to Next Expiry</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Active Accreditations</div>
          {accreditations.slice(0, 3).map((accred, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{accred.name}</span>
                <Badge variant="outline" className={getStatusColor(accred.status)}>
                  {accred.score}%
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  Expires: {new Date(accred.expiry).toLocaleDateString()}
                </span>
                <span className={`text-xs ${
                  getDaysUntilExpiry(accred.expiry) > 90 ? 'text-green-600' : 
                  getDaysUntilExpiry(accred.expiry) > 30 ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {getDaysUntilExpiry(accred.expiry)} days
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Compliance Areas</div>
          {complianceAreas.slice(0, 2).map((area, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{area.area}</span>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1.5 bg-gray-200 rounded">
                  <div 
                    className="h-full bg-green-500 rounded" 
                    style={{ width: `${(area.compliance / 100) * 100}%` }}
                  />
                </div>
                <span className="font-medium">{area.compliance}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 p-2 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <Calendar className="h-3 w-3 text-yellow-500" />
            <span className="font-semibold text-yellow-600">Upcoming: {upcomingActivities[0].activity}</span>
          </div>
          <div className="text-muted-foreground">
            Due: {new Date(upcomingActivities[0].date).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
