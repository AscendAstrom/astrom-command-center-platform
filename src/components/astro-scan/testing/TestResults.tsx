
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, FileJson, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TestResult {
  success: boolean;
  message: string;
  data?: {
    recordsProcessed?: number;
    fieldsMatched?: number;
    fieldsMismatched?: number;
    validationDetails?: Array<{
      sourceField: string;
      targetField: string;
      status: 'OK' | 'NOT_FOUND' | 'TYPE_MISMATCH';
      valueFound: any;
    }>;
    mappedSample?: Record<string, any>;
  };
}

interface TestResultsProps {
  testResult: TestResult | null;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'OK':
      return <Badge variant="default" className="bg-green-600">OK</Badge>;
    case 'NOT_FOUND':
      return <Badge variant="destructive">Not Found</Badge>;
    case 'TYPE_MISMATCH':
      return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Type Mismatch</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export const TestResults = ({ testResult }: TestResultsProps) => {
  if (!testResult) return null;

  return (
    <Alert className={`border ${testResult.success ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
      <div className="flex items-start gap-3">
        {testResult.success ? (
          <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500 mt-1" />
        )}
        <div className="flex-1 space-y-3">
          <AlertDescription className={`font-medium ${testResult.success ? 'text-green-300' : 'text-red-300'}`}>
            {testResult.message}
          </AlertDescription>

          {testResult.data && (
            <div className="space-y-4 text-sm">
              <div className="flex flex-wrap gap-4">
                <div className="text-slate-300">
                  Records Processed: <span className="font-bold text-white">{testResult.data.recordsProcessed ?? 'N/A'}</span>
                </div>
                <div className="text-slate-300">
                  Fields Matched: <span className="font-bold text-white">{testResult.data.fieldsMatched ?? 'N/A'}</span>
                </div>
                <div className="text-slate-300">
                  Fields Mismatched: <span className="font-bold text-white">{testResult.data.fieldsMismatched ?? 'N/A'}</span>
                </div>
              </div>

              {testResult.data.validationDetails && testResult.data.validationDetails.length > 0 && (
                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">Validation Details:</h4>
                  <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                    {testResult.data.validationDetails.map((detail, index) => (
                      <div key={index} className="flex items-center justify-between text-xs p-2 bg-slate-800/50 rounded">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-slate-400">{detail.sourceField}</span>
                            <ArrowRight className="h-3 w-3 text-slate-500"/>
                            <span className="font-mono text-cyan-400">{detail.targetField || 'N/A'}</span>
                        </div>
                        {getStatusBadge(detail.status)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {testResult.data.mappedSample && Object.keys(testResult.data.mappedSample).length > 0 && (
                 <div>
                  <h4 className="font-semibold text-slate-200 mb-2 flex items-center gap-2">
                    <FileJson className="h-4 w-4" />
                    Sample Mapped Record
                  </h4>
                  <pre className="text-xs bg-slate-800/50 p-3 rounded-md overflow-x-auto text-yellow-300">
                    {JSON.stringify(testResult.data.mappedSample, null, 2)}
                  </pre>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </Alert>
  );
};
