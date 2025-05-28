
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsData } from '@/services/analyticsDataService';
import { DollarSign, TrendingUp, Star, Target, Users, BarChart3 } from 'lucide-react';
import RealtimeLineChart from '../charts/RealtimeLineChart';
import RealtimeAreaChart from '../charts/RealtimeAreaChart';

interface BusinessAnalyticsTabProps {
  data: AnalyticsData;
  isLive: boolean;
}

const BusinessAnalyticsTab = ({ data, isLive }: BusinessAnalyticsTabProps) => {
  const { business } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-green-400" />
          Business Analytics
          {isLive && (
            <Badge variant="outline" className="text-green-400 border-green-400 animate-pulse">
              Live
            </Badge>
          )}
        </h3>
        
        <Badge variant="outline" className="text-green-400 border-green-400">
          <TrendingUp className="h-3 w-3 mr-1" />
          Revenue Growth +{business.revenueGrowth.toFixed(1)}%
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/30">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  ${business.revenue.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Revenue/Hour</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-yellow-50 dark:bg-yellow-950/30">
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {business.patientSatisfaction.toFixed(1)}/5
                </p>
                <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                <Target className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {business.operationalEfficiency}%
                </p>
                <p className="text-sm text-muted-foreground">Operational Efficiency</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  ${business.costPerPatient}
                </p>
                <p className="text-sm text-muted-foreground">Cost Per Patient</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RealtimeAreaChart
              data={data.chartData.revenue}
              dataKeys={['revenue', 'target']}
              colors={['#10b981', '#6366f1']}
              height={200}
            />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-400" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RealtimeLineChart
              data={data.chartData.revenue}
              dataKeys={['revenue']}
              colors={['#3b82f6']}
              height={200}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessAnalyticsTab;
