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

async function manageSurgicalOutcomes(supabase: SupabaseClient) {
  const { count, error } = await supabase.from('surgical_outcomes').select('*', { count: 'exact', head: true });
  if (error) {
    console.error('Error counting surgical_outcomes', error);
    return;
  }

  if (count === 0) {
    console.log('Populating surgical_outcomes...');
    const { data: departments, error: deptError } = await supabase.from('departments').select('id').eq('type', 'SURGICAL');
    if (deptError || !departments || departments.length === 0) {
      console.error('Error fetching surgical departments', deptError);
      return;
    }
    const { data: patients, error: patError } = await supabase.from('patients').select('id').limit(50);
     if (patError || !patients) {
      console.error('Error fetching patients', patError);
      return;
    }

    const outcomes = [];
    const procedureNames = ['Appendectomy', 'Coronary Artery Bypass', 'Knee Replacement', 'Hip Replacement', 'Cesarean Section'];
    for (let i = 0; i < 150; i++) {
      outcomes.push({
        patient_id: faker.helpers.arrayElement(patients).id,
        department_id: faker.helpers.arrayElement(departments).id,
        procedure_name: faker.helpers.arrayElement(procedureNames),
        surgery_date: faker.date.past({ months: 3 }),
        duration_minutes: faker.number.int({ min: 60, max: 240 }),
        outcome: faker.helpers.arrayElement(['Successful', 'Complication', 'Cancelled']),
        on_time_start: faker.datatype.boolean(0.85),
      });
    }
    const { error: insertError } = await supabase.from('surgical_outcomes').insert(outcomes);
    if (insertError) console.error('Error inserting surgical_outcomes', insertError);
    else console.log(`Inserted ${outcomes.length} surgical outcomes.`);
  }
}

async function manageMedicationAdherence(supabase: SupabaseClient) {
  const { count, error } = await supabase.from('medication_adherence_log').select('*', { count: 'exact', head: true });
  if (error) {
    console.error('Error counting medication_adherence_log', error);
    return;
  }
  
  if (count === 0) {
    console.log('Populating medication_adherence_log...');
    const { data: patients, error: patError } = await supabase.from('patients').select('id').limit(100);
    if (patError || !patients) {
      console.error('Error fetching patients for medication log', patError);
      return;
    }

    const logs = [];
    const medications = ['Lisinopril', 'Metformin', 'Atorvastatin', 'Amlodipine', 'Warfarin (Critical)'];
    for (let i = 0; i < 500; i++) {
      const medName = faker.helpers.arrayElement(medications);
      logs.push({
        patient_id: faker.helpers.arrayElement(patients).id,
        medication_name: medName.replace(' (Critical)', ''),
        is_critical: medName.includes('Critical'),
        dose_time: faker.date.past({ days: 90 }),
        status: faker.helpers.arrayElement(['Administered', 'Administered', 'Administered', 'Missed', 'Intervention Required']),
      });
    }
    const { error: insertError } = await supabase.from('medication_adherence_log').insert(logs);
    if (insertError) console.error('Error inserting medication_adherence_log', insertError);
    else console.log(`Inserted ${logs.length} medication adherence logs.`);
  }
}

