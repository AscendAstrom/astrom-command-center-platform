
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Activity, AlertTriangle, Plus, BarChart3, Database, Settings, Zap } from "lucide-react";
import PatientFlow from "@/components/PatientFlow";
import ZoneMap from "@/components/ZoneMap";
import AlertPanel from "@/components/AlertPanel";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Entities",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-astrom-blue"
    },
    {
      title: "Active Zones",
      value: "8",
      change: "0%",
      trend: "stable",
      icon: BarChart3,
      color: "text-astrom-green"
    },
    {
      title: "Processing Rate",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: Activity,
      color: "text-astrom-orange"
    },
    {
      title: "Open Alerts",
      value: "3",
      change: "-2",
      trend: "down",
      icon: AlertTriangle,
      color: "text-astrom-pink"
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-full animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 gradient-bg-blue rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-astrom-blue via-astrom-purple to-astrom-blue bg-clip-text text-transparent font-display">
                Command Center
              </h1>
              <p className="text-xl text-muted-foreground font-medium mt-1">
                Real-time Operations Dashboard
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-status-success border-status-success bg-status-success/10 px-6 py-3 text-sm font-medium">
            All Systems Operational
          </Badge>
          <Button className="gradient-bg-blue hover:shadow-xl hover-lift transition-all duration-300 px-8 py-4 text-base font-semibold">
            <Plus className="h-5 w-5 mr-2" />
            Quick Action
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="surface-elevated border-border/50 hover-lift transition-all duration-300 animate-slide-up glass-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{stat.title}</p>
                  <p className="text-4xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-status-success" />
                    <p className="text-sm text-status-success font-semibold">{stat.change} from last period</p>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color === 'text-astrom-blue' ? 'gradient-bg-blue' : stat.color === 'text-astrom-green' ? 'gradient-bg-green' : stat.color === 'text-astrom-orange' ? 'gradient-bg-orange' : 'gradient-bg-purple'} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entity Flow Chart */}
        <Card className="surface-elevated border-border/50 glass-card animate-slide-up hover-lift" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <div className="w-12 h-12 gradient-bg-blue rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              Entity Flow Analysis
            </CardTitle>
            <CardDescription className="text-base">24-hour processing flow overview</CardDescription>
          </CardHeader>
          <CardContent>
            <PatientFlow />
          </CardContent>
        </Card>

        {/* Zone Status */}
        <Card className="surface-elevated border-border/50 glass-card animate-slide-up hover-lift" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <div className="w-12 h-12 gradient-bg-green rounded-xl flex items-center justify-center shadow-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              Zone Status Overview
            </CardTitle>
            <CardDescription className="text-base">Current capacity and utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <ZoneMap />
          </CardContent>
        </Card>
      </div>

      {/* Alerts Panel */}
      <div className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
        <Card className="surface-elevated border-border/50 glass-card hover-lift">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <div className="w-12 h-12 gradient-bg-orange rounded-xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              System Alerts & Notifications
            </CardTitle>
            <CardDescription className="text-base">Recent alerts and system status updates</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertPanel />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
