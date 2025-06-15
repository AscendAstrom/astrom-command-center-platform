
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";

interface TestPayloadSectionProps {
  formData: any;
  testPayload: string;
  setTestPayload: (payload: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const TestPayloadSection = ({ formData, testPayload, setTestPayload, onGenerate, isGenerating }: TestPayloadSectionProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-slate-300">Test Payload</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onGenerate}
          disabled={isGenerating}
          className="text-xs"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Generate with AI
            </>
          )}
        </Button>
      </div>
      <Textarea
        value={testPayload}
        onChange={(e) => setTestPayload(e.target.value)}
        placeholder={isGenerating ? "AI is generating a payload..." : `Enter real ${formData.type} data structure for testing...`}
        className="bg-slate-800 border-slate-700 text-white font-mono text-sm min-h-[200px]"
        readOnly={isGenerating}
      />
      <div className="text-xs text-slate-400">
        💡 Enter a real payload from your data source or use AI to generate one.
      </div>
    </div>
  );
};
