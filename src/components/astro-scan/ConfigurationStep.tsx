
import { Settings } from "lucide-react";
import { EpicConfigurationFields } from "./configuration/EpicConfigurationFields";
import { HL7ConfigurationFields } from "./configuration/HL7ConfigurationFields";
import { FHIRConfigurationFields } from "./configuration/FHIRConfigurationFields";
import { APIConfigurationFields } from "./configuration/APIConfigurationFields";
import { CSVConfigurationFields } from "./configuration/CSVConfigurationFields";
import { CommonConfigurationFields } from "./configuration/CommonConfigurationFields";

interface ConfigurationStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export const ConfigurationStep = ({ formData, updateFormData }: ConfigurationStepProps) => {
  const updateConfig = (key: string, value: any) => {
    updateFormData({
      config: {
        ...formData.config,
        [key]: value
      }
    });
  };

  console.log("ConfigurationStep - formData.type:", formData.type); // Debug log

  const renderConfigFields = () => {
    switch (formData.type) {
      case 'EPIC':
        return <EpicConfigurationFields config={formData.config} updateConfig={updateConfig} />;
      case 'HL7':
        return <HL7ConfigurationFields config={formData.config} updateConfig={updateConfig} />;
      case 'FHIR':
        return <FHIRConfigurationFields config={formData.config} updateConfig={updateConfig} />;
      case 'API':
        return <APIConfigurationFields config={formData.config} updateConfig={updateConfig} />;
      case 'CSV':
        console.log("Rendering CSV configuration fields"); // Debug log
        return <CSVConfigurationFields config={formData.config} updateConfig={updateConfig} />;
      case 'MANUAL':
        return (
          <div className="text-muted-foreground text-center py-8">
            No additional configuration required for manual entry.
          </div>
        );
      default:
        console.log("Unknown type:", formData.type); // Debug log
        return (
          <div className="text-muted-foreground text-center py-8">
            No additional configuration required for this source type.
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-astrom-blue">
        <div className="p-2 rounded-xl bg-astrom-blue/10">
          <Settings className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold">Configuration</h3>
      </div>

      <p className="text-muted-foreground text-sm">
        Configure connection details and parameters for your {formData.type} data source.
      </p>

      <div className="space-y-4">
        {renderConfigFields()}
        
        <CommonConfigurationFields
          config={formData.config}
          updateConfig={updateConfig}
          formData={formData}
          updateFormData={updateFormData}
        />
      </div>
    </div>
  );
};
