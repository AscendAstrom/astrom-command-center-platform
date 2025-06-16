
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Users, DollarSign, Activity, Database, Clock, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Simulate loading analytics data
    const loadData = () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockData = generateMockAnalyticsData();
        setAnalyticsData(mockData);
        setLastUpdated(new Date());
        setIsLoading(false);
      }, 800);
    };

    loadData();
    const interval = setInterval(loadData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const generateMockAnalyticsData = () => {
    return {
      overview: {
        totalPatients: 1247,
        activeAlerts: 8,
        avgResponseTime: 12.5,
        systemUptime: 99.7,
        dataQuality: 94.2
      },
      patientFlow: Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        admissions: Math.floor(Math.random() * 15) + 5,
        discharges: Math.floor(Math.random() * 12) + 3,
        transfers: Math.floor(Math.random() * 8) + 1
      })),
      departmentMetrics: [
        { name: 'Emergency', utilization: 87, efficiency: 92, alerts: 3 },
        { name: 'ICU', utilization: 94, efficiency: 89, alerts: 2 },
        { name: 'Surgery', utilization: 78, efficiency: 95, alerts: 1 },
        { name: 'Laboratory', utilization: 82, efficiency: 91, alerts: 1 },
        { name: 'Radiology', utilization: 75, efficiency: 88, alerts: 1 }
      ],
      financialMetrics: {
        dailyRevenue: 185000,
        monthlyRevenue: 4650000,
        costPerPatient: 3200,
        profitMargin: 18.5,
        trend: Array.from({ length: 30 }, (_, i) => ({
          day: i + 1,
          revenue: 150000 + Math.random() * 50000,
          costs: 120000 + Math.random() * 30000
        }))
      },
      qualityMetrics: {
        patientSatisfaction: 4.6,
        safetyScore: 92,
        infectionRate: 2.1,
        readmissionRate: 8.7,
        mortalityRate: 1.2
      },
      resourceUtilization: [
        { resource: 'Beds', current: 420, total: 500, utilization: 84 },
        { resource: 'Staff', current: 280, total: 320, utilization: 87.5 },
        { resource: 'Equipment', current: 145, total: 180, utilization: 80.6 },
        { resource: 'ORs', current: 14, total: 18, utilization: 77.8 }
      ]
    };
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-blue-400" />
                Analytics Dashboard
              </CardTitle>
              <CardDescription>
                Comprehensive analytics and insights for hospital operations
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                Live Data
              </Badge>
              <Button size="sm" variant="outline">
                <Database className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Total Patients</span>
            </div>
            <div className="text-2xl font-bold">{analyticsData?.overview.totalPatients}</div>
            <div className="text-xs text-green-600">+5.2% from yesterday</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Active Alerts</span>
            </div>
            <div className="text-2xl font-bold">{analyticsData?.overview.activeAlerts}</div>
            <div className="text-xs text-orange-600">2 critical</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Avg Response</span>
            </div>
            <div className="text-2xl font-bold">{analyticsData?.overview.avgResponseTime}m</div>
            <div className="text-xs text-green-600">-2.1% improved</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">System Uptime</span>
            </div>
            <div className="text-2xl font-bold">{analyticsData?.overview.systemUptime}%</div>
            <div className="text-xs text-green-600">Excellent</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4 text-cyan-500" />
              <span className="text-sm font-medium">Data Quality</span>
            </div>
            <div className="text-2xl font-bold">{analyticsData?.overview.dataQuality}%</div>
            <div className="text-xs text-cyan-600">High quality</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="patient-flow" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="patient-flow">Patient Flow</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="patient-flow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Flow - Last 24 Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData?.patientFlow}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="admissions" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="discharges" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="transfers" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData?.departmentMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="utilization" fill="#3b82f6" />
                  <Bar dataKey="efficiency" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Financial Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Daily Revenue</span>
                  <span className="font-bold text-green-600">
                    ${analyticsData?.financialMetrics.dailyRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Revenue</span>
                  <span className="font-bold">
                    ${(analyticsData?.financialMetrics.monthlyRevenue / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Cost per Patient</span>
                  <span className="font-bold">
                    ${analyticsData?.financialMetrics.costPerPatient.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Profit Margin</span>
                  <span className="font-bold text-green-600">
                    {analyticsData?.financialMetrics.profitMargin}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.resourceUtilization.map((resource, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{resource.resource}</span>
                        <span>{resource.current}/{resource.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${resource.utilization}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">{resource.utilization}% utilized</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600">
                    {analyticsData?.qualityMetrics.patientSatisfaction}
                  </div>
                  <div className="text-sm text-gray-500">out of 5.0</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">
                    {analyticsData?.qualityMetrics.safetyScore}
                  </div>
                  <div className="text-sm text-gray-500">out of 100</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Infection Rate</span>
                  <span className="font-medium">{analyticsData?.qualityMetrics.infectionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Readmission Rate</span>
                  <span className="font-medium">{analyticsData?.qualityMetrics.readmissionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Mortality Rate</span>
                  <span className="font-medium">{analyticsData?.qualityMetrics.mortalityRate}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-xs text-muted-foreground text-center">
        Last updated: {lastUpdated.toLocaleTimeString()} | 
        Data refreshes automatically every minute
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
