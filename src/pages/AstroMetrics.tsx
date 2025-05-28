
import { useState } from "react";
import { Plus, Target, TrendingUp, AlertTriangle, Users, Activity, Bell, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricBuilder from "@/components/astro-metrics/MetricBuilder";
import KPIDictionary from "@/components/astro-metrics/KPIDictionary";
import SLAConfiguration from "@/components/astro-metrics/SLAConfiguration";
import AlertsManager from "@/components/astro-metrics/AlertsManager";

const AstroMetrics = () => {
  const [activeTab, setActiveTab] = useState("metrics-builder");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">ASTRO-METRICS</h1>
            <span className="text-sm text-green-500 font-medium">Performance & KPI Management</span>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Define and track key performance indicators with advanced SLA monitoring and automated alerting systems.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="metrics-builder" className="data-[state=active]:bg-green-500/20">
              Metric Builder
            </TabsTrigger>
            <TabsTrigger value="kpi-dictionary" className="data-[state=active]:bg-green-500/20">
              KPI Dictionary
            </TabsTrigger>
            <TabsTrigger value="sla-configuration" className="data-[state=active]:bg-green-500/20">
              SLA Configuration
            </TabsTrigger>
            <TabsTrigger value="alerts-manager" className="data-[state=active]:bg-green-500/20">
              Alerts Manager
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics-builder" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  Metric Builder
                </CardTitle>
                <CardDescription>
                  Create and configure custom metrics and KPIs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MetricBuilder userRole="ADMIN" />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="kpi-dictionary" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  KPI Dictionary
                </CardTitle>
                <CardDescription>
                  Manage your key performance indicators library
                </CardDescription>
              </CardHeader>
              <CardContent>
                <KPIDictionary userRole="ADMIN" />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sla-configuration" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  SLA Configuration
                </CardTitle>
                <CardDescription>
                  Configure service level agreements and thresholds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SLAConfiguration userRole="ADMIN" />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts-manager" className="space-y-6">
            <Card className="bg-card/80 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Bell className="h-5 w-5 text-red-500" />
                  Alerts Manager
                </CardTitle>
                <CardDescription>
                  Configure alerts and notification channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertsManager userRole="ADMIN" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-foreground">
                <Users className="h-5 w-5" />
                User Engagement
              </CardTitle>
              <CardDescription>Track user activity and engagement metrics.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">4,567 Active Users</p>
              <p className="text-sm text-green-500 font-medium">30% increase from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-foreground">
                <Activity className="h-5 w-5" />
                System Performance
              </CardTitle>
              <CardDescription>Monitor system health and performance metrics.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">99.99% Uptime</p>
              <p className="text-sm text-green-500 font-medium">No downtime incidents reported</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-foreground">
                <TrendingUp className="h-5 w-5" />
                Conversion Rates
              </CardTitle>
              <CardDescription>Analyze conversion rates across different stages.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">15% Conversion Rate</p>
              <p className="text-sm text-green-500 font-medium">5% increase from last quarter</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AstroMetrics;
