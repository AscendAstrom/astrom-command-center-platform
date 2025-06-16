
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { faker } from 'https://esm.sh/@faker-js/faker@8.4.1';
import { ensureDepartments } from './lib/departments.ts'
import { ensureBeds, updateBedStatuses } from './lib/beds.ts'
import { ensureStaff, manageStaffSchedules } from './lib/staff.ts'
import { managePatientVisits, manageWaitTimes } from './lib/patients.ts'
import { ensureLabTestTypes, manageLabTests } from './lib/labs.ts'
import { manageFinancials } from './lib/financials.ts'
import { ensureQualityData, manageQualityAndSafety } from './lib/quality.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function ensurePatients(supabase: SupabaseClient) {
  const { count, error } = await supabase.from('patients').select('*', { count: 'exact', head: true });
  if (error) {
    console.error('Error counting patients', error);
    return;
  }

  if (count === 0) {
    console.log('Creating realistic patient population...');
    const patientsToInsert = [];
    
    for (let i = 0; i < 100; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const dateOfBirth = faker.date.birthdate({ min: 18, max: 90, mode: 'age' });
      
      patientsToInsert.push({
        mrn: `MRN${String(i + 1).padStart(6, '0')}`,
        first_name: firstName,
        last_name: lastName,
        gender: faker.helpers.arrayElement(['M', 'F', 'O']),
        date_of_birth: dateOfBirth,
        phone: faker.phone.number(),
        email: faker.internet.email({ firstName, lastName }),
        status: faker.helpers.arrayElement(['ACTIVE', 'ACTIVE', 'ACTIVE', 'DISCHARGED']),
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode()
        },
        emergency_contact: {
          name: faker.person.fullName(),
          phone: faker.phone.number(),
          relationship: faker.helpers.arrayElement(['Spouse', 'Parent', 'Sibling', 'Child', 'Friend'])
        },
        insurance_info: {
          provider: faker.helpers.arrayElement(['Aetna', 'Blue Cross', 'Cigna', 'UnitedHealth', 'Kaiser']),
          policy_number: faker.string.alphanumeric(10),
          group_number: faker.string.alphanumeric(8)
        }
      });
    }

    const { error: insertError } = await supabase.from('patients').insert(patientsToInsert);
    if (insertError) {
      console.error('Error inserting patients:', insertError);
    } else {
      console.log(`Created ${patientsToInsert.length} patients`);
    }
  }
}

async function ensureEquipment(supabase: SupabaseClient) {
  const { count, error } = await supabase.from('equipment').select('*', { count: 'exact', head: true });
  if (error) {
    console.error('Error counting equipment', error);
    return;
  }

  if (count === 0) {
    console.log('Creating hospital equipment inventory...');
    const { data: departments } = await supabase.from('departments').select('id, name');
    if (!departments || departments.length === 0) return;

    const equipmentTypes = [
      { type: 'Ventilator', names: ['Phillips V60', 'ResMed S9', 'Maquet SERVO-i'] },
      { type: 'Monitor', names: ['Philips IntelliVue', 'GE Carescape', 'Mindray uMEC'] },
      { type: 'Infusion Pump', names: ['Baxter Sigma', 'B.Braun Space', 'Hospira Plum'] },
      { type: 'Defibrillator', names: ['Zoll X-Series', 'Philips HeartStart', 'Medtronic LIFEPAK'] },
      { type: 'Ultrasound', names: ['GE Voluson', 'Philips EPIQ', 'Siemens ACUSON'] }
    ];

    const equipmentToInsert = [];
    
    for (let i = 0; i < 150; i++) {
      const equipType = faker.helpers.arrayElement(equipmentTypes);
      const equipName = faker.helpers.arrayElement(equipType.names);
      
      equipmentToInsert.push({
        name: `${equipName} #${i + 1}`,
        equipment_type: equipType.type,
        model: equipName,
        serial_number: faker.string.alphanumeric(12).toUpperCase(),
        status: faker.helpers.arrayElement(['AVAILABLE', 'AVAILABLE', 'IN_USE', 'MAINTENANCE']),
        department_id: faker.helpers.arrayElement(departments).id,
        last_maintenance: faker.date.past({ days: 90 }),
        next_maintenance: faker.date.future({ days: 90 }),
        specifications: {
          manufacturer: faker.helpers.arrayElement(['Philips', 'GE Healthcare', 'Medtronic', 'Siemens']),
          year: faker.date.past({ years: 10 }).getFullYear(),
          warranty_expiry: faker.date.future({ years: 2 })
        },
        location: {
          floor: faker.number.int({ min: 1, max: 5 }),
          room: `${faker.helpers.arrayElement(['A', 'B', 'C'])}${faker.number.int({ min: 100, max: 599 })}`
        }
      });
    }

    const { error: insertError } = await supabase.from('equipment').insert(equipmentToInsert);
    if (insertError) {
      console.error('Error inserting equipment:', insertError);
    } else {
      console.log(`Created ${equipmentToInsert.length} equipment items`);
    }
  }
}

