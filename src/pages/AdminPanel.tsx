
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Shield, 
  Users, 
  Database, 
  Activity, 
  AlertTriangle,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Server,
  HardDrive,
  Cpu,
  MemoryStick
} from "lucide-react";

const AdminPanel = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const users = [
    { id: "1", name: "Dr. Sarah Johnson", email: "sarah.johnson@hospital.com", role: "ADMIN", status: "Active", lastLogin: "2 hours ago" },
    { id: "2", name: "Dr. Michael Chen", email: "michael.chen@hospital.com", role: "DATA_ENGINEER", status: "Active", lastLogin: "1 day ago" },
    { id: "3", name: "Nurse Lisa Williams", email: "lisa.williams@hospital.com", role: "ANALYST", status: "Active", lastLogin: "30 minutes ago" },
    { id: "4", name: "Dr. Robert Davis", email: "robert.davis@hospital.com", role: "ANALYST", status: "Inactive", lastLogin: "1 week ago" },
  ];

  const systemMetrics = [
    { name: "CPU Usage", value: "23%", status: "normal" },
    { name: "Memory Usage", value: "67%", status: "normal" },
    { name: "Disk Space", value: "45%", status: "normal" },
    { name: "Network I/O", value: "12 MB/s", status: "normal" },
  ];

  const recentActivities = [
    { user: "Dr. Sarah Johnson", action: "Created new automation rule", time: "5 minutes ago", type: "success" },
    { user: "System", action: "Data backup completed", time: "1 hour ago", type: "info" },
    { user: "Dr. Michael Chen", action: "Updated data pipeline configuration", time: "2 hours ago", type: "success" },
    { user: "System", action: "Failed login attempt detected", time: "3 hours ago", type: "warning" },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN": return "bg-red-500/20 text-red-400 border-red-400";
      case "DATA_ENGINEER": return "bg-blue-500/20 text-blue-400 border-blue-400";
      case "ANALYST": return "bg-green-500/20 text-green-400 border-green-400";
      default: return "bg-gray-500/20 text-gray-400 border-gray-400";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "Active" 
      ? "bg-green-500/20 text-green-400 border-green-400"
      : "bg-gray-500/20 text-gray-400 border-gray-400";
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
                  <p className="text-slate-400">System administration and user management</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-red-400 border-red-400 bg-red-400/10">
              <Shield className="h-3 w-3 mr-1" />
              Admin Access
            </Badge>
          </div>
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-slate-400">Total Users</p>
                  <p className="text-xl font-bold text-white">24</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-slate-400">Data Sources</p>
                  <p className="text-xl font-bold text-white">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-slate-400">Active Sessions</p>
                  <p className="text-xl font-bold text-white">18</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-slate-400">System Alerts</p>
                  <p className="text-xl font-bold text-white">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
            <TabsTrigger value="users" className="data-[state=active]:bg-slate-600/50">User Management</TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-slate-600/50">System Health</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-slate-600/50">Activity Logs</TabsTrigger>
            <TabsTrigger value="config" className="data-[state=active]:bg-slate-600/50">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Users className="h-5 w-5" />
                      User Management
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Manage user accounts, roles, and permissions
                    </CardDescription>
                  </div>
                  <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Name</TableHead>
                      <TableHead className="text-slate-300">Email</TableHead>
                      <TableHead className="text-slate-300">Role</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Last Login</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-slate-700">
                        <TableCell className="font-medium text-white">{user.name}</TableCell>
                        <TableCell className="text-slate-300">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusBadgeColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-300">{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-800/50">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-800/50">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-800/50">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Server className="h-5 w-5" />
                    System Metrics
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Real-time system performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {systemMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {metric.name === "CPU Usage" && <Cpu className="h-4 w-4 text-blue-400" />}
                        {metric.name === "Memory Usage" && <MemoryStick className="h-4 w-4 text-green-400" />}
                        {metric.name === "Disk Space" && <HardDrive className="h-4 w-4 text-purple-400" />}
                        {metric.name === "Network I/O" && <Activity className="h-4 w-4 text-yellow-400" />}
                        <span className="text-sm text-slate-300">{metric.name}</span>
                      </div>
                      <Badge variant="outline" className="text-green-400 border-green-400 bg-green-400/10">
                        {metric.value}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Database className="h-5 w-5" />
                    Database Status
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Database health and performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Connection Pool</span>
                    <Badge variant="outline" className="text-green-400 border-green-400 bg-green-400/10">
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Query Performance</span>
                    <Badge variant="outline" className="text-green-400 border-green-400 bg-green-400/10">
                      Optimal
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Backup Status</span>
                    <Badge variant="outline" className="text-green-400 border-green-400 bg-green-400/10">
                      Up to date
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Replication</span>
                    <Badge variant="outline" className="text-green-400 border-green-400 bg-green-400/10">
                      Synced
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-slate-400">
                  System and user activity logs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border border-slate-700 rounded-lg bg-slate-800/50">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === "success" ? "bg-green-400" :
                        activity.type === "warning" ? "bg-yellow-400" :
                        "bg-blue-400"
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{activity.action}</p>
                        <p className="text-xs text-slate-400">by {activity.user}</p>
                      </div>
                      <span className="text-xs text-slate-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Settings className="h-5 w-5" />
                  System Configuration
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Global system settings and configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="systemName" className="text-slate-300">System Name</Label>
                    <Input id="systemName" defaultValue="ASTROM Healthcare Platform" className="bg-slate-800/50 border-slate-700 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxUsers" className="text-slate-300">Max Concurrent Users</Label>
                    <Input id="maxUsers" type="number" defaultValue="100" className="bg-slate-800/50 border-slate-700 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency" className="text-slate-300">Backup Frequency (hours)</Label>
                  <Input id="backupFrequency" type="number" defaultValue="24" className="bg-slate-800/50 border-slate-700 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout" className="text-slate-300">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="30" className="bg-slate-800/50 border-slate-700 text-white" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Save Configuration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
