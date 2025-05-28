
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

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "success": return "text-green-400";
      case "warning": return "text-yellow-400";
      case "info": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground">System administration and user management</p>
        </div>
        <Badge variant="outline" className="text-red-500 border-red-500">
          <Shield className="h-3 w-3 mr-1" />
          Admin Access
        </Badge>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-xl font-bold text-foreground">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">Data Sources</p>
                <p className="text-xl font-bold text-foreground">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
                <p className="text-xl font-bold text-foreground">18</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-sm text-muted-foreground">System Alerts</p>
                <p className="text-xl font-bold text-foreground">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                  </CardTitle>
                  <CardDescription>
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
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
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
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  System Metrics
                </CardTitle>
                <CardDescription>
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
                      <span className="text-sm">{metric.name}</span>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      {metric.value}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Status
                </CardTitle>
                <CardDescription>
                  Database health and performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Connection Pool</span>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Query Performance</span>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    Optimal
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Backup Status</span>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    Up to date
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Replication</span>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    Synced
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                System and user activity logs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === "success" ? "bg-green-400" :
                      activity.type === "warning" ? "bg-yellow-400" :
                      "bg-blue-400"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">by {activity.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Global system settings and configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systemName">System Name</Label>
                  <Input id="systemName" defaultValue="ASTROM Healthcare Platform" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxUsers">Max Concurrent Users</Label>
                  <Input id="maxUsers" type="number" defaultValue="100" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Backup Frequency (hours)</Label>
                <Input id="backupFrequency" type="number" defaultValue="24" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input id="sessionTimeout" type="number" defaultValue="30" />
              </div>
              <Button className="w-full">
                Save Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
