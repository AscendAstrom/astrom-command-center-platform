
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, MapPin, Users, TrendingUp } from "lucide-react";

export const GlobalHealthNetworkTab = () => {
  const globalMetrics = {
    connectedCountries: 23,
    networkNodes: 847,
    dataVolume: "2.3PB",
    globalInsights: 156
  };

  const regionalNetworks = [
    { region: "Middle East & North Africa", countries: 8, nodes: 234, status: "active", growth: "+12%" },
    { region: "Europe", countries: 6, nodes: 189, status: "expanding", growth: "+8%" },
    { region: "Asia-Pacific", countries: 5, nodes: 167, status: "active", growth: "+15%" },
    { region: "North America", countries: 2, nodes: 145, status: "active", growth: "+6%" },
    { region: "Africa", countries: 2, nodes: 112, status: "developing", growth: "+22%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'expanding': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'developing': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-cyan-400" />
          Global Healthcare Network (Phase 5 Preview)
        </CardTitle>
        <CardDescription>
          Worldwide healthcare intelligence network with cross-border collaboration and insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <div className="text-2xl font-bold text-cyan-400">{globalMetrics.connectedCountries}</div>
            <div className="text-xs text-muted-foreground">Connected Countries</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{globalMetrics.networkNodes}</div>
            <div className="text-xs text-muted-foreground">Network Nodes</div>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">{globalMetrics.dataVolume}</div>
            <div className="text-xs text-muted-foreground">Data Volume</div>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{globalMetrics.globalInsights}</div>
            <div className="text-xs text-muted-foreground">Global Insights</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Regional Networks</h4>
            <Button variant="outline" size="sm">
              <MapPin className="h-4 w-4 mr-2" />
              View Map
            </Button>
          </div>
          
          {regionalNetworks.map((network, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-cyan-400" />
                  <span className="font-medium">{network.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-400 font-medium">{network.growth}</span>
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
                  <div className="text-sm text-muted-foreground">Nodes</div>
                  <div className="font-medium">{network.nodes}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20">
          <h4 className="font-semibold text-foreground mb-2">Phase 5 Preparation: Global Capabilities</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span>Cross-border health intelligence</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span>Global pandemic response coordination</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span>International regulatory compliance</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span>Multi-language healthcare AI</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-orange-400" />
            <h4 className="font-semibold text-foreground">Phase 5: Global Health Intelligence Network</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Preparing for worldwide healthcare intelligence orchestration with multi-national compliance, 
            cross-border data sharing, and global health emergency response capabilities.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
