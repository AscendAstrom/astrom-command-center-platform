
import { supabase } from '@/integrations/supabase/client';

export class RealtimeDataService {
  private listeners: Map<string, any> = new Map();

  async getRealtimeData() {
    try {
      console.log('Fetching real-time data from database...');
      
      // Fetch all real data from database
      const [bedsData, staffData, equipmentData, visitsData, waitTimesData] = await Promise.all([
        supabase.from('beds').select('*').is('deleted_at', null),
        supabase.from('staff').select('*').eq('is_active', true),
        supabase.from('equipment').select('*'),
        supabase.from('patient_visits').select('*').eq('status', 'ACTIVE'),
        supabase.from('wait_times').select('*').gte('arrival_time', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      ]);

      return {
        beds: bedsData.data || [],
        staff: staffData.data || [],
        equipment: equipmentData.data || [],
        visits: visitsData.data || [],
        waitTimes: waitTimesData.data || [],
        timestamp: new Date(),
        metrics: {
          bedOccupancy: this.calculateBedOccupancy(bedsData.data || []),
          avgWaitTime: this.calculateAvgWaitTime(waitTimesData.data || []),
          staffUtilization: this.calculateStaffUtilization(staffData.data || []),
          equipmentStatus: this.calculateEquipmentStatus(equipmentData.data || [])
        }
      };
    } catch (error) {
      console.error('Error fetching realtime data:', error);
      return {
        beds: [],
        staff: [],
        equipment: [],
        visits: [],
        waitTimes: [],
        timestamp: new Date(),
        metrics: {
          bedOccupancy: 0,
          avgWaitTime: 0,
          staffUtilization: 0,
          equipmentStatus: 0
        }
      };
    }
  }

  private calculateBedOccupancy(beds: any[]): number {
    if (beds.length === 0) return 0;
    const occupied = beds.filter(bed => bed.status === 'OCCUPIED').length;
    return Math.round((occupied / beds.length) * 100);
  }

  private calculateAvgWaitTime(waitTimes: any[]): number {
    if (waitTimes.length === 0) return 0;
    const total = waitTimes.reduce((sum, wt) => sum + (wt.total_wait_minutes || 0), 0);
    return Math.round(total / waitTimes.length);
  }

  private calculateStaffUtilization(staff: any[]): number {
    // For now, assume all active staff are utilized
    return staff.length > 0 ? 85 : 0; // Base utilization rate
  }

  private calculateEquipmentStatus(equipment: any[]): number {
    if (equipment.length === 0) return 0;
    const operational = equipment.filter(eq => eq.status === 'AVAILABLE').length;
    return Math.round((operational / equipment.length) * 100);
  }

  subscribeToUpdates(callback: (data: any) => void) {
    const channel = supabase.channel('realtime-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'beds' }, () => {
        this.getRealtimeData().then(callback);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'staff' }, () => {
        this.getRealtimeData().then(callback);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'equipment' }, () => {
        this.getRealtimeData().then(callback);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'patient_visits' }, () => {
        this.getRealtimeData().then(callback);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'wait_times' }, () => {
        this.getRealtimeData().then(callback);
      })
      .subscribe();

    return channel;
  }

  unsubscribeFromUpdates(channel: any) {
    if (channel) {
      supabase.removeChannel(channel);
    }
  }

  async initializeRealTimeSystem() {
    try {
      console.log('Initializing real-time system with database connections...');
      const data = await this.getRealtimeData();
      console.log('Real-time system initialized successfully');
      return data;
    } catch (error) {
      console.error('Error initializing real-time system:', error);
      throw error;
    }
  }
}

export const realtimeDataService = new RealtimeDataService();
