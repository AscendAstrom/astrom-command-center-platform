
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Brain, 
  Database, 
  Shield,
  Zap,
  Network,
  Monitor,
  Cpu,
  HardDrive,
  Activity
} from "lucide-react";

interface AIModelConfig {
  name: string;
  type: 'prediction' | 'classification' | 'nlp' | 'vision';
  accuracy: number;
  latency: number;
  enabled: boolean;
}

interface SystemOptimization {
  category: string;
  setting: string;
  value: number;
  unit: string;
  description: string;
}

const AdvancedConfiguration = () => {
  const [aiModels, setAIModels] = useState<AIModelConfig[]>([
    { name: 'Bed Demand Predictor', type: 'prediction', accuracy: 94.7, latency: 120, enabled: true },
    { name: 'Patient Flow Classifier', type: 'classification', accuracy: 91.2, latency: 85, enabled: true },
    { name: 'Clinical NLP Engine', type: 'nlp', accuracy: 88.4, latency: 200, enabled: false },
    { name: 'Medical Vision AI', type: 'vision', accuracy: 96.8, latency: 350, enabled: true }
  ]);

  const [systemOptimizations, setSystemOptimizations] = useState<SystemOptimization[]>([
    { category: 'Performance', setting: 'CPU Utilization Target', value: 75, unit: '%', description: 'Maximum CPU usage threshold' },
    { category: 'Performance', setting: 'Memory Buffer', value: 20, unit: '%', description: 'Reserved memory for system operations' },
    { category: 'Performance', setting: 'Database Connection Pool', value: 50, unit: 'connections', description: 'Maximum concurrent database connections' },
    { category: 'Performance', setting: 'Cache TTL', value: 300, unit: 'seconds', description: 'Time to live for cached data' }
  ]);

  const [globalSettings, setGlobalSettings] = useState({
    autoScaling: true,
    loadBalancing: true,
    dataRetention: 90,
    backupFrequency: 'daily',
    alertThreshold: 85,
    maintenanceWindow: '02:00-04:00',
    logLevel: 'info',
    encryptionEnabled: true
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    epicIntegration: true,
    cernerIntegration: true,
    hl7Validation: true,
    fhirCompliance: true,
    syncFrequency: 15,
    timeoutDuration: 30,
    retryAttempts: 3,
    batchSize: 1000
  });

  const toggleModelEnabled = (index: number) => {
    setAIModels(prev => prev.map((model, i) => 
      i === index ? { ...model, enabled: !model.enabled } : model
    ));
  };

  const updateOptimization = (index: number, newValue: number) => {
    setSystemOptimizations(prev => prev.map((opt, i) => 
      i === index ? { ...opt, value: newValue } : opt
    ));
  };

  const getModelTypeColor = (type: string) => {
    switch (type) {
      case 'prediction': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'classification': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'nlp': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'vision': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Overview */}
      <Card className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Settings className="h-6 w-6 text-indigo-400" />
            Advanced AI Configuration
            <Badge className="bg-indigo-500/10 text-indigo-600 border-indigo-500/20">Phase 3B</Badge>
          </CardTitle>
          <CardDescription>
            Global AI settings, model parameters, integration preferences, and system optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{aiModels.filter(m => m.enabled).length}</div>
              <div className="text-xs text-muted-foreground">Active Models</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{globalSettings.dataRetention}</div>
              <div className="text-xs text-muted-foreground">Days Retention</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{globalSettings.alertThreshold}%</div>
              <div className="text-xs text-muted-foreground">Alert Threshold</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{integrationSettings.syncFrequency}m</div>
              <div className="text-xs text-muted-foreground">Sync Interval</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{integrationSettings.batchSize}</div>
              <div className="text-xs text-muted-foreground">Batch Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{integrationSettings.retryAttempts}</div>
              <div className="text-xs text-muted-foreground">Max Retries</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="models">
            <Brain className="h-4 w-4 mr-2" />
            AI Models
          </TabsTrigger>
          <TabsTrigger value="system">
            <Cpu className="h-4 w-4 mr-2" />
            System
          </TabsTrigger>
          <TabsTrigger value="integration">
            <Network className="h-4 w-4 mr-2" />
            Integration
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-400" />
                AI Model Parameters
              </CardTitle>
              <CardDescription>Configure and optimize machine learning models</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiModels.map((model, index) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Switch 
                        checked={model.enabled}
                        onCheckedChange={() => toggleModelEnabled(index)}
                      />
                      <div>
                        <h4 className="font-medium text-foreground">{model.name}</h4>
                        <Badge variant="outline" className={`text-xs ${getModelTypeColor(model.type)}`}>
                          {model.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">{model.accuracy}%</div>
                      <div className="text-xs text-muted-foreground">{model.latency}ms latency</div>
                    </div>
                  </div>
                  
                  {model.enabled && (
                    <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-border/50">
                      <div>
                        <Label className="text-xs text-muted-foreground">Learning Rate</Label>
                        <Slider 
                          defaultValue={[0.001]} 
                          max={0.1} 
                          min={0.0001} 
                          step={0.0001}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Batch Size</Label>
                        <Select defaultValue="32">
                          <SelectTrigger className="mt-2 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="16">16</SelectItem>
                            <SelectItem value="32">32</SelectItem>
                            <SelectItem value="64">64</SelectItem>
                            <SelectItem value="128">128</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Monitor className="h-5 w-5 text-green-400" />
                System Optimization
              </CardTitle>
              <CardDescription>Performance tuning and resource management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemOptimizations.map((opt, index) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">{opt.setting}</h4>
                      <p className="text-xs text-muted-foreground">{opt.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-foreground">{opt.value}</span>
                      <span className="text-sm text-muted-foreground ml-1">{opt.unit}</span>
                    </div>
                  </div>
                  <Slider 
                    value={[opt.value]}
                    onValueChange={(value) => updateOptimization(index, value[0])}
                    max={opt.unit === '%' ? 100 : opt.unit === 'connections' ? 200 : 600}
                    min={opt.unit === '%' ? 10 : opt.unit === 'connections' ? 10 : 60}
                    step={opt.unit === '%' ? 5 : opt.unit === 'connections' ? 5 : 30}
                    className="mt-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-purple-400" />
                Global System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-foreground">Auto Scaling</Label>
                  <Switch 
                    checked={globalSettings.autoScaling}
                    onCheckedChange={(checked) => setGlobalSettings(prev => ({ ...prev, autoScaling: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-foreground">Load Balancing</Label>
                  <Switch 
                    checked={globalSettings.loadBalancing}
                    onCheckedChange={(checked) => setGlobalSettings(prev => ({ ...prev, loadBalancing: checked }))}
                  />
                </div>
                <div>
                  <Label className="text-foreground">Backup Frequency</Label>
                  <Select value={globalSettings.backupFrequency} onValueChange={(value) => setGlobalSettings(prev => ({ ...prev, backupFrequency: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-foreground">Log Level</Label>
                  <Select value={globalSettings.logLevel} onValueChange={(value) => setGlobalSettings(prev => ({ ...prev, logLevel: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debug">Debug</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warn">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground">Maintenance Window</Label>
                  <Input 
                    value={globalSettings.maintenanceWindow}
                    onChange={(e) => setGlobalSettings(prev => ({ ...prev, maintenanceWindow: e.target.value }))}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Network className="h-5 w-5 text-cyan-400" />
                Integration Preferences
              </CardTitle>
              <CardDescription>Configure external system connections and data synchronization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">EHR Systems</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-foreground">Epic Integration</Label>
                      <Switch 
                        checked={integrationSettings.epicIntegration}
                        onCheckedChange={(checked) => setIntegrationSettings(prev => ({ ...prev, epicIntegration: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-foreground">Cerner Integration</Label>
                      <Switch 
                        checked={integrationSettings.cernerIntegration}
                        onCheckedChange={(checked) => setIntegrationSettings(prev => ({ ...prev, cernerIntegration: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-foreground">HL7 Validation</Label>
                      <Switch 
                        checked={integrationSettings.hl7Validation}
                        onCheckedChange={(checked) => setIntegrationSettings(prev => ({ ...prev, hl7Validation: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-foreground">FHIR Compliance</Label>
                      <Switch 
                        checked={integrationSettings.fhirCompliance}
                        onCheckedChange={(checked) => setIntegrationSettings(prev => ({ ...prev, fhirCompliance: checked }))}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Sync Parameters</h4>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-foreground">Sync Frequency (minutes)</Label>
                      <Input 
                        type="number"
                        value={integrationSettings.syncFrequency}
                        onChange={(e) => setIntegrationSettings(prev => ({ ...prev, syncFrequency: parseInt(e.target.value) }))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground">Timeout Duration (seconds)</Label>
                      <Input 
                        type="number"
                        value={integrationSettings.timeoutDuration}
                        onChange={(e) => setIntegrationSettings(prev => ({ ...prev, timeoutDuration: parseInt(e.target.value) }))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground">Retry Attempts</Label>
                      <Input 
                        type="number"
                        value={integrationSettings.retryAttempts}
                        onChange={(e) => setIntegrationSettings(prev => ({ ...prev, retryAttempts: parseInt(e.target.value) }))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground">Batch Size</Label>
                      <Input 
                        type="number"
                        value={integrationSettings.batchSize}
                        onChange={(e) => setIntegrationSettings(prev => ({ ...prev, batchSize: parseInt(e.target.value) }))}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-400" />
                Security & Compliance
              </CardTitle>
              <CardDescription>Advanced security settings and compliance controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Security Controls</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-foreground">End-to-End Encryption</Label>
                      <Switch 
                        checked={globalSettings.encryptionEnabled}
                        onCheckedChange={(checked) => setGlobalSettings(prev => ({ ...prev, encryptionEnabled: checked }))}
                      />
                    </div>
                    <div className="p-3 bg-green-500/10 rounded border border-green-500/20">
                      <div className="flex items-center gap-2 text-green-600">
                        <Activity className="h-4 w-4" />
                        <span className="text-sm font-medium">Zero Trust Architecture: Active</span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded border border-blue-500/20">
                      <div className="flex items-center gap-2 text-blue-600">
                        <Shield className="h-4 w-4" />
                        <span className="text-sm font-medium">Multi-Factor Auth: Enabled</span>
                      </div>
                    </div>
                    <div className="p-3 bg-purple-500/10 rounded border border-purple-500/20">
                      <div className="flex items-center gap-2 text-purple-600">
                        <Database className="h-4 w-4" />
                        <span className="text-sm font-medium">Data Loss Prevention: Active</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Compliance Status</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'HIPAA Compliance', status: 'compliant', score: 99 },
                      { name: 'MOH Saudi Standards', status: 'compliant', score: 98 },
                      { name: 'ISO 27001', status: 'compliant', score: 97 },
                      { name: 'GDPR Compliance', status: 'compliant', score: 96 }
                    ].map((compliance, index) => (
                      <div key={index} className="p-3 bg-muted/30 rounded border border-border/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{compliance.name}</span>
                          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                            {compliance.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">Score: {compliance.score}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedConfiguration;
