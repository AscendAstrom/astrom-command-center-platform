
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

    // Fetch BATCH sources that are CONNECTED and have file content to process
    const { data: dataSources, error: fetchError } = await supabaseAdmin
      .from('data_sources')
      .select('*')
      .eq('ingestion_mode', 'BATCH')
      .eq('status', 'CONNECTED')
      .not('file_content', 'is', null);
      
    if (fetchError) {
      throw new Error(`Failed to fetch data sources: ${fetchError.message}`);
    }

    if (!dataSources || dataSources.length === 0) {
      console.log("AI Ingestion Scheduler: No data sources with file content to process. Going back to sleep.");
      return new Response(JSON.stringify({ message: 'No BATCH data sources with file content to process.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    console.log(`AI Ingestion Scheduler: Found ${dataSources.length} data source(s) to process.`);

    const processingPromises = dataSources.map(async (source) => {
      console.log(`[${source.name}] Starting ingestion process for source ID: ${source.id}`);

      try {
        // Set status to SYNCING to provide visual feedback in the UI
        await supabaseAdmin
          .from('data_sources')
          .update({ status: 'SYNCING' })
          .eq('id', source.id);

        console.log(`[${source.name}] Processing file content...`);
        
        const fileContent = source.file_content || '';
        const lines = fileContent.split('\n').filter(line => line.trim() !== ''); // Filter out empty lines
        
        // Check if there's a header row to exclude from count
        const hasHeader = source.config?.hasHeader === undefined ? true : source.config.hasHeader;
        const newRecordsCount = hasHeader ? Math.max(0, lines.length - 1) : lines.length;

        console.log(`[${source.name}] Found ${newRecordsCount} records.`);
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));

        const { error: updateSuccessError } = await supabaseAdmin
          .from('data_sources')
          .update({ 
            status: 'CONNECTED', // Set back to connected, ready for another file
            last_sync: new Date().toISOString(),
            records_count: newRecordsCount,
            file_content: null, // Clear file content to prevent reprocessing
            last_error: null 
          })
          .eq('id', source.id);
        
        if (updateSuccessError) {
            throw new Error(`Failed to update source to CONNECTED state: ${updateSuccessError.message}`);
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
