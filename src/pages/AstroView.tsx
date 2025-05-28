
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ViewUserRole } from '@/components/astro-view/types';
import SemanticLayerBuilder from '@/components/astro-view/SemanticLayerBuilder';
import DashboardManager from '@/components/astro-view/DashboardManager';
import RealtimeDashboard from '@/components/astro-view/RealtimeDashboard';
import { BarChart3, Eye, Settings, Sparkles, TrendingUp, Zap, Activity, Users } from 'lucide-react';

const AstroView = () => {
  // Simulate user role - in real app this would come from auth context
  const [currentUserRole] = useState<ViewUserRole>('ANALYST');

  const canCreateDashboards = currentUserRole === 'ADMIN' || currentUserRole === 'ANALYST';
  const canEditSemanticLayer = currentUserRole === 'ADMIN' || currentUserRole === 'ANALYST';

  return (
    <div className="p-6 space-y-8 min-h-screen animate-fade-in">
      {/* Hero Header */}
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 gradient-bg-purple rounded-3xl flex items-center justify-center shadow-lg hover-glow animate-pulse-glow">
              <Eye className="h-7 w-7 text-white" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-heading bg-gradient-to-r from-astrom-purple to-astrom-pink bg-clip-text text-transparent">
                  ASTRO-VIEW
                </h1>
                <Badge className="gradient-bg-purple text-white border-0 animate-bounce-subtle">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Powered
                </Badge>
              </div>
              <p className="text-subheading text-muted-foreground">
                Data Visualization & Dashboard Management
              </p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-astrom-green animate-bounce-subtle" />
                  <span className="text-sm text-muted-foreground">Real-time Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-astrom-blue" />
                  <span className="text-sm text-muted-foreground">Predictive Insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-astrom-orange" />
                  <span className="text-sm text-muted-foreground">Role-based Access</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button className="gradient-bg-purple hover:shadow-lg hover-lift">
              <Zap className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Active Dashboards", value: "12", change: "+3", icon: BarChart3, color: "text-astrom-blue", bg: "bg-astrom-blue/10" },
          { title: "Real-time Viewers", value: "847", change: "+12%", icon: Eye, color: "text-astrom-green", bg: "bg-astrom-green/10" },
          { title: "Data Sources", value: "24", change: "+2", icon: Activity, color: "text-astrom-orange", bg: "bg-astrom-orange/10" },
          { title: "Alert Rules", value: "156", change: "+8", icon: Zap, color: "text-astrom-purple", bg: "bg-astrom-purple/10" },
        ].map((stat, index) => (
          <Card 
            key={stat.title} 
            className="surface-elevated border-border/30 hover-lift animate-scale-in" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-caption text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-xs ${stat.color} flex items-center gap-1`}>
                    <TrendingUp className="h-3 w-3" />
                    {stat.change} this week
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="dashboards" className="w-full">
        <TabsList className="grid w-full grid-cols-3 glass-card p-1 h-12">
          <TabsTrigger 
            value="dashboards" 
            className="data-[state=active]:gradient-bg-purple data-[state=active]:text-white transition-all duration-300 rounded-xl"
          >
            <Eye className="h-4 w-4 mr-2" />
            Live Dashboards
          </TabsTrigger>
          <TabsTrigger 
            value="builder" 
            disabled={!canCreateDashboards} 
            className="data-[state=active]:gradient-bg-blue data-[state=active]:text-white transition-all duration-300 rounded-xl"
          >
            <Settings className="h-4 w-4 mr-2" />
            Dashboard Builder
          </TabsTrigger>
          <TabsTrigger 
            value="semantic" 
            disabled={!canEditSemanticLayer} 
            className="data-[state=active]:gradient-bg-green data-[state=active]:text-white transition-all duration-300 rounded-xl"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Semantic Layer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboards" className="space-y-6 mt-8">
          <Card className="surface-elevated-lg border-border/30 animate-slide-up">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 bg-astrom-green rounded-full animate-bounce-subtle"></div>
                    Live Dashboards
                  </CardTitle>
                  <CardDescription>Real-time operational dashboards with auto-refresh capabilities</CardDescription>
                </div>
                <Badge className="gradient-bg-green text-white border-0">
                  <Activity className="h-3 w-3 mr-1 animate-bounce-subtle" />
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <RealtimeDashboard userRole={currentUserRole} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6 mt-8">
          <Card className="surface-elevated-lg border-border/30 animate-slide-up">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Settings className="h-5 w-5 text-astrom-blue" />
                    Dashboard Builder
                  </CardTitle>
                  <CardDescription>Create and manage custom dashboards with drag-and-drop interface</CardDescription>
                </div>
                <Badge className="gradient-bg-blue text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Assisted
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <DashboardManager userRole={currentUserRole} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="semantic" className="space-y-6 mt-8">
          <Card className="surface-elevated-lg border-border/30 animate-slide-up">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-astrom-green" />
                    Semantic Layer Builder
                  </CardTitle>
                  <CardDescription>Define business terms, calculations, and data relationships</CardDescription>
                </div>
                <Badge className="gradient-bg-orange text-white border-0">
                  <Zap className="h-3 w-3 mr-1" />
                  Advanced
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <SemanticLayerBuilder userRole={currentUserRole} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AstroView;
