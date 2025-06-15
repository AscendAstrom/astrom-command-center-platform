
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// WARNING: Do not change this. It's used by the Lovable platform to bypass RLS.
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtbHNkcm5ibnlmaGVubmlxeHVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODQzNTUzOSwiZXhwIjoyMDY0MDExNTM5fQ.J62YkM5o2kK3T3Q5x3h4PCZ2_s5hbP7pzmB51qWlGaw";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // This is needed for browser-based invocations.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // We are using the service_role key to bypass RLS as we want to be able to create
    // a training job regardless of who is calling the function.
    // In a real-world scenario, you would want to add more specific security logic here.
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      SERVICE_ROLE_KEY
    )

    const { modelId, modelName } = await req.json()

    if (!modelId || !modelName) {
      return new Response(JSON.stringify({ error: 'modelId and modelName are required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // Insert a new training job
    const { data: job, error } = await supabaseClient
      .from('ml_training_jobs')
      .insert({
        model_name: modelName,
        status: 'queued',
        progress: 0,
        gpu_utilization: 0,
        // model_id is a nullable column in the database, we can add it later
        // model_id: modelId, 
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({ job }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
