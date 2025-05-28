
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { X, ChevronRight, ChevronLeft, Database, MapPin, Settings, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FieldMappingStep } from "./FieldMappingStep";
import { ConfigurationStep } from "./ConfigurationStep";
import { TestingStep } from "./TestingStep";

interface DataSourceWizardProps {
  onClose: () => void;
  onDataSourceAdded: () => void;
}

interface DataSourceForm {
  name: string;
  type: 'HL7' | 'FHIR' | 'API' | 'CSV' | 'MANUAL';
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
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-foreground font-medium">Data Source Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                placeholder="e.g., Epic EMR - Main Campus"
                className="mt-2 bg-background border-border text-foreground"
              />
            </div>

            <div>
              <Label className="text-foreground font-medium">Source Type</Label>
              <Select value={formData.type} onValueChange={(value: any) => updateFormData({ type: value })}>
                <SelectTrigger className="mt-2 bg-background border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="HL7">HL7 (Health Level 7)</SelectItem>
                  <SelectItem value="FHIR">FHIR (Fast Healthcare Interoperability)</SelectItem>
                  <SelectItem value="API">REST/GraphQL API</SelectItem>
                  <SelectItem value="CSV">CSV/File Upload</SelectItem>
                  <SelectItem value="MANUAL">Manual Entry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-foreground font-medium">Ingestion Mode</Label>
              <div className="flex items-center space-x-3 mt-3">
                <Switch
                  checked={formData.ingestionMode === 'STREAM'}
                  onCheckedChange={(checked) => 
                    updateFormData({ ingestionMode: checked ? 'STREAM' : 'BATCH' })
                  }
                />
                <span className="text-foreground font-medium">
                  {formData.ingestionMode === 'STREAM' ? 'Real-time Stream' : 'Batch Processing'}
                </span>
              </div>
            </div>
          </div>
        );

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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl surface-elevated border-border/50 max-h-[90vh] overflow-hidden glass-card">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/30">
          <div>
            <CardTitle className="text-foreground flex items-center gap-3 text-2xl font-bold">
              <div className="p-2 rounded-xl bg-astrom-blue/10">
                <Database className="h-6 w-6 text-astrom-blue" />
              </div>
              Add Data Source - {STEP_TITLES[currentStep]}
            </CardTitle>
            <CardDescription className="text-lg mt-1">
              Step {currentStep + 1} of {STEP_TITLES.length}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-muted">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[60vh] p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {STEP_TITLES.map((title, index) => (
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
                {index < STEP_TITLES.length - 1 && (
                  <ChevronRight className="mx-6 h-5 w-5 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          {renderStep()}
        </CardContent>

        {/* Navigation */}
        <div className="p-6 border-t border-border/30 flex justify-between bg-muted/30">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="border-border text-foreground hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < STEP_TITLES.length - 1 ? (
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceed()}
              className="gradient-bg-blue hover:shadow-lg"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="gradient-bg-green hover:shadow-lg"
            >
              <Play className="h-4 w-4 mr-2" />
              Deploy Source
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
