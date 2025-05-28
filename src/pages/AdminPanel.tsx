
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
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "Active" 
      ? "bg-green-500/20 text-green-400 border-green-400"
      : "bg-muted text-muted-foreground border-border";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
                  <p className="text-muted-foreground">System administration and user management</p>
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
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="users" className="data-[state=active]:bg-background">User Management</TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-background">System Health</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-background">Activity Logs</TabsTrigger>
            <TabsTrigger value="config" className="data-[state=active]:bg-background">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Users className="h-5 w-5" />
                      User Management
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
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
                    <TableRow className="border-border">
                      <TableHead className="text-foreground">Name</TableHead>
                      <TableHead className="text-foreground">Email</TableHead>
                      <TableHead className="text-foreground">Role</TableHead>
                      <TableHead className="text-foreground">Status</TableHead>
                      <TableHead className="text-foreground">Last Login</TableHead>
                      <TableHead className="text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-border">
                        <TableCell className="font-medium text-foreground">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
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
                        <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-border hover:bg-accent">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-border hover:bg-accent">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-border hover:bg-accent">
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
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Server className="h-5 w-5" />
                    System Metrics
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
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
                        <span className="text-sm text-foreground">{metric.name}</span>
                      </div>
                      <Badge variant="outline" className="text-green-400 border-green-400 bg-green-400/10">
                        {metric.value}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Database className="h-5 w-5" />
                    Database Status
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Database health and performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Connection Pool</span>
                    <Badge variant="outline" className="text-green-400 border-green-400 bg-green-400/10">
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Query Performance</span>
                    <Badge variant="outline" className="text-green-400 border-green-400 bg-green-400/10">
                      Optimal
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Backup Status</span>
                    <Badge variant="outline" className="text-green-400 border-green-400 bg-green-400/10">
                      Up to date
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Replication</span>
                    <Badge variant="outline" className="text-green-400 border-green-400 bg-green-400/10">
                      Synced
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  System and user activity logs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border border-border rounded-lg bg-muted/50">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === "success" ? "bg-green-400" :
                        activity.type === "warning" ? "bg-yellow-400" :
                        "bg-blue-400"
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
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
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Settings className="h-5 w-5" />
                  System Configuration
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Global system settings and configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="systemName" className="text-foreground">System Name</Label>
                    <Input id="systemName" defaultValue="ASTROM Healthcare Platform" className="bg-background border-border text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxUsers" className="text-foreground">Max Concurrent Users</Label>
                    <Input id="maxUsers" type="number" defaultValue="100" className="bg-background border-border text-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency" className="text-foreground">Backup Frequency (hours)</Label>
                  <Input id="backupFrequency" type="number" defaultValue="24" className="bg-background border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout" className="text-foreground">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="30" className="bg-background border-border text-foreground" />
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
