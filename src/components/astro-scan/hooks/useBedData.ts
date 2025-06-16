
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BedData {
  total: number;
  occupied: number;
  available: number;
  maintenance: number;
  utilization: number;
}

export const useBedData = () => {
  const [bedData, setBedData] = useState<BedData>({
    total: 0,
    occupied: 0,
    available: 0,
    maintenance: 0,
    utilization: 0
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchBedData = async () => {
    try {
      setLoading(true);
      
      // Fetch beds with their department information
      const { data: beds, error: bedsError } = await supabase
        .from('beds')
        .select(`
          id,
          status,
          bed_number,
          room_number,
          departments!inner(id, name)
        `)
        .is('deleted_at', null);

      if (bedsError) {
        console.error('Error fetching beds:', bedsError);
        setBedData({
          total: 0,
          occupied: 0,
          available: 0,
          maintenance: 0,
          utilization: 0
        });
        return;
      }

      if (!beds || beds.length === 0) {
        console.log('No beds found in database');
        setBedData({
          total: 0,
          occupied: 0,
          available: 0,
          maintenance: 0,
          utilization: 0
        });
        return;
      }

      // Calculate bed statistics
      const total = beds.length;
      const occupied = beds.filter(bed => bed.status === 'OCCUPIED').length;
      const available = beds.filter(bed => bed.status === 'AVAILABLE').length;
      const maintenance = beds.filter(bed => bed.status === 'MAINTENANCE').length;
      const utilization = total > 0 ? Math.round((occupied / total) * 100) : 0;

      setBedData({
        total,
        occupied,
        available,
        maintenance,
        utilization
      });

      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error in fetchBedData:', error);
      setBedData({
        total: 0,
        occupied: 0,
        available: 0,
        maintenance: 0,
        utilization: 0
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBedData();

    // Set up real-time subscription for bed updates
    const channel = supabase
      .channel('bed-status-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'beds' },
        (payload) => {
          console.log('Bed status change detected:', payload);
          fetchBedData();
        }
      )
      .subscribe();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchBedData, 30000);

    return () => {
      channel.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return {
    bedData,
    loading,
    lastUpdate,
    fetchBedData
  };
};
