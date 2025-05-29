
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
  BarChart3
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DashboardAnalytics from "@/components/dashboard/DashboardAnalytics";
import LogoIcon from "@/components/ui/LogoIcon";
import { useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const modules = [
    {
      title: "ASTRO-SCAN",
      description: "Data Ingestion & Source Management",
      icon: Database,
      link: "/astro-scan",
      color: "text-blue-400",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      title: "ASTRO-BRICKS",
      description: "Data Modeling & Transformation",
      icon: Layers,
      link: "/astro-bricks",
      color: "text-orange-400",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-600"
    },
    {
      title: "ASTRO-METRICS",
      description: "KPI & Performance Analytics",
      icon: Target,
      link: "/astro-metrics",
      color: "text-green-400",
      iconBg: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      title: "ASTRO-VIEW",
      description: "Data Visualization & Dashboards",
      icon: Eye,
      link: "/astro-view",
      color: "text-purple-400",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      title: "ASTRO-FLOW",
      description: "Automation & Workflow Management",
      icon: Zap,
      link: "/astro-flow",
      color: "text-pink-400",
      iconBg: "bg-gradient-to-br from-pink-500 to-pink-600"
    }
  ];

  const handleRefreshStats = () => {
    setIsRefreshing(true);
    toast.info("Refreshing platform statistics...");
    
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Statistics refreshed successfully!");
    }, 2000);
  };

  const handleModuleNavigation = (module: any) => {
    toast.info(`Navigating to ${module.title}...`);
    navigate(module.link);
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
                <h1 className="text-3xl font-bold text-foreground">Astrom</h1>
                <span className="text-sm text-blue-400 font-medium">Intelligence Platform Dashboard</span>
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
                {isRefreshing ? "Refreshing..." : "Refresh Stats"}
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
            Comprehensive data intelligence platform providing end-to-end analytics, 
            from data ingestion to advanced visualizations and automated workflows.
          </p>
        </div>

        {/* Platform Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Sources</p>
                  <p className="text-3xl font-bold text-foreground">24</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <p className="text-sm text-green-400 font-semibold">+8% this week</p>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Database className="h-7 w-7 text-white" />
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-4 text-blue-400 hover:bg-blue-500/10"
                onClick={() => handleQuickAction("Data Sources", "/astro-scan")}
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
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Data Models</p>
                  <p className="text-3xl font-bold text-foreground">156</p>
                  <p className="text-sm text-orange-400 font-semibold">12 active pipelines</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Layers className="h-7 w-7 text-white" />
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-4 text-orange-400 hover:bg-orange-500/10"
                onClick={() => handleQuickAction("Data Models", "/astro-bricks")}
              >
                <Layers className="h-4 w-4 mr-2" />
                Manage Models
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Users</p>
                  <p className="text-3xl font-bold text-foreground">342</p>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-400" />
                    <p className="text-sm text-green-400 font-semibold">89 online now</p>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Users className="h-7 w-7 text-white" />
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-4 text-green-400 hover:bg-green-500/10"
                onClick={() => handleQuickAction("User Management", "/admin")}
              >
                <Users className="h-4 w-4 mr-2" />
                View Users
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">System Health</p>
                  <p className="text-3xl font-bold text-foreground">99.8%</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <p className="text-sm text-green-400 font-semibold">All systems operational</p>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Activity className="h-7 w-7 text-white" />
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-4 text-green-400 hover:bg-green-500/10"
                onClick={() => handleQuickAction("System Status", "/admin")}
              >
                <Activity className="h-4 w-4 mr-2" />
                Health Check
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Real-Time Analytics Dashboard */}
        <DashboardAnalytics />

        {/* Platform Modules */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Platform Modules</h2>
            <Badge variant="outline" className="text-blue-400 border-blue-400 bg-blue-400/10 px-4 py-2">
              5 Available Modules
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Card 
                key={module.title} 
                className="bg-card border-border hover:bg-accent transition-all duration-300 group cursor-pointer hover:shadow-lg"
                onClick={() => handleModuleNavigation(module)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${module.iconBg} shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <module.icon className="h-6 w-6 text-white" />
                    </div>
                    <ArrowRight className={`h-5 w-5 ${module.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </div>
                  <div>
                    <CardTitle className={`text-xl font-bold ${module.color}`}>
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2 text-muted-foreground">
                      {module.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${module.color} hover:bg-accent font-semibold transition-colors duration-300`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModuleNavigation(module);
                    }}
                  >
                    Explore Module
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-card border-border mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              Quick Actions
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Common tasks and shortcuts to get you started quickly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="w-full h-16 text-left justify-start border-border hover:bg-accent hover:border-blue-400 transition-all duration-300"
                onClick={() => handleQuickAction("Add Data Source", "/astro-scan")}
              >
                <Database className="h-5 w-5 mr-3 text-blue-400" />
                <div>
                  <div className="font-semibold text-foreground">Add Data Source</div>
                  <div className="text-sm text-muted-foreground">Connect new data</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-16 text-left justify-start border-border hover:bg-accent hover:border-purple-400 transition-all duration-300"
                onClick={() => handleQuickAction("Create Dashboard", "/astro-view")}
              >
                <Eye className="h-5 w-5 mr-3 text-purple-400" />
                <div>
                  <div className="font-semibold text-foreground">Create Dashboard</div>
                  <div className="text-sm text-muted-foreground">Build visualizations</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-16 text-left justify-start border-border hover:bg-accent hover:border-green-400 transition-all duration-300"
                onClick={() => handleQuickAction("Monitor KPIs", "/astro-metrics")}
              >
                <Target className="h-5 w-5 mr-3 text-green-400" />
                <div>
                  <div className="font-semibold text-foreground">Monitor KPIs</div>
                  <div className="text-sm text-muted-foreground">Track performance</div>
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
