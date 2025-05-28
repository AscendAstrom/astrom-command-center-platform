
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

interface TestResult {
  success: boolean;
  message: string;
  data?: any;
}

interface TestResultsProps {
  testResult: TestResult | null;
}

export const TestResults = ({ testResult }: TestResultsProps) => {
  if (!testResult) return null;

  return (
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
  );
};
