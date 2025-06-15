
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
    // Simulate network delay for fetching schema/sample data
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let detectedSourceFields: string[] = [];

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
            // In a real scenario, this would parse the header of the uploaded file/file at path
            detectedSourceFields = ['entity_id', 'record_number', 'event_timestamp', 'description', 'current_status', 'priority'];
            break;
        default:
            detectedSourceFields = [];
    }
    
    if (detectedSourceFields.length > 0) {
      toast.success(`${detectedSourceFields.length} source fields detected automatically.`);
    } else {
      toast.info(`No fields were automatically detected for ${type}. Please add mappings manually.`);
    }

    // Attempt to map detected fields to common business fields
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
            targetField: targetField, // can be empty if no hint found
            dataType: getDataType(lowerSource),
            required: false
        };
    });
};
