
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

    const { formData, testPayload } = await req.json()
    if (!formData || !testPayload) {
      throw new Error("`formData` and `testPayload` are required.")
    }

    const { type: dataSourceType, fieldMappings } = formData;

    const systemPrompt = `You are a data integration testing assistant. Your task is to validate a sample data payload against a given data source configuration and field mappings.

You have been given:
1.  \`dataSourceType\`: "${dataSourceType}"
2.  \`fieldMappings\`: ${JSON.stringify(fieldMappings, null, 2)}
3.  \`testPayload\`: A string containing sample data from the source.

Your tasks are:
1.  Parse the \`testPayload\`. For 'API', 'FHIR', 'EPIC', assume it's JSON. For 'CSV', it's comma-separated text (the first line might be headers). For 'HL7', it's pipe-and-hat delimited.
2.  For each mapping in \`fieldMappings\`, check if the \`sourceField\` can be found in the \`testPayload\`.
3.  Validate the data type if possible (e.g., if a mapped field has dataType 'datetime', check if the value looks like a date or time).
4.  Generate a small sample of the transformed data, showing how a few source fields would map to their target fields with the sample data.

Respond with a JSON object with the following structure. Do not include any other text or explanation outside the JSON object.
{
  "success": boolean,
  "message": "A detailed explanation of the validation result. If it fails, explain why.",
  "data": {
    "recordsProcessed": number,
    "fieldsMatched": number,
    "fieldsMismatched": number,
    "validationDetails": [
      { "sourceField": "string", "targetField": "string", "status": "OK | NOT_FOUND | TYPE_MISMATCH", "valueFound": "any" }
    ],
    "mappedSample": {}
  }
}

If the payload is invalid (e.g., bad JSON), \`success\` should be \`false\` and the message should explain the parsing error.
If some fields are not found, you can still return \`success: true\` but list them in \`validationDetails\`. A test fails (\`success: false\`) only if the payload is fundamentally un-parseable.
`

    const userPrompt = `Test Payload to validate:\n\`\`\`\n${testPayload}\n\`\`\``

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
    
    return new Response(JSON.stringify(responseContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in test-data-source function:', error)
    return new Response(JSON.stringify({ 
        success: false,
        message: `An error occurred: ${error.message}`,
        data: null
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

