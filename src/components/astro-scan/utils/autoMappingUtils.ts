
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// A simple mapping dictionary to guess target fields from common source field names.
const MAPPING_HINTS: { [key: string]: string } = {
  'id': 'entity_id',
  'patient.id': 'entity_id',
  'record_id': 'record_number',
  'timestamp': 'timestamp',
  'date': 'timestamp',
  'description': 'description',
  'desc': 'description',
  'status': 'status',
  'priority': 'priority_level',
  'user_id': 'user_id',
  'location': 'location',
  'department': 'department',
  'dept': 'department'
};

const getDataType = (fieldName: string): string => {
  if (fieldName.includes('id') || fieldName.includes('number')) return 'string';
  if (fieldName.includes('time') || fieldName.includes('date')) return 'datetime';
  if (fieldName.includes('priority')) return 'integer';
  if (fieldName.includes('status')) return 'string';
  return 'string';
}

export const autoDetectAndMapFields = async (type: string, config: any): Promise<Array<{
    sourceField: string;
    targetField: string;
    dataType: string;
    required: boolean;
  }>> => {
    
    let detectedSourceFields: string[] = [];

    // Step 1: Detect source fields based on data source type
    switch (type) {
        case 'EPIC':
            detectedSourceFields = ['patient.id', 'patient.name.family', 'patient.name.given', 'observation.code.text', 'observation.valueQuantity.value', 'encounter.status'];
            break;
        case 'HL7':
            detectedSourceFields = ['MSH-3', 'MSH-4', 'PID-3', 'PID-5.1', 'OBX-3.2', 'OBX-5.1', 'PV1-2'];
            break;
        case 'FHIR':
            detectedSourceFields = ['Patient.id', 'Patient.name[0].family', 'Patient.name[0].given[0]', 'Observation.code.text', 'Observation.valueQuantity.value', 'Encounter.status'];
            break;
        case 'API':
            // In a real scenario, this would fetch from config.endpoint
            detectedSourceFields = ['user_id', 'record_id', 'timestamp', 'data_value', 'event_type', 'status'];
            break;
        case 'CSV':
            if (config.csvHeaders && config.csvHeaders.length > 0) {
                detectedSourceFields = config.csvHeaders;
            } else {
                toast.info("No headers found in CSV configuration. Please upload a file with headers or define mappings manually.");
                return [];
            }
            break;
        default:
            detectedSourceFields = [];
    }
    
    if (detectedSourceFields.length === 0) {
      toast.info(`No source fields were detected for ${type}. Please add mappings manually.`);
      return [];
    }

    toast.info(`Detected ${detectedSourceFields.length} source fields. Asking AI for mapping suggestions...`);

    // Step 2: Use AI to map the fields
    try {
        const { data: mappings, error } = await supabase.functions.invoke('ai-field-mapper', {
            body: { sourceFields: detectedSourceFields },
        });

        if (error) {
            throw error;
        }

        if (!mappings || !Array.isArray(mappings)) {
            throw new Error("AI mapper returned an invalid format.");
        }
        
        const finalMappings = mappings.map((m: any) => ({
            ...m,
            required: false // Add default required property
        }));

        toast.success("AI has successfully suggested field mappings.");
        return finalMappings;

    } catch (err: any) {
        console.error("AI mapping failed:", err);
        toast.error(`AI mapping failed: ${err.message}. Falling back to basic mapping.`);

        // Fallback to simple hint-based mapping
        return detectedSourceFields.map(sourceField => {
            let targetField = '';
            const lowerSource = sourceField.toLowerCase();
            for (const hint in MAPPING_HINTS) {
                if (lowerSource.includes(hint)) {
                    targetField = MAPPING_HINTS[hint];
                    break;
                }
            }

            return {
                sourceField: sourceField,
                targetField: targetField,
                dataType: getDataType(lowerSource),
                required: false
            };
        });
    }
};
