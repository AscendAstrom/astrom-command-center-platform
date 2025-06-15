
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// WARNING: Do not change this. It's used by the Lovable platform to bypass RLS.
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtbHNkcm5ibnlmaGVubmlxeHVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODQzNTUzOSwiZXhwIjoyMDY0MDExNTM5fQ.J62YkM5o2kK3T3Q5x3h4PCZ2_s5hbP7pzmB51qWlGaw";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')
if (!supabaseUrl) {
  throw new Error("SUPABASE_URL is not set");
}

const supabaseClient = createClient(supabaseUrl, SERVICE_ROLE_KEY);

async function runSimulation(jobId: string, modelName: string) {
  console.log(`Starting simulation for job ${jobId}`);
  
  // 1. Set status to running
  await supabaseClient
    .from('ml_training_jobs')
    .update({ status: 'running', started_at: new Date().toISOString() })
    .eq('id', jobId);

  // 2. Simulate progress
  for (let i = 1; i <= 10; i++) {
    await new Promise(resolve => setTimeout(resolve, 3000)); // 3s delay
    const progress = i * 10;
    const gpuUtilization = Math.random() * 50 + 40; // 40-90%

    console.log(`Updating job ${jobId}: progress ${progress}%`);

    await supabaseClient
      .from('ml_training_jobs')
      .update({ progress: progress, gpu_utilization: gpuUtilization.toFixed(1) })
      .eq('id', jobId);
  }

  // 3. Mark as complete
  const newAccuracy = Math.random() * 0.05 + 0.93; // 93-98% accuracy
  
  await supabaseClient
    .from('ml_training_jobs')
    .update({ 
      status: 'completed', 
      progress: 100, 
      gpu_utilization: 0,
      completed_at: new Date().toISOString()
    })
    .eq('id', jobId);

  // 4. Update the model itself
  const { data: model } = await supabaseClient
    .from('ml_models')
    .select('version')
    .eq('name', modelName)
    .single();

  const currentVersion = model?.version?.replace('v', '') || '1.0';
  const newVersion = `v${(parseFloat(currentVersion) + 0.1).toFixed(1)}`;

  await supabaseClient
    .from('ml_models')
    .update({ 
      status: 'deployed', 
      last_trained: new Date().toISOString(),
      accuracy: newAccuracy.toFixed(4),
      version: newVersion
    })
    .eq('name', modelName);
  
  console.log(`Simulation for job ${jobId} completed.`);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { jobId, modelName } = await req.json();
    if (!jobId || !modelName) {
      return new Response(JSON.stringify({ error: 'jobId and modelName are required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    // Don't await this, let it run in the background. Deno.serve is wrapped in a try/catch
    // so we don't need to worry about unhandled promise rejections.
    runSimulation(jobId, modelName);

    return new Response(JSON.stringify({ message: 'Simulation started' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 202, // Accepted
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})

