
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Activity, 
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  BarChart3,
  Bed,
  Clock,
  Users
} from "lucide-react";
import HospitalDashboardGrid from "@/components/hospital-dashboard/HospitalDashboardGrid";
import LogoIcon from "@/components/ui/LogoIcon";
import { useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshStats = () => {
    setIsRefreshing(true);
    toast.info("Refreshing hospital statistics...");
    
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Hospital data refreshed successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center border border-border/50">
                <LogoIcon size="sm" animate={true} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Hospital Operations Dashboard</h1>
                <span className="text-sm text-blue-400 font-medium">Real-time Hospital Monitoring & Analytics</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshStats}
                disabled={isRefreshing}
                className="hover:bg-blue-500/10 border-blue-500/20"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? "Refreshing..." : "Refresh Data"}
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mt-2">
            Comprehensive hospital operations monitoring with real-time bed management, 
            patient flow tracking, and AI-powered insights for optimal healthcare delivery.
          </p>
        </div>

        {/* Hospital Overview Stats - Analytics Only */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Beds</p>
                  <p className="text-3xl font-bold text-foreground">245</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <p className="text-sm text-green-400 font-semibold">80.8% occupied</p>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Bed className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics View Only
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Patients</p>
                  <p className="text-3xl font-bold text-foreground">198</p>
                  <p className="text-sm text-orange-400 font-semibold">28 new admissions</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Users className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Activity className="h-4 w-4 mr-2" />
                  Real-time Monitoring
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">ED Wait Time</p>
                  <p className="text-3xl font-bold text-foreground">42m</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-400" />
                    <p className="text-sm text-orange-400 font-semibold">14 in queue</p>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Clock className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency Tracking
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Staff On Duty</p>
                  <p className="text-3xl font-bold text-foreground">87</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <p className="text-sm text-green-400 font-semibold">Fully staffed</p>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Users className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Activity className="h-4 w-4 mr-2" />
                  Staffing Analytics
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hospital Dashboard Grid - Analytics Only */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Hospital Operations Analytics</h2>
            <Badge variant="outline" className="text-blue-400 border-blue-400 bg-blue-400/10 px-4 py-2">
              12 Live Analytics Tiles
            </Badge>
          </div>

          <HospitalDashboardGrid />
        </div>

        {/* Analytics Summary Footer */}
        <Card className="bg-card border-border mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              Hospital Analytics Summary
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Real-time hospital operations analytics and performance monitoring dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Real-time Monitoring</span>
                </div>
                <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                  Live data feeds from hospital systems providing instant operational insights
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200/50 dark:border-green-800/50">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-600 dark:text-green-400">Performance Analytics</span>
                </div>
                <p className="text-sm text-green-600/80 dark:text-green-400/80">
                  Comprehensive KPI tracking and performance metrics across all departments
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200/50 dark:border-purple-800/50">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <span className="font-semibold text-purple-600 dark:text-purple-400">AI-Powered Insights</span>
                </div>
                <p className="text-sm text-purple-600/80 dark:text-purple-400/80">
                  Predictive analytics and intelligent recommendations for optimal operations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
