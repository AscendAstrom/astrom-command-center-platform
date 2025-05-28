
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, MapPin, Activity, TrendingUp } from "lucide-react";

export const GlobalNetworkTab = () => {
  const globalStats = {
    connectedCountries: 47,
    activeContinents: 6,
    dataVolume: "15.7PB",
    realTimeStreams: 2847
  };

  const continentalNetworks = [
    { continent: "North America", countries: 3, nodes: 456, status: "optimal", latency: "12ms" },
    { continent: "Europe", countries: 12, nodes: 789, status: "optimal", latency: "8ms" },
    { continent: "Asia-Pacific", countries: 18, nodes: 923, status: "optimal", latency: "15ms" },
    { continent: "Africa", countries: 8, nodes: 234, status: "expanding", latency: "28ms" },
    { continent: "South America", countries: 4, nodes: 167, status: "active", latency: "22ms" },
    { continent: "Oceania", countries: 2, nodes: 89, status: "active", latency: "18ms" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'active': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'expanding': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-cyan-400" />
          Global Healthcare Network Infrastructure
        </CardTitle>
        <CardDescription>
          Worldwide healthcare data federation with real-time cross-border connectivity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <div className="text-2xl font-bold text-cyan-400">{globalStats.connectedCountries}</div>
            <div className="text-xs text-muted-foreground">Connected Countries</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{globalStats.activeContinents}</div>
            <div className="text-xs text-muted-foreground">Active Continents</div>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">{globalStats.dataVolume}</div>
            <div className="text-xs text-muted-foreground">Global Data Volume</div>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{globalStats.realTimeStreams}</div>
            <div className="text-xs text-muted-foreground">Real-Time Streams</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Continental Health Networks</h4>
            <Button variant="outline" size="sm">
              <MapPin className="h-4 w-4 mr-2" />
              Network Map
            </Button>
          </div>
          
          {continentalNetworks.map((network, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-cyan-400" />
                  <span className="font-medium">{network.continent}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{network.latency}</span>
                  <Badge variant="outline" className={getStatusColor(network.status)}>
                    {network.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                  <div className="font-medium">{network.countries}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Network Nodes</div>
                  <div className="font-medium">{network.nodes}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
          <h4 className="font-semibold text-foreground mb-2">Phase 5: Global Network Capabilities</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span>Real-time global health monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span>Cross-border patient data sharing</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span>International emergency coordination</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span>Global health intelligence fusion</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
