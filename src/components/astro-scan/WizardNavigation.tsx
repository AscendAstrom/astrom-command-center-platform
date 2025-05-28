
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const WizardNavigation = ({ 
  currentStep, 
  totalSteps, 
  canProceed, 
  onPrevious, 
  onNext, 
  onSubmit 
}: WizardNavigationProps) => {
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="p-6 border-t border-border/30 flex justify-between bg-muted/30">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0}
        className="border-border text-foreground hover:bg-muted"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>

      {isLastStep ? (
        <Button
          onClick={onSubmit}
          disabled={!canProceed}
          className="gradient-bg-green hover:shadow-lg"
        >
          <Play className="h-4 w-4 mr-2" />
          Deploy Source
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="gradient-bg-blue hover:shadow-lg"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
};
