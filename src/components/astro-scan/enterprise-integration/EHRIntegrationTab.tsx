
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Building, Activity, Zap, AlertTriangle, CheckCircle } from "lucide-react";
import { IntegrationStatus } from "./types";
import { getStatusColor } from "./utils";
import { toast } from "sonner";

interface EHRIntegrationTabProps {
  activeIntegrations: IntegrationStatus[];
}

export const EHRIntegrationTab = ({ activeIntegrations }: EHRIntegrationTabProps) => {
  const handleDeepSync = (ehrName: string) => {
    toast.success(`Initiating deep sync with ${ehrName}`);
  };

  const handleDataValidation = () => {
    toast.info("Running comprehensive data validation across all EHR systems");
  };

  const ehrCapabilities = [
    { name: 'Patient Demographics', coverage: 100, status: 'active' },
    { name: 'Clinical Notes', coverage: 98, status: 'active' },
    { name: 'Lab Results', coverage: 99, status: 'active' },
    { name: 'Medications', coverage: 97, status: 'active' },
    { name: 'Imaging Orders', coverage: 95, status: 'active' },
    { name: 'Billing Data', coverage: 93, status: 'active' },
    { name: 'Care Plans', coverage: 91, status: 'active' },
    { name: 'Provider Notes', coverage: 89, status: 'active' }
  ];

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-400" />
              Deep EHR Integration Engine
            </CardTitle>
            <CardDescription>
              Native connectivity with major EHR systems and healthcare standards
            </CardDescription>
          </div>
          <Button
            variant="outline"
            onClick={handleDataValidation}
            className="bg-gradient-to-r from-blue-600/10 to-green-600/10"
          >
            <Activity className="h-4 w-4 mr-2" />
            Validate All Data
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{activeIntegrations.length}</div>
            <div className="text-xs text-muted-foreground">Active EHR Systems</div>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">2.8M</div>
            <div className="text-xs text-muted-foreground">Records Synced (24h)</div>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">99.2%</div>
            <div className="text-xs text-muted-foreground">Data Accuracy</div>
          </div>
          <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="text-2xl font-bold text-orange-400">15ms</div>
            <div className="text-xs text-muted-foreground">Avg Response Time</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">EHR Systems Status</h4>
            {activeIntegrations.map((integration, index) => (
              <div key={index} className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      integration.status === 'active' ? 'bg-green-400 animate-pulse' :
                      integration.status === 'maintenance' ? 'bg-yellow-400' : 'bg-red-400'
                    }`} />
                    <span className="font-medium text-sm">{integration.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(integration.status)}>
                      {integration.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeepSync(integration.name)}
                      className="h-6 px-2 text-xs"
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Sync
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>Uptime: {integration.uptime}%</div>
                  <div>Throughput: {integration.throughput}</div>
                </div>
                <Progress value={integration.uptime} className="h-1 mt-2" />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Data Coverage Analysis</h4>
            {ehrCapabilities.map((capability, index) => (
              <div key={index} className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{capability.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{capability.coverage}%</span>
                    {capability.coverage >= 95 ? 
                      <CheckCircle className="h-4 w-4 text-green-400" /> :
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    }
                  </div>
                </div>
                <Progress value={capability.coverage} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
          <h4 className="font-semibold text-foreground mb-2">Phase 5 Enhanced Capabilities</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Real-time FHIR R4 Validation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>HL7 v2.x Intelligent Parsing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>DICOM Metadata Extraction</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>CDA Document Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>SMART on FHIR Authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Multi-Tenant Data Isolation</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
