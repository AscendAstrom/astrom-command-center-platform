
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
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const modules = [
    {
      title: "ASTRO-SCAN",
      description: "Data Ingestion & Source Management",
      icon: Database,
      link: "/astro-scan",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      title: "ASTRO-BRICKS",
      description: "Data Modeling & Transformation",
      icon: Layers,
      link: "/astro-bricks",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/50",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600"
    },
    {
      title: "ASTRO-METRICS",
      description: "KPI & Performance Analytics",
      icon: Target,
      link: "/astro-metrics",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/50",
      iconBg: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      title: "ASTRO-VIEW",
      description: "Data Visualization & Dashboards",
      icon: Eye,
      link: "/astro-view",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/50",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      title: "ASTRO-FLOW",
      description: "Automation & Workflow Management",
      icon: Zap,
      link: "/astro-flow",
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-50 dark:bg-pink-950/50",
      iconBg: "bg-gradient-to-br from-pink-500 to-pink-600"
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-full animate-fade-in">
      {/* Header Section */}
      <div className="text-center space-y-4 mb-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl animate-pulse-glow">
            <LayoutDashboard className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-display">
              ASTROM
            </h1>
            <p className="text-muted-foreground text-2xl font-medium mt-2">
              Intelligence Platform Dashboard
            </p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Comprehensive data intelligence platform providing end-to-end analytics, 
          from data ingestion to advanced visualizations and automated workflows.
        </p>
      </div>

      {/* Platform Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Sources</p>
                <p className="text-3xl font-bold text-foreground">24</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-status-success" />
                  <p className="text-sm text-status-success font-semibold">+8% this week</p>
                </div>
              </div>
              <div className="w-14 h-14 gradient-bg-blue rounded-2xl flex items-center justify-center shadow-lg">
                <Database className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Data Models</p>
                <p className="text-3xl font-bold text-foreground">156</p>
                <p className="text-sm text-astrom-orange font-semibold">12 active pipelines</p>
              </div>
              <div className="w-14 h-14 gradient-bg-orange rounded-2xl flex items-center justify-center shadow-lg">
                <Layers className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Users</p>
                <p className="text-3xl font-bold text-foreground">342</p>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-astrom-green" />
                  <p className="text-sm text-astrom-green font-semibold">89 online now</p>
                </div>
              </div>
              <div className="w-14 h-14 gradient-bg-green rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">System Health</p>
                <p className="text-3xl font-bold text-foreground">99.8%</p>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-status-success" />
                  <p className="text-sm text-status-success font-semibold">All systems operational</p>
                </div>
              </div>
              <div className="w-14 h-14 gradient-bg-green rounded-2xl flex items-center justify-center shadow-lg">
                <Activity className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground">Platform Modules</h2>
          <Badge variant="outline" className="text-astrom-blue border-astrom-blue bg-astrom-blue/10 px-4 py-2">
            5 Available Modules
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <Card 
              key={module.title} 
              className={`surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card group cursor-pointer ${module.bgColor} hover:shadow-xl`}
              style={{ animationDelay: `${index * 0.1}s` }}
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
                  <CardDescription className="text-base mt-2">
                    {module.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Link to={module.link}>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${module.color} hover:${module.bgColor} font-semibold group-hover:bg-background/50 transition-colors duration-300`}
                  >
                    Explore Module
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="surface-elevated border-border/50 glass-card animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 gradient-bg-purple rounded-xl flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            Quick Actions
          </CardTitle>
          <CardDescription className="text-base">
            Common tasks and shortcuts to get you started quickly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/astro-scan">
              <Button variant="outline" className="w-full h-16 text-left justify-start hover-lift">
                <Database className="h-5 w-5 mr-3 text-blue-500" />
                <div>
                  <div className="font-semibold">Add Data Source</div>
                  <div className="text-sm text-muted-foreground">Connect new data</div>
                </div>
              </Button>
            </Link>
            <Link to="/astro-view">
              <Button variant="outline" className="w-full h-16 text-left justify-start hover-lift">
                <Eye className="h-5 w-5 mr-3 text-purple-500" />
                <div>
                  <div className="font-semibold">Create Dashboard</div>
                  <div className="text-sm text-muted-foreground">Build visualizations</div>
                </div>
              </Button>
            </Link>
            <Link to="/astro-metrics">
              <Button variant="outline" className="w-full h-16 text-left justify-start hover-lift">
                <Target className="h-5 w-5 mr-3 text-green-500" />
                <div>
                  <div className="font-semibold">Monitor KPIs</div>
                  <div className="text-sm text-muted-foreground">Track performance</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
