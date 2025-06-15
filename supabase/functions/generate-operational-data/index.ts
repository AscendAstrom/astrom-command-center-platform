
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
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
