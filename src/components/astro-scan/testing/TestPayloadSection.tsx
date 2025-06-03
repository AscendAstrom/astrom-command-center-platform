
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TestPayloadSectionProps {
  formData: any;
  testPayload: string;
  setTestPayload: (payload: string) => void;
}

const getSamplePayload = (type: string) => {
  const payloadTemplates: { [key: string]: string } = {
    hl7: `MSH|^~\\&|SENDING_APP|SENDING_FACILITY|RECEIVING_APP|RECEIVING_FACILITY|20240101120000||ADT^A01|12345|P|2.5
EVN|A01|20240101120000
PID|1||123456789^^^HOSPITAL^MR||DOE^JOHN^MIDDLE^^||19800101|M|||123 MAIN ST^^CITY^STATE^12345^USA||(555)555-5555|||S||987654321|||||||||||||||||||
PV1|1|I|ICU^101^A|||12345^SMITH^JOHN^A^MD|||||19||Y|||12345^SMITH^JOHN^A^MD|||||||||||||||||||||||||20240101120000`,
    
    fhir: `{
  "resourceType": "Patient",
  "id": "patient-example",
  "identifier": [
    {
      "system": "http://hospital.example.org/patients",
      "value": "123456789"
    }
  ],
  "name": [
    {
      "family": "Doe",
      "given": ["John", "Middle"]
    }
  ],
  "gender": "male",
  "birthDate": "1980-01-01",
  "address": [
    {
      "line": ["123 Main St"],
      "city": "City",
      "state": "State",
      "postalCode": "12345"
    }
  ]
}`,
    
    epic: `{
  "PatientID": "123456789",
  "MRN": "MR123456",
  "FirstName": "John",
  "LastName": "Doe",
  "DateOfBirth": "1980-01-01",
  "Gender": "M",
  "Address": {
    "Street": "123 Main St",
    "City": "City",
    "State": "State",
    "ZipCode": "12345"
  },
  "AdmissionData": {
    "AdmissionDate": "2024-01-01T12:00:00Z",
    "Department": "ICU",
    "Room": "101",
    "Bed": "A"
  }
}`,
    
    csv: `PatientID,MRN,FirstName,LastName,DateOfBirth,Gender,AdmissionDate,Department,Room,Bed
123456789,MR123456,John,Doe,1980-01-01,M,2024-01-01,ICU,101,A
987654321,MR987654,Jane,Smith,1975-05-15,F,2024-01-01,ER,205,B
456789123,MR456789,Bob,Johnson,1990-12-25,M,2024-01-02,MED,301,C`,
    
    api: `{
  "endpoint": "/api/patients",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer <your-token>",
    "Content-Type": "application/json"
  },
  "response": {
    "patients": [
      {
        "id": "123456789",
        "name": "John Doe",
        "admissionDate": "2024-01-01T12:00:00Z",
        "department": "ICU"
      }
    ]
  }
}`
  };

  return payloadTemplates[type] || `{
  "message": "Please configure your ${type} data source",
  "timestamp": "${new Date().toISOString()}",
  "status": "ready_for_configuration"
}`;
};

export const TestPayloadSection = ({ formData, testPayload, setTestPayload }: TestPayloadSectionProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-slate-300">Test Payload</Label>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTestPayload(getSamplePayload(formData.type))}
          className="border-slate-700 text-slate-300"
        >
          Load Sample
        </Button>
      </div>
      <Textarea
        value={testPayload}
        onChange={(e) => setTestPayload(e.target.value)}
        placeholder={`Enter real ${formData.type} data structure for testing...`}
        className="bg-slate-800 border-slate-700 text-white font-mono text-sm min-h-[200px]"
      />
      <div className="text-xs text-slate-400">
        💡 Load a sample template and modify it with your real data structure
      </div>
    </div>
  );
};
