
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Network, Brain, Share2, Lock } from "lucide-react";

export const FederatedLearningTab = () => {
  const federatedMetrics = {
    connectedNodes: 47,
    activeModels: 23,
    dataPrivacyScore: 99.7,
    learningAccuracy: 94.2
  };

  const federatedNetworks = [
    { name: "Regional Hospital Network", nodes: 12, models: 8, privacy: "High", status: "active" },
    { name: "Specialized Care Centers", nodes: 15, models: 6, privacy: "High", status: "training" },
    { name: "Research Institutions", nodes: 8, models: 4, privacy: "Maximum", status: "active" },
    { name: "International Partners", nodes: 12, models: 5, privacy: "High", status: "syncing" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'training': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'syncing': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5 text-cyan-400" />
          Federated Learning Network
        </CardTitle>
        <CardDescription>
          Privacy-preserving collaborative learning across healthcare ecosystems
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <div className="text-2xl font-bold text-cyan-400">{federatedMetrics.connectedNodes}</div>
            <div className="text-xs text-muted-foreground">Connected Nodes</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{federatedMetrics.activeModels}</div>
            <div className="text-xs text-muted-foreground">Active Models</div>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{federatedMetrics.dataPrivacyScore}%</div>
            <div className="text-xs text-muted-foreground">Data Privacy Score</div>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">{federatedMetrics.learningAccuracy}%</div>
            <div className="text-xs text-muted-foreground">Learning Accuracy</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Federated Networks</h4>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Join Network
            </Button>
          </div>
          
          {federatedNetworks.map((network, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-cyan-400" />
                  <span className="font-medium">{network.name}</span>
                </div>
                <Badge variant="outline" className={getStatusColor(network.status)}>
                  {network.status}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div>
                  <div className="text-sm text-muted-foreground">Nodes</div>
                  <div className="font-medium">{network.nodes}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Models</div>
                  <div className="font-medium">{network.models}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Privacy</div>
                  <div className="font-medium text-green-400">{network.privacy}</div>
                </div>
              </div>
              <Progress value={Math.random() * 100} className="h-2" />
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
          <h4 className="font-semibold text-foreground mb-2">Privacy-Preserving Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-cyan-400" />
              <span>Differential privacy algorithms</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-cyan-400" />
              <span>Homomorphic encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-cyan-400" />
              <span>Secure multi-party computation</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-cyan-400" />
              <span>Zero-knowledge proofs</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
