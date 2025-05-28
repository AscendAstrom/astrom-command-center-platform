
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, X } from "lucide-react";

interface WizardHeaderProps {
  currentStepTitle: string;
  currentStep: number;
  totalSteps: number;
  onClose: () => void;
}

export const WizardHeader = ({ currentStepTitle, currentStep, totalSteps, onClose }: WizardHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between border-b border-border/30">
      <div>
        <CardTitle className="text-foreground flex items-center gap-3 text-2xl font-bold">
          <div className="p-2 rounded-xl bg-astrom-blue/10">
            <Database className="h-6 w-6 text-astrom-blue" />
          </div>
          Add Data Source - {currentStepTitle}
        </CardTitle>
        <CardDescription className="text-lg mt-1">
          Step {currentStep + 1} of {totalSteps}
        </CardDescription>
      </div>
      <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-muted">
        <X className="h-5 w-5" />
      </Button>
    </CardHeader>
  );
};
