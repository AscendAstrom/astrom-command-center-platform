
export const getSamplePayload = (type: string) => {
  switch (type) {
    case 'EPIC':
      return JSON.stringify({
        resourceType: "Patient",
        id: "epic-12345",
        meta: {
          versionId: "1",
          lastUpdated: "2024-01-01T12:00:00.000Z",
          profile: ["http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient"]
        },
        extension: [
          {
            url: "http://open.epic.com/FHIR/StructureDefinition/extension/legal-sex",
            valueCodeableConcept: {
              coding: [
                {
                  system: "http://open.epic.com/FHIR/CodeSystem/legal-sex",
                  code: "male",
                  display: "Male"
                }
              ]
            }
          }
        ],
        identifier: [
          {
            use: "usual",
            type: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                  code: "MR",
                  display: "Medical Record Number"
                }
              ]
            },
            system: "urn:oid:1.2.840.114350.1.13.0.1.7.5.737384.0",
            value: "E12345"
          },
          {
            use: "usual",
            type: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                  code: "EPIC",
                  display: "Epic Patient ID"
                }
              ]
            },
            system: "urn:oid:1.2.840.114350.1.13.0.1.7.2.698084",
            value: "Z7001"
          }
        ],
        active: true,
        name: [
          {
            use: "official",
            family: "Epic",
            given: ["John", "Middle"]
          }
        ],
        telecom: [
          {
            system: "phone",
            value: "(555) 123-4567",
            use: "home"
          },
          {
            system: "email",
            value: "john.epic@email.com",
            use: "home"
          }
        ],
        gender: "male",
        birthDate: "1980-01-01",
        address: [
          {
            use: "home",
            type: "both",
            line: ["123 Epic Street"],
            city: "Epic City",
            state: "CA",
            postalCode: "12345",
            country: "US"
          }
        ],
        maritalStatus: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
              code: "M",
              display: "Married"
            }
          ]
        },
        communication: [
          {
            language: {
              coding: [
                {
                  system: "urn:ietf:bcp:47",
                  code: "en-US",
                  display: "English (United States)"
                }
              ]
            },
            preferred: true
          }
        ]
      }, null, 2);

    case 'HL7':
      return `MSH|^~\\&|EPIC|UCDH|ASTROM|UCDH|202401011200||ADT^A04|12345|P|2.5
EVN|A04|202401011200
PID|1||123456789^^^UCDH^MR||DOE^JOHN^MIDDLE||19800101|M|||123 MAIN ST^^CITY^CA^12345^USA||(555)123-4567||(555)987-6543||S||123456789|999-99-9999
PV1|1|E|ER^001^01^UCDH||||DOC123^SMITH^JANE|||EMRG|||A|||DOC123^SMITH^JANE|INP|MEDICAID|||||||||||||||||||UCDH|A|||202401011200`;

    case 'FHIR':
      return JSON.stringify({
        resourceType: "Patient",
        id: "123456",
        identifier: [
          {
            use: "usual",
            type: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                  code: "MR"
                }
              ]
            },
            value: "123456789"
          }
        ],
        name: [
          {
            use: "official",
            family: "Doe",
            given: ["John", "Middle"]
          }
        ],
        telecom: [
          {
            system: "phone",
            value: "(555) 123-4567",
            use: "home"
          }
        ],
        gender: "male",
        birthDate: "1980-01-01"
      }, null, 2);

    case 'API':
      return JSON.stringify({
        patient_id: "123456789",
        mrn: "MR123456",
        triage_time: "2024-01-01T12:00:00Z",
        chief_complaint: "Chest pain",
        ems_status: "Ambulance",
        acuity_level: 2,
        bed_assignment: "ER-001",
        provider_id: "DOC123"
      }, null, 2);

    case 'CSV':
      return `patient_id,mrn,triage_time,chief_complaint,ems_status,acuity_level,bed_assignment,provider_id
123456789,MR123456,2024-01-01T12:00:00Z,Chest pain,Ambulance,2,ER-001,DOC123
987654321,MR987654,2024-01-01T12:30:00Z,Shortness of breath,Walk-in,3,ER-002,DOC456`;

    default:
      return '';
  }
};

export const runTestValidation = async (testPayload: string, formData: any) => {
  // Simulate API test call
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock validation logic
  const isValid = testPayload.trim().length > 0;
  
  if (isValid) {
    return {
      success: true,
      message: "Test successful! Data source configuration is valid and ready for deployment.",
      data: {
        recordsProcessed: 1,
        fieldsMatched: Object.keys(formData.fieldMappings).length,
        validationsPassed: ["Schema validation", "Field mapping", "Data format"]
      }
    };
  } else {
    return {
      success: false,
      message: "Test failed: No payload provided or invalid format."
    };
  }
};
