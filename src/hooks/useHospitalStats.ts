
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface HospitalStats {
  totalBeds: number;
  occupiedBeds: number;
  bedUtilization: number;
  activePatients: number;
  avgWaitTime: number;
  staffOnDuty: number;
}

const fetchHospitalStats = async (): Promise<HospitalStats> => {
    // --- Bed Stats ---
    const { data: bedsData, error: bedsError } = await supabase.from('beds').select('id,status');
    if (bedsError) throw new Error(`Bed Stats Error: ${bedsError.message}`);
    const totalBeds = bedsData?.length || 0;
    const occupiedBeds = bedsData?.filter(b => b.status === 'OCCUPIED').length || 0;
    const bedUtilization = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

    // --- Active Patients ---
    const { count: activePatientsCount, error: patientsError } = await supabase
        .from('patient_visits')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'ACTIVE');
    if (patientsError) throw new Error(`Patient Stats Error: ${patientsError.message}`);
    
    // --- Avg Wait Time ---
    const { data: waitTimesData, error: waitTimesError } = await supabase
        .from('wait_times')
        .select('total_wait_minutes, patient_visits!inner(status)')
        .eq('patient_visits.status', 'ACTIVE');
    if (waitTimesError) throw new Error(`Wait Time Stats Error: ${waitTimesError.message}`);
    const avgWaitTime = waitTimesData && waitTimesData.length > 0
        ? Math.round(waitTimesData.reduce((sum, wt) => sum + (wt.total_wait_minutes || 0), 0) / waitTimesData.length)
        : 0;

    // --- Staff on Duty ---
    const now = new Date().toISOString();
    const { count: staffOnDutyCount, error: staffError } = await supabase
        .from('staff_schedules')
        .select('*', { count: 'exact', head: true })
        .lt('shift_start', now)
        .gt('shift_end', now);
    if (staffError) throw new Error(`Staff Stats Error: ${staffError.message}`);

    return {
        totalBeds,
        occupiedBeds,
        bedUtilization,
        activePatients: activePatientsCount || 0,
        avgWaitTime,
        staffOnDuty: staffOnDutyCount || 0,
    };
};

export const useHospitalStats = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const channel = supabase.channel('hospital-stats-realtime')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'beds' }, () => {
                queryClient.invalidateQueries({ queryKey: ['hospitalStats'] });
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'patient_visits' }, () => {
                queryClient.invalidateQueries({ queryKey: ['hospitalStats'] });
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'wait_times' }, () => {
                queryClient.invalidateQueries({ queryKey: ['hospitalStats'] });
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'staff_schedules' }, () => {
                queryClient.invalidateQueries({ queryKey: ['hospitalStats'] });
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [queryClient]);
    
    return useQuery<HospitalStats, Error>({
        queryKey: ['hospitalStats'],
        queryFn: fetchHospitalStats,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
