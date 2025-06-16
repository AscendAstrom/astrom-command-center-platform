
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, Activity, Users } from "lucide-react";
import { AnalyticsData } from "@/services/analytics/types";

interface FinancialTabProps {
  analyticsData: AnalyticsData | null;
}

export const FinancialTab = ({ analyticsData }: FinancialTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Daily Revenue</span>
          </div>
          <div className="text-2xl font-bold">
            ${(analyticsData?.financial?.dailyRevenue || 0).toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Today's earnings</div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Insurance Claims</span>
          </div>
          <div className="text-2xl font-bold">
            {analyticsData?.financial?.insuranceClaims || 0}
          </div>
          <div className="text-xs text-muted-foreground">Claims processed</div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">Pending Billing</span>
          </div>
          <div className="text-2xl font-bold">
            ${(analyticsData?.financial?.pendingBilling || 0).toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Awaiting processing</div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium">Revenue/Patient</span>
          </div>
          <div className="text-2xl font-bold">
            ${analyticsData?.financial?.revenuePerPatient || 0}
          </div>
          <div className="text-xs text-muted-foreground">Average per visit</div>
        </CardContent>
      </Card>
    </div>
  );
};