async function manageHospitalExpenses(supabase: SupabaseClient) {
  const { count, error } = await supabase.from('hospital_expenses').select('*', { count: 'exact', head: true });
  if (error) {
    console.error('Error counting hospital_expenses', error);
    return;
  }

  if (count === 0) {
    const { data: departments, error: deptError } = await supabase.from('departments').select('id');
    if (deptError || !departments || departments.length === 0) {
      console.error('Error fetching departments for expenses', deptError);
      return;
    }
    
    console.log('Populating hospital_expenses...');
    const expensesToInsert = [];
    const categories: ('Labor' | 'Supplies' | 'Utilities' | 'Equipment' | 'Overhead' | 'Administrative')[] = ['Labor', 'Supplies', 'Utilities', 'Equipment', 'Overhead', 'Administrative'];

    for (let i = 0; i < 12; i++) { // For the last 12 months
      const date = faker.date.past({ months: i });
      for (const category of categories) {
        let amount = 0;
        switch(category) {
            case 'Labor': amount = faker.number.int({ min: 400000, max: 600000 }); break;
            case 'Supplies': amount = faker.number.int({ min: 300000, max: 400000 }); break;
            case 'Utilities': amount = faker.number.int({ min: 100000, max: 150000 }); break;
            case 'Equipment': amount = faker.number.int({ min: 50000, max: 100000 }); break;
            case 'Overhead': amount = faker.number.int({ min: 300000, max: 400000 }); break;
            case 'Administrative': amount = faker.number.int({ min: 150000, max: 250000 }); break;
        }
        expensesToInsert.push({
          expense_date: date,
          category: category,
          amount: amount,
          description: `Monthly ${category} cost for ${faker.date.month()}`,
          department_id: faker.helpers.arrayElement(departments).id
        });
      }
    }
    
    const { error: insertError } = await supabase.from('hospital_expenses').insert(expensesToInsert);
    if (insertError) {
      console.error('Error inserting hospital_expenses', insertError);
    } else {
      console.log(`Inserted ${expensesToInsert.length} records into hospital_expenses`);
    }
  }
}

async function manageBudgetAllocations(supabase: SupabaseClient) {
  const { count, error } = await supabase.from('budget_allocations').select('*', { count: 'exact', head: true });
  if (error) {
    console.error('Error counting budget_allocations', error);
    return;
  }

  if (count === 0) {
    console.log('Populating budget_allocations...');
    const allocations = [];
    const categories = ['Labor', 'Supplies', 'Utilities', 'Equipment', 'Overhead', 'Administrative', 'Revenue'];
    const now = new Date();

    for (const category of categories) {
      const isRevenue = category === 'Revenue';
      const amount = isRevenue 
        ? faker.number.int({ min: 3500000, max: 4500000 }) 
        : faker.number.int({ min: 50000, max: 700000 });

      allocations.push({
        category: category,
        budget_amount: amount,
        budget_period_start: new Date(now.getFullYear(), now.getMonth(), 1),
        budget_period_end: new Date(now.getFullYear(), now.getMonth() + 1, 0)
      });
    }

    const { error: insertError } = await supabase.from('budget_allocations').insert(allocations);
    if (insertError) console.error('Error inserting budget_allocations', insertError);
    else console.log('Inserted budget allocations for current month.');
  }
}

async function manageFinancialForecasts(supabase: SupabaseClient) {
  const { count, error } = await supabase.from('financial_forecasts').select('*', { count: 'exact', head: true });
  if (error) {
    console.error('Error counting financial_forecasts', error);
    return;
  }

  if (count === 0) {
    console.log('Populating financial_forecasts...');
    const forecasts = [];
    for (let i = 0; i < 6; i++) {
        const forecastDate = new Date();
        forecastDate.setMonth(forecastDate.getMonth() + i);
        
        forecasts.push({
            forecast_date: forecastDate,
            metric_name: 'revenue',
            forecasted_value: faker.number.int({ min: 3200000, max: 3800000 }) + i * 50000,
            confidence_level: faker.number.float({ min: 0.75, max: 0.95, precision: 0.01 }),
            model_version: 'v1.2'
        });
    }

    const { error: insertError } = await supabase.from('financial_forecasts').insert(forecasts);
    if (insertError) console.error('Error inserting financial_forecasts', insertError);
    else console.log('Inserted financial forecasts.');
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

    await ensureDepartments(supabaseClient);
    await ensureBeds(supabaseClient);
    await ensureStaff(supabaseClient);
    await ensureLabTestTypes(supabaseClient);
    await ensureQualityData(supabaseClient);
    await manageHospitalExpenses(supabaseClient);
    await manageBudgetAllocations(supabaseClient);
    await manageFinancialForecasts(supabaseClient);
    await manageSurgicalOutcomes(supabaseClient);
    await manageMedicationAdherence(supabaseClient);

    await Promise.all([
      updateBedStatuses(supabaseClient),
      managePatientVisits(supabaseClient),
      manageWaitTimes(supabaseClient),
      manageStaffSchedules(supabaseClient),
      manageLabTests(supabaseClient),
      manageFinancials(supabaseClient),
      manageQualityAndSafety(supabaseClient),
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
