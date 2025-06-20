
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
                  <SettingsIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                  <p className="text-muted-foreground">Manage your ASTROM platform preferences and configuration</p>
                </div>
              </div>
            </div>
            
            <Badge variant="outline" className="text-green-400 border-green-400 bg-green-400/10">
              <Monitor className="h-3 w-3 mr-1" />
              System Online
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50">
            <TabsTrigger value="profile" className="data-[state=active]:bg-background">Profile</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-background">Notifications</TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-background">Security</TabsTrigger>
            <TabsTrigger value="integrations" className="data-[state=active]:bg-background">Integrations</TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-background">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <User className="h-5 w-5 text-blue-400" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                    <Input id="firstName" defaultValue="Dr. Sarah" className="bg-background border-border text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                    <Input id="lastName" defaultValue="Johnson" className="bg-background border-border text-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input id="email" type="email" defaultValue="sarah.johnson@hospital.com" className="bg-background border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-foreground">Department</Label>
                  <Input id="department" defaultValue="Emergency Medicine" className="bg-background border-border text-foreground" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Bell className="h-5 w-5 text-orange-400" />
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-400" />
                      <Label className="text-foreground">Email Notifications</Label>
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
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-green-400" />
                      <Label className="text-foreground">Push Notifications</Label>
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
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-orange-400" />
                      <Label className="text-foreground">System Alerts</Label>
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
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Shield className="h-5 w-5 text-orange-400" />
                  Security Settings
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your account security and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-foreground">Current Password</Label>
                  <Input id="currentPassword" type="password" className="bg-background border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-foreground">New Password</Label>
                  <Input id="newPassword" type="password" className="bg-background border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" className="bg-background border-border text-foreground" />
                </div>
                <Button variant="outline" className="w-full border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                  Update Password
                </Button>
                <Separator className="bg-border" />
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline" size="sm" className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white">
                    Enable 2FA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Database className="h-5 w-5 text-green-400" />
                  System Integrations
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage connections to external systems and data sources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-muted/50">
                    <div>
                      <h4 className="font-medium text-foreground">Epic EMR</h4>
                      <p className="text-sm text-muted-foreground">Electronic Medical Records</p>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400 bg-green-400/10">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-muted/50">
                    <div>
                      <h4 className="font-medium text-foreground">HL7 FHIR</h4>
                      <p className="text-sm text-muted-foreground">Healthcare data exchange</p>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400 bg-green-400/10">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-muted/50">
                    <div>
                      <h4 className="font-medium text-foreground">Patient Portal</h4>
                      <p className="text-sm text-muted-foreground">Patient access system</p>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Palette className="h-5 w-5 text-blue-400" />
                  Appearance & Display
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Customize the look and feel of your ASTROM interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-foreground">Theme</Label>
                  <div className="flex gap-2">
                    <Button 
                      variant={theme === "light" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("light")}
                      className={theme === "light" ? "bg-blue-600 hover:bg-blue-700" : "border-border hover:bg-muted"}
                    >
                      Light
                    </Button>
                    <Button 
                      variant={theme === "dark" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("dark")}
                      className={theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "border-border hover:bg-muted"}
                    >
                      Dark
                    </Button>
                    <Button 
                      variant={theme === "system" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("system")}
                      className={theme === "system" ? "bg-blue-600 hover:bg-blue-700" : "border-border hover:bg-muted"}
                    >
                      System
                    </Button>
                  </div>
                </div>
                <Separator className="bg-border" />
                <div className="space-y-2">
                  <Label className="text-foreground">Language</Label>
                  <Input defaultValue="English (US)" disabled className="bg-background border-border text-foreground" />
                  <p className="text-xs text-muted-foreground">Additional languages coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
