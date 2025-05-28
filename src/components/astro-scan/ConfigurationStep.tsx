
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Settings } from "lucide-react";

interface ConfigurationStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export const ConfigurationStep = ({ formData, updateFormData }: ConfigurationStepProps) => {
  const updateConfig = (key: string, value: any) => {
    updateFormData({
      config: {
        ...formData.config,
        [key]: value
      }
    });
  };

  const renderConfigFields = () => {
    switch (formData.type) {
      case 'EPIC':
        return (
          <>
            <div>
              <Label className="text-slate-300">Epic Server URL</Label>
              <Input
                value={formData.config.serverUrl || ''}
                onChange={(e) => updateConfig('serverUrl', e.target.value)}
                placeholder="https://epic.hospital.org/interconnect-prd-oauth2/api/FHIR/R4"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-300">Epic Client ID</Label>
              <Input
                value={formData.config.clientId || ''}
                onChange={(e) => updateConfig('clientId', e.target.value)}
                placeholder="Your Epic App Client ID"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-300">Epic Environment</Label>
              <Select value={formData.config.environment || 'sandbox'} onValueChange={(value) => updateConfig('environment', value)}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="sandbox">Sandbox</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-slate-300">Epic API Version</Label>
              <Select value={formData.config.apiVersion || 'R4'} onValueChange={(value) => updateConfig('apiVersion', value)}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="R4">FHIR R4</SelectItem>
                  <SelectItem value="STU3">FHIR STU3</SelectItem>
                  <SelectItem value="DSTU2">FHIR DSTU2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-slate-300">Epic Applications/Modules</Label>
              <Textarea
                value={formData.config.applications || ''}
                onChange={(e) => updateConfig('applications', e.target.value)}
                placeholder="Hyperspace,MyChart,Beacon,Willow,Tapestry"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.config.enableSSL || true}
                onCheckedChange={(checked) => updateConfig('enableSSL', checked)}
              />
              <Label className="text-slate-300">Enable SSL/TLS</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.config.enableSmartAuth || false}
                onCheckedChange={(checked) => updateConfig('enableSmartAuth', checked)}
              />
              <Label className="text-slate-300">Enable SMART on FHIR Authentication</Label>
            </div>
          </>
        );

      case 'HL7':
        return (
          <>
            <div>
              <Label className="text-slate-300">HL7 Server Host</Label>
              <Input
                value={formData.config.host || ''}
                onChange={(e) => updateConfig('host', e.target.value)}
                placeholder="localhost"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-300">Port</Label>
              <Input
                value={formData.config.port || ''}
                onChange={(e) => updateConfig('port', e.target.value)}
                placeholder="2575"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-300">Message Types</Label>
              <Input
                value={formData.config.messageTypes || ''}
                onChange={(e) => updateConfig('messageTypes', e.target.value)}
                placeholder="ADT^A01,ADT^A04,ADT^A08"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </>
        );

      case 'FHIR':
        return (
          <>
            <div>
              <Label className="text-slate-300">FHIR Base URL</Label>
              <Input
                value={formData.config.baseUrl || ''}
                onChange={(e) => updateConfig('baseUrl', e.target.value)}
                placeholder="https://fhir.example.com/R4"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-300">Authentication Token</Label>
              <Input
                type="password"
                value={formData.config.authToken || ''}
                onChange={(e) => updateConfig('authToken', e.target.value)}
                placeholder="Bearer token or API key"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-300">Resource Types</Label>
              <Input
                value={formData.config.resourceTypes || ''}
                onChange={(e) => updateConfig('resourceTypes', e.target.value)}
                placeholder="Patient,Encounter,Observation"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </>
        );

      case 'API':
        return (
          <>
            <div>
              <Label className="text-slate-300">API Endpoint</Label>
              <Input
                value={formData.config.endpoint || ''}
                onChange={(e) => updateConfig('endpoint', e.target.value)}
                placeholder="https://api.example.com/data"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-300">HTTP Method</Label>
              <Select value={formData.config.method || 'GET'} onValueChange={(value) => updateConfig('method', value)}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-slate-300">Headers (JSON)</Label>
              <Textarea
                value={formData.config.headers || ''}
                onChange={(e) => updateConfig('headers', e.target.value)}
                placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </>
        );

      case 'CSV':
        return (
          <>
            <div>
              <Label className="text-slate-300">File Path/URL</Label>
              <Input
                value={formData.config.filePath || ''}
                onChange={(e) => updateConfig('filePath', e.target.value)}
                placeholder="/path/to/files or https://example.com/data.csv"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-300">Delimiter</Label>
              <Select value={formData.config.delimiter || ','} onValueChange={(value) => updateConfig('delimiter', value)}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value=",">Comma (,)</SelectItem>
                  <SelectItem value=";">Semicolon (;)</SelectItem>
                  <SelectItem value="\t">Tab</SelectItem>
                  <SelectItem value="|">Pipe (|)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.config.hasHeader || false}
                onCheckedChange={(checked) => updateConfig('hasHeader', checked)}
              />
              <Label className="text-slate-300">File has header row</Label>
            </div>
          </>
        );

      default:
        return (
          <div className="text-slate-400 text-center py-8">
            No additional configuration required for manual entry.
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-cyan-400">
        <Settings className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Configuration</h3>
      </div>

      <p className="text-slate-400 text-sm">
        Configure connection details and parameters for your {formData.type} data source.
      </p>

      <div className="space-y-4">
        {renderConfigFields()}

        {/* Schedule Configuration for Batch Mode */}
        {formData.ingestionMode === 'BATCH' && (
          <div>
            <Label className="text-slate-300">Schedule (Cron Expression)</Label>
            <Input
              value={formData.scheduleCron || ''}
              onChange={(e) => updateFormData({ scheduleCron: e.target.value })}
              placeholder="0 */5 * * * (every 5 minutes)"
              className="bg-slate-800 border-slate-700 text-white"
            />
            <p className="text-xs text-slate-400 mt-1">
              Leave empty for manual runs only. Use cron format: minute hour day month weekday
            </p>
          </div>
        )}

        {/* Connection Timeout */}
        <div>
          <Label className="text-slate-300">Connection Timeout (seconds)</Label>
          <Input
            type="number"
            value={formData.config.timeout || 30}
            onChange={(e) => updateConfig('timeout', parseInt(e.target.value))}
            className="bg-slate-800 border-slate-700 text-white"
          />
        </div>

        {/* Retry Configuration */}
        <div>
          <Label className="text-slate-300">Max Retry Attempts</Label>
          <Input
            type="number"
            value={formData.config.maxRetries || 3}
            onChange={(e) => updateConfig('maxRetries', parseInt(e.target.value))}
            className="bg-slate-800 border-slate-700 text-white"
          />
        </div>
      </div>
    </div>
  );
};
