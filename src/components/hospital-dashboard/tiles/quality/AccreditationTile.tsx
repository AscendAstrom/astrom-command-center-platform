
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, CheckCircle, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { analyticsService, AnalyticsData } from '@/services/analytics';
import { emptyStateMessages } from "@/config/constants";

export const AccreditationTile = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const unsubscribe = analyticsService.subscribe(setAnalyticsData);
    return unsubscribe;
  }, []);

  const qualityData = analyticsData?.quality;

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

  if (!qualityData) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Accreditation</CardTitle>
              <CardDescription>Standards compliance & certifications</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded">
            <p className="text-sm text-muted-foreground">{emptyStateMessages.loading}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { accreditations, complianceAreas, upcomingActivities, totalAccreditations, activeCompliance, daysToExpiry } = qualityData;

  if (accreditations.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Accreditation</CardTitle>
              <CardDescription>Standards compliance & certifications</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded">
            <p className="text-sm text-muted-foreground">{emptyStateMessages.readyForRealData}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
            {totalAccreditations} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{activeCompliance}%</div>
            <div className="text-xs text-muted-foreground">Overall Compliance</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{daysToExpiry}</div>
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

        {complianceAreas.length > 0 && (
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
        )}

        {upcomingActivities.length > 0 && (
          <div className="bg-yellow-50 p-2 rounded text-xs">
            <div className="flex items-center gap-1 mb-1">
              <Calendar className="h-3 w-3 text-yellow-500" />
              <span className="font-semibold text-yellow-600">Upcoming: {upcomingActivities[0].activity}</span>
            </div>
            <div className="text-muted-foreground">
              Due: {new Date(upcomingActivities[0].date).toLocaleDateString()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
