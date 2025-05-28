
interface ConfigurationSummaryProps {
  formData: any;
}

export const ConfigurationSummary = ({ formData }: ConfigurationSummaryProps) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
      <h4 className="text-white font-medium">Configuration Summary</h4>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-slate-400">Name:</span>
          <span className="text-white ml-2">{formData.name}</span>
        </div>
        <div>
          <span className="text-slate-400">Type:</span>
          <span className="text-white ml-2">{formData.type}</span>
        </div>
        <div>
          <span className="text-slate-400">Mode:</span>
          <span className="text-white ml-2">{formData.ingestionMode}</span>
        </div>
        <div>
          <span className="text-slate-400">Fields Mapped:</span>
          <span className="text-white ml-2">{Object.keys(formData.fieldMappings).length}</span>
        </div>
      </div>
    </div>
  );
};
