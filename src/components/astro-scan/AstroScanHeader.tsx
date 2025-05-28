
import { Scan } from "lucide-react";

const AstroScanHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Scan className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">ASTRO-SCAN</h1>
        <span className="text-sm text-blue-400 font-medium">Data Ingestion & Sources</span>
      </div>
      <p className="text-muted-foreground max-w-2xl">
        Comprehensive data ingestion platform with real-time monitoring, automated validation, and intelligent source management for healthcare data systems.
      </p>
    </div>
  );
};

export default AstroScanHeader;
