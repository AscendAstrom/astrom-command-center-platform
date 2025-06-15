
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

async function manageHospitalExpenses(supabase: SupabaseClient) {
  const { count, error } = await supabase.from('hospital_expenses').select('*', { count: 'exact', head: true });
  if (error) {
    console.error('Error counting hospital_expenses', error);
    return;
  }

  if (count === 0) {
    console.log('Populating hospital_expenses...');
    const expensesToInsert = [];
    const categories: ('Labor' | 'Supplies' | 'Utilities' | 'Equipment' | 'Overhead' | 'Administrative')[] = ['Labor', 'Supplies', 'Utilities', 'Equipment', 'Overhead'];

    for (let i = 0; i < 6; i++) { // For the last 6 months
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
          description: `Monthly ${category} cost for ${faker.date.month()}`
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

