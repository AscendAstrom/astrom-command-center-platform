import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ZoneTileData } from '../types';
import { MapPin, Users, Clock, AlertTriangle } from 'lucide-react';

const ZoneTileWidget = () => {
  const zoneData: ZoneTileData[] = [
    {
      zoneId: 'zone_a',
      zoneName: 'Processing Center A',
      status: 'warning',
      occupancy: 42,
      capacity: 50,
      avgWaitTime: 23,
      alertCount: 2
    },
    {
      zoneId: 'zone_b',
      zoneName: 'High Priority Zone',
      status: 'critical',
      occupancy: 18,
      capacity: 20,
      avgWaitTime: 0,
      alertCount: 1
    },
    {
      zoneId: 'zone_c',
      zoneName: 'General Processing',
      status: 'normal',
      occupancy: 156,
      capacity: 200,
      avgWaitTime: 45,
      alertCount: 0
    },
    {
      zoneId: 'zone_d',
      zoneName: 'Service Center',
      status: 'normal',
      occupancy: 8,
      capacity: 12,
      avgWaitTime: 0,
      alertCount: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'critical': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getOccupancyColor = (occupancy: number, capacity: number) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 75) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-cyan-400" />
          Zone Status Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {zoneData.map((zone) => (
            <div
              key={zone.zoneId}
              className="p-4 bg-background rounded-lg border border-border hover:border-muted-foreground transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-foreground">{zone.zoneName}</h4>
                  <p className="text-xs text-muted-foreground">Zone ID: {zone.zoneId}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(zone.status)}>
                    {zone.status}
                  </Badge>
                  {zone.alertCount > 0 && (
                    <Badge variant="destructive" className="bg-red-600">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {zone.alertCount}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-foreground">
                    <Users className="h-4 w-4" />
                    <span>Occupancy</span>
                  </div>
                  <span className={`text-sm font-medium ${getOccupancyColor(zone.occupancy, zone.capacity)}`}>
                    {zone.occupancy}/{zone.capacity}
                  </span>
                </div>

                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      (zone.occupancy / zone.capacity) >= 0.9 ? 'bg-red-500' :
                      (zone.occupancy / zone.capacity) >= 0.75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((zone.occupancy / zone.capacity) * 100, 100)}%` }}
                  />
                </div>

                {zone.avgWaitTime > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Avg Wait</span>
                    </div>
                    <span className="text-sm font-medium text-cyan-400">
                      {zone.avgWaitTime} min
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoneTileWidget;
