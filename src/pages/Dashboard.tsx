
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Activity, 
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  BarChart3,
  Bed,
  Clock,
  Users,
  Heart,
  Shield,
  Stethoscope,
  Building2,
  DollarSign,
  Zap,
  Brain,
  LogOut
} from "lucide-react";
import HospitalDashboardGrid from "@/components/hospital-dashboard/HospitalDashboardGrid";
import ClinicalAnalyticsGrid from "@/components/hospital-dashboard/ClinicalAnalyticsGrid";
import FinancialAnalyticsGrid from "@/components/hospital-dashboard/FinancialAnalyticsGrid";
import PerformanceAnalyticsGrid from "@/components/hospital-dashboard/PerformanceAnalyticsGrid";
import QualityAnalyticsGrid from "@/components/hospital-dashboard/QualityAnalyticsGrid";
import PredictiveAnalyticsEngine from "@/components/ai-ecosystem/PredictiveAnalyticsEngine";
import LogoIcon from "@/components/ui/LogoIcon";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useHospitalStats } from "@/hooks/useHospitalStats";

const Dashboard = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { data: analyticsData, isLoading: isRefreshing, refetch } = useHospitalStats();

  const handleRefreshStats = async () => {
    toast.info("Refreshing hospital statistics...");
    await refetch();
    toast.success("Hospital data refreshed successfully!");
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("You have been logged out.");
    navigate('/auth');
  };

  // Calculate summary stats from analytics data
  const summaryStats = {
    totalBeds: analyticsData?.totalBeds ?? 0,
    activePatients: analyticsData?.activePatients ?? 0,
    avgWaitTime: analyticsData?.avgWaitTime ?? 0,
    staffOnDuty: analyticsData?.staffOnDuty ?? 0,
    bedUtilization: analyticsData?.bedUtilization ?? 0,
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
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hover:bg-red-500/10 border-red-500/20 text-red-500 hover:text-red-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mt-2">
            Comprehensive hospital operations monitoring with real-time analytics, 
            clinical insights, financial performance, and quality metrics for optimal healthcare delivery.
          </p>
        </div>

        {/* Hospital Overview Stats - Real Data */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Beds</p>
                  <p className="text-3xl font-bold text-foreground">
                    {isRefreshing ? '--' : summaryStats.totalBeds}
                  </p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <p className="text-sm text-green-400 font-semibold">
                      {summaryStats.bedUtilization > 0 ? `${summaryStats.bedUtilization}% occupied` : 'No data'}
                    </p>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Bed className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {isRefreshing ? 'Loading...' : 'Live Data'}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Patients</p>
                  <p className="text-3xl font-bold text-foreground">
                    {isRefreshing ? '--' : summaryStats.activePatients}
                  </p>
                  <p className="text-sm text-orange-400 font-semibold">
                    {summaryStats.activePatients > 0 ? 'Currently admitted' : 'No active patients'}
                  </p>
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
                  <p className="text-3xl font-bold text-foreground">
                    {isRefreshing ? '--' : (summaryStats.avgWaitTime > 0 ? `${summaryStats.avgWaitTime}m` : '--')}
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-400" />
                    <p className="text-sm text-orange-400 font-semibold">
                      {summaryStats.activePatients > 0 ? `${summaryStats.activePatients} in queue` : 'No queue'}
                    </p>
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
                  <p className="text-3xl font-bold text-foreground">
                    {isRefreshing ? '--' : summaryStats.staffOnDuty}
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <p className="text-sm text-green-400 font-semibold">
                      {summaryStats.staffOnDuty > 0 ? 'Active staff' : 'No staff data'}
                    </p>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Users className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Activity className="h-4 w-4 mr-2" />
                  {isRefreshing ? 'Loading...' : 'Live Data'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Analytics Interface */}
        <Tabs defaultValue="operations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="operations" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Operations
            </TabsTrigger>
            <TabsTrigger value="clinical" className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              Clinical
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="quality" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Quality
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI & Automation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="operations" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Hospital Operations Analytics</h2>
              <Badge variant="outline" className="text-blue-400 border-blue-400 bg-blue-400/10 px-4 py-2">
                12 Live Analytics Tiles
              </Badge>
            </div>
            <HospitalDashboardGrid />
          </TabsContent>

          <TabsContent value="clinical" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Clinical Analytics Dashboard</h2>
              <Badge variant="outline" className="text-green-400 border-green-400 bg-green-400/10 px-4 py-2">
                <Heart className="h-3 w-3 mr-1" />
                10 Clinical Tiles
              </Badge>
            </div>
            <ClinicalAnalyticsGrid />
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Financial Performance Analytics</h2>
              <Badge variant="outline" className="text-yellow-400 border-yellow-400 bg-yellow-400/10 px-4 py-2">
                <DollarSign className="h-3 w-3 mr-1" />
                8 Financial Tiles
              </Badge>
            </div>
            <FinancialAnalyticsGrid />
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Performance & Efficiency Analytics</h2>
              <Badge variant="outline" className="text-purple-400 border-purple-400 bg-purple-400/10 px-4 py-2">
                <Zap className="h-3 w-3 mr-1" />
                9 Performance Tiles
              </Badge>
            </div>
            <PerformanceAnalyticsGrid />
          </TabsContent>

          <TabsContent value="quality" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Quality & Safety Analytics</h2>
              <Badge variant="outline" className="text-red-400 border-red-400 bg-red-400/10 px-4 py-2">
                <Shield className="h-3 w-3 mr-1" />
                7 Quality Tiles
              </Badge>
            </div>
            <QualityAnalyticsGrid />
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">AI & Automation Hub</h2>
              <Badge variant="outline" className="text-purple-400 border-purple-400 bg-purple-400/10 px-4 py-2">
                <Brain className="h-3 w-3 mr-1" />
                Predictive Analytics
              </Badge>
            </div>
            <PredictiveAnalyticsEngine />
          </TabsContent>
        </Tabs>

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
              Comprehensive analytics dashboard covering operations, clinical care, financial performance, and quality metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Operations</span>
                </div>
                <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                  Real-time operational metrics and resource management
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200/50 dark:border-green-800/50">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-600 dark:text-green-400">Clinical Care</span>
                </div>
                <p className="text-sm text-green-600/80 dark:text-green-400/80">
                  Patient outcomes, treatment effectiveness, and care quality
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200/50 dark:border-yellow-800/50">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold text-yellow-600 dark:text-yellow-400">Financial</span>
                </div>
                <p className="text-sm text-yellow-600/80 dark:text-yellow-400/80">
                  Revenue, costs, billing efficiency, and financial health
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200/50 dark:border-purple-800/50">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  <span className="font-semibold text-purple-600 dark:text-purple-400">Performance</span>
                </div>
                <p className="text-sm text-purple-600/80 dark:text-purple-400/80">
                  Efficiency metrics, throughput, and operational excellence
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200/50 dark:border-red-800/50">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-red-600 dark:text-red-400">Quality & Safety</span>
                </div>
                <p className="text-sm text-red-600/80 dark:text-red-400/80">
                  Patient safety, compliance, and quality improvement
                </p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-lg border border-indigo-200/50 dark:border-indigo-800/50">
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="h-5 w-5 text-indigo-500" />
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">AI & Automation</span>
                </div>
                <p className="text-sm text-indigo-600/80 dark:text-indigo-400/80">
                  Predictive analytics and intelligent decision support
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
