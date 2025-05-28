
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
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">AstroMetrics</h1>
          <p className="text-muted-foreground">Define, track, and visualize key performance indicators.</p>
        </div>
        <Button variant="secondary" className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Metric
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="metrics-builder" className="data-[state=active]:text-primary">
            <Target className="mr-2 h-4 w-4" />
            Metric Builder
          </TabsTrigger>
          <TabsTrigger value="kpi-dictionary" className="data-[state=active]:text-primary">
            <TrendingUp className="mr-2 h-4 w-4" />
            KPI Dictionary
          </TabsTrigger>
          <TabsTrigger value="sla-configuration" className="data-[state=active]:text-primary">
            <AlertTriangle className="mr-2 h-4 w-4" />
            SLA Configuration
          </TabsTrigger>
          <TabsTrigger value="alerts-manager" className="data-[state=active]:text-primary">
            <Bell className="mr-2 h-4 w-4" />
            Alerts Manager
          </TabsTrigger>
        </TabsList>
        <TabsContent value="metrics-builder" className="mt-6">
          <MetricBuilder userRole="admin" />
        </TabsContent>
        <TabsContent value="kpi-dictionary" className="mt-6">
          <KPIDictionary userRole="admin" />
        </TabsContent>
        <TabsContent value="sla-configuration" className="mt-6">
          <SLAConfiguration userRole="admin" />
        </TabsContent>
        <TabsContent value="alerts-manager" className="mt-6">
          <AlertsManager userRole="admin" />
        </TabsContent>
      </Tabs>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Engagement
            </CardTitle>
            <CardDescription>Track user activity and engagement metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4,567 Active Users</p>
            <p className="text-sm text-muted-foreground">30% increase from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Performance
            </CardTitle>
            <CardDescription>Monitor system health and performance metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">99.99% Uptime</p>
            <p className="text-sm text-muted-foreground">No downtime incidents reported</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Conversion Rates
            </CardTitle>
            <CardDescription>Analyze conversion rates across different stages.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">15% Conversion Rate</p>
            <p className="text-sm text-muted-foreground">5% increase from last quarter</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AstroMetrics;
