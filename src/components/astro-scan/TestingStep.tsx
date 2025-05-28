
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Play, CheckCircle, XCircle, Loader2 } from "lucide-react";

interface TestingStepProps {
  formData: any;
  onComplete: () => void;
}

export const TestingStep = ({ formData, onComplete }: TestingStepProps) => {
  const [testPayload, setTestPayload] = useState('');
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    data?: any;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSamplePayload = () => {
    switch (formData.type) {
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

  const runTest = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      // Simulate API test call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation logic
      const isValid = testPayload.trim().length > 0;
      
      if (isValid) {
        setTestResult({
          success: true,
          message: "Test successful! Data source configuration is valid and ready for deployment.",
          data: {
            recordsProcessed: 1,
            fieldsMatched: Object.keys(formData.fieldMappings).length,
            validationsPassed: ["Schema validation", "Field mapping", "Data format"]
          }
        });
      } else {
        setTestResult({
          success: false,
          message: "Test failed: No payload provided or invalid format."
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: "Test failed: Connection error or invalid configuration."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-cyan-400">
        <Play className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Test & Deploy</h3>
      </div>

      <p className="text-slate-400 text-sm">
        Test your data source configuration with sample data before deploying to production.
      </p>

      {/* Configuration Summary */}
      <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
        <h4 className="text-white font-medium">Configuration Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Name:</span>
            <span className="text-white ml-2">{formData.name}</span>
          </div>
          <div>
            <span className="text-slate-400">Type:</span>
            <span className="text-white ml-2">{formData.type}</span>
          </div>
          <div>
            <span className="text-slate-400">Mode:</span>
            <span className="text-white ml-2">{formData.ingestionMode}</span>
          </div>
          <div>
            <span className="text-slate-400">Fields Mapped:</span>
            <span className="text-white ml-2">{Object.keys(formData.fieldMappings).length}</span>
          </div>
        </div>
      </div>

      {/* Test Payload */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-slate-300">Test Payload</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTestPayload(getSamplePayload())}
            className="border-slate-700 text-slate-300"
          >
            Load Sample
          </Button>
        </div>
        <Textarea
          value={testPayload}
          onChange={(e) => setTestPayload(e.target.value)}
          placeholder={`Enter sample ${formData.type} data for testing...`}
          className="bg-slate-800 border-slate-700 text-white font-mono text-sm min-h-[200px]"
        />
      </div>

      {/* Test Button */}
      <Button
        onClick={runTest}
        disabled={isLoading || !testPayload.trim()}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Running Test...
          </>
        ) : (
          <>
            <Play className="h-4 w-4 mr-2" />
            Run Test
          </>
        )}
      </Button>

      {/* Test Results */}
      {testResult && (
        <Alert className={`border ${testResult.success ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
          <div className="flex items-start gap-2">
            {testResult.success ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <div className="flex-1">
              <AlertDescription className={testResult.success ? 'text-green-300' : 'text-red-300'}>
                {testResult.message}
              </AlertDescription>
              {testResult.data && (
                <div className="mt-3 space-y-1 text-sm">
                  <div className="text-slate-300">
                    Records processed: {testResult.data.recordsProcessed}
                  </div>
                  <div className="text-slate-300">
                    Fields matched: {testResult.data.fieldsMatched}
                  </div>
                  <div className="text-slate-300">
                    Validations: {testResult.data.validationsPassed.join(', ')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Alert>
      )}

      {/* Deploy Button */}
      {testResult?.success && (
        <Button
          onClick={onComplete}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Deploy Data Source
        </Button>
      )}
    </div>
  );
};
