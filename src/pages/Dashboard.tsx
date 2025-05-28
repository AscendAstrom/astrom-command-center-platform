
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

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">ASTROM</h1>
            <span className="text-sm text-blue-400 font-medium">Intelligence Platform Dashboard</span>
          </div>
          <p className="text-slate-400 max-w-2xl">
            Comprehensive data intelligence platform providing end-to-end analytics, 
            from data ingestion to advanced visualizations and automated workflows.
          </p>
        </div>

        {/* Platform Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Active Sources</p>
                  <p className="text-3xl font-bold text-white">24</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <p className="text-sm text-green-400 font-semibold">+8% this week</p>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Database className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Data Models</p>
                  <p className="text-3xl font-bold text-white">156</p>
                  <p className="text-sm text-orange-400 font-semibold">12 active pipelines</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Layers className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Active Users</p>
                  <p className="text-3xl font-bold text-white">342</p>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-400" />
                    <p className="text-sm text-green-400 font-semibold">89 online now</p>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">System Health</p>
                  <p className="text-3xl font-bold text-white">99.8%</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <p className="text-sm text-green-400 font-semibold">All systems operational</p>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Activity className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Modules */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Platform Modules</h2>
            <Badge variant="outline" className="text-blue-400 border-blue-400 bg-blue-400/10 px-4 py-2">
              5 Available Modules
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Card 
                key={module.title} 
                className="bg-slate-900/50 border-slate-800 hover:bg-slate-800/50 transition-all duration-300 group cursor-pointer"
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
                    <CardDescription className="text-base mt-2 text-slate-400">
                      {module.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link to={module.link}>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${module.color} hover:bg-slate-800/50 font-semibold transition-colors duration-300`}
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
        <Card className="bg-slate-900/50 border-slate-800 mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              Quick Actions
            </CardTitle>
            <CardDescription className="text-base text-slate-400">
              Common tasks and shortcuts to get you started quickly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/astro-scan">
                <Button variant="outline" className="w-full h-16 text-left justify-start border-slate-700 hover:bg-slate-800/50">
                  <Database className="h-5 w-5 mr-3 text-blue-400" />
                  <div>
                    <div className="font-semibold text-white">Add Data Source</div>
                    <div className="text-sm text-slate-400">Connect new data</div>
                  </div>
                </Button>
              </Link>
              <Link to="/astro-view">
                <Button variant="outline" className="w-full h-16 text-left justify-start border-slate-700 hover:bg-slate-800/50">
                  <Eye className="h-5 w-5 mr-3 text-purple-400" />
                  <div>
                    <div className="font-semibold text-white">Create Dashboard</div>
                    <div className="text-sm text-slate-400">Build visualizations</div>
                  </div>
                </Button>
              </Link>
              <Link to="/astro-metrics">
                <Button variant="outline" className="w-full h-16 text-left justify-start border-slate-700 hover:bg-slate-800/50">
                  <Target className="h-5 w-5 mr-3 text-green-400" />
                  <div>
                    <div className="font-semibold text-white">Monitor KPIs</div>
                    <div className="text-sm text-slate-400">Track performance</div>
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
