
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsData } from '@/services/analyticsDataService';
import { Heart, Users, Clock, Bed, AlertTriangle, TrendingUp } from 'lucide-react';

interface EmergencyDepartmentTabProps {
  data: AnalyticsData;
  isLive: boolean;
}

const EmergencyDepartmentTab = ({ data, isLive }: EmergencyDepartmentTabProps) => {
  const { emergencyDepartment } = data;

  const metrics = [
    {
      title: "Total Patients",
      value: emergencyDepartment.totalPatients,
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      trend: "+5%",
      subtitle: "Active in ED"
    },
    {
      title: "Avg Wait Time",
      value: `${emergencyDepartment.avgWaitTime} min`,
      icon: Clock,
      color: "text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      trend: "-8%",
      subtitle: "From admission"
    },
    {
      title: "Bed Utilization",
      value: `${emergencyDepartment.bedUtilization}%`,
      icon: Bed,
      color: "text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      trend: "+3%",
      subtitle: "Capacity used"
    },
    {
      title: "Staff on Duty",
      value: emergencyDepartment.staffOnDuty,
      icon: Heart,
      color: "text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      trend: "stable",
      subtitle: "Active staff"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-400" />
          Emergency Department Operations
          {isLive && (
            <Badge variant="outline" className="text-green-400 border-green-400 animate-pulse">
              Live
            </Badge>
          )}
        </h3>
        
        {emergencyDepartment.criticalAlerts > 0 && (
          <Badge variant="destructive" className="animate-bounce-subtle">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {emergencyDepartment.criticalAlerts} Critical Alerts
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card 
            key={metric.title} 
            className={`bg-card border-border hover:shadow-md transition-all duration-300 ${
              isLive ? 'animate-scale-in' : ''
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${metric.bgColor} transition-all duration-300 hover:scale-105`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className={`h-3 w-3 ${
                    metric.trend.includes('+') ? 'text-green-400' : 
                    metric.trend.includes('-') ? 'text-red-400' : 
                    'text-muted-foreground'
                  }`} />
                  <span className={`text-xs font-medium ${
                    metric.trend.includes('+') ? 'text-green-400' : 
                    metric.trend.includes('-') ? 'text-red-400' : 
                    'text-muted-foreground'
                  }`}>
                    {metric.trend}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground animate-fade-in">
                  {metric.value}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {metric.subtitle}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-400" />
              Wait Time Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Live chart visualization</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-green-400" />
              Patient Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Real-time flow visualization</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyDepartmentTab;
