
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
      throw new Error("OpenAI API key is not set.")
    }

    const { formData } = await req.json()
    if (!formData) {
      throw new Error("`formData` is required.")
    }

    const { type: dataSourceType, fieldMappings, config } = formData;
    
    const fieldList = Object.entries(fieldMappings).map(([sourceField, targetFieldConfig]: [string, any]) => {
        return `${sourceField} (maps to ${targetFieldConfig.targetField})`;
    }).join(', ');

    const systemPrompt = `You are a data generation assistant. Your task is to generate a realistic sample data payload based on a given data source configuration.

You have been given the following configuration:
1.  **Data Source Type**: "${dataSourceType}"
2.  **Field Mappings**: ${fieldList}
3.  **Source Configuration**: ${JSON.stringify(config, null, 2)}

**Instructions**:
- Generate a sample payload that is consistent with the data source type.
- For 'API', 'FHIR', 'EPIC', generate a JSON object or a small array of JSON objects.
- For 'CSV', generate a couple of rows of comma-separated text. If \`config.hasHeader\` is true, include a header row. Use the delimiter specified in \`config.delimiter\` (default is ',').
- For 'HL7', generate a valid HL7 v2 message string.
- The data should be realistic for a healthcare context.
- **Your response MUST contain ONLY the raw payload string.** Do not include any explanations, markdown formatting (like \`\`\`json), or any other text. Just the data.
`

    const userPrompt = `Generate the payload now.`

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
        temperature: 0.5,
      }),
    })

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('OpenAI API error:', errorBody);
        throw new Error(`OpenAI API request failed with status ${response.status}: ${errorBody}`);
    }

    const data = await response.json()
    const generatedPayload = data.choices[0].message.content
    
    return new Response(JSON.stringify({ payload: generatedPayload }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in generate-test-payload function:', error)
    return new Response(JSON.stringify({ 
        success: false,
        message: `An error occurred: ${error.message}`,
        payload: null
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
