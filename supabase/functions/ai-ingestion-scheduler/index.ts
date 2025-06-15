
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (_req) => {
  if (_req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log("AI Ingestion Scheduler: Waking up...");

    const { data: dataSources, error: fetchError } = await supabaseAdmin
      .from('data_sources')
      .select('*')
      .eq('ingestion_mode', 'BATCH')
      .in('status', ['CONNECTED', 'SYNCED', 'ERROR']);
      
    if (fetchError) {
      throw new Error(`Failed to fetch data sources: ${fetchError.message}`);
    }

    if (!dataSources || dataSources.length === 0) {
      console.log("AI Ingestion Scheduler: No data sources to process. Going back to sleep.");
      return new Response(JSON.stringify({ message: 'No BATCH data sources to process.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    console.log(`AI Ingestion Scheduler: Found ${dataSources.length} data source(s) to process.`);

    const processingPromises = dataSources.map(async (source) => {
      console.log(`[${source.name}] Starting ingestion process for source ID: ${source.id}`);

      try {
        await supabaseAdmin
          .from('data_sources')
          .update({ status: 'INGESTING' })
          .eq('id', source.id);

        console.log(`[${source.name}] Simulating data fetching and processing...`);
        await new Promise(resolve => setTimeout(resolve, Math.random() * 4000 + 1000));
        const newRecordsCount = Math.floor(Math.random() * 1000);

        const { error: updateSuccessError } = await supabaseAdmin
          .from('data_sources')
          .update({ 
            status: 'SYNCED', 
            last_sync: new Date().toISOString(),
            records_count: (source.records_count || 0) + newRecordsCount,
            last_error: null 
          })
          .eq('id', source.id);
        
        if (updateSuccessError) {
            throw new Error(`Failed to update source to SYNCED state: ${updateSuccessError.message}`);
        }
        
        console.log(`[${source.name}] Ingestion successful. ${newRecordsCount} new records processed.`);
      } catch (ingestionError: any) {
        console.error(`[${source.name}] Ingestion failed:`, ingestionError.message);
        await supabaseAdmin
          .from('data_sources')
          .update({ 
            status: 'ERROR',
            last_error: `Ingestion failed at ${new Date().toISOString()}: ${ingestionError.message}`
          })
          .eq('id', source.id);
      }
    });

    await Promise.all(processingPromises);
    
    console.log("AI Ingestion Scheduler: All ingestion tasks have been completed.");

    return new Response(JSON.stringify({ message: `Processed ingestion for ${dataSources.length} sources.` }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    console.error('Error in AI Ingestion Scheduler function:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