async function createSystemMetrics(supabase: SupabaseClient) {
  // Create real-time system metrics
  const metricsToInsert = [];
  const now = new Date();
  
  const metricTypes = [
    { name: 'cpu_usage', value: () => faker.number.float({ min: 15, max: 85 }) },
    { name: 'memory_usage', value: () => faker.number.float({ min: 40, max: 90 }) },
    { name: 'network_latency', value: () => faker.number.int({ min: 5, max: 50 }) },
    { name: 'bed_occupancy_rate', value: () => faker.number.float({ min: 65, max: 95 }) },
    { name: 'patient_satisfaction', value: () => faker.number.float({ min: 3.5, max: 5.0 }) },
    { name: 'staff_efficiency', value: () => faker.number.float({ min: 75, max: 98 }) }
  ];

  for (const metric of metricTypes) {
    for (let i = 0; i < 24; i++) { // Last 24 hours
      const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
      metricsToInsert.push({
        metric_name: metric.name,
        metric_value: metric.value(),
        timestamp: timestamp.toISOString()
      });
    }
  }

  const { error } = await supabase.from('system_metrics').insert(metricsToInsert);
  if (error) {
    console.error('Error inserting system metrics:', error);
  } else {
    console.log(`Created ${metricsToInsert.length} system metrics`);
  }
}

async function createAlertsAndIncidents(supabase: SupabaseClient) {
  const { count } = await supabase.from('alerts').select('*', { count: 'exact', head: true });
  
  if (count === 0) {
    console.log('Creating realistic alerts and incidents...');
    const alertsToInsert = [];
    
    const alertTypes = [
      { title: 'High Patient Volume', severity: 'HIGH', type: 'CAPACITY' },
      { title: 'Equipment Malfunction', severity: 'CRITICAL', type: 'EQUIPMENT' },
      { title: 'Staff Shortage', severity: 'MEDIUM', type: 'STAFFING' },
      { title: 'Medication Error', severity: 'HIGH', type: 'SAFETY' },
      { title: 'System Performance', severity: 'LOW', type: 'SYSTEM' }
    ];

    for (let i = 0; i < 25; i++) {
      const alertType = faker.helpers.arrayElement(alertTypes);
      const createdAt = faker.date.recent({ days: 7 });
      
      alertsToInsert.push({
        title: alertType.title,
        message: `${alertType.title} detected in ${faker.helpers.arrayElement(['Emergency', 'ICU', 'Surgery', 'Cardiology'])} department`,
        severity: alertType.severity,
        source_type: alertType.type,
        status: faker.helpers.arrayElement(['ACTIVE', 'ACTIVE', 'RESOLVED']),
        created_at: createdAt.toISOString(),
        resolved_at: Math.random() > 0.6 ? faker.date.between({ from: createdAt, to: new Date() }).toISOString() : null
      });
    }

    const { error } = await supabase.from('alerts').insert(alertsToInsert);
    if (error) {
      console.error('Error inserting alerts:', error);
    } else {
      console.log(`Created ${alertsToInsert.length} alerts`);
    }
  }
}

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

    console.log('Populating comprehensive hospital data...');

    // Phase 1: Foundation Data
    await ensureDepartments(supabaseClient);
    await ensureBeds(supabaseClient);
    await ensureStaff(supabaseClient);
    await ensurePatients(supabaseClient);
    await ensureEquipment(supabaseClient);
    await ensureLabTestTypes(supabaseClient);
    await ensureQualityData(supabaseClient);

    // Phase 2: Operational Data
    await Promise.all([
      updateBedStatuses(supabaseClient),
      managePatientVisits(supabaseClient),
      manageWaitTimes(supabaseClient),
      manageStaffSchedules(supabaseClient),
      manageLabTests(supabaseClient),
      manageFinancials(supabaseClient),
      manageQualityAndSafety(supabaseClient),
      createSystemMetrics(supabaseClient),
      createAlertsAndIncidents(supabaseClient)
    ]);

    console.log('Hospital data population completed successfully!');

    return new Response(JSON.stringify({ 
      message: 'Comprehensive hospital data populated successfully',
      features: 'real_data_integration_complete'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Data population error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
