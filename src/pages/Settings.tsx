
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Mail,
  Smartphone,
  Monitor,
  Save,
  Settings as SettingsIcon
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [systemAlerts, setSystemAlerts] = useState(true);

  return (
    <div className="p-6 space-y-6 bg-background min-h-full">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-astrom-grey to-astrom-grey-dark rounded-xl flex items-center justify-center">
              <SettingsIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground">Manage your ASTROM platform preferences and configuration</p>
            </div>
          </div>
        </div>
        
        <Badge variant="outline" className="text-status-success border-status-success">
          <Monitor className="h-3 w-3 mr-1" />
          System Online
        </Badge>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-card border border-border">
          <TabsTrigger value="profile" className="data-[state=active]:bg-astrom-blue data-[state=active]:text-white">Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-astrom-blue data-[state=active]:text-white">Notifications</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-astrom-blue data-[state=active]:text-white">Security</TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-astrom-blue data-[state=active]:text-white">Integrations</TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-astrom-blue data-[state=active]:text-white">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="surface-elevated border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-astrom-blue" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Dr. Sarah" className="border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Johnson" className="border-border" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="sarah.johnson@hospital.com" className="border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" defaultValue="Emergency Medicine" className="border-border" />
              </div>
              <Button className="w-full bg-astrom-blue hover:bg-astrom-blue-dark">
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="surface-elevated border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-astrom-orange" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-astrom-blue" />
                    <Label>Email Notifications</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-astrom-green" />
                    <Label>Push Notifications</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications on your device
                  </p>
                </div>
                <Switch 
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-astrom-orange" />
                    <Label>System Alerts</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Critical system and security alerts
                  </p>
                </div>
                <Switch 
                  checked={systemAlerts}
                  onCheckedChange={setSystemAlerts}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="surface-elevated border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-astrom-orange" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your account security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" className="border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" className="border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" className="border-border" />
              </div>
              <Button variant="outline" className="w-full border-astrom-blue text-astrom-blue hover:bg-astrom-blue hover:text-white">
                Update Password
              </Button>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline" size="sm" className="border-astrom-green text-astrom-green hover:bg-astrom-green hover:text-white">
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="surface-elevated border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-astrom-green" />
                System Integrations
              </CardTitle>
              <CardDescription>
                Manage connections to external systems and data sources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-xl surface-elevated">
                  <div>
                    <h4 className="font-medium">Epic EMR</h4>
                    <p className="text-sm text-muted-foreground">Electronic Medical Records</p>
                  </div>
                  <Badge variant="outline" className="text-status-success border-status-success">Connected</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-xl surface-elevated">
                  <div>
                    <h4 className="font-medium">HL7 FHIR</h4>
                    <p className="text-sm text-muted-foreground">Healthcare data exchange</p>
                  </div>
                  <Badge variant="outline" className="text-status-success border-status-success">Connected</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-xl surface-elevated">
                  <div>
                    <h4 className="font-medium">Patient Portal</h4>
                    <p className="text-sm text-muted-foreground">Patient access system</p>
                  </div>
                  <Badge variant="secondary" className="bg-status-warning/20 text-status-warning">Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="surface-elevated border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-astrom-blue" />
                Appearance & Display
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your ASTROM interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Theme</Label>
                <div className="flex gap-2">
                  <Button 
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("light")}
                    className={theme === "light" ? "bg-astrom-blue hover:bg-astrom-blue-dark" : "border-border hover:bg-accent"}
                  >
                    Light
                  </Button>
                  <Button 
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className={theme === "dark" ? "bg-astrom-blue hover:bg-astrom-blue-dark" : "border-border hover:bg-accent"}
                  >
                    Dark
                  </Button>
                  <Button 
                    variant={theme === "system" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("system")}
                    className={theme === "system" ? "bg-astrom-blue hover:bg-astrom-blue-dark" : "border-border hover:bg-accent"}
                  >
                    System
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Language</Label>
                <Input defaultValue="English (US)" disabled className="border-border" />
                <p className="text-xs text-muted-foreground">Additional languages coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
