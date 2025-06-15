
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
        {/* "Load Sample" button removed as mock data is no longer used. */}
      </div>
      <Textarea
        value={testPayload}
        onChange={(e) => setTestPayload(e.target.value)}
        placeholder={`Enter real ${formData.type} data structure for testing...`}
        className="bg-slate-800 border-slate-700 text-white font-mono text-sm min-h-[200px]"
      />
      <div className="text-xs text-slate-400">
        💡 Enter a real payload from your data source to test the configuration.
      </div>
    </div>
  );
};
