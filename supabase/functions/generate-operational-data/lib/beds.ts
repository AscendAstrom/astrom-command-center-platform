
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'

const TOTAL_BEDS = 50;

export const ensureBeds = async (supabase: SupabaseClient) => {
    const { count, error: countError } = await supabase.from('beds').select('*', { count: 'exact', head: true });
    if (countError) throw countError;

    if (count === null || count < TOTAL_BEDS) {
        console.log('Beds not found or insufficient, creating beds...');
        await supabase.from('beds').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        const { data: departments } = await supabase.from('departments').select('id');
        if(!departments || departments.length === 0) {
            console.error("No departments found. Cannot create beds.");
            return;
        }

        const bedsToInsert = [];
        for (let i = 0; i < TOTAL_BEDS; i++) {
            bedsToInsert.push({
                bed_number: `B${101 + i}`,
                room_number: `R${Math.floor(i / 2) + 101}`,
                status: 'AVAILABLE',
                department_id: departments[i % departments.length].id,
            });
        }
        const { error: insertError } = await supabase.from('beds').insert(bedsToInsert);
        if (insertError) throw insertError;
        console.log(`${TOTAL_BEDS} beds created.`);
    }
}

export const updateBedStatuses = async (supabase: SupabaseClient) => {
    const { data: beds, error } = await supabase.from('beds').select('id, status');
    if (error) throw error;
    if (!beds) return;

    for (const bed of beds) {
        // 20% chance to change status
        if (Math.random() < 0.2) {
            const newStatus = bed.status === 'OCCUPIED' ? 'AVAILABLE' : 'OCCUPIED';
            if (newStatus === 'AVAILABLE') {
                // if bed becomes available, any patient in it should be discharged
                await supabase.from('patient_visits').update({ status: 'DISCHARGED', discharge_date: new Date().toISOString() }).eq('bed_id', bed.id).eq('status', 'ACTIVE');
            }
            await supabase.from('beds').update({ status: newStatus }).eq('id', bed.id);
        }
    }
};
