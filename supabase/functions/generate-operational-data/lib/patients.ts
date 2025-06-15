
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'

export const managePatientVisits = async (supabase: SupabaseClient) => {
    // Add a new patient visit sometimes
    if (Math.random() < 0.5) {
        const { data: availableBeds } = await supabase.from('beds').select('id, department_id').eq('status', 'AVAILABLE').limit(1);
        if (availableBeds && availableBeds.length > 0) {
            const bed = availableBeds[0];
            const bedId = bed.id;
            const departmentId = bed.department_id;

            if (!departmentId) {
                console.error(`Bed ${bedId} is missing department_id, cannot create patient visit.`);
                return;
            }

            let { data: patient, error: patientError } = await supabase.from('patients').insert({
                first_name: `PatientFirst${Math.floor(Math.random() * 1000)}`,
                last_name: `PatientLast${Math.floor(Math.random() * 1000)}`,
                mrn: `MRN${Math.floor(Math.random() * 100000)}`,
                admission_date: new Date().toISOString(),
            }).select('id').single();

            if (patientError) {
                console.error('Error creating patient:', patientError);
                throw patientError;
            }
            
            const { error: visitError } = await supabase.from('patient_visits').insert({
                patient_id: patient.id,
                bed_id: bedId,
                department_id: departmentId,
                visit_number: `V${Math.floor(Math.random() * 1000000)}`,
                status: 'ACTIVE',
                admission_date: new Date().toISOString(),
            });

            if (visitError) {
                console.error('Error creating patient visit:', visitError);
                throw visitError;
            }

            await supabase.from('beds').update({ status: 'OCCUPIED' }).eq('id', bedId);
        }
    }
};

export const manageWaitTimes = async (supabase: SupabaseClient) => {
    // This is probably inefficient but simple. We clear all wait times and regenerate for active patients.
    await supabase.from('wait_times').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    const { data: activeVisits, error: visitsError } = await supabase
        .from('patient_visits')
        .select('id, department_id, patient_id, admission_date')
        .eq('status', 'ACTIVE');

    if(visitsError) {
        console.error('Error fetching active visits:', visitsError);
        throw visitsError;
    }

    if (activeVisits && activeVisits.length > 0) {
        const waitTimesToInsert = activeVisits.map(visit => {
            const admissionDate = new Date(visit.admission_date);
            const now = new Date();
            // Calculate wait time since admission
            const total_wait_minutes = Math.max(0, Math.floor((now.getTime() - admissionDate.getTime()) / 60000));

            return {
                visit_id: visit.id,
                department_id: visit.department_id,
                patient_id: visit.patient_id,
                total_wait_minutes,
                arrival_time: visit.admission_date,
            };
        });
        if (waitTimesToInsert.length > 0) {
            const { error: insertError } = await supabase.from('wait_times').insert(waitTimesToInsert);
            if (insertError) {
                console.error('Error inserting wait times:', insertError);
                throw insertError;
            }
        }
    }
};
