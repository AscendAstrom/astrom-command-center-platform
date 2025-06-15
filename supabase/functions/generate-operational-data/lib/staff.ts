
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'

const TOTAL_STAFF = 25;

export const ensureStaff = async (supabase: SupabaseClient) => {
    const { count, error } = await supabase.from('staff').select('*', { count: 'exact', head: true });
    if(error) throw error;

    if (count === null || count < TOTAL_STAFF) {
        console.log('Staff not found or insufficient, creating staff...');
        await supabase.from('staff').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        const staffToInsert = [];
        const roles = ['NURSE', 'PHYSICIAN', 'RECEPTIONIST'];
        for(let i=0; i < TOTAL_STAFF; i++) {
            staffToInsert.push({
                first_name: `StaffFirst${i}`,
                last_name: `StaffLast${i}`,
                role: roles[i % roles.length]
            });
        }
        await supabase.from('staff').insert(staffToInsert);
        console.log(`${TOTAL_STAFF} staff created.`);
    }
}

export const manageStaffSchedules = async (supabase: SupabaseClient) => {
    await supabase.from('staff_schedules').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const { data: staff, error: staffError } = await supabase.from('staff').select('id, role');
    if (staffError) throw staffError;
    if (!staff || staff.length === 0) return;

    const { data: departments, error: deptsError } = await supabase.from('departments').select('id');
    if (deptsError) throw deptsError;
    if (!departments || departments.length === 0) return;

    const schedules = [];
    const now = new Date();
    // Schedule about 80% of staff
    const staffOnDuty = staff.filter(() => Math.random() < 0.8);

    for (const s of staffOnDuty) {
        const shiftStart = new Date(now);
        shiftStart.setHours(now.getHours() - 4);
        
        const shiftEnd = new Date(now);
        shiftEnd.setHours(now.getHours() + 4);

        schedules.push({
            staff_id: s.id,
            shift_start: shiftStart.toISOString(),
            shift_end: shiftEnd.toISOString(),
            department_id: departments[Math.floor(Math.random() * departments.length)].id,
            role: (s as any).role,
        });
    }
    if(schedules.length > 0) {
        await supabase.from('staff_schedules').insert(schedules);
    }
};
