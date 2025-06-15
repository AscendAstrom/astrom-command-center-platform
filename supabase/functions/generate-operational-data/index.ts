import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const TOTAL_BEDS = 50;
const TOTAL_STAFF = 25;

// Ensure departments exist
const ensureDepartments = async (supabase: SupabaseClient) => {
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

// Ensure beds exist
const ensureBeds = async (supabase: SupabaseClient) => {
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

// Ensure staff exist
const ensureStaff = async (supabase: SupabaseClient) => {
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

// Update bed statuses
const updateBedStatuses = async (supabase: SupabaseClient) => {
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

const managePatientVisits = async (supabase: SupabaseClient) => {
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

const manageWaitTimes = async (supabase: SupabaseClient) => {
    await supabase.from('wait_times').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    const { data: activeVisits, error: visitsError } = await supabase
        .from('patient_visits')
        .select('id')
        .eq('status', 'ACTIVE');
    if(visitsError) throw visitsError;

    if (activeVisits && activeVisits.length > 0) {
        const waitTimesToInsert = activeVisits.map(visit => ({
            patient_visit_id: visit.id,
            total_wait_minutes: Math.floor(Math.random() * 120), // 0-120 minutes wait
        }));
        await supabase.from('wait_times').insert(waitTimesToInsert);
    }
};

const manageStaffSchedules = async (supabase: SupabaseClient) => {
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


serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    await ensureDepartments(supabaseClient);
    await ensureBeds(supabaseClient);
    await ensureStaff(supabaseClient);

    await Promise.all([
      updateBedStatuses(supabaseClient),
      managePatientVisits(supabaseClient),
      manageWaitTimes(supabaseClient),
      manageStaffSchedules(supabaseClient),
    ]);

    return new Response(JSON.stringify({ message: 'Operational data updated successfully' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Main function error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
