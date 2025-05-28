
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network } from 'lucide-react';
import { FederatedSite } from './types';

interface FederatedLearningNetworkProps {
  sites: FederatedSite[];
}

const FederatedLearningNetwork = ({ sites }: FederatedLearningNetworkProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': 
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'syncing': 
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'offline': 
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-5 w-5 text-cyan-400" />
          Federated Learning Network
        </CardTitle>
        <CardDescription>
          Multi-site collaborative learning while preserving data privacy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sites.map((site) => (
            <div key={site.id} className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">{site.name}</h4>
                <Badge variant="outline" className={`text-xs ${getStatusColor(site.status)}`}>
                  {site.status}
                </Badge>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Location: {site.location}</div>
                <div>Contribution: {site.dataContribution.toLocaleString()} records</div>
                <div>Last Sync: {site.latestSync}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FederatedLearningNetwork;
