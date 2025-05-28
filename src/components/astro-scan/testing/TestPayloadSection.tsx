
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSamplePayload } from "./TestingStepUtils";

interface TestPayloadSectionProps {
  formData: any;
  testPayload: string;
  setTestPayload: (payload: string) => void;
}

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
        placeholder={`Enter sample ${formData.type} data for testing...`}
        className="bg-slate-800 border-slate-700 text-white font-mono text-sm min-h-[200px]"
      />
    </div>
  );
};
