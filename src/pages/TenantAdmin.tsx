
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Users, Database, Zap, BarChart3, Settings2 } from "lucide-react";

const modules = [
  {
    code: 'ASTRO-SCAN',
    name: 'Data Ingestion',
    description: 'Source discovery, mapping, HL7/FHIR/API',
    icon: Database,
    enabled: true,
    aiEnabled: true,
  },
  {
    code: 'ASTRO-BRICKS',
    name: 'Data Modeling',
    description: 'Normalization, dbt, Fact/Dim modeling',
    icon: Settings2,
    enabled: true,
    aiEnabled: true,
  },
  {
    code: 'ASTRO-METRICS',
    name: 'KPI Engine',
    description: 'KPI rules, SLA metrics, dictionary',
    icon: BarChart3,
    enabled: true,
    aiEnabled: false,
  },
  {
    code: 'ASTRO-VIEW',
    name: 'Visualization',
    description: 'Semantic layers, dashboards, alerts',
    icon: BarChart3,
    enabled: true,
    aiEnabled: true,
  },
  {
    code: 'ASTRO-FLOW',
    name: 'Automation',
    description: 'Triggered events, AI prediction, alerts',
    icon: Zap,
    enabled: false,
    aiEnabled: true,
  },
];

const TenantAdmin = () => {
  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tenant Administration</h1>
          <p className="text-slate-400">Manage your organization settings and modules</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Organization Settings */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-cyan-400" />
              Organization
            </CardTitle>
            <CardDescription>Basic organization information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="orgName" className="text-slate-300">Organization Name</Label>
              <Input 
                id="orgName" 
                defaultValue="Healthcare Regional Center" 
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="subdomain" className="text-slate-300">Subdomain</Label>
              <Input 
                id="subdomain" 
                defaultValue="hrc-west"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="timezone" className="text-slate-300">Timezone</Label>
              <Input 
                id="timezone" 
                defaultValue="America/Los_Angeles"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-green-400" />
              User Management
            </CardTitle>
            <CardDescription>Active users and roles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Total Users</span>
              <Badge variant="outline" className="text-green-400 border-green-400">47 Active</Badge>
            </div>
            <div className="space-y-2">
              {['Tenant Admin', 'Data Engineer', 'Analyst', 'Clinician'].map((role) => (
                <div key={role} className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">{role}</span>
                  <span className="text-cyan-400">
                    {role === 'Clinician' ? '32' : role === 'Analyst' ? '8' : '3'} users
                  </span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
              Manage Users
            </Button>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">System Status</CardTitle>
            <CardDescription>Platform health and performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Data Sources</span>
              <Badge variant="outline" className="text-green-400 border-green-400">7/7 Connected</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Last Sync</span>
              <span className="text-cyan-400 text-sm">2 min ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Uptime</span>
              <span className="text-green-400 text-sm">99.94%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Storage Used</span>
              <span className="text-cyan-400 text-sm">2.4 TB / 5 TB</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module Configuration */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">ASTROM Module Configuration</CardTitle>
          <CardDescription>Enable or disable platform modules for your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <div key={module.code} className="p-4 rounded-lg border border-slate-800 bg-slate-800/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-cyan-400" />
                      <div>
                        <h3 className="font-semibold text-white">{module.name}</h3>
                        <p className="text-xs text-slate-400">{module.code}</p>
                      </div>
                    </div>
                    <Switch checked={module.enabled} />
                  </div>
                  <p className="text-sm text-slate-300 mb-3">{module.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={module.enabled ? "default" : "secondary"}
                      className={module.enabled ? "bg-green-600" : ""}
                    >
                      {module.enabled ? "Active" : "Disabled"}
                    </Badge>
                    {module.aiEnabled && (
                      <Badge variant="outline" className="text-purple-400 border-purple-400">
                        AI-Enabled
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantAdmin;
