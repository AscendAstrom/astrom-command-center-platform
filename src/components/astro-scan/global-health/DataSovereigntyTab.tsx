
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Network, Lock, Shield, Database } from "lucide-react";

export const DataSovereigntyTab = () => {
  const sovereigntyMetrics = {
    sovereignRegions: 47,
    encryptedChannels: 234,
    complianceScore: 99.1,
    dataResidency: 98.7
  };

  const regionalSovereignty = [
    { region: "European Union", framework: "GDPR Data Sovereignty", status: "enforced", compliance: 99.8 },
    { region: "United States", framework: "HIPAA + State Laws", status: "enforced", compliance: 98.9 },
    { region: "China", framework: "Cybersecurity Law", status: "enforced", compliance: 97.2 },
    { region: "India", framework: "Data Protection Bill", status: "implementing", compliance: 95.4 },
    { region: "Brazil", framework: "LGPD", status: "enforced", compliance: 98.1 },
    { region: "Canada", framework: "PIPEDA", status: "enforced", compliance: 99.3 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enforced': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'implementing': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'reviewing': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5 text-indigo-400" />
          Global Data Sovereignty Management
        </CardTitle>
        <CardDescription>
          Cross-border data governance with local sovereignty compliance and secure federation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
            <div className="text-2xl font-bold text-indigo-400">{sovereigntyMetrics.sovereignRegions}</div>
            <div className="text-xs text-muted-foreground">Sovereign Regions</div>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">{sovereigntyMetrics.encryptedChannels}</div>
            <div className="text-xs text-muted-foreground">Encrypted Channels</div>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{sovereigntyMetrics.complianceScore}%</div>
            <div className="text-xs text-muted-foreground">Compliance Score</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{sovereigntyMetrics.dataResidency}%</div>
            <div className="text-xs text-muted-foreground">Data Residency</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Regional Data Sovereignty</h4>
            <Button variant="outline" size="sm">
              <Database className="h-4 w-4 mr-2" />
              Sovereignty Map
            </Button>
          </div>
          
          {regionalSovereignty.map((region, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-indigo-400" />
                  <span className="font-medium">{region.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-green-400">{region.compliance}%</span>
                  <Badge variant="outline" className={getStatusColor(region.status)}>
                    {region.status}
                  </Badge>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Sovereignty Framework</div>
                <div className="font-medium">{region.framework}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-500/20">
          <h4 className="font-semibold text-foreground mb-2">Data Sovereignty Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-indigo-400" />
              <span>Local data residency enforcement</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-indigo-400" />
              <span>Cross-border encryption protocols</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-indigo-400" />
              <span>Jurisdiction-aware processing</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-indigo-400" />
              <span>Sovereign federated learning</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
