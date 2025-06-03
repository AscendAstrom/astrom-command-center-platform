
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Bed } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { emptyStateMessages } from "@/config/constants";

interface ZoneData {
  id: string;
  name: string;
  department: string;
  totalBeds: number;
  occupiedBeds: number;
  status: 'normal' | 'busy' | 'critical';
}

const ZoneTileWidget = () => {
  const [zones, setZones] = useState<ZoneData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchZoneData();
  }, []);

  const fetchZoneData = async () => {
    try {
      setLoading(true);
      const { data: departments, error } = await supabase
        .from('departments')
        .select(`
          id,
          name,
          capacity,
          beds!inner(id, status)
        `)
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching zone data:', error);
        setZones([]);
        return;
      }

      if (!departments || departments.length === 0) {
        setZones([]);
        return;
      }

      const zoneData: ZoneData[] = departments.map(dept => {
        const beds = Array.isArray(dept.beds) ? dept.beds : [];
        const totalBeds = beds.length;
        const occupiedBeds = beds.filter(bed => bed.status === 'OCCUPIED').length;
        const occupancyRate = totalBeds > 0 ? (occupiedBeds / totalBeds) * 100 : 0;

        let status: 'normal' | 'busy' | 'critical' = 'normal';
        if (occupancyRate >= 90) status = 'critical';
        else if (occupancyRate >= 75) status = 'busy';

        return {
          id: dept.id,
          name: dept.name,
          department: dept.name,
          totalBeds,
          occupiedBeds,
          status
        };
      });

      setZones(zoneData);
    } catch (error) {
      console.error('Error fetching zone data:', error);
      setZones([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'busy': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default: return 'bg-green-500/10 text-green-600 border-green-500/20';
    }
  };

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Zone Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (zones.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Zone Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Bed className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h4 className="font-semibold text-foreground mb-2">No Zones Available</h4>
            <p className="text-sm text-muted-foreground">
              {emptyStateMessages.readyForRealData}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Zone Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {zones.map((zone) => (
          <div key={zone.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{zone.name}</h4>
              <Badge variant="outline" className={getStatusColor(zone.status)}>
                {zone.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {zone.occupiedBeds}/{zone.totalBeds}
              </div>
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                {zone.totalBeds - zone.occupiedBeds} available
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ZoneTileWidget;
