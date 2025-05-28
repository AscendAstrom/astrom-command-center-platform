
import { ChevronRight } from "lucide-react";

interface WizardProgressIndicatorProps {
  steps: string[];
  currentStep: number;
}

export const WizardProgressIndicator = ({ steps, currentStep }: WizardProgressIndicatorProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((title, index) => (
        <div key={index} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
            index <= currentStep 
              ? 'bg-astrom-blue border-astrom-blue text-white' 
              : 'bg-background border-border text-muted-foreground'
          }`}>
            {index + 1}
          </div>
          <div className="ml-3 text-sm">
            <div className={`font-semibold ${index <= currentStep ? 'text-astrom-blue' : 'text-muted-foreground'}`}>
              {title}
            </div>
          </div>
          {index < steps.length - 1 && (
            <ChevronRight className="mx-6 h-5 w-5 text-muted-foreground" />
          )}
        </div>
      ))}
    </div>
  );
};
