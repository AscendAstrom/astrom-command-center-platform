
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
      color: "text-astrom-blue",
      iconBg: "bg-gradient-to-br from-astrom-blue to-astrom-blue-dark"
    },
    {
      title: "ASTRO-BRICKS",
      description: "Data Modeling & Transformation",
      icon: Layers,
      link: "/astro-bricks",
      color: "text-astrom-orange",
      iconBg: "bg-gradient-to-br from-astrom-purple to-astrom-pink"
    },
    {
      title: "ASTRO-METRICS",
      description: "KPI & Performance Analytics",
      icon: Target,
      link: "/astro-metrics",
      color: "text-astrom-green",
      iconBg: "bg-gradient-to-br from-astrom-green to-astrom-green-dark"
    },
    {
      title: "ASTRO-VIEW",
      description: "Data Visualization & Dashboards",
      icon: Eye,
      link: "/astro-view",
      color: "text-astrom-purple",
      iconBg: "bg-gradient-to-br from-astrom-purple to-astrom-purple-dark"
    },
    {
      title: "ASTRO-FLOW",
      description: "Automation & Workflow Management",
      icon: Zap,
      link: "/astro-flow",
      color: "text-astrom-pink",
      iconBg: "bg-gradient-to-br from-astrom-pink to-astrom-pink-dark"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">ASTROM</h1>
            <span className="text-sm text-primary font-medium">Intelligence Platform Dashboard</span>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Comprehensive data intelligence platform providing end-to-end analytics, 
            from data ingestion to advanced visualizations and automated workflows.
          </p>
        </div>

        {/* Platform Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Sources</p>
                  <p className="text-3xl font-bold text-foreground">24</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-astrom-green" />
                    <p className="text-sm text-astrom-green font-semibold">+8% this week</p>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-astrom-blue to-astrom-blue-dark rounded-2xl flex items-center justify-center shadow-lg">
                  <Database className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Data Models</p>
                  <p className="text-3xl font-bold text-foreground">156</p>
                  <p className="text-sm text-astrom-orange font-semibold">12 active pipelines</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-astrom-purple to-astrom-pink rounded-2xl flex items-center justify-center shadow-lg">
                  <Layers className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
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
                <div className="w-14 h-14 bg-gradient-to-br from-astrom-green to-astrom-green-dark rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">System Health</p>
                  <p className="text-3xl font-bold text-foreground">99.8%</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-astrom-green" />
                    <p className="text-sm text-astrom-green font-semibold">All systems operational</p>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-astrom-green to-astrom-green-dark rounded-2xl flex items-center justify-center shadow-lg">
                  <Activity className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Modules */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Platform Modules</h2>
            <Badge variant="outline" className="text-primary border-primary bg-primary/10 px-4 py-2">
              5 Available Modules
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Card 
                key={module.title} 
                className="bg-card border-border hover:bg-card/80 transition-all duration-300 group cursor-pointer"
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
                  <Link to={module.link}>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${module.color} hover:bg-muted font-semibold transition-colors duration-300`}
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
        <Card className="bg-card border-border mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-astrom-purple to-astrom-purple-dark rounded-xl flex items-center justify-center">
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
              <Link to="/astro-scan">
                <Button variant="outline" className="w-full h-16 text-left justify-start border-border hover:bg-muted">
                  <Database className="h-5 w-5 mr-3 text-astrom-blue" />
                  <div>
                    <div className="font-semibold text-foreground">Add Data Source</div>
                    <div className="text-sm text-muted-foreground">Connect new data</div>
                  </div>
                </Button>
              </Link>
              <Link to="/astro-view">
                <Button variant="outline" className="w-full h-16 text-left justify-start border-border hover:bg-muted">
                  <Eye className="h-5 w-5 mr-3 text-astrom-purple" />
                  <div>
                    <div className="font-semibold text-foreground">Create Dashboard</div>
                    <div className="text-sm text-muted-foreground">Build visualizations</div>
                  </div>
                </Button>
              </Link>
              <Link to="/astro-metrics">
                <Button variant="outline" className="w-full h-16 text-left justify-start border-border hover:bg-muted">
                  <Target className="h-5 w-5 mr-3 text-astrom-green" />
                  <div>
                    <div className="font-semibold text-foreground">Monitor KPIs</div>
                    <div className="text-sm text-muted-foreground">Track performance</div>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
