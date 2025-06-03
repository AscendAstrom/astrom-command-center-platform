
import { supabase } from '@/integrations/supabase/client';

export class EquipmentMetricsService {
  async fetchEquipmentMetrics() {
    try {
      const { data: equipment, error } = await supabase
        .from('equipment')
        .select('*');

      if (error) {
        console.log('No equipment data found - this is normal after clearing sample data');
        return {
          total: 0,
          available: 0,
          inUse: 0,
          maintenance: 0
        };
      }

      const equipmentData = equipment || [];
      const totalEquipment = equipmentData.length;
      const availableEquipment = equipmentData.filter(e => e.status === 'AVAILABLE').length;
      const inUseEquipment = equipmentData.filter(e => e.status === 'IN_USE').length;
      const maintenanceEquipment = equipmentData.filter(e => e.status === 'MAINTENANCE').length;

      return {
        total: totalEquipment,
        available: availableEquipment,
        inUse: inUseEquipment,
        maintenance: maintenanceEquipment
      };
    } catch (error) {
      console.error('Error fetching equipment metrics:', error);
      return {
        total: 0,
        available: 0,
        inUse: 0,
        maintenance: 0
      };
    }
  }
}

export const equipmentMetricsService = new EquipmentMetricsService();
