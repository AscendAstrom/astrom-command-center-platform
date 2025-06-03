
import { supabase } from '@/integrations/supabase/client';

export class StaffMetricsService {
  async fetchStaffMetrics() {
    try {
      const [staffData, schedulesData] = await Promise.all([
        supabase.from('staff').select('*'),
        supabase.from('staff_schedules').select('*')
      ]);

      const staff = staffData.data || [];
      const schedules = schedulesData.data || [];

      const activeStaff = staff.filter(s => s.is_active).length;

      // Staff on duty calculation
      const now = new Date();
      const staffOnDuty = schedules.filter(s => {
        const shiftStart = new Date(s.shift_start);
        const shiftEnd = new Date(s.shift_end);
        return s.status === 'ACTIVE' && shiftStart <= now && shiftEnd >= now;
      }).length;

      return {
        total: staff.length,
        onDuty: staffOnDuty || activeStaff,
        active: activeStaff,
        onCall: schedules.filter(s => s.is_on_call).length,
        overtime: schedules.filter(s => s.status === 'OVERTIME').length,
        scheduledNext: schedules.filter(s => new Date(s.shift_start) > now).length
      };
    } catch (error) {
      console.error('Error fetching staff metrics:', error);
      return {
        total: 0,
        onDuty: 0,
        active: 0,
        onCall: 0,
        overtime: 0,
        scheduledNext: 0
      };
    }
  }
}

export const staffMetricsService = new StaffMetricsService();
