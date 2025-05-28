
import { useState } from "react";
import { Plus, Target, TrendingUp, AlertTriangle, Users, Activity, Bell } from "lucide-react";
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
    <div className="p-6 space-y-6 bg-background min-h-full animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse-glow shadow-lg">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-display">
                ASTRO-METRICS
              </h1>
              <p className="text-muted-foreground text-xl font-medium mt-1">
                Performance & KPI Management Platform
              </p>
            </div>
          </div>
        </div>
        
        <Button 
          variant="secondary" 
          className="gradient-bg-blue hover:shadow-xl hover-lift transition-all duration-300 px-8 py-4 text-base font-semibold gap-2"
        >
          <Plus className="h-5 w-5" />
          Add New Metric
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-800/50 grid w-full grid-cols-4">
          <TabsTrigger value="metrics-builder" className="data-[state=active]:bg-blue-500/20">
            <Target className="mr-2 h-4 w-4" />
            Metric Builder
          </TabsTrigger>
          <TabsTrigger value="kpi-dictionary" className="data-[state=active]:bg-blue-500/20">
            <TrendingUp className="mr-2 h-4 w-4" />
            KPI Dictionary
          </TabsTrigger>
          <TabsTrigger value="sla-configuration" className="data-[state=active]:bg-blue-500/20">
            <AlertTriangle className="mr-2 h-4 w-4" />
            SLA Configuration
          </TabsTrigger>
          <TabsTrigger value="alerts-manager" className="data-[state=active]:bg-blue-500/20">
            <Bell className="mr-2 h-4 w-4" />
            Alerts Manager
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics-builder" className="mt-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-400" />
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
        
        <TabsContent value="kpi-dictionary" className="mt-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
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
        
        <TabsContent value="sla-configuration" className="mt-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
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
        
        <TabsContent value="alerts-manager" className="mt-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-red-400" />
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
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-white">
              <Users className="h-5 w-5" />
              User Engagement
            </CardTitle>
            <CardDescription>Track user activity and engagement metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">4,567 Active Users</p>
            <p className="text-sm text-green-400 font-medium">30% increase from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-white">
              <Activity className="h-5 w-5" />
              System Performance
            </CardTitle>
            <CardDescription>Monitor system health and performance metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">99.99% Uptime</p>
            <p className="text-sm text-green-400 font-medium">No downtime incidents reported</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5" />
              Conversion Rates
            </CardTitle>
            <CardDescription>Analyze conversion rates across different stages.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">15% Conversion Rate</p>
            <p className="text-sm text-green-400 font-medium">5% increase from last quarter</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AstroMetrics;
