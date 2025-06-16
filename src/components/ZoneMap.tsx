import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Zone {
  id: string;
  name: string;
  entities: number;
  capacity: number;
  status: 'normal' | 'busy' | 'critical';
}

const ZoneMap = () => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchZoneData = async () => {
      setLoading(true);
      try {
        // First get departments
        const { data: departments, error: deptError } = await supabase
          .from('departments')
          .select('id, name, capacity')
          .eq('is_active', true);

        if (deptError) {
          console.error('Error fetching departments:', deptError);
          setZones([]);
          return;
        }

        if (!departments || departments.length === 0) {
          setZones([]);
          return;
        }

        // Then get beds for each department
        const zoneData: Zone[] = [];
        
        for (const dept of departments) {
          const { data: beds, error: bedsError } = await supabase
            .from('beds')
            .select('id, status')
            .eq('department_id', dept.id)
            .is('deleted_at', null);

          if (bedsError) {
            console.error('Error fetching beds for department:', dept.id, bedsError);
            continue;
          }

          const totalBeds = beds?.length || 0;
          const occupiedBeds = beds?.filter(bed => bed.status === 'OCCUPIED').length || 0;
          const capacity = dept.capacity || totalBeds;
          const occupancyRate = capacity > 0 ? (occupiedBeds / capacity) * 100 : 0;

          let status: 'normal' | 'busy' | 'critical' = 'normal';
          if (occupancyRate >= 90) status = 'critical';
          else if (occupancyRate >= 75) status = 'busy';

          zoneData.push({
            id: dept.id,
            name: dept.name,
            entities: occupiedBeds,
            capacity,
            status
          });
        }

        setZones(zoneData);
      } catch (error) {
        console.error('Error fetching zone data:', error);
        setZones([]);
      } finally {
        setLoading(false);
      }
    };

    fetchZoneData();

    // Subscribe to real-time bed status changes
    const channel = supabase
      .channel('bed-status-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'beds' },
        () => {
          fetchZoneData(); // Refresh data when beds change
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-500/20 border-green-500 text-green-400';
      case 'busy':
        return 'bg-yellow-500/20 border-yellow-500 text-yellow-400';
      case 'critical':
        return 'bg-red-500/20 border-red-500 text-red-400';
      default:
        return 'bg-slate-500/20 border-slate-500 text-slate-400';
    }
  };

  const getOccupancyPercentage = (entities: number, capacity: number) => {
    return capacity > 0 ? Math.round((entities / capacity) * 100) : 0;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-24 bg-slate-500/20 rounded-lg border-2 border-slate-500"></div>
          </div>
        ))}
      </div>
    );
  }

  if (zones.length === 0) {
    return (
      <div className="space-y-4">
        <div className="p-6 rounded-lg border-2 border-slate-500/20 bg-slate-500/10 text-center">
          <h3 className="text-lg font-semibold text-slate-300 mb-2">No Zones Available</h3>
          <p className="text-sm text-slate-400">
            Configure departments and beds to see zone status here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {zones.map((zone) => (
        <div
          key={zone.id}
          className={`p-4 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer ${getStatusColor(zone.status)}`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{zone.name}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">
                {zone.entities}/{zone.capacity}
              </div>
              <div className="text-xs opacity-75">
                {getOccupancyPercentage(zone.entities, zone.capacity)}%
              </div>
            </div>
          </div>
          
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                zone.status === 'normal' ? 'bg-green-500' :
                zone.status === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${getOccupancyPercentage(zone.entities, zone.capacity)}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center mt-2 text-xs opacity-75">
            <span>Status: {zone.status.charAt(0).toUpperCase() + zone.status.slice(1)}</span>
            <span>Available: {zone.capacity - zone.entities}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ZoneMap;
