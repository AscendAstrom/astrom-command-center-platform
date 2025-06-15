
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const openAIApiKey = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!openAIApiKey) {
      throw new Error("OPENAI_API_KEY secret is not set in Supabase.")
    }

    const { messages } = await req.json()
    if (!messages || !Array.isArray(messages)) {
      throw new Error("`messages` is required and must be an array.")
    }
    
    const systemPrompt = `You are an expert AI assistant for a healthcare data platform called "ASTRO". You are currently in the "ASTRO-SCAN" module, which deals with connecting, ingesting, and monitoring data sources.

Your primary role is to help users with:
- Understanding different data source types (e.g., API, FHIR, HL7, EPIC, CSV).
- Configuring new data sources.
- Interpreting data quality scores and ingestion logs.
- Troubleshooting connection or ingestion issues.
- Explaining concepts related to healthcare data interoperability.

You must be concise, accurate, and helpful. Format your responses using markdown where appropriate (e.g., for lists or code snippets).

Do not answer questions unrelated to healthcare data management or the ASTRO platform. If asked an off-topic question, politely state that you can only assist with topics related to ASTRO-SCAN.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        temperature: 0.3,
        max_tokens: 500
      }),
    })

    if (!response.ok) {
        const errorBody = await response.json();
        console.error('OpenAI API error:', errorBody);
        throw new Error(errorBody.error?.message || `OpenAI API request failed with status ${response.status}`);
    }

    const data = await response.json()
    const assistantResponse = data.choices[0].message.content
    
    return new Response(JSON.stringify({ response: assistantResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in astro-scan-chat function:', error)
    return new Response(JSON.stringify({ 
        error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
