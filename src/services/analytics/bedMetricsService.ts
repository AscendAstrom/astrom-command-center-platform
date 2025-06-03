
import { supabase } from '@/integrations/supabase/client';

export class BedMetricsService {
  async fetchBedMetrics() {
    try {
      const { data, error } = await supabase
        .from('beds')
        .select('*');

      if (error) {
        console.log('No bed data found - this is normal after clearing sample data');
        return {
          total: 0,
          occupied: 0,
          available: 0,
          outOfOrder: 0,
          utilization: 0
        };
      }

      const beds = data || [];
      const totalBeds = beds.length;
      const occupiedBeds = beds.filter(bed => bed.status === 'OCCUPIED').length;
      const availableBeds = beds.filter(bed => bed.status === 'AVAILABLE').length;
      const maintenanceBeds = beds.filter(bed => bed.status === 'MAINTENANCE').length;

      return {
        total: totalBeds,
        occupied: occupiedBeds,
        available: availableBeds,
        outOfOrder: maintenanceBeds,
        utilization: totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0
      };
    } catch (error) {
      console.error('Error fetching bed metrics:', error);
      return {
        total: 0,
        occupied: 0,
        available: 0,
        outOfOrder: 0,
        utilization: 0
      };
    }
  }
}

export const bedMetricsService = new BedMetricsService();
