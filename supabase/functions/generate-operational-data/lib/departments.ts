
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'

export const ensureDepartments = async (supabase: SupabaseClient) => {
    const { count, error } = await supabase.from('departments').select('*', { count: 'exact', head: true });
    if (error) throw error;

    if (count === null || count === 0) {
        console.log('Departments not found, creating departments...');
        const departmentsToInsert = [
            { name: 'Emergency Department', code: 'ED', type: 'EMERGENCY', description: 'Handles emergency cases.' },
            { name: 'Cardiology', code: 'CARD', type: 'CARDIOLOGY', description: 'Heart-related issues.' },
            { name: 'Neurology', code: 'NEURO', type: 'NEUROLOGY', description: 'Nervous system disorders.' },
            { name: 'Orthopedics', code: 'ORTHO', type: 'ORTHOPEDICS', description: 'Musculoskeletal system.' },
            { name: 'Radiology', code: 'RADIO', type: 'RADIOLOGY', description: 'Medical imaging.' },
            { name: 'Surgery', code: 'SURG', type: 'SURGERY', description: 'Surgical procedures.' },
        ];
        const { error: insertError } = await supabase.from('departments').insert(departmentsToInsert);
        if (insertError) throw insertError;
        console.log(`${departmentsToInsert.length} departments created.`);
    }
};
