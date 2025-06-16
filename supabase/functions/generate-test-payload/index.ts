
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const openAIApiKey = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Fallback payload generators for when OpenAI is unavailable
const generateFallbackPayload = (dataSourceType: string, fieldMappings: any, config: any) => {
  switch (dataSourceType) {
    case 'CSV':
      const fields = Object.keys(fieldMappings);
      const delimiter = config.delimiter || ',';
      const hasHeader = config.hasHeader !== false;
      
      let payload = '';
      if (hasHeader) {
        payload += fields.join(delimiter) + '\n';
      }
      
      // Generate sample CSV rows
      for (let i = 0; i < 3; i++) {
        const row = fields.map(field => {
          if (field.toLowerCase().includes('date') || field.toLowerCase().includes('time')) {
            return '2024-01-15';
          } else if (field.toLowerCase().includes('id') || field.toLowerCase().includes('patient')) {
            return `P${1000 + i}`;
          } else if (field.toLowerCase().includes('code')) {
            return `CODE${100 + i}`;
          } else if (field.toLowerCase().includes('description')) {
            return `Sample Description ${i + 1}`;
          }
          return `Value${i + 1}`;
        });
        payload += row.join(delimiter) + '\n';
      }
      
      return payload.trim();
      
    case 'FHIR':
    case 'API':
    case 'EPIC':
      const samplePatient = {
        resourceType: "Patient",
        id: "patient-123",
        identifier: [
          {
            system: "http://hospital.com/patient-id",
            value: "P123456"
          }
        ],
        name: [
          {
            family: "Al-Ahmad",
            given: ["Ahmed", "Mohammed"]
          }
        ],
        gender: "male",
        birthDate: "1985-06-15",
        address: [
          {
            line: ["123 King Fahd Road"],
            city: "Riyadh",
            country: "SA"
          }
        ]
      };
      
      return JSON.stringify(samplePatient, null, 2);
      
    case 'HL7':
      return `MSH|^~\\&|HOSPITAL|DEPT|SYSTEM|FACILITY|20240115120000||ADT^A01|MSG123|P|2.5
EVN|A01|20240115120000
PID|1||P123456^^^HOSPITAL^MR||AL-AHMAD^AHMED^MOHAMMED||19850615|M|||123 KING FAHD ROAD^^RIYADH^^11564^SA||(966)11-1234567|EN|M|ISL|||123456789|||SA`;
      
    default:
      return JSON.stringify({
        patientId: "P123456",
        name: "Ahmed Al-Ahmad",
        dateOfBirth: "1985-06-15",
        diagnosis: "Sample diagnosis",
        timestamp: new Date().toISOString()
      }, null, 2);
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { formData } = await req.json()
    if (!formData) {
      throw new Error("`formData` is required.")
    }

    const { type: dataSourceType, fieldMappings, config } = formData;
    
    // Try OpenAI first if API key is available
    if (openAIApiKey) {
      try {
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
            timeout: 10000, // 10 second timeout
          }),
        })

        if (!response.ok) {
            throw new Error(`OpenAI API request failed with status ${response.status}`);
        }

        const data = await response.json()
        const generatedPayload = data.choices[0].message.content
        
        return new Response(JSON.stringify({ payload: generatedPayload }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      } catch (openaiError) {
        console.error('OpenAI API failed, using fallback:', openaiError)
        // Fall through to fallback generation
      }
    }
    
    // Use fallback payload generation
    console.log('Using fallback payload generation for type:', dataSourceType)
    const fallbackPayload = generateFallbackPayload(dataSourceType, fieldMappings, config);
    
    return new Response(JSON.stringify({ payload: fallbackPayload }), {
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
