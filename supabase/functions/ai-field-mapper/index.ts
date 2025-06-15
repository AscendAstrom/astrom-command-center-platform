
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { COMMON_BUSINESS_FIELDS_LIST } from "../_shared/common-fields.ts"

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
      throw new Error("OpenAI API key is not set.")
    }

    const { sourceFields } = await req.json()
    if (!sourceFields || !Array.isArray(sourceFields) || sourceFields.length === 0) {
      throw new Error("Source fields are required and must be an array of strings.")
    }

    const systemPrompt = `You are an expert data mapping assistant. Your task is to map a list of source field names to a predefined list of target business fields.

The target business fields are:
${COMMON_BUSINESS_FIELDS_LIST.map(f => `- ${f.key} (${f.label})`).join('\n')}

Analyze the provided source fields and for each one, find the best matching target field from the list above.

Respond with a JSON object that has a single key "mappings" which contains an array of objects. Each object in the array should have "sourceField", "targetField", and "dataType".
- "sourceField" must be the original source field name.
- "targetField" must be one of the keys from the target business fields list, or an empty string if no good match is found.
- "dataType" should be inferred from the field name (e.g., 'string', 'integer', 'datetime', 'boolean'). Prioritize 'datetime' for fields containing 'date' or 'time', 'integer' for 'priority' or 'level', and 'string' for IDs or codes. Default to 'string'.

Example response format:
{
  "mappings": [
    { "sourceField": "customer_id", "targetField": "entity_id", "dataType": "string" },
    { "sourceField": "order_date", "targetField": "timestamp", "dataType": "datetime" },
    { "sourceField": "unmatched_field", "targetField": "", "dataType": "string" }
  ]
}

Ensure your response is only the JSON object and nothing else.
`

    const userPrompt = `Source fields to map: ${JSON.stringify(sourceFields)}`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0,
      }),
    })

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('OpenAI API error:', errorBody);
        throw new Error(`OpenAI API request failed with status ${response.status}: ${errorBody}`);
    }

    const data = await response.json()
    const responseContent = JSON.parse(data.choices[0].message.content)
    
    const mappings = responseContent.mappings || [];

    if (!Array.isArray(mappings)) {
      throw new Error("AI response did not contain a 'mappings' array.");
    }

    return new Response(JSON.stringify(mappings), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in ai-field-mapper function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
