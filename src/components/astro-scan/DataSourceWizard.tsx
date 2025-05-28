
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FieldMappingStep } from "./FieldMappingStep";
import { ConfigurationStep } from "./ConfigurationStep";
import { TestingStep } from "./TestingStep";
import { BasicInformationStep } from "./BasicInformationStep";
import { WizardProgressIndicator } from "./WizardProgressIndicator";
import { WizardNavigation } from "./WizardNavigation";
import { WizardHeader } from "./WizardHeader";

interface DataSourceWizardProps {
  onClose: () => void;
  onDataSourceAdded: () => void;
}

interface DataSourceForm {
  name: string;
  type: 'HL7' | 'FHIR' | 'API' | 'CSV' | 'MANUAL' | 'EPIC';
  ingestionMode: 'BATCH' | 'STREAM';
  config: Record<string, any>;
  fieldMappings: Record<string, any>;
  scheduleCron?: string;
}

const STEP_TITLES = [
  "Basic Information",
  "Field Mapping", 
  "Configuration",
  "Test & Deploy"
];

export const DataSourceWizard = ({ onClose, onDataSourceAdded }: DataSourceWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<DataSourceForm>({
    name: '',
    type: 'HL7',
    ingestionMode: 'BATCH',
    config: {},
    fieldMappings: {}
  });

  const updateFormData = (updates: Partial<DataSourceForm>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase
        .from('data_sources')
        .insert({
          name: formData.name,
          type: formData.type,
          ingestion_mode: formData.ingestionMode,
          config: formData.config,
          field_mappings: formData.fieldMappings,
          schedule_cron: formData.scheduleCron
        });

      if (error) throw error;

      toast.success("Data source created successfully!");
      onDataSourceAdded();
    } catch (error) {
      console.error('Error creating data source:', error);
      toast.error("Failed to create data source");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInformationStep formData={formData} updateFormData={updateFormData} />;
      case 1:
        return <FieldMappingStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <ConfigurationStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <TestingStep formData={formData} onComplete={handleSubmit} />;
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim() !== '';
      case 1:
        return Object.keys(formData.fieldMappings).length > 0;
      case 2:
        return Object.keys(formData.config).length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handlePrevious = () => setCurrentStep(prev => Math.max(0, prev - 1));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl surface-elevated border-border/50 max-h-[90vh] overflow-hidden glass-card">
        <WizardHeader 
          currentStepTitle={STEP_TITLES[currentStep]}
          currentStep={currentStep}
          totalSteps={STEP_TITLES.length}
          onClose={onClose}
        />

        <CardContent className="overflow-y-auto max-h-[60vh] p-8">
          <WizardProgressIndicator steps={STEP_TITLES} currentStep={currentStep} />
          {renderStep()}
        </CardContent>

        <WizardNavigation
          currentStep={currentStep}
          totalSteps={STEP_TITLES.length}
          canProceed={canProceed()}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
};
