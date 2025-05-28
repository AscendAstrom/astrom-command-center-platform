
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Cpu, AlertTriangle } from "lucide-react";

export const IntelligentEcosystemTab = () => {
  const ecosystemMetrics = {
    intelligenceScore: 96.4,
    threatsBlocked: 1247,
    anomaliesDetected: 23,
    systemAdaptability: 94.7
  };

  const intelligentCapabilities = [
    { name: "Behavioral Analytics", status: "active", confidence: 97, threats: 8 },
    { name: "Anomaly Detection", status: "learning", confidence: 92, threats: 3 },
    { name: "Pattern Recognition", status: "active", confidence: 95, threats: 12 },
    { name: "Threat Prediction", status: "active", confidence: 89, threats: 5 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'learning': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'monitoring': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-400" />
          Intelligent Ecosystem Management
        </CardTitle>
        <CardDescription>
          AI-driven ecosystem intelligence with autonomous threat detection and response
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{ecosystemMetrics.intelligenceScore}%</div>
            <div className="text-xs text-muted-foreground">Intelligence Score</div>
          </div>
          <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <div className="text-2xl font-bold text-red-400">{ecosystemMetrics.threatsBlocked}</div>
            <div className="text-xs text-muted-foreground">Threats Blocked</div>
          </div>
          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div className="text-2xl font-bold text-yellow-400">{ecosystemMetrics.anomaliesDetected}</div>
            <div className="text-xs text-muted-foreground">Anomalies Detected</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{ecosystemMetrics.systemAdaptability}%</div>
            <div className="text-xs text-muted-foreground">System Adaptability</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Intelligent Capabilities</h4>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Deep Scan
            </Button>
          </div>
          
          {intelligentCapabilities.map((capability, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-green-400" />
                  <span className="font-medium">{capability.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{capability.threats} threats</span>
                  <Badge variant="outline" className={getStatusColor(capability.status)}>
                    {capability.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Confidence Level</span>
                <span className="font-medium text-green-400">{capability.confidence}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <h4 className="font-semibold text-foreground mb-2">Ecosystem Intelligence Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-green-400" />
              <span>Predictive threat modeling</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-green-400" />
              <span>Adaptive security policies</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-green-400" />
              <span>Autonomous incident response</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-green-400" />
              <span>Intelligent risk assessment</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
