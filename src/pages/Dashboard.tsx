
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Activity, 
  Database, 
  Target,
  Eye,
  Zap,
  Layers,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Settings,
  BarChart3,
  Bed,
  Clock
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import HospitalDashboardGrid from "@/components/hospital-dashboard/HospitalDashboardGrid";
import LogoIcon from "@/components/ui/LogoIcon";
import { useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshStats = () => {
    setIsRefreshing(true);
    toast.info("Refreshing hospital statistics...");
    
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Hospital data refreshed successfully!");
    }, 2000);
  };

  const handleModuleNavigation = (path: string, moduleName: string) => {
    toast.info(`Navigating to ${moduleName}...`);
    navigate(path);
  };

  const handleQuickAction = (action: string, path: string) => {
    toast.info(`Opening ${action}...`);
    navigate(path);
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
                <span className="text-sm text-blue-400 font-medium">Real-time Hospital Monitoring & Management</span>
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
                onClick={() => handleQuickAction("Settings", "/settings")}
                className="hover:bg-gray-500/10"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mt-2">
            Comprehensive hospital operations monitoring with real-time bed management, 
            patient flow tracking, and AI-powered insights for optimal healthcare delivery.
          </p>
        </div>

        {/* Hospital Overview Stats */}
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
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-4 text-blue-400 hover:bg-blue-500/10"
                onClick={() => handleQuickAction("Bed Management", "/astro-scan")}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                View Details
              </Button>
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
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-4 text-green-400 hover:bg-green-500/10"
                onClick={() => handleQuickAction("Patient Management", "/astro-bricks")}
              >
                <Users className="h-4 w-4 mr-2" />
                Manage Patients
              </Button>
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
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-4 text-orange-400 hover:bg-orange-500/10"
                onClick={() => handleQuickAction("Emergency Department", "/astro-metrics")}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                View ED Status
              </Button>
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
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-4 text-purple-400 hover:bg-purple-500/10"
                onClick={() => handleQuickAction("Staff Management", "/admin")}
              >
                <Users className="h-4 w-4 mr-2" />
                Manage Staff
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Hospital Dashboard Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Hospital Operations Center</h2>
            <Badge variant="outline" className="text-blue-400 border-blue-400 bg-blue-400/10 px-4 py-2">
              12 Live Monitoring Tiles
            </Badge>
          </div>

          <HospitalDashboardGrid />
        </div>

        {/* Quick Actions for Platform Modules */}
        <Card className="bg-card border-border mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              Platform Modules
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Access Astrom intelligence platform modules for advanced analytics and management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="w-full h-16 text-left justify-start border-border hover:bg-accent hover:border-blue-400 transition-all duration-300"
                onClick={() => handleModuleNavigation("/astro-scan", "ASTRO-SCAN")}
              >
                <Database className="h-5 w-5 mr-3 text-blue-400" />
                <div>
                  <div className="font-semibold text-foreground">Data Sources</div>
                  <div className="text-sm text-muted-foreground">Manage data ingestion</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-16 text-left justify-start border-border hover:bg-accent hover:border-purple-400 transition-all duration-300"
                onClick={() => handleModuleNavigation("/astro-view", "ASTRO-VIEW")}
              >
                <Eye className="h-5 w-5 mr-3 text-purple-400" />
                <div>
                  <div className="font-semibold text-foreground">Visualizations</div>
                  <div className="text-sm text-muted-foreground">Build dashboards</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-16 text-left justify-start border-border hover:bg-accent hover:border-green-400 transition-all duration-300"
                onClick={() => handleModuleNavigation("/astro-metrics", "ASTRO-METRICS")}
              >
                <Target className="h-5 w-5 mr-3 text-green-400" />
                <div>
                  <div className="font-semibold text-foreground">KPI Analytics</div>
                  <div className="text-sm text-muted-foreground">Monitor performance</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
