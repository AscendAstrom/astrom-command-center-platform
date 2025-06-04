
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, TrendingUp, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from '@/integrations/supabase/client';

export const EquipmentAvailabilityTile = () => {
  const [metrics, setMetrics] = useState({
    total: 0,
    available: 0,
    inUse: 0,
    maintenance: 0
  });
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEquipmentData();
    
    // Subscribe to real-time equipment updates
    const channel = supabase
      .channel('equipment-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'equipment' },
        () => fetchEquipmentData()
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const fetchEquipmentData = async () => {
    try {
      setLoading(true);
      const { data: equipmentData, error } = await supabase
        .from('equipment')
        .select('equipment_type, status');

      if (error) throw error;

      const total = equipmentData?.length || 0;
      const available = equipmentData?.filter(e => e.status === 'AVAILABLE').length || 0;
      const inUse = equipmentData?.filter(e => e.status === 'IN_USE').length || 0;
      const maintenance = equipmentData?.filter(e => e.status === 'MAINTENANCE').length || 0;

      setMetrics({ total, available, inUse, maintenance });

      // Group equipment by type
      const equipmentByType = equipmentData?.reduce((acc: any, item) => {
        const type = item.equipment_type;
        if (!acc[type]) {
          acc[type] = { available: 0, total: 0 };
        }
        acc[type].total++;
        if (item.status === 'AVAILABLE') {
          acc[type].available++;
        }
        return acc;
      }, {});

      const equipmentList = Object.entries(equipmentByType || {}).map(([name, data]: [string, any]) => ({
        name,
        available: data.available,
        total: data.total,
        trend: 'stable',
        change: '0'
      }));

      setEquipment(equipmentList);
    } catch (error) {
      console.error('Error fetching equipment data:', error);
      setMetrics({ total: 0, available: 0, inUse: 0, maintenance: 0 });
      setEquipment([]);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-red-500" />;
      default: return <div className="h-3 w-3 bg-gray-400 rounded-full" />;
    }
  };

  const getAvailabilityColor = (available: number, total: number) => {
    if (total === 0) return 'text-gray-600';
    const percentage = (available / total) * 100;
    if (percentage >= 70) return 'text-green-600';
    if (percentage >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const availabilityPercentage = metrics.total > 0 ? Math.round((metrics.available / metrics.total) * 100) : 0;

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Monitor className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Equipment Availability</CardTitle>
                <CardDescription>Real-time equipment tracking</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Monitor className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Equipment Availability</CardTitle>
              <CardDescription>Real-time equipment tracking</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            {availabilityPercentage}% Available
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.total > 0 ? (
          <div className="space-y-3">
            {equipment.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.name}</span>
                  {getTrendIcon(item.trend)}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${getAvailabilityColor(item.available, item.total)}`}>
                    {item.available}/{item.total}
                  </span>
                  <Badge variant="outline" className="text-xs text-gray-600 border-gray-200">
                    {item.change}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-center py-4 text-muted-foreground">
              No equipment data available
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-green-50 p-2 rounded text-center">
            <div className="font-bold text-green-600">Available</div>
            <div className="text-green-600">{metrics.available} units</div>
          </div>
          <div className="bg-red-50 p-2 rounded text-center">
            <div className="font-bold text-red-600">In Use</div>
            <div className="text-red-600">{metrics.inUse} units</div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
          <strong>Equipment AI:</strong> {metrics.maintenance} units in maintenance. System connected to real inventory.
        </div>
      </CardContent>
    </Card>
  );
};
