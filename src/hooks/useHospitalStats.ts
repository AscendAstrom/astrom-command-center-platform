
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface HospitalStats {
  totalPatients: number;
  activeBeds: number;
  availableRooms: number;
  criticalCases: number;
  staffOnDuty: number;
  averageWaitTime: number;
  patientSatisfaction: number;
  occupancyRate: number;
}

export const useHospitalStats = () => {
  const [stats, setStats] = useState<HospitalStats>({
    totalPatients: 0,
    activeBeds: 0,
    availableRooms: 0,
    criticalCases: 0,
    staffOnDuty: 0,
    averageWaitTime: 0,
    patientSatisfaction: 0,
    occupancyRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHospitalStats = async () => {
      try {
        setIsLoading(true);
        
        // Fetch data from real tables
        const [
          { data: beds },
          { data: staff },
          { data: waitTimes },
          { data: activeVisits },
          { data: surveys },
          { data: safetyAlerts }
        ] = await Promise.all([
          supabase.from('beds').select('*').is('deleted_at', null),
          supabase.from('staff').select('*').eq('is_active', true),
          supabase.from('wait_times').select('*').gte('arrival_time', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
          supabase.from('patient_visits').select('*').eq('status', 'ACTIVE'),
          supabase.from('patient_surveys').select('overall_rating').not('overall_rating', 'is', null),
          supabase.from('medication_safety_alerts').select('*').eq('status', 'ACTIVE').in('severity', ['HIGH', 'CRITICAL'])
        ]);

        const totalBeds = beds?.length || 0;
        const occupiedBeds = beds?.filter(bed => bed.status === 'OCCUPIED').length || 0;
        const availableBeds = beds?.filter(bed => bed.status === 'AVAILABLE').length || 0;
        const staffCount = staff?.length || 0;
        const totalPatients = activeVisits?.length || 0;
        
        // Calculate average wait time from today's data
        const avgWaitTime = waitTimes?.length 
          ? waitTimes.reduce((sum, wt) => sum + (wt.total_wait_minutes || 0), 0) / waitTimes.length
          : 0;

        // Calculate patient satisfaction from surveys
        const patientSatisfaction = surveys?.length
          ? (surveys.reduce((sum, s) => sum + s.overall_rating, 0) / surveys.length)
          : 0;

        // Critical cases from safety alerts
        const criticalCases = safetyAlerts?.length || 0;

        setStats({
          totalPatients,
          activeBeds: totalBeds,
          availableRooms: availableBeds,
          criticalCases,
          staffOnDuty: staffCount,
          averageWaitTime: Math.round(avgWaitTime),
          patientSatisfaction: Number(patientSatisfaction.toFixed(1)),
          occupancyRate: totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0,
        });
      } catch (err) {
        console.error('Error fetching hospital stats:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHospitalStats();
    
    // Set up real-time subscriptions for live updates
    const channel = supabase.channel('hospital-stats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'beds' }, fetchHospitalStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'patient_visits' }, fetchHospitalStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'staff' }, fetchHospitalStats)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { stats, isLoading, error };
};
