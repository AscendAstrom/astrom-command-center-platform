import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Users, Bed, AlertTriangle, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { MetaTags } from "@/components/MetaTags";
import { NavigationHelper } from "@/components/NavigationHelper";
import { DashboardAnalytics } from "@/components/dashboard/DashboardAnalytics";

const Dashboard = () => {
  const [shouldNavigate, setShouldNavigate] = useState(false);

  // Auto-navigate to Command Center
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldNavigate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (shouldNavigate) {
    return <NavigationHelper to="/command-center" />;
  }

  const stats = [
    {
      title: "Active Patients",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Available Beds",
      value: "89",
      change: "-5%",
      trend: "down", 
      icon: Bed,
      color: "text-green-600"
    },
    {
      title: "Critical Alerts",
      value: "7",
      change: "+2",
      trend: "up",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      title: "System Health",
      value: "98.5%",
      change: "+0.2%",
      trend: "up",
      icon: Activity,
      color: "text-emerald-600"
    }
  ];

  return (
    <>
      <MetaTags 
        title="Dashboard Overview"
        description="Real-time healthcare analytics and monitoring dashboard for ASTROM Command Center"
        keywords="healthcare dashboard, patient monitoring, real-time analytics, hospital management"
      />
      
      <div className="flex-1 space-y-4 p-4 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600">
              <Activity className="h-3 w-3 mr-1" />
              System Operational
            </Badge>
            <Button variant="outline" size="sm">
              <ArrowRight className="h-4 w-4 mr-2" />
              Navigating to Command Center...
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last hour
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <DashboardAnalytics />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Detailed performance metrics and trend analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Advanced analytics content will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Reports</CardTitle>
                <CardDescription>
                  Generated reports and documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Reports and documentation will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Dashboard;
