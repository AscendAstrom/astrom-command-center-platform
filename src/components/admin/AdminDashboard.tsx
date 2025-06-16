
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Users, Shield, Database, Server, AlertTriangle, CheckCircle, Clock, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const loadAdminData = () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockAdminData = generateMockAdminData();
        setAdminData(mockAdminData);
        setLastUpdated(new Date());
        setIsLoading(false);
      }, 900);
    };

    loadAdminData();
    const interval = setInterval(loadAdminData, 180000); // Update every 3 minutes

    return () => clearInterval(interval);
  }, []);

  const generateMockAdminData = () => {
    return {
      systemOverview: {
        totalUsers: 1247,
        activeUsers: 342,
        systemUptime: 99.7,
        dataProcessed: 24.7, // TB
        alertsGenerated: 156,
        tasksCompleted: 2847
      },
      userManagement: [
        { role: 'Administrators', count: 8, active: 6, permissions: 'Full' },
        { role: 'Doctors', count: 245, active: 89, permissions: 'Clinical' },
        { role: 'Nurses', count: 487, active: 156, permissions: 'Patient Care' },
        { role: 'Technicians', count: 124, active: 45, permissions: 'Equipment' },
        { role: 'Support Staff', count: 383, active: 46, permissions: 'Limited' }
      ],
      systemHealth: {
        cpu: 45,
        memory: 67,
        storage: 78,
        network: 92,
        databases: 94
      },
      securityMetrics: {
        threatLevel: 'LOW',
        blockedAttempts: 23,
        successfulLogins: 1456,
        failedLogins: 67,
        securityScore: 96
      },
      dataManagement: {
        totalRecords: 15600000,
        recordsProcessed: 45600,
        dataQuality: 94.2,
        backupStatus: 'COMPLETED',
        lastBackup: new Date(Date.now() - 3600000) // 1 hour ago
      },
      activityLogs: [
        {
          timestamp: new Date(Date.now() - 300000),
          user: 'Dr. Smith',
          action: 'Patient Record Access',
          status: 'SUCCESS',
          details: 'Accessed patient #12458'
        },
        {
          timestamp: new Date(Date.now() - 600000),
          user: 'Admin Johnson',
          action: 'System Configuration',
          status: 'SUCCESS',
          details: 'Updated alert thresholds'
        },
        {
          timestamp: new Date(Date.now() - 900000),
          user: 'Nurse Williams',
          action: 'Medication Update',
          status: 'SUCCESS',
          details: 'Updated medication schedule'
        },
        {
          timestamp: new Date(Date.now() - 1200000),
          user: 'System',
          action: 'Automated Backup',
          status: 'FAILED',
          details: 'Backup process interrupted'
        }
      ],
      performanceMetrics: Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        cpu: Math.floor(Math.random() * 30) + 30,
        memory: Math.floor(Math.random() * 40) + 50,
        network: Math.floor(Math.random() * 20) + 80,
        requests: Math.floor(Math.random() * 1000) + 500
      })),
      departmentUsage: [
        { name: 'Emergency', value: 28, color: '#ef4444' },
        { name: 'ICU', value: 22, color: '#f97316' },
        { name: 'Surgery', value: 18, color: '#eab308' },
        { name: 'Laboratory', value: 15, color: '#22c55e' },
        { name: 'Radiology', value: 10, color: '#3b82f6' },
        { name: 'Other', value: 7, color: '#8b5cf6' }
      ]
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS': return 'text-green-600';
      case 'FAILED': return 'text-red-600';
      case 'WARNING': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-blue-500" />
            Administration Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-blue-400" />
                Administration Dashboard
              </CardTitle>
              <CardDescription>
                System management, user administration, and security monitoring
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                System Healthy
              </Badge>
              <Button size="sm" variant="outline">
                <Database className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Total Users</span>
            </div>
            <div className="text-2xl font-bold">{adminData?.systemOverview.totalUsers}</div>
            <div className="text-xs text-blue-600">{adminData?.systemOverview.activeUsers} active</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">System Uptime</span>
            </div>
            <div className="text-2xl font-bold">{adminData?.systemOverview.systemUptime}%</div>
            <div className="text-xs text-green-600">Excellent</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Data Processed</span>
            </div>
            <div className="text-2xl font-bold">{adminData?.systemOverview.dataProcessed}TB</div>
            <div className="text-xs text-purple-600">Today</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Alerts</span>
            </div>
            <div className="text-2xl font-bold">{adminData?.systemOverview.alertsGenerated}</div>
            <div className="text-xs text-orange-600">Generated</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Tasks</span>
            </div>
            <div className="text-2xl font-bold">{adminData?.systemOverview.tasksCompleted}</div>
            <div className="text-xs text-green-600">Completed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-cyan-500" />
              <span className="text-sm font-medium">Security</span>
            </div>
            <div className="text-2xl font-bold">{adminData?.securityMetrics.securityScore}</div>
            <div className="text-xs text-cyan-600">Score</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Roles & Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminData?.userManagement.map((role, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{role.role}</div>
                        <div className="text-sm text-muted-foreground">{role.permissions} Access</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{role.count}</div>
                        <div className="text-sm text-green-600">{role.active} active</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Usage Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={adminData?.departmentUsage}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {adminData?.departmentUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(adminData?.systemHealth || {}).map(([resource, value]) => (
                    <div key={resource} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{resource}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            value > 80 ? 'bg-red-500' : value > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics - Last 24 Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={adminData?.performanceMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cpu" stroke="#ef4444" strokeWidth={2} name="CPU %" />
                    <Line type="monotone" dataKey="memory" stroke="#f97316" strokeWidth={2} name="Memory %" />
                    <Line type="monotone" dataKey="network" stroke="#22c55e" strokeWidth={2} name="Network %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {adminData?.securityMetrics.threatLevel}
                  </div>
                  <div className="text-sm text-muted-foreground">Threat Level</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {adminData?.securityMetrics.blockedAttempts}
                  </div>
                  <div className="text-sm text-muted-foreground">Blocked Attempts</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {adminData?.securityMetrics.successfulLogins}
                  </div>
                  <div className="text-sm text-muted-foreground">Successful Logins</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {adminData?.securityMetrics.failedLogins}
                  </div>
                  <div className="text-sm text-muted-foreground">Failed Logins</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  Data Management Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Records</span>
                  <span className="font-bold">
                    {(adminData?.dataManagement.totalRecords / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Records Processed Today</span>
                  <span className="font-bold text-green-600">
                    {adminData?.dataManagement.recordsProcessed.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Data Quality Score</span>
                  <span className="font-bold text-blue-600">
                    {adminData?.dataManagement.dataQuality}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Backup Status</span>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                    {adminData?.dataManagement.backupStatus}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Last Backup</span>
                  <span className="text-sm text-muted-foreground">
                    {adminData?.dataManagement.lastBackup.toLocaleTimeString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Processing Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Real-time Processing</span>
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                        ACTIVE
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Processing 1,247 records/minute
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Batch Processing</span>
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-600">
                        SCHEDULED
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Next batch in 2 hours
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Data Validation</span>
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                        RUNNING
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      94.2% quality score
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                Recent System Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminData?.activityLogs.map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        log.status === 'SUCCESS' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <div className="font-medium">{log.action}</div>
                        <div className="text-sm text-muted-foreground">{log.details}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{log.user}</div>
                      <div className="text-xs text-muted-foreground">
                        {log.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-xs text-muted-foreground text-center">
        Last updated: {lastUpdated.toLocaleTimeString()} | 
        System monitoring updates every 3 minutes
      </div>
    </div>
  );
};

export default AdminDashboard;
