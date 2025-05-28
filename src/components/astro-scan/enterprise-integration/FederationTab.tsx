
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database } from "lucide-react";
import { FederationFacility } from "./types";

export const FederationTab = () => {
  const federationFacilities: FederationFacility[] = [
    { facility: 'King Fahd Medical City', systems: 'Epic, Cerner', status: 'synced', latency: '45ms' },
    { facility: 'National Guard Hospital', systems: 'Allscripts, MEDITECH', status: 'synced', latency: '62ms' },
    { facility: 'Prince Sultan Hospital', systems: 'Epic, Oracle Health', status: 'syncing', latency: '128ms' },
    { facility: 'Al-Noor Specialist Hospital', systems: 'Cerner, Custom EHR', status: 'synced', latency: '38ms' }
  ];

  return (
    <Card className="bg-card/80 border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-cyan-400" />
          Multi-System Data Federation
        </CardTitle>
        <CardDescription>
          Real-time data synchronization across healthcare ecosystems
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <div className="text-2xl font-bold text-cyan-400">12</div>
            <div className="text-xs text-muted-foreground">Connected Facilities</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">847TB</div>
            <div className="text-xs text-muted-foreground">Federated Data</div>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">99.8%</div>
            <div className="text-xs text-muted-foreground">Sync Accuracy</div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Data Federation Status</h4>
          {federationFacilities.map((item, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-medium">{item.facility}</div>
                  <div className="text-sm text-muted-foreground">{item.systems}</div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={
                    item.status === 'synced' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                    'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                  }>
                    {item.status}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    Latency: {item.latency}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
