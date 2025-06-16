
import { supabase } from '@/integrations/supabase/client';

export class RealtimeDataService {
  private listeners: Map<string, any> = new Map();

  async getRealtimeData() {
    try {
      // Use only existing tables for realtime data
      const [bedsData, staffData, equipmentData] = await Promise.all([
        supabase.from('beds').select('*').is('deleted_at', null),
        supabase.from('staff').select('*').eq('is_active', true),
        supabase.from('equipment').select('*')
      ]);

      return {
        beds: bedsData.data || [],
        staff: staffData.data || [],
        equipment: equipmentData.data || [],
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error fetching realtime data:', error);
      return {
        beds: [],
        staff: [],
        equipment: [],
        timestamp: new Date()
      };
    }
  }

  subscribeToUpdates(callback: (data: any) => void) {
    const channel = supabase.channel('realtime-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'beds' }, callback)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'staff' }, callback)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'equipment' }, callback)
      .subscribe();

    return channel;
  }

  unsubscribeFromUpdates(channel: any) {
    if (channel) {
      supabase.removeChannel(channel);
    }
  }
}

export const realtimeDataService = new RealtimeDataService();
