
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, CheckCircle, Loader2, Sparkles } from "lucide-react";
import { ConfigurationSummary } from "./testing/ConfigurationSummary";
import { TestPayloadSection } from "./testing/TestPayloadSection";
import { TestResults } from "./testing/TestResults";
import { runTestValidation, generateAIPayload } from "./testing/TestingStepUtils";
import { toast } from "sonner";

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
  const [isTesting, setIsTesting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePayload = async () => {
    setIsGenerating(true);
    setTestResult(null);
    const result = await generateAIPayload(formData);
    if (result.success) {
      setTestPayload(result.payload);
      toast.success("AI-generated payload is ready!");
    } else {
      toast.error(result.message || "Failed to generate payload.");
    }
    setIsGenerating(false);
  };

  const runTest = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const result = await runTestValidation(testPayload, formData);
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: "Test failed: Connection error or invalid configuration."
      });
    } finally {
      setIsTesting(false);
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

      <ConfigurationSummary formData={formData} />

      <TestPayloadSection
        formData={formData}
        testPayload={testPayload}
        setTestPayload={setTestPayload}
        onGenerate={handleGeneratePayload}
        isGenerating={isGenerating}
      />

      <Button
        onClick={runTest}
        disabled={isTesting || isGenerating || !testPayload.trim()}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isTesting ? (
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

      <TestResults testResult={testResult} />

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
